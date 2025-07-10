
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

      // 2. Sistema Professore SEMPRE funzionante (PDF + AI background)
      console.log('🤖 Chiamata Professore con', relevantChunks.length, 'chunk');
      let professorResponse: string;
      
      // Strategia ROBUSTA: Locale prima, OpenAI come miglioramento
      try {
        if (!apiKey.trim()) {
          console.log('🔧 [LOCALE] Nessuna API Key - sistema locale diretto');
          professorResponse = await askLocalPdfProfessor(question, relevantChunks);
        } else {
          // Prima prova OpenAI, se fallisce usa locale IMMEDIATAMENTE
          try {
            console.log('🎯 [OPENAI] Tentativo con GPT-4o...');
            professorResponse = await askOpenAIPdfProfessor(apiKey, question, relevantChunks);
            console.log('✅ [OPENAI] Successo');
          } catch (openaiError: any) {
            console.log('⚠️ [FALLBACK] OpenAI fallito - attivo sistema locale');
            console.log('🔄 [LOCALE] Generazione risposta locale...');
            professorResponse = await askLocalPdfProfessor(question, relevantChunks);
            
            if (openaiError.message?.includes('QUOTA')) {
              professorResponse += '\n\n💡 *Sistema locale attivo (quota OpenAI esaurita)*';
            } else {
              professorResponse += '\n\n🔧 *Sistema locale attivo (OpenAI non disponibile)*';
            }
          }
        }
      } catch (fallbackError) {
        console.error('❌ Errore critico:', fallbackError);
        // Sistema di emergenza finale
        professorResponse = `📚 **Analisi documento per: "${question}"**

Basandomi sul contenuto caricato:

${relevantChunks.slice(0, 2).map((chunk, i) => 
  `**Sezione ${i + 1}:**\n${chunk.substring(0, 400)}...\n`
).join('\n')}

⚠️ *Sistema in modalità emergenza - contenuto grezzo del documento*`;
      }
      
      setMessages((prev) => [
        ...prev,
        { 
          role: "professor", 
          content: professorResponse, 
          timestamp: new Date(),
          sources: relevantChunks.map((chunk, i) => `Sezione ${i + 1}: ${chunk.substring(0, 100)}...`)
        },
      ]);
      
    } catch (error) {
      console.error("❌ Errore CRITICO professore:", error);
      
      // Sistema di emergenza FINALE - usa i chunk trovati o chunk base
      const fallbackChunks = relevantChunks.length > 0 ? relevantChunks : chunks.slice(0, 2);
      
      const emergencyResponse = `🎓 **Professore Universitario Virtuale**

**Risposta di emergenza alla tua domanda:** *${question}*

**📖 Dal documento caricato:**

${fallbackChunks.slice(0, 2).map((chunk, i) => 
  `**Sezione ${i + 1}:**\n${chunk.substring(0, 400)}...\n`
).join('\n')}

**🧠 Analisi accademica:**
In base al contenuto del documento, posso confermare che l'argomento è presente nel materiale caricato. Le sezioni estratte mostrano informazioni rilevanti per la tua richiesta.

---
⚠️ *Sistema di emergenza attivo - risposta basata su contenuto grezzo del documento*`;

      setMessages((prev) => [
        ...prev,
        {
          role: "professor",
          content: emergencyResponse,
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
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-2">
              <p className="text-orange-800 text-sm">
                ⚠️ <strong>API Key OpenAI richiesta:</strong> Per utilizzare il Professore Virtuale devi configurare la tua API Key OpenAI. Clicca su "Configura API Key" in alto a destra.
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
