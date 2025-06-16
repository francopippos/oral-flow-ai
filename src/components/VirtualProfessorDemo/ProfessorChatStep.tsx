import { Brain, BookOpen, MessageCircle, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  role: "user" | "professor";
  content: string;
  timestamp: Date;
}

interface ProfessorChatStepProps {
  file: File | null;
  chunks: string[];
  isProcessing: boolean;
  messages: ChatMessage[];
  isRecording: boolean;
  recordedAudio: Blob | null;
  transcriptionStatus: "" | "in_progress" | "done" | "error";
  lastTranscription: string;
  currentQuestion: string;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onResetRecording: () => void;
  onProcessVoiceQuestion: () => void;
  setCurrentQuestion: (value: string) => void;
  onAskQuestion: (question: string) => void;
  hasApiKey?: boolean;
}

const ProfessorChatStep = ({
  file,
  chunks,
  isProcessing,
  messages,
  isRecording,
  recordedAudio,
  transcriptionStatus,
  lastTranscription,
  currentQuestion,
  onStartRecording,
  onStopRecording,
  onResetRecording,
  onProcessVoiceQuestion,
  setCurrentQuestion,
  onAskQuestion,
  hasApiKey
}: ProfessorChatStepProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-oralmind-50 to-success-50 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Brain className="h-6 w-6 text-oralmind-600" />
          <h3 className="font-semibold text-oralmind-800">Sistema RAG Attivo</h3>
          {hasApiKey && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">OpenAI GPT</span>}
        </div>
        <p className="text-sm text-oralmind-700">
          📚 <strong>{file?.name}</strong> • {chunks.length} chunk • Embedding ML ready
        </p>
        <p className="text-xs text-oralmind-600">
          {hasApiKey ? "🤖 Risposte generate da OpenAI GPT" : "📖 Modalità estratti diretti (configura API Key per GPT)"}
        </p>
      </div>
      {/* Chat Messages */}
      <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-sm rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-success-100 text-success-800"
                  : "bg-oralmind-100 text-oralmind-800"
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {message.role === "professor" ? (
                  <BookOpen className="h-4 w-4" />
                ) : (
                  <MessageCircle className="h-4 w-4" />
                )}
                <span className="text-xs font-medium">
                  {message.role === "professor" ? "Prof. AI" : "Tu"}
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
            onClick={isRecording ? onStopRecording : onStartRecording}
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
                : "🎤 Clicca per registrare la tua domanda vocale"}
            </p>
            {transcriptionStatus === "in_progress" && (
              <p className="text-xs text-oralmind-600 mt-1 animate-pulse">
                Trascrizione della voce in corso...
              </p>
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
              onClick={onProcessVoiceQuestion}
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
            onChange={e => setCurrentQuestion(e.target.value)}
            placeholder="Oppure scrivi la tua domanda qui..."
            className="flex-1 px-3 py-2 border rounded-md"
            onKeyPress={e =>
              e.key === "Enter" && onAskQuestion(currentQuestion)
            }
            disabled={isProcessing}
          />
          <Button
            onClick={() => onAskQuestion(currentQuestion)}
            disabled={isProcessing || !currentQuestion.trim()}
            className="bg-oralmind-500 hover:bg-oralmind-600"
          >
            Chiedi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfessorChatStep;
