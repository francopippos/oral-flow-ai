import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useUniversalVoice } from "../hooks/useUniversalVoice";
import { createTextChunks } from "../utils/chunkingUtils";
import PdfUploadStep from "./VirtualProfessorDemo/PdfUploadStep";
import ProfessorChatStep from "./VirtualProfessorDemo/ProfessorChatStep";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Settings } from "lucide-react";
// Dynamic import to avoid Supabase initialization errors
import { extractTextFromPDF } from "../utils/pdfUtils";

export interface ChatMessage {
  role: "user" | "bistro";
  content: string;
  timestamp: Date;
  sources?: string[];
}

interface VirtualProfessorDemoProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const VirtualProfessorDemo = ({ isOpen, onClose }: VirtualProfessorDemoProps = {}) => {
  const { t } = useTranslation();
  
  // Stato principale
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [chunks, setChunks] = useState<string[]>([]);
  const [embeddings, setEmbeddings] = useState<number[][]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  
  // Speech to Text invece di audio recording
  const {
    isListening,
    transcript,
    interimTranscript,
    fullTranscript,
    isSupported: speechSupported,
    error: speechError,
    capabilities,
    supportMessage,
    detectedLanguage,
    startListening,
    stopListening,
    resetTranscript,
    isRecording
  } = useUniversalVoice();
  
  // Use isRecording from the hook instead of separate state


  // ===== RESET CONTEXT FOR NEW DOCUMENT =====
  const resetDocumentContext = () => {
    setFile(null);
    setExtractedText("");
    setChunks([]);
    setEmbeddings([]);
    setMessages([]);
    setCurrentQuestion("");
    setStep(0);
    console.log('🔄 [CONTEXT] Document context reset for new upload');
  };

