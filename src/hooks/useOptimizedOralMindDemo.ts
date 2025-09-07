import { useState, useRef, useCallback, useMemo } from 'react';

export interface OptimizedOralFlowState {
  step: number;
  uploadedFile: File | null;
  fileContent: string;
  isAnalyzing: boolean;
  conversation: Array<{role: 'ai' | 'user', message: string}>;
  isRecording: boolean;
  isProcessing: boolean;
  report: string;
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
  recordedAudio: Blob | null;
}

export const useOptimizedOralMindDemo = () => {
  // Consolidated state object for better performance
  const [state, setState] = useState<OptimizedOralFlowState>({
    step: 0,
    uploadedFile: null,
    fileContent: '',
    isAnalyzing: false,
    conversation: [],
    isRecording: false,
    isProcessing: false,
    report: '',
    mediaRecorder: null,
    audioChunks: [],
    recordedAudio: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Optimized setters using useCallback to prevent unnecessary re-renders
  const setStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, step }));
  }, []);

  const setUploadedFile = useCallback((file: File | null) => {
    setState(prev => ({ ...prev, uploadedFile: file }));
  }, []);

  const setFileContent = useCallback((content: string) => {
    setState(prev => ({ ...prev, fileContent: content }));
  }, []);

  const setIsAnalyzing = useCallback((analyzing: boolean) => {
    setState(prev => ({ ...prev, isAnalyzing: analyzing }));
  }, []);

  const setConversation = useCallback((conversation: Array<{role: 'ai' | 'user', message: string}>) => {
    setState(prev => ({ ...prev, conversation }));
  }, []);

  const setIsRecording = useCallback((recording: boolean) => {
    setState(prev => ({ ...prev, isRecording: recording }));
  }, []);

  const setIsProcessing = useCallback((processing: boolean) => {
    setState(prev => ({ ...prev, isProcessing: processing }));
  }, []);

  const setReport = useCallback((report: string) => {
    setState(prev => ({ ...prev, report }));
  }, []);

  const setMediaRecorder = useCallback((recorder: MediaRecorder | null) => {
    setState(prev => ({ ...prev, mediaRecorder: recorder }));
  }, []);

  const setAudioChunks = useCallback((chunks: Blob[]) => {
    setState(prev => ({ ...prev, audioChunks: chunks }));
  }, []);

  const setRecordedAudio = useCallback((audio: Blob | null) => {
    setState(prev => ({ ...prev, recordedAudio: audio }));
  }, []);

  // Optimized reset function
  const resetDemo = useCallback(() => {
    setState({
      step: 0,
      uploadedFile: null,
      fileContent: '',
      conversation: [],
      report: '',
      isAnalyzing: false,
      isProcessing: false,
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
      recordedAudio: null,
    });
  }, []);

  // Batch state update function for better performance
  const updateState = useCallback((updates: Partial<OptimizedOralFlowState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Memoized derived values
  const isReady = useMemo(() => {
    return state.uploadedFile !== null && state.fileContent.length > 0;
  }, [state.uploadedFile, state.fileContent]);

  const canProceed = useMemo(() => {
    return !state.isAnalyzing && !state.isProcessing;
  }, [state.isAnalyzing, state.isProcessing]);

  return {
    // State values
    ...state,
    
    // Individual setters (for backward compatibility)
    setStep,
    setUploadedFile,
    setFileContent,
    setIsAnalyzing,
    setConversation,
    setIsRecording,
    setIsProcessing,
    setReport,
    setMediaRecorder,
    setAudioChunks,
    setRecordedAudio,
    
    // Refs
    fileInputRef,
    audioRef,
    
    // Optimized functions
    resetDemo,
    updateState,
    
    // Derived values
    isReady,
    canProceed,
  };
};