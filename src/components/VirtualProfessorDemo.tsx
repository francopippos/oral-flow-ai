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
      alert("Per favore carica un file PDF valido");
      return;
    }
    
    setFile(selectedFile);
    setIsProcessing(true);
    setProcessingStep("Estrazione testo dal PDF...");
    
    try {
      // 1. Estrazione REALE del testo
      console.log('🚀 Iniziando elaborazione completa del PDF...');
      const text = await extractTextFromPDF(selectedFile);
      setExtractedText(text);
      console.log('✅ Testo estratto con successo');
      
      // 2. Chunking semantico REALE
      setProcessingStep("Suddivisione in chunk semantici...");
      const textChunks = await createTextChunks(text);
      setChunks(textChunks);
      console.log('✅ Chunk creati:', textChunks.length);
      
      // 3. Creazione embedding REALI
      setProcessingStep("Creazione embedding vettoriali...");
      const chunkEmbeddings = await createEmbeddings(textChunks);
      setEmbeddings(chunkEmbeddings);
      console.log('✅ Embedding creati:', chunkEmbeddings.length);
      
      // 4. Passa al passo successivo
      setStep(1);
      setMessages([
        {
          role: "professor",
          content: `🎓 **Perfetto! Il documento è stato elaborato con successo!**

📊 **Statistiche elaborazione:**
- **Testo estratto:** ${Math.round(text.length / 1000)}k caratteri
- **File:** "${selectedFile.name}"
- **Chunk semantici:** ${textChunks.length} sezioni
- **Embedding vettoriali:** ${chunkEmbeddings.length} × 384 dimensioni

🧠 **Sistema RAG attivato con successo:**
Il tuo documento è ora processato e pronto per rispondere alle tue domande in modo preciso e contestualizzato.

💡 **Cosa posso fare per te:**
- Spiegare concetti specifici dal documento
- Rispondere a domande dettagliate sui contenuti  
- Fornire sintesi di sezioni particolari
- Collegare informazioni tra diverse parti del testo

**Fai pure la tua prima domanda sul documento!** 🎯`,
          timestamp: new Date(),
        },
      ]);
      
    } catch (error) {
      console.error("❌ Errore nell'elaborazione del file:", error);
      alert(`❌ Errore nell'elaborazione del PDF:\n\n${error}\n\nSuggerimenti:\n• Assicurati che il PDF contenga testo (non solo immagini)\n• Verifica che il file non sia protetto da password\n• Prova con un PDF diverso`);
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
      console.log('🔍 Elaborando domanda con RAG completo...');
      
      // 1. Trova chunk REALMENTE rilevanti
      const relevantChunks = await findRelevantChunks(question, chunks, embeddings);
      
      if (relevantChunks.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "professor",
            content: "🔍 **Non ho trovato informazioni direttamente rilevanti nel documento per questa domanda.**\n\nSuggerimenti:\n• Prova a riformulare la domanda\n• Usa parole chiave più specifiche\n• Assicurati che l'argomento sia trattato nel PDF\n\nPosso comunque cercare di aiutarti con informazioni generali se vuoi riprovare! 💡",
            timestamp: new Date(),
          },
        ]);
        return;
      }

      let professorResponse = "";
      
      // 2. Usa OpenAI se disponibile, altrimenti fallback intelligente
      if (apiKey.trim().length > 20) {
        console.log('🤖 Generando risposta con OpenAI GPT...');
        professorResponse = await askOpenAIPdfProfessor(apiKey, question, relevantChunks);
      } else {
        // Fallback migliorato con estratti formattati
        console.log('📚 Modalità estratti diretti (senza GPT)');
        professorResponse = `📚 **Informazioni trovate nel documento relativi alla tua domanda:**

${relevantChunks.map((chunk, i) => `**📄 Estratto ${i + 1}:**
${chunk.trim()}
`).join('\n---\n\n')}

💡 *Per risposte più elaborate e contestualizzate, configura la tua API Key OpenAI nelle impostazioni.*

🎯 **Vuoi approfondire qualche aspetto specifico di questi estratti?**`;
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
          content: `❌ **Si è verificato un errore nell'elaborazione della domanda.**\n\nDettagli: ${error}\n\n🔄 **Cosa puoi fare:**\n• Riprova con la stessa domanda\n• Verifica la tua API Key se configurata\n• Prova a riformulare la domanda`,
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