  // ===== GESTIONE UPLOAD E PROCESSING =====
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      alert("Per favore seleziona un file PDF valido.");
      return;
    }

    // Reset previous context for new document
    resetDocumentContext();
    
    setFile(selectedFile);
    setIsProcessing(true);
    
    try {
      console.log('📄 [PDF] Inizio elaborazione nuovo documento:', selectedFile.name);
      
      // Add context switch message
      setMessages([{
        role: "bistro",
        content: `🔄 **New Document Context Loaded**\n\n📁 **Document:** ${selectedFile.name}\n\nI've switched to analyzing this new document. All previous context has been cleared, and I'm now ready to explore this new academic material with you.\n\n🎓 Ask me anything about the content, and I'll provide structured academic responses with:\n• Comprehensive analysis\n• Document references\n• Related concepts\n• Follow-up suggestions`,
        timestamp: new Date()
      }]);
      
      // 1. Estrazione testo
      console.log('📖 [PDF] Estrazione testo...');
      const text = await extractTextFromPDF(selectedFile);
      setExtractedText(text);
      console.log('✅ [PDF] Testo estratto:', text.length, 'caratteri');
      
      // 2. Chunking
      console.log('🧩 [CHUNK] Creazione chunk...');
      const textChunks = await createTextChunks(text);
      setChunks(textChunks);
      console.log('✅ Chunk creati:', textChunks.length);
      
      // 3. Create embeddings for each chunk with Bistro AI
      console.log('🧠 [BISTRO] Creating embeddings for', textChunks.length, 'chunks...');
      try {
        const { createEmbeddingsWithBistro } = await import("../utils/bistroApiUtils");
        const chunkEmbeddings = await createEmbeddingsWithBistro(textChunks);
        setEmbeddings(chunkEmbeddings);
        console.log('✅ [BISTRO] Embeddings created:', chunkEmbeddings.length);
      } catch (embError) {
        console.error('❌ [BISTRO] Error creating embeddings:', embError);
        setEmbeddings([]);
        console.log('⚠️ [BISTRO] Fallback to text search');
      }
      
      setStep(1);
      
    } catch (error) {
      console.error('❌ [PROCESSING] Errore elaborazione:', error);
      alert(`Errore nell'elaborazione del PDF: ${error}`);
      resetDocumentContext();
    } finally {
      setIsProcessing(false);
    }
  };

  // ===== GESTIONE SPEECH-TO-TEXT REALE =====
  
  const handleStartVoiceRecording = () => {
    if (!speechSupported) {
      alert('Voice recognition not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    
    console.log('🎤 [VOICE] Starting voice recording...');
    resetTranscript();
    setCurrentQuestion('');
    
    startListening();
  };

  const handleStopVoiceRecording = () => {
    console.log('⏹️ [VOICE] Stopping voice recording...');
    stopListening();
  };

  const handleResetVoiceRecording = () => {
    console.log('🔄 [VOICE] Resetting voice recording...');
    stopListening();
    resetTranscript();
    setCurrentQuestion('');
  };

  // Aggiorna la domanda corrente quando cambia la trascrizione
  useEffect(() => {
    if (transcript && !isListening) {
      // Solo quando il riconoscimento è terminato
      console.log('📝 [VOICE] Trascrizione completata:', transcript);
      setCurrentQuestion(transcript);
    }
  }, [transcript, isListening]);

  // Processo la domanda vocale
  const handleProcessVoiceQuestion = () => {
    const question = transcript.trim();
    if (!question) {
      alert('Nessuna trascrizione disponibile. Prova a registrare di nuovo.');
      return;
    }
    
    console.log('🎯 [VOICE] Processo domanda vocale:', question);
    askQuestion(question);
    handleResetVoiceRecording();
  };

  // ===== GESTIONE CHAT =====
  
  const askQuestion = async (question: string) => {
    if (!question.trim() || chunks.length === 0) return;
    
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question, timestamp: new Date() },
    ]);
    setIsProcessing(true);

    try {
      console.log('🤖 [BISTRO] Processing question:', question);
      
      // 1. Semantic Search with Bistro AI (or fallback to text search)
      console.log('🔍 [BISTRO] Finding relevant chunks...');
      const { findRelevantChunksWithBistro } = await import("../utils/bistroApiUtils");
      const searchResult = await findRelevantChunksWithBistro(question, chunks, embeddings, 3);
      const { chunks: relevantChunks, sourceInfo } = searchResult;
      
      if (relevantChunks.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bistro",
            content: `🔍 **I couldn't find specific information in the document to answer this question.**

${sourceInfo}

**Possible reasons:**
• The topic is not covered in the uploaded PDF
• The terminology used differs from what's in the document  
• The question is too general

**Suggestions:**
• Try with more specific keywords
• Use terminology present in the document
• Ask a more detailed question

I can help you explore the document contents if you give me more precise guidance! 📖`,
            timestamp: new Date(),
          },
        ]);
        return;
      }

      // 2. Send to AI Professor with context (combines PDF + ChatGPT knowledge)
      console.log('🎓 [AI PROFESSOR] Calling AI Professor with', relevantChunks.length, 'relevant chunks');
      
      const { askAIProfessor } = await import("../utils/aiProfessorUtils");
      const aiResponse = await askAIProfessor(question, relevantChunks, file?.name, detectedLanguage);
      console.log('✅ [AI PROFESSOR] Response received successfully');
      
      // Add source information to the response
      const responseWithSource = `${aiResponse}

---
📋 **Response Source:** ${sourceInfo}`;
      
      setMessages((prev) => [
        ...prev,
        { 
          role: "bistro", 
          content: responseWithSource, 
          timestamp: new Date(),
          sources: relevantChunks.map((chunk, i) => `Section ${i + 1}: ${chunk.substring(0, 100)}...`)
        },
      ]);
      
    } catch (error: any) {
      console.error("❌ [AI PROFESSOR CRITICAL] Core system error:", error);
      
      // AI Professor is the core - if it fails, the app doesn't work
      let errorMessage = "❌ **AI PROFESSOR SYSTEM ERROR**\n\n";
      
      if (error.message?.includes('API key')) {
        errorMessage += "🔑 **OpenAI API Key Required:**\nThe AI Professor needs an OpenAI API key to function.\n\n**SOLUTION:** Please configure your OpenAI API key in the system settings.";
      } else if (error.message?.includes('quota')) {
        errorMessage += "📊 **Usage Limit Reached:**\nThe AI service has reached its daily quota.\n\n**SOLUTION:** Please try again later when the quota resets.";
      } else if (error.message?.includes('AI_PROFESSOR_ERROR')) {
        errorMessage += `🔧 **AI Professor Processing Error:**\n${error.message.replace('AI_PROFESSOR_ERROR: ', '')}\n\n**SOLUTION:** Please try rephrasing your question or try again in a moment.`;
      } else {
        errorMessage += `🔧 **Technical Error:**\n${error.message || error}\n\n**SOLUTION:** Please try again. If the issue persists, the system may be temporarily unavailable.`;
      }
      
      errorMessage += "\n\n🎓 **The AI Professor combines document analysis with comprehensive AI knowledge to provide detailed, educational responses.**";
      
      setMessages((prev) => [
        ...prev,
        {
          role: "bistro",
          content: errorMessage,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsProcessing(false);
      setCurrentQuestion("");
    }
  };

  // ===== RENDER COMPONENTI =====
  
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold text-primary">
            🎓 AI Professor - Enhanced Document Analysis
          </DialogTitle>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Powered by OralFlow AI
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto space-y-6">
          {step === 0 ? (
            <PdfUploadStep
              file={file}
              isProcessing={isProcessing}
              onFileUpload={handleFileUpload}
            />
          ) : (
            <ProfessorChatStep
              file={file}
              chunks={chunks}
              isProcessing={isProcessing}
              messages={messages}
              currentQuestion={currentQuestion}
              onStartRecording={handleStartVoiceRecording}
              onStopRecording={handleStopVoiceRecording}
              onResetRecording={handleResetVoiceRecording}
              onProcessVoiceQuestion={handleProcessVoiceQuestion}
              setCurrentQuestion={setCurrentQuestion}
              onAskQuestion={askQuestion}
              onNewDocumentUpload={resetDocumentContext}
              // Speech-to-text props
              isRecording={isRecording || isListening}
              isListening={isListening}
              voiceTranscription={fullTranscript}
              isTranscribing={isListening}
              speechError={speechError}
              speechSupported={speechSupported}
              voiceCapabilities={capabilities}
              supportMessage={supportMessage}
              detectedLanguage={detectedLanguage}
            />
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default VirtualProfessorDemo;