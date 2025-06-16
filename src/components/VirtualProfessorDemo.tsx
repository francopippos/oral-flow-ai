import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { extractTextFromPDF } from "../utils/pdfUtils";
import { createTextChunks } from "../utils/chunkingUtils";
import { createEmbeddings, findRelevantChunks } from "../utils/embeddingUtils";
import { askProfessor } from "../utils/professorUtils";
import { useAudioRecording } from "../hooks/useAudioRecording";
import { transcribeAudio } from "../utils/aiUtils";
import { askOpenAIPdfProfessor } from "../utils/openaiRagUtils";
import ApiKeyModal from "./VirtualProfessorDemo/ApiKeyModal";
import PdfUploadStep from "./VirtualProfessorDemo/PdfUploadStep";
import ProfessorChatStep from "./VirtualProfessorDemo/ProfessorChatStep";

interface VirtualProfessorDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  role: "user" | "professor";
  content: string;
  timestamp: Date;
}

const VirtualProfessorDemo = ({ isOpen, onClose }: VirtualProfessorDemoProps) => {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [chunks, setChunks] = useState<string[]>([]);
  const [embeddings, setEmbeddings] = useState<number[][]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isApiKeyModal, setIsApiKeyModal] = useState(false);
  const [processingStep, setProcessingStep] = useState("");

  const { isRecording, startRecording, stopRecording, recordedAudio, resetRecording } = useAudioRecording();
  const [transcriptionStatus, setTranscriptionStatus] = useState<"" | "in_progress" | "done" | "error">("");
  const [lastTranscription, setLastTranscription] = useState<string>("");

  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("openai-demo-key") || "");

  // --- Funzione di upload file con vero processing ---
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      alert("Per favore carica un file PDF");
      return;
    }
    
    setFile(selectedFile);
    setIsProcessing(true);
    setProcessingStep("Estrazione testo dal PDF...");
    
    try {
      // 1. Estrazione REALE del testo
      const text = await extractTextFromPDF(selectedFile);
      setExtractedText(text);
      
      // 2. Chunking semantico REALE
      setProcessingStep("Suddivisione in chunk semantici...");
      const textChunks = await createTextChunks(text);
      setChunks(textChunks);
      
      // 3. Creazione embedding REALI
      setProcessingStep("Creazione embedding vettoriali...");
      const chunkEmbeddings = await createEmbeddings(textChunks);
      setEmbeddings(chunkEmbeddings);
      
      // 4. Passa al passo successivo
      setStep(1);
      setMessages([
        {
          role: "professor",
          content: `✅ Perfetto! Ho analizzato completamente il documento "${selectedFile.name}":

📊 **Statistiche elaborazione:**
- Testo estratto: ${Math.round(text.length / 1000)}k caratteri
- Chunk semantici creati: ${textChunks.length}
- Embedding vettoriali: ${chunkEmbeddings.length} × 384 dimensioni

🧠 **Sistema RAG attivo:**
Il documento è stato processato con embedding ML reali. Ogni tua domanda verrà abbinata semanticamente ai contenuti più rilevanti del PDF, garantendo risposte precise e contestualizzate.

💡 **Cosa posso fare:**
- Spiegare concetti specifici dal documento
- Rispondere a domande dettagliate sui contenuti
- Fornire sintesi di sezioni particolari
- Collegare informazioni tra diverse parti del testo

Fai pure la tua prima domanda!`,
          timestamp: new Date(),
        },
      ]);
      
    } catch (error) {
      console.error("❌ Errore nell'elaborazione del file:", error);
      alert(`Errore nell'elaborazione del PDF: ${error}.\n\nAssicurati che il PDF contenga testo leggibile e non sia protetto da password.`);
      setFile(null);
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
    }
  };

  // --- Voice recording handlers ---
  const handleVoiceRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      resetRecording();
      setTimeout(() => {
        startRecording();
      }, 150);
    }
    setTranscriptionStatus("");
    setLastTranscription("");
  };

  const processVoiceQuestion = async () => {
    if (!recordedAudio) return;
    setTranscriptionStatus("in_progress");
    setIsProcessing(true);
    try {
      const transcription = await transcribeAudio(recordedAudio);
      setLastTranscription(transcription);
      setCurrentQuestion(transcription);
      setTranscriptionStatus("done");
      await askQuestion(transcription);
    } catch (error) {
      console.error("Errore nella trascrizione:", error);
      setTranscriptionStatus("error");
      alert("Errore nella trascrizione audio");
    } finally {
      setIsProcessing(false);
      resetRecording();
    }
  };

  // --- Ask Question con vero RAG ---
  const askQuestion = async (question: string) => {
    if (!question.trim() || chunks.length === 0) return;
    
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question, timestamp: new Date() },
    ]);
    setIsProcessing(true);

    try {
      // 1. Trova chunk REALMENTE rilevanti
      const relevantChunks = await findRelevantChunks(question, chunks, embeddings);
      
      if (relevantChunks.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "professor",
            content: "❌ Non ho trovato informazioni rilevanti nel documento per rispondere alla tua domanda. Prova a riformulare la domanda o assicurati che l'argomento sia trattato nel PDF caricato.",
            timestamp: new Date(),
          },
        ]);
        return;
      }

      let professorResponse = "";
      
      // 2. Usa OpenAI se disponibile, altrimenti fallback
      if (apiKey.trim().length > 20) {
        professorResponse = await askOpenAIPdfProfessor(apiKey, question, relevantChunks);
      } else {
        // Fallback con estratti diretti
        professorResponse = `📚 **Informazioni trovate nel documento:**

${relevantChunks.map((chunk, i) => `**Estratto ${i + 1}:**\n${chunk}`).join('\n\n---\n\n')}

💡 *Per risposte più elaborate e contestualizzate, configura la tua API Key OpenAI.*`;
      }

      setMessages((prev) => [
        ...prev,
        { role: "professor", content: professorResponse, timestamp: new Date() },
      ]);
      
    } catch (error) {
      console.error("❌ Errore nella risposta del professore:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "professor",
          content: `❌ Si è verificato un errore nell'elaborazione della domanda: ${error}. Riprova o verifica la tua API Key se configurata.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Gestione chiusura e reset demo ---
  const handleClose = () => {
    setStep(0);
    setFile(null);
    setExtractedText("");
    setChunks([]);
    setEmbeddings([]);
    setMessages([]);
    setCurrentQuestion("");
    setIsProcessing(false);
    resetRecording();
    onClose();
  };

  const handleSaveApiKey = () => {
    localStorage.setItem("openai-demo-key", apiKey);
    setIsApiKeyModal(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <ApiKeyModal
          isOpen={isApiKeyModal}
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
          onSave={handleSaveApiKey}
          onClose={() => setIsApiKeyModal(false)}
        />
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold gradient-text flex items-center">
              <BookOpen className="mr-3 h-6 w-6" />
              Professore Universitario Virtuale RAG
            </DialogTitle>
            <Button
              size="sm"
              className="bg-blue-200 hover:bg-blue-300 text-blue-900 ml-6"
              onClick={() => setIsApiKeyModal(true)}
              variant="outline"
            >
              {apiKey ? "✅ API Key" : "⚙️ Config API"}
            </Button>
          </div>
          <p className="text-muted-foreground">
            Sistema RAG avanzato: carica PDF → embedding ML → retrieval semantico → LLM
          </p>
        </DialogHeader>
        <div className="space-y-6">
          {step === 0 ? (
            <PdfUploadStep
              file={file}
              isProcessing={isProcessing}
              onFileUpload={handleFileUpload}
              processingStep={processingStep}
            />
          ) : (
            <ProfessorChatStep
              file={file}
              chunks={chunks}
              isProcessing={isProcessing}
              messages={messages}
              isRecording={isRecording}
              recordedAudio={recordedAudio}
              transcriptionStatus={transcriptionStatus}
              lastTranscription={lastTranscription}
              currentQuestion={currentQuestion}
              onStartRecording={handleVoiceRecording}
              onStopRecording={handleVoiceRecording}
              onResetRecording={resetRecording}
              onProcessVoiceQuestion={processVoiceQuestion}
              setCurrentQuestion={setCurrentQuestion}
              onAskQuestion={askQuestion}
              hasApiKey={!!apiKey}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualProfessorDemo;
