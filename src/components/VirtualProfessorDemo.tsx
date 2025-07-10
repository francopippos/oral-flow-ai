
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { extractTextFromPDF } from "../utils/pdfUtils";
import { createTextChunks } from "../utils/chunkingUtils";
import { createEmbeddings, findRelevantChunks } from "../utils/embeddingUtils";
import { createOpenAIEmbeddings, findRelevantChunksOpenAI } from "../utils/openaiEmbeddingUtils";
import { useAudioRecording } from "../hooks/useAudioRecording";
import { transcribeAudio } from "../utils/aiUtils";
import { askOpenAIPdfProfessor } from "../utils/openaiRagUtils";
import { askLocalPdfProfessor } from "../utils/localRagUtils";
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
  sources?: string[];
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
      console.log('🚀 [DEMO REALE] Iniziando elaborazione PDF per demo professore...');
      console.log('📄 [DEMO REALE] File:', selectedFile.name, selectedFile.size, 'bytes');
      
      // 1. Estrazione testo reale con PDF.js
      console.log('📥 [DEMO REALE] Chiamando extractTextFromPDF...');
      const text = await extractTextFromPDF(selectedFile);
      setExtractedText(text);
      console.log('✅ [DEMO REALE] Testo estratto:', text.length, 'caratteri');
      console.log('📖 [DEMO REALE] Preview testo:', text.substring(0, 200) + '...');
      
      // 2. Chunking semantico avanzato
      setProcessingStep("Suddivisione semantica intelligente...");
      const textChunks = await createTextChunks(text);
      setChunks(textChunks);
      console.log('✅ Chunk creati:', textChunks.length);
      
      // 3. Creazione embedding con sistema robusto
      setProcessingStep("Generazione embedding vettoriali...");
      let chunkEmbeddings: number[][];
      
      try {
        console.log('🧠 [LOCALE] Uso diretto HuggingFace embeddings (sempre funzionante)...');
        setProcessingStep("Generazione embedding locali...");
        chunkEmbeddings = await createEmbeddings(textChunks);
        console.log('✅ [HUGGINGFACE] Embedding generati:', chunkEmbeddings.length);
      } catch (huggingFaceError) {
        console.log('⚠️ [FALLBACK] HuggingFace fallito, provo OpenAI se disponibile...');
        if (!apiKey.trim()) {
          throw new Error('🔑 Sistema non disponibile. Configura API Key OpenAI o riprova.');
        }
        setProcessingStep("Tentativo embedding OpenAI...");
        chunkEmbeddings = await createOpenAIEmbeddings(apiKey, textChunks);
        console.log('✅ [OPENAI FALLBACK] Embedding generati:', chunkEmbeddings.length);
      }
      
      setEmbeddings(chunkEmbeddings);
      
      // 4. Attivazione chat professore
      setStep(1);
      setMessages([
        {
          role: "professor",
          content: `🎓 **Professore Universitario Virtuale Attivato**

📚 **Documento elaborato con successo:**
- **File:** "${selectedFile.name}"
- **Contenuto:** ${Math.round(text.length / 1000)}k caratteri analizzati
- **Sezioni semantiche:** ${textChunks.length} chunk intelligenti
- **Sistema RAG:** ${chunkEmbeddings.length} embedding vettoriali

🧠 **Capacità attive:**
- Analisi approfondita dei contenuti
- Risposta a domande specifiche e complesse
- Correlazione tra diverse sezioni del documento
- Spiegazioni step-by-step di concetti difficili

💡 **Come interagire con me:**
- Fai domande specifiche sui contenuti del documento
- Chiedi spiegazioni di concetti complessi
- Richiedi correlazioni tra argomenti diversi
- Usa la registrazione vocale per domande naturali

**Sono pronto per le tue domande accademiche!** 🎯`,
          timestamp: new Date(),
        },
      ]);
      
    } catch (error) {
      console.error("❌ Errore elaborazione PDF:", error);
      alert(`❌ Errore nell'elaborazione del PDF:\n\n${error}\n\nSuggerimenti:\n• PDF deve contenere testo leggibile\n• File non protetto da password\n• Dimensione ragionevole (<100MB)\n• Formato PDF standard`);
      setFile(null);
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
    }
  };

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
    if (!recordedAudio) {
      alert("⚠️ Nessun audio registrato. Premi il pulsante e parla chiaramente.");
      return;
    }
    
    setTranscriptionStatus("in_progress");
    setIsProcessing(true);
    console.log('🎤 [TRASCRIZIONE] Iniziando trascrizione audio...');
    
    try {
      console.log('🎵 [AUDIO] File audio presente:', recordedAudio.size, 'bytes');
      const transcription = await transcribeAudio(recordedAudio);
      console.log('✅ [TRASCRIZIONE] Completata:', transcription);
      
      if (!transcription.trim()) {
        throw new Error('Trascrizione vuota');
      }
      
      setLastTranscription(transcription);
      setCurrentQuestion(transcription);
      setTranscriptionStatus("done");
      
      // Aggiungi messaggio di conferma trascrizione
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: `🎤 *Domanda vocale:* ${transcription}`,
          timestamp: new Date(),
        },
      ]);
      
      await askQuestion(transcription);
    } catch (error) {
      console.error("❌ [TRASCRIZIONE] Errore:", error);
      setTranscriptionStatus("error");
      
      let errorMsg = "❌ Errore nella trascrizione audio.\n\n";
      if (error.toString().includes('API key')) {
        errorMsg += "**Problema:** API Key OpenAI non configurata\n**Soluzione:** Configura la tua API Key OpenAI";
      } else {
        errorMsg += "**Suggerimenti:**\n• Parla più chiaramente\n• Riduci il rumore di fondo\n• Registra per almeno 2-3 secondi\n• Verifica il microfono";
      }
      
      alert(errorMsg);
    } finally {
      setIsProcessing(false);
      resetRecording();
    }
  };

  const askQuestion = async (question: string) => {
    if (!question.trim() || chunks.length === 0) return;
    
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question, timestamp: new Date() },
    ]);
    setIsProcessing(true);

    // Dichiarazione fuori dal try per usarla nel catch
    let relevantChunks: string[] = [];

    try {
      console.log('🎓 Professore elabora:', question);
      
      // 1. Ricerca semantica sempre funzionante
      
      try {
        console.log('🔍 [LOCALE] Ricerca semantica con HuggingFace...');
        relevantChunks = await findRelevantChunks(question, chunks, embeddings);
        console.log('📚 [HUGGINGFACE] Chunk rilevanti trovati:', relevantChunks.length);
      } catch (searchError) {
        console.log('⚠️ [FALLBACK RICERCA] HuggingFace fallito, provo OpenAI...');
        relevantChunks = await findRelevantChunksOpenAI(apiKey, question, chunks, embeddings);
        console.log('📚 [OPENAI FALLBACK] Chunk rilevanti trovati:', relevantChunks.length);
      }
      
      if (relevantChunks.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "professor",
            content: `🔍 **Non ho trovato informazioni specifiche nel documento per rispondere a questa domanda.**

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

      // 2. ChatGPT è IL FULCRO - DEVE funzionare sempre
      console.log('🤖 Chiamata OBBLIGATORIA a ChatGPT con', relevantChunks.length, 'chunk');
      
      if (!apiKey.trim()) {
        throw new Error('API_KEY_REQUIRED');
      }
      
      console.log('🎯 [CHATGPT OBBLIGATORIO] Chiamata a GPT-4o...');
      const professorResponse = await askOpenAIPdfProfessor(apiKey, question, relevantChunks);
      console.log('✅ [CHATGPT] Risposta ricevuta con successo');
      
      setMessages((prev) => [
        ...prev,
        { 
          role: "professor", 
          content: professorResponse, 
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
    if (apiKey.trim().length < 20) {
      alert("⚠️ API Key troppo corta. Inserisci una API Key OpenAI valida.");
      return;
    }
    localStorage.setItem("openai-demo-key", apiKey);
    setIsApiKeyModal(false);
    alert("✅ API Key salvata! Ora puoi utilizzare il Professore Virtuale.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
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
              🎓 Professore Universitario Virtuale
            </DialogTitle>
            <Button
              size="sm"
              className={`ml-6 ${apiKey ? 'bg-green-100 hover:bg-green-200 text-green-800' : 'bg-orange-100 hover:bg-orange-200 text-orange-800'}`}
              onClick={() => setIsApiKeyModal(true)}
              variant="outline"
            >
              {apiKey ? "✅ API Key Configurata" : "⚙️ Configura API Key"}
            </Button>
          </div>
          <p className="text-muted-foreground text-lg">
            Sistema RAG <strong>REALE</strong>: <strong>PDF.js → HuggingFace Embeddings → GPT-4o → Risposte Accademiche VERE</strong>
          </p>
          {!apiKey && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-2">
              <p className="text-red-800 text-sm font-semibold">
                🚫 <strong>SISTEMA NON OPERATIVO:</strong> ChatGPT è il fulcro di questa applicazione. 
                <strong className="block mt-1">DEVI configurare la tua API Key OpenAI per procedere.</strong>
              </p>
              <p className="text-red-700 text-xs mt-2">
                Senza ChatGPT, il Professore Virtuale non può funzionare. Clicca su "Configura API Key" per attivare il sistema.
              </p>
            </div>
          )}
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
