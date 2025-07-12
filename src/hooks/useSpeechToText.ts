import { useState, useCallback, useRef } from 'react';

// Definizioni TypeScript per Web Speech API
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

export interface SpeechToTextResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef('');

  // Inizializza il riconoscimento vocale
  const initSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined') return false;

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.log('❌ [SPEECH] SpeechRecognition non supportato');
      setError('Il riconoscimento vocale non è supportato in questo browser. Usa Chrome, Edge o Safari.');
      setIsSupported(false);
      return false;
    }

    try {
      const recognition = new SpeechRecognition();
      
      // Configurazione ottimale per riconoscimento in tempo reale
      recognition.continuous = true; // Continua ad ascoltare
      recognition.interimResults = true; // Mostra risultati parziali
      recognition.lang = 'it-IT'; // Italiano come predefinito
      recognition.maxAlternatives = 3; // Multiple alternative per migliore accuratezza
      
      // Gestione eventi
      recognition.onstart = () => {
        console.log('🎤 [SPEECH] Riconoscimento vocale avviato');
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
            console.log('✅ [SPEECH] Testo finale riconosciuto:', transcriptPart);
          } else {
            interimText += transcriptPart;
            console.log('🔄 [SPEECH] Testo parziale:', transcriptPart);
          }
        }

        if (finalText) {
          finalTranscriptRef.current += finalText;
          setTranscript(finalTranscriptRef.current.trim());
        }
        
        setInterimTranscript(interimText);
      };

      recognition.onerror = (event) => {
        console.error('❌ [SPEECH] Errore riconoscimento:', event.error);
        
        let errorMessage = 'Errore nel riconoscimento vocale';
        
        switch (event.error) {
          case 'not-allowed':
            errorMessage = 'Permesso microfono negato. Abilita il microfono nelle impostazioni del browser.';
            break;
          case 'no-speech':
            errorMessage = 'Nessun parlato rilevato. Prova a parlare più chiaramente.';
            break;
          case 'audio-capture':
            errorMessage = 'Impossibile accedere al microfono. Verifica che sia collegato.';
            break;
          case 'network':
            errorMessage = 'Errore di rete. Controlla la connessione internet.';
            break;
          case 'aborted':
            errorMessage = 'Riconoscimento interrotto.';
            break;
          case 'bad-grammar':
            errorMessage = 'Errore di grammatica del riconoscimento.';
            break;
          default:
            errorMessage = `Errore: ${event.error}`;
        }
        
        setError(errorMessage);
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log('🏁 [SPEECH] Riconoscimento vocale terminato');
        setIsListening(false);
        
        // Se c'è del testo finale, aggiornalo
        if (finalTranscriptRef.current.trim()) {
          setTranscript(finalTranscriptRef.current.trim());
          console.log('📝 [SPEECH] Trascrizione finale:', finalTranscriptRef.current.trim());
        }
      };

      recognitionRef.current = recognition;
      setIsSupported(true);
      console.log('✅ [SPEECH] SpeechRecognition inizializzato correttamente');
      return true;
      
    } catch (error) {
      console.error('❌ [SPEECH] Errore inizializzazione:', error);
      setError('Errore nell\'inizializzazione del riconoscimento vocale');
      setIsSupported(false);
      return false;
    }
  }, []);

  // Avvia l'ascolto
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      if (!initSpeechRecognition()) {
        return;
      }
    }

    try {
      console.log('🎤 [SPEECH] Avvio ascolto...');
      recognitionRef.current?.start();
    } catch (error) {
      console.error('❌ [SPEECH] Errore avvio:', error);
      setError('Errore nell\'avvio del riconoscimento vocale');
    }
  }, [initSpeechRecognition]);

  // Ferma l'ascolto
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      console.log('⏹️ [SPEECH] Stop ascolto...');
      recognitionRef.current.stop();
    }
  }, [isListening]);

  // Reset
  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
    finalTranscriptRef.current = '';
    console.log('🔄 [SPEECH] Reset trascrizione');
  }, []);

  // Cambia lingua
  const setLanguage = useCallback((language: string) => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
      console.log('🌍 [SPEECH] Lingua cambiata:', language);
    }
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
    setLanguage,
    // Testo completo per visualizzazione
    fullTranscript: transcript + (interimTranscript ? ` ${interimTranscript}` : '')
  };
};