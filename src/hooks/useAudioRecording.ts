
import { useState } from 'react';

export const useAudioRecording = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async (): Promise<void> => {
    try {
      console.log('🎤 Inizio registrazione...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        setRecordedAudio(audioBlob);
        setAudioChunks([]);
        
        // Ferma lo stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setAudioChunks(chunks);
    } catch (error) {
      console.error('❌ Errore nell\'avvio della registrazione:', error);
      alert('Errore nell\'accesso al microfono. Assicurati di aver dato il permesso.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      console.log('⏹️ Stop registrazione...');
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const resetRecording = () => {
    setMediaRecorder(null);
    setAudioChunks([]);
    setRecordedAudio(null);
    setIsRecording(false);
  };

  return {
    mediaRecorder,
    audioChunks,
    recordedAudio,
    isRecording,
    startRecording,
    stopRecording,
    resetRecording
  };
};
