import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Enhanced browser detection and feature support
const detectBrowserCapabilities = () => {
  if (typeof window === 'undefined') return { 
    hasWebSpeech: false, 
    hasMediaRecorder: false, 
    isMobile: false,
    autoLanguage: 'en-US' 
  };
  
  // Enhanced language detection
  const autoDetectLanguage = () => {
    const userLang = navigator.language || navigator.languages?.[0] || 'en-US';
    // Support for major languages
    const supportedLanguages: Record<string, string> = {
      'it': 'it-IT',
      'it-IT': 'it-IT',
      'en': 'en-US', 
      'en-US': 'en-US',
      'en-GB': 'en-GB',
      'fr': 'fr-FR',
      'fr-FR': 'fr-FR',
      'es': 'es-ES',
      'es-ES': 'es-ES',
      'de': 'de-DE',
      'de-DE': 'de-DE',
      'pt': 'pt-BR',
      'pt-BR': 'pt-BR',
      'ru': 'ru-RU',
      'zh': 'zh-CN',
      'ja': 'ja-JP',
      'ko': 'ko-KR'
    };
    
    const langCode = userLang.split('-')[0];
    return supportedLanguages[userLang] || supportedLanguages[langCode] || 'en-US';
  };
  
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isIOS = /iphone|ipad|ipod/i.test(userAgent);
  const isSafari = /safari/i.test(userAgent) && !/chrome/i.test(userAgent);
  
  // Web Speech API support
  const hasWebSpeech = !!(window.SpeechRecognition || (window as any).webkitSpeechRecognition);
  
  // MediaRecorder support
  const hasMediaRecorder = !!(window.MediaRecorder && navigator.mediaDevices?.getUserMedia);
  
  // Safari on iOS has very limited Web Speech API support
  const webSpeechReliable = hasWebSpeech && !(isIOS && isSafari);
  
  return {
    hasWebSpeech,
    hasMediaRecorder,
    isMobile,
    isIOS,
    isSafari,
    webSpeechReliable,
    preferServerTranscription: !webSpeechReliable || isMobile,
    autoLanguage: autoDetectLanguage()
  };
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

export interface VoiceCapabilities {
  canUseBrowserSpeech: boolean;
  canRecordAudio: boolean;
  canUseServerTranscription: boolean;
  isMobile: boolean;
  recommendedMode: 'browser-speech' | 'server-transcription' | 'none';
  detectedLanguage: string;
  supportedLanguages: string[];
}

export const useUniversalVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string>('auto');
  const [capabilities, setCapabilities] = useState<VoiceCapabilities>({
    canUseBrowserSpeech: false,
    canRecordAudio: false,
    canUseServerTranscription: false,
    isMobile: false,
    recommendedMode: 'none',
    detectedLanguage: 'auto',
    supportedLanguages: ['en-US', 'it-IT', 'fr-FR', 'es-ES', 'de-DE', 'pt-BR', 'ru-RU', 'zh-CN', 'ja-JP', 'ko-KR']
  });
  
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const finalTranscriptRef = useRef('');
  const streamRef = useRef<MediaStream | null>(null);
  // supabase is imported as a singleton

  // Initialize capabilities on mount
  useEffect(() => {
    const caps = detectBrowserCapabilities();
    
    const voiceCapabilities: VoiceCapabilities = {
      canUseBrowserSpeech: caps.webSpeechReliable,
      canRecordAudio: caps.hasMediaRecorder,
      canUseServerTranscription: caps.hasMediaRecorder, // If we can record, we can send to server
      isMobile: caps.isMobile,
      recommendedMode: caps.preferServerTranscription ? 'server-transcription' : 
                      caps.webSpeechReliable ? 'browser-speech' : 'none',
      detectedLanguage: caps.autoLanguage,
      supportedLanguages: ['en-US', 'it-IT', 'fr-FR', 'es-ES', 'de-DE', 'pt-BR', 'ru-RU', 'zh-CN', 'ja-JP', 'ko-KR', 'auto']
    };
    
    setCapabilities(voiceCapabilities);
    setDetectedLanguage(caps.autoLanguage);
    
    console.log('🔍 Voice capabilities detected:', voiceCapabilities);
  }, []);

  // Browser-based speech recognition (for Chrome desktop primarily)
  const initBrowserSpeechRecognition = useCallback(() => {
    if (!capabilities.canUseBrowserSpeech) return false;

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) return false;

    try {
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = detectedLanguage; // Use auto-detected language
      recognition.maxAlternatives = 1;
      
      recognition.onstart = () => {
        console.log('🎤 Browser speech recognition started');
        setIsListening(true);
        setError(null);
        finalTranscriptRef.current = '';
        setTranscript('');
        setInterimTranscript('');
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalText = '';
        let interimText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcriptPart = result[0].transcript;

          if (result.isFinal) {
            finalText += transcriptPart + ' ';
          } else {
            interimText += transcriptPart;
          }
        }

        if (finalText) {
          finalTranscriptRef.current += finalText;
          setTranscript(finalTranscriptRef.current.trim());
        }
        
        setInterimTranscript(interimText);
      };

      recognition.onerror = (event) => {
        console.error('❌ Browser speech recognition error:', event.error);
        
        let errorMessage = 'Speech recognition error';
        switch (event.error) {
          case 'not-allowed':
            errorMessage = 'Microphone permission denied. Please enable microphone access.';
            break;
          case 'no-speech':
            errorMessage = 'No speech detected. Please speak more clearly.';
            break;
          case 'audio-capture':
            errorMessage = 'Could not access microphone. Please check your microphone.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
        }
        
        setError(errorMessage);
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log('🏁 Browser speech recognition ended');
        setIsListening(false);
        
        if (finalTranscriptRef.current.trim()) {
          setTranscript(finalTranscriptRef.current.trim());
        }
      };

      recognitionRef.current = recognition;
      return true;
      
    } catch (error) {
      console.error('❌ Error initializing browser speech recognition:', error);
      return false;
    }
  }, [capabilities.canUseBrowserSpeech]);

  // Audio recording for server-side transcription
  const startAudioRecording = useCallback(async () => {
    if (!capabilities.canRecordAudio) {
      setError('Audio recording not supported in this browser');
      return false;
    }

    try {
      console.log('🎤 Starting audio recording for server transcription...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000, // Standard rate for transcription
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      streamRef.current = stream;
      audioChunksRef.current = [];

      // Use appropriate MIME type based on browser support
      let mimeType = 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/mp4';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = 'audio/wav';
          }
        }
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        console.log('⏹️ Audio recording stopped, processing...');
        setIsRecording(false);
        
        if (audioChunksRef.current.length > 0) {
          await processRecordedAudio();
        }
        
        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
      
      return true;
    } catch (error) {
      console.error('❌ Error starting audio recording:', error);
      setError('Could not access microphone. Please check permissions.');
      return false;
    }
  }, [capabilities.canRecordAudio]);

  // Process recorded audio through server transcription
  const processRecordedAudio = useCallback(async () => {
    if (audioChunksRef.current.length === 0) return;

    try {
      console.log('🔄 Processing audio through server transcription...');
      
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      
      // Convert to base64 for transmission
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        try {
          const { data, error } = await supabase.functions.invoke('whisper-transcription', {
            body: { audio: base64Audio }
          });

          if (error) {
            console.error('❌ Server transcription error:', error);
            setError('Transcription service error. Please try again.');
            return;
          }

          if (data?.text) {
            const transcribedText = data.text.trim();
            const language = data.language || 'auto-detected';
            
            console.log('✅ Server transcription result:', transcribedText);
            console.log('🌍 Detected language:', language);
            
            setDetectedLanguage(language);
            finalTranscriptRef.current = transcribedText;
            setTranscript(transcribedText);
            setInterimTranscript('');
          } else {
            setError('No speech detected in recording');
          }
        } catch (serverError) {
          console.error('❌ Server transcription request failed:', serverError);
          setError('Transcription service unavailable. Please try again.');
        }
      };
      
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('❌ Error processing recorded audio:', error);
      setError('Error processing audio recording');
    }
  }, [supabase]);

  // Start listening (uses best available method)
  const startListening = useCallback(async () => {
    setError(null);
    
    if (capabilities.recommendedMode === 'browser-speech' && capabilities.canUseBrowserSpeech) {
      // Use browser speech recognition
      if (!recognitionRef.current) {
        if (!initBrowserSpeechRecognition()) {
          setError('Could not initialize speech recognition');
          return;
        }
      }
      
      try {
        recognitionRef.current?.start();
      } catch (error) {
        console.error('❌ Error starting browser speech recognition:', error);
        setError('Error starting speech recognition');
      }
    } else if (capabilities.recommendedMode === 'server-transcription' && capabilities.canRecordAudio) {
      // Use audio recording + server transcription
      await startAudioRecording();
    } else {
      setError('Voice input not supported in this browser. Please try Chrome or Edge.');
    }
  }, [capabilities, initBrowserSpeechRecognition, startAudioRecording]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (capabilities.recommendedMode === 'browser-speech' && recognitionRef.current && isListening) {
      console.log('⏹️ Stopping browser speech recognition...');
      recognitionRef.current.stop();
    } else if (capabilities.recommendedMode === 'server-transcription' && mediaRecorderRef.current && isRecording) {
      console.log('⏹️ Stopping audio recording...');
      mediaRecorderRef.current.stop();
    }
  }, [capabilities.recommendedMode, isListening, isRecording]);

  // Reset transcript
  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
    finalTranscriptRef.current = '';
    audioChunksRef.current = [];
    console.log('🔄 Voice transcript reset');
  }, []);

  // Get support status message
  const getSupportMessage = useCallback(() => {
    if (capabilities.recommendedMode === 'none') {
      return 'Voice input not supported in this browser. Please use Chrome, Edge, or Safari.';
    }
    
    const langName = detectedLanguage === 'auto' ? 'Auto-detect' : 
                    detectedLanguage.split('-')[0].toUpperCase();
    
    if (capabilities.recommendedMode === 'server-transcription') {
      return `Using enhanced server-based transcription (${langName}) for better accuracy across all languages.`;
    }
    
    if (capabilities.recommendedMode === 'browser-speech') {
      return `Using real-time browser speech recognition (${langName}). Supports multiple languages automatically.`;
    }
    
    return 'Voice input available with multi-language support.';
  }, [capabilities.recommendedMode, detectedLanguage]);

  return {
    // State
    isListening: isListening || isRecording,
    transcript,
    interimTranscript,
    error,
    capabilities,
    detectedLanguage,
    
    // Computed values
    fullTranscript: transcript + (interimTranscript ? ` ${interimTranscript}` : ''),
    isSupported: capabilities.recommendedMode !== 'none',
    supportMessage: getSupportMessage(),
    
    // Actions
    startListening,
    stopListening,
    resetTranscript,
    
    // For backwards compatibility
    isRecording: isRecording
  };
};