
import { useState, useRef } from "react";
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

  const { isRecording, startRecording, stopRecording, recordedAudio, resetRecording } = useAudioRecording();
  const [transcriptionStatus, setTranscriptionStatus] = useState<"" | "in_progress" | "done" | "error">("");
  const [lastTranscription, setLastTranscription] = useState<string>("");

  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("openai-demo-key") || "");

  // --- Funzione di upload file ---
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      alert("Per favore carica un file PDF");
      return;
    }
    setFile(selectedFile);
    setIsProcessing(true);
    try {
      const text = await extractTextFromPDF(selectedFile);
      setExtractedText(text);
      const textChunks = await createTextChunks(text);
      setChunks(textChunks);
      const chunkEmbeddings = await createEmbeddings(textChunks);
      setEmbeddings(chunkEmbeddings);
      setStep(1);
      setMessages([
        {
          role: "professor",
          content: `Perfetto! Ho analizzato il tuo documento "${selectedFile.name}" e l'ho suddiviso in ${textChunks.length} sezioni semantiche. Sono pronto per rispondere alle tue domande con la precisione di un professore universitario. Cosa vorresti sapere?`,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Errore nell'elaborazione del file:", error);
      alert("Errore nell'elaborazione del file. Riprova.");
    } finally {
      setIsProcessing(false);
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

  // --- Ask Question, calls OpenAI if API key provided ---
  const askQuestion = async (question: string) => {
    if (!question.trim() || chunks.length === 0) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question, timestamp: new Date() },
    ]);
    setIsProcessing(true);

    try {
      const relevantChunks = await findRelevantChunks(question, chunks, embeddings);

      let professorResponse = "";
      if (apiKey.trim().length > 12) {
        professorResponse = await askOpenAIPdfProfessor(apiKey, question, relevantChunks);
      } else {
        professorResponse = await askProfessor(
          question,
          relevantChunks,
          chunks,
          embeddings
        );
      }

      setMessages((prev) => [
        ...prev,
        { role: "professor", content: professorResponse, timestamp: new Date() },
      ]);
    } catch (error) {
      console.error("Errore nella risposta del professore:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "professor",
          content: "Mi dispiace, c'è stato un problema tecnico. Potresti ripetere la domanda?",
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
              Professore Universitario Virtuale
            </DialogTitle>
            <Button
              size="sm"
              className="bg-blue-200 hover:bg-blue-300 text-blue-900 ml-6"
              onClick={() => setIsApiKeyModal(true)}
              variant="outline"
            >
              API Key OpenAI
            </Button>
          </div>
          <p className="text-muted-foreground">
            Carica un documento PDF e interroga il professore AI con tecnologia RAG
          </p>
        </DialogHeader>
        <div className="space-y-6">
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
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualProfessorDemo;
