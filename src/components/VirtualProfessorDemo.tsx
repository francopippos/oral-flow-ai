import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Mic, MicOff, MessageCircle, BookOpen, Brain } from 'lucide-react';
import { extractTextFromPDF } from '../utils/pdfUtils';
import { createTextChunks } from '../utils/chunkingUtils';
import { createEmbeddings, findRelevantChunks } from '../utils/embeddingUtils';
import { askProfessor } from '../utils/professorUtils';
import { useAudioRecording } from '../hooks/useAudioRecording';
import { transcribeAudio } from '../utils/aiUtils';
import { askOpenAIPdfProfessor } from '../utils/openaiRagUtils';

interface VirtualProfessorDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  role: 'user' | 'professor';
  content: string;
  timestamp: Date;
}

const VirtualProfessorDemo = ({ isOpen, onClose }: VirtualProfessorDemoProps) => {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [chunks, setChunks] = useState<string[]>([]);
  const [embeddings, setEmbeddings] = useState<number[][]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isRecording, startRecording, stopRecording, recordedAudio, resetRecording } = useAudioRecording();
  const [transcriptionStatus, setTranscriptionStatus] = useState<"" | "in_progress" | "done" | "error">("");
  const [lastTranscription, setLastTranscription] = useState<string>("");

  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("openai-demo-key") || "");
  const [isApiKeyModal, setIsApiKeyModal] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || selectedFile.type !== 'application/pdf') {
      alert('Per favore carica un file PDF');
      return;
    }

    setFile(selectedFile);
    setIsProcessing(true);

    try {
      // Step 2: Extract text from PDF
      const text = await extractTextFromPDF(selectedFile);
      setExtractedText(text);

      // Step 3: Create semantic chunks
      const textChunks = await createTextChunks(text);
      setChunks(textChunks);

      // Step 4: Create embeddings
      const chunkEmbeddings = await createEmbeddings(textChunks);
      setEmbeddings(chunkEmbeddings);

      setStep(1);
      setMessages([{
        role: 'professor',
        content: `Perfetto! Ho analizzato il tuo documento "${selectedFile.name}" e l'ho suddiviso in ${textChunks.length} sezioni semantiche. Sono pronto per rispondere alle tue domande con la precisione di un professore universitario. Cosa vorresti sapere?`,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Errore nell\'elaborazione del file:', error);
      alert('Errore nell\'elaborazione del file. Riprova.');
    } finally {
      setIsProcessing(false);
    }
  };

  // *** Microfono — flusso robusto e user feedback ***
  const handleVoiceRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      resetRecording();
      setTimeout(() => {
        startRecording();
      }, 150);
    }
    setTranscriptionStatus(""); // reset ogni volta
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
      console.error('Errore nella trascrizione:', error);
      setTranscriptionStatus("error");
      alert('Errore nella trascrizione audio');
    } finally {
      setIsProcessing(false);
      resetRecording();
    }
  };

  const askQuestion = async (question: string) => {
    if (!question.trim() || chunks.length === 0) return;

    setMessages(prev => [
      ...prev,
      { role: 'user', content: question, timestamp: new Date()}
    ]);
    setIsProcessing(true);

    try {
      // Trova i chunk più rilevanti (già slicing top-3)
      const relevantChunks = await findRelevantChunks(question, chunks, embeddings);

      let professorResponse = "";
      // ➜ Se c'è l'API Key, usa OpenAI per generare risposta con RAG
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

      setMessages(prev => [
        ...prev,
        { role: 'professor', content: professorResponse, timestamp: new Date()}
      ]);
    } catch (error) {
      console.error('Errore nella risposta del professore:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'professor',
          content: 'Mi dispiace, c\'è stato un problema tecnico. Potresti ripetere la domanda?',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStep(0);
    setFile(null);
    setExtractedText('');
    setChunks([]);
    setEmbeddings([]);
    setMessages([]);
    setCurrentQuestion('');
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
        {/* MODAL PER API KEY */}
        {isApiKeyModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 min-w-[340px] flex flex-col gap-3">
              <h2 className="font-bold text-lg mb-2">Inserisci la tua OpenAI API Key</h2>
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                className="border rounded px-3 py-2"
                placeholder="sk-..."
                autoFocus
              />
              <div className="flex gap-3 mt-2">
                <Button onClick={handleSaveApiKey} className="bg-oralmind-500">Salva</Button>
                <Button onClick={()=>setIsApiKeyModal(false)} variant="secondary">Annulla</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">La key resta solo sul tuo browser e non viene inviata altrove.</p>
              <a 
                href="https://platform.openai.com/api-keys"
                target="_blank" rel="noopener noreferrer"
                className="text-xs text-blue-700 underline"
              >Ottieni una API Key</a>
            </div>
          </div>
        )}

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
            >API Key OpenAI</Button>
          </div>
          <p className="text-muted-foreground">
            Carica un documento PDF e interroga il professore AI con tecnologia RAG
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {step === 0 ? (
            // Upload Step
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Carica il tuo documento PDF</h3>
              </div>
              
              <div 
                className="border-2 border-dashed border-oralmind-300 rounded-lg p-8 text-center cursor-pointer hover:border-oralmind-500 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-oralmind-500 mx-auto mb-4" />
                <p className="text-oralmind-700 mb-2">
                  Clicca qui o trascina il tuo PDF
                </p>
                <p className="text-sm text-muted-foreground">
                  Articoli accademici, dispense, manuali universitari
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {file && (
                <div className="bg-oralmind-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-oralmind-600" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {isProcessing ? 'Elaborazione in corso...' : 'File pronto per l\'analisi'}
                      </p>
                    </div>
                  </div>
                  
                  {isProcessing && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Estrazione testo PDF...</span>
                        <span>⏳</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Chunking semantico...</span>
                        <span>🧩</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Creazione embedding...</span>
                        <span>🧠</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            // Chat Step
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-oralmind-50 to-success-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Brain className="h-6 w-6 text-oralmind-600" />
                  <h3 className="font-semibold text-oralmind-800">Professore Virtuale Attivo</h3>
                </div>
                <p className="text-sm text-oralmind-700">
                  Documento analizzato: <strong>{file?.name}</strong>
                </p>
                <p className="text-sm text-oralmind-600">
                  {chunks.length} sezioni semantiche • Embedding vettoriali pronti
                </p>
              </div>

              {/* Chat Messages */}
              <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-sm rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-success-100 text-success-800'
                          : 'bg-oralmind-100 text-oralmind-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.role === 'professor' ? (
                          <BookOpen className="h-4 w-4" />
                        ) : (
                          <MessageCircle className="h-4 w-4" />
                        )}
                        <span className="text-xs font-medium">
                          {message.role === 'professor' ? 'Prof. AI' : 'Tu'}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-oralmind-100 rounded-lg p-3 max-w-sm">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-oralmind-600" />
                        <span className="text-xs font-medium">Prof. AI</span>
                      </div>
                      <p className="text-sm text-oralmind-700 mt-1">
                        Sto analizzando il documento e preparando la risposta...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Voice Recording */}
              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    size="icon"
                    onClick={handleVoiceRecording}
                    className={isRecording ? "animate-pulse" : ""}
                    disabled={isProcessing}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  
                  <div className="flex-1">
                    <p className="text-sm">
                      {isRecording 
                        ? "🔴 Registrazione in corso... Fai la tua domanda sul documento"
                        : recordedAudio
                        ? "✅ Registrazione completata - Clicca 'Invia' per elaborare"
                        : "🎤 Clicca per registrare la tua domanda vocale"
                      }
                    </p>
                    {transcriptionStatus === "in_progress" && (
                      <p className="text-xs text-oralmind-600 mt-1 animate-pulse">Trascrizione della voce in corso...</p>
                    )}
                    {lastTranscription && transcriptionStatus === "done" && (
                      <p className="text-xs text-success-700 mt-1">
                        Testo trascritto: "<span className="italic">{lastTranscription}</span>"
                      </p>
                    )}
                    {transcriptionStatus === "error" && (
                      <p className="text-xs text-destructive mt-1">❌ Errore nella trascrizione audio</p>
                    )}
                  </div>
                  
                  {recordedAudio && !isRecording && (
                    <Button 
                      onClick={processVoiceQuestion}
                      disabled={isProcessing}
                      className="bg-oralmind-500 hover:bg-oralmind-600"
                    >
                      Invia Domanda
                    </Button>
                  )}
                </div>
              </div>

              {/* Text Input Alternative */}
              <div className="bg-gray-50 border rounded-lg p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    placeholder="Oppure scrivi la tua domanda qui..."
                    className="flex-1 px-3 py-2 border rounded-md"
                    onKeyPress={(e) => e.key === 'Enter' && askQuestion(currentQuestion)}
                    disabled={isProcessing}
                  />
                  <Button
                    onClick={() => askQuestion(currentQuestion)}
                    disabled={isProcessing || !currentQuestion.trim()}
                    className="bg-oralmind-500 hover:bg-oralmind-600"
                  >
                    Chiedi
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualProfessorDemo;
