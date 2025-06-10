
import { useState, useRef } from 'react';

export const useOralMindDemo = () => {
  const [step, setStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [conversation, setConversation] = useState<Array<{role: 'ai' | 'user', message: string}>>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [report, setReport] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const resetDemo = () => {
    setStep(0);
    setUploadedFile(null);
    setFileContent('');
    setConversation([]);
    setReport('');
    setIsAnalyzing(false);
    setIsProcessing(false);
    setIsRecording(false);
    setMediaRecorder(null);
    setAudioChunks([]);
    setRecordedAudio(null);
  };

  return {
    step,
    setStep,
    uploadedFile,
    setUploadedFile,
    fileContent,
    setFileContent,
    isAnalyzing,
    setIsAnalyzing,
    conversation,
    setConversation,
    isRecording,
    setIsRecording,
    isProcessing,
    setIsProcessing,
    report,
    setReport,
    mediaRecorder,
    setMediaRecorder,
    audioChunks,
    setAudioChunks,
    recordedAudio,
    setRecordedAudio,
    fileInputRef,
    audioRef,
    resetDemo
  };
};
