import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useSpeechToText } from "../hooks/useSpeechToText";
import { createTextChunks } from "../utils/chunkingUtils";
import PdfUploadStep from "./VirtualProfessorDemo/PdfUploadStep";
import ProfessorChatStep from "./VirtualProfessorDemo/ProfessorChatStep";
import ApiKeyModal from "./VirtualProfessorDemo/ApiKeyModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Settings } from "lucide-react";
import { createEmbeddingsForChunks, findRelevantChunks } from "../utils/embeddingUtils";
import { askOpenAIPdfProfessor } from "../utils/openaiRagUtils";
import { extractTextFromPDF } from "../utils/pdfUtils";

export interface ChatMessage {
  role: "user" | "professor";
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
  const [apiKey, setApiKey] = useState(''); // In-memory only, no localStorage
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  
  // Speech to Text invece di audio recording
  const {
    isListening,
    transcript,
    interimTranscript,
    fullTranscript,
    isSupported: speechSupported,
    error: speechError,
    startListening,
    stopListening,
    resetTranscript,
    setLanguage
  } = useSpeechToText();
  
  // Stato per gestire la registrazione vocale per UI
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);

  // ===== GESTIONE API KEY =====
  const handleSaveApiKey = (key: string) => {
    const trimmedKey = key.trim();
    setApiKey(trimmedKey);
    // No localStorage - keep in memory only
    setShowApiKeyModal(false);
    console.log('🔑 [API KEY] Salvata in memoria:', trimmedKey.length, 'caratteri');
  };

  // ===== GESTIONE UPLOAD E PROCESSING =====
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      alert("Per favore seleziona un file PDF valido.");
      return;
    }

    setFile(selectedFile);
    setIsProcessing(true);
    
    try {
      console.log('📄 [PDF] Inizio elaborazione:', selectedFile.name);
      
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
      
      // 3. Create embeddings for each chunk
      console.log('🧠 [EMBEDDING] Creazione embeddings per', textChunks.length, 'chunk...');
      if (!apiKey.trim()) {
        // If no API key, store empty embeddings and use simple text search as fallback
        setEmbeddings([]);
        console.log('⚠️ [EMBEDDING] API Key mancante, userò ricerca testuale semplice');
      } else {
        try {
          const chunkEmbeddings = await createEmbeddingsForChunks(apiKey, textChunks);
          setEmbeddings(chunkEmbeddings);
          console.log('✅ [EMBEDDING] Embeddings creati:', chunkEmbeddings.length);
        } catch (embError) {
          console.error('❌ [EMBEDDING] Errore creazione embeddings:', embError);
          setEmbeddings([]);
          console.log('⚠️ [EMBEDDING] Fallback a ricerca testuale');
        }
      }
      
      setStep(1);
      
    } catch (error) {
      console.error('❌ [PROCESSING] Errore elaborazione:', error);
      alert(`Errore nell'elaborazione del PDF: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // ===== GESTIONE SPEECH-TO-TEXT REALE =====
  
  const handleStartVoiceRecording = () => {
    if (!speechSupported) {
      alert('Il riconoscimento vocale non è supportato nel tuo browser. Usa Chrome, Edge o Safari.');
      return;
    }
    
    console.log('🎤 [VOICE] Avvio registrazione vocale...');
    setIsVoiceRecording(true);
    resetTranscript();
    setCurrentQuestion('');
    
    // Imposta lingua italiana
    setLanguage('it-IT');
    startListening();
  };

  const handleStopVoiceRecording = () => {
    console.log('⏹️ [VOICE] Stop registrazione vocale...');
    setIsVoiceRecording(false);
    stopListening();
  };

  const handleResetVoiceRecording = () => {
    console.log('🔄 [VOICE] Reset registrazione vocale...');
    setIsVoiceRecording(false);
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
      console.log('🎓 Professore elabora:', question);
      
      if (!apiKey.trim()) {
        throw new Error('API_KEY_REQUIRED');
      }
      
      // 1. Semantic Search with OpenAI embeddings (or fallback to text search)
      console.log('🔍 [RAG] Ricerca chunk rilevanti...');
      let searchResult: { chunks: string[], sourceInfo: string };
      
      if (embeddings.length > 0) {
        // Use semantic search with embeddings
        searchResult = await findRelevantChunks(apiKey, question, chunks, embeddings, 3);
      } else {
        // Fallback to text-based search
        console.log('⚠️ [RAG] Embeddings non disponibili, uso ricerca testuale');
        searchResult = await findRelevantChunks(apiKey, question, chunks, [], 3);
      }
      
      const { chunks: relevantChunks, sourceInfo } = searchResult;
      
      if (relevantChunks.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "professor",
            content: `🔍 **Non ho trovato informazioni specifiche nel documento per rispondere a questa domanda.**

${sourceInfo}

**Possibili cause:**
• L'argomento non è trattato nel PDF caricato
• La terminologia usata è diversa da quella nel documento
• La domanda è troppo generica

**Suggerimenti:**
• Riprova con parole chiave più specifiche
• Usa terminologia presente nel documento
• Fai una domanda più dettagliata

Posso aiutarti a esplorare i contenuti del documento se mi dai indicazioni più precise! 📖`,
            timestamp: new Date(),
          },
        ]);
        return;
      }

      // 2. Send to GPT-4 with context
      console.log('🤖 [RAG] Chiamata a GPT-4 con', relevantChunks.length, 'chunk rilevanti');
      
      const professorResponse = await askOpenAIPdfProfessor(apiKey, question, relevantChunks);
      console.log('✅ [RAG] Risposta ricevuta con successo');
      
      // Add source information to the response
      const responseWithSource = `${professorResponse}

---
📋 **Fonte della Risposta:** ${sourceInfo}`;
      
      setMessages((prev) => [
        ...prev,
        { 
          role: "professor", 
          content: responseWithSource, 
          timestamp: new Date(),
          sources: relevantChunks.map((chunk, i) => `Sezione ${i + 1}: ${chunk.substring(0, 100)}...`)
        },
      ]);
      
    } catch (error: any) {
      console.error("❌ [CHATGPT CRITICO] Errore del fulcro:", error);
      
      // ChatGPT È IL FULCRO - se fallisce, l'app non funziona
      let errorMessage = "❌ **ERRORE CHATGPT - Sistema Non Operativo**\n\n";
      
      if (error.message?.includes('API_KEY_REQUIRED')) {
        errorMessage += "🔑 **API Key Mancante:**\nChatGPT è il fulcro di questa applicazione.\n\n**SOLUZIONE OBBLIGATORIA:** Configura subito la tua API Key OpenAI cliccando su 'Configura API Key' in alto a destra.";
      } else if (error.message?.includes('API_KEY_INVALID') || error.toString().includes('401')) {
        errorMessage += "🔑 **API Key Non Valida:**\nLa tua API Key OpenAI non è corretta.\n\n**SOLUZIONE:** Verifica e aggiorna la tua API Key nelle impostazioni.";
      } else if (error.message?.includes('QUOTA_EXCEEDED') || error.toString().includes('quota') || error.toString().includes('429')) {
        errorMessage += "💳 **Credito OpenAI Esaurito:**\nIl tuo account OpenAI ha terminato il credito disponibile.\n\n**SOLUZIONE OBBLIGATORIA:** Ricarica il tuo account su platform.openai.com\n\n⚠️ **IMPORTANTE:** Senza credito OpenAI, questa applicazione non può funzionare.";
      } else if (error.toString().includes('403')) {
        errorMessage += "🚫 **Accesso Negato:**\nProblema di autorizzazione con il tuo account OpenAI.\n\n**SOLUZIONE:** Verifica lo stato del tuo account su platform.openai.com";
      } else if (error.toString().includes('network') || error.toString().includes('fetch')) {
        errorMessage += "🌐 **Errore di Connessione:**\nImpossibile raggiungere i server OpenAI.\n\n**SOLUZIONE:** Controlla la tua connessione internet e riprova.";
      } else {
        errorMessage += `🔧 **Errore Tecnico ChatGPT:**\n${error.message || error}\n\n**SOLUZIONE:** Riprova tra qualche secondo. Se persiste, verifica la tua API Key.`;
      }
      
      errorMessage += "\n\n🎯 **ChatGPT è il cuore di questa applicazione. Senza di lui, il sistema non è operativo.**";
      
      setMessages((prev) => [
        ...prev,
        {
          role: "professor",
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
            🎓 Professore Virtuale - Demo RAG
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowApiKeyModal(true)}
              className="text-xs"
            >
              <Settings className="h-4 w-4 mr-1" />
              Configura API Key
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
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
              // Speech-to-text props
              isRecording={isVoiceRecording}
              isListening={isListening}
              voiceTranscription={fullTranscript}
              isTranscribing={isListening}
              speechError={speechError}
              speechSupported={speechSupported}
            />
          )}
        </div>

        {/* Modal per API Key */}
        <ApiKeyModal
          isOpen={showApiKeyModal}
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
          onSave={() => handleSaveApiKey(apiKey)}
          onClose={() => setShowApiKeyModal(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default VirtualProfessorDemo;