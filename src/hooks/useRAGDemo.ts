
import { useState, useRef } from 'react';

interface Chunk {
  id: string;
  content: string;
  pageNumber?: number;
  embedding?: number[];
}

interface RAGMessage {
  role: 'professor' | 'student';
  message: string;
  sources?: Chunk[];
  timestamp: Date;
}

export const useRAGDemo = () => {
  const [step, setStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [conversation, setConversation] = useState<RAGMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetDemo = () => {
    setStep(0);
    setUploadedFile(null);
    setIsProcessing(false);
    setChunks([]);
    setConversation([]);
    setCurrentQuestion('');
    setIsGeneratingResponse(false);
  };

  return {
    step,
    setStep,
    uploadedFile,
    setUploadedFile,
    isProcessing,
    setIsProcessing,
    chunks,
    setChunks,
    conversation,
    setConversation,
    currentQuestion,
    setCurrentQuestion,
    isGeneratingResponse,
    setIsGeneratingResponse,
    fileInputRef,
    resetDemo
  };
};
