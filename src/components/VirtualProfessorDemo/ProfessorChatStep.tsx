
import { Brain, BookOpen, MessageCircle, Mic, MicOff, Send, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  role: "user" | "professor";
  content: string;
  timestamp: Date;
  sources?: string[];
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
  
  const suggestedQuestions = [
    "Riassumi i concetti principali del documento",
    "Spiega gli aspetti più complessi in modo semplice",
    "Quali sono i punti chiave da ricordare?",
    "Collega i diversi argomenti trattati"
  ];

  return (
    <div className="space-y-6">
      {/* Header Sistema RAG */}
      <div className="bg-gradient-to-r from-oralmind-50 to-success-50 rounded-xl p-6 border-2 border-oralmind-200">
        <div className="flex items-center space-x-4 mb-4">
          <Brain className="h-8 w-8 text-oralmind-600" />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-oralmind-800">🎓 Professore Universitario Virtuale Attivo</h3>
            <p className="text-oralmind-600">
              Sistema RAG operativo • <strong>{file?.name}</strong> • {chunks.length} sezioni semantiche
            </p>
          </div>
          <div className="text-right">
            {hasApiKey ? (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                <div className="font-semibold">✅ ChatGPT Attivo</div>
                <div className="text-xs">Risposte AI avanzate</div>
              </div>
            ) : (
              <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg">
                <div className="font-semibold">⚠️ API Key Mancante</div>
                <div className="text-xs">Configura OpenAI</div>
              </div>
            )}
          </div>
        </div>
        
        {hasApiKey && (
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-oralmind-700 mb-2">
              <strong>🧠 Capacità AI REALI Attive:</strong>
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>• 🔄 HuggingFace Embeddings REALI</div>
              <div>• 🤖 GPT-4o OpenAI REALE</div>
              <div>• 🔍 Ricerca semantica VERA</div>
              <div>• 📊 Similarità coseno REALE</div>
            </div>
            <div className="mt-3 p-2 bg-green-50 rounded text-xs">
              <strong>✅ SISTEMA COMPLETAMENTE REALE:</strong> Ogni processo utilizza AI vera, 
              non simulazioni. PDF.js → Chunks → Embeddings ML → OpenAI GPT-4o
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="bg-gray-50 rounded-xl p-6 h-96 overflow-y-auto space-y-4 border">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-2xl rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-success-100 text-success-800 border border-success-200"
                  : "bg-oralmind-100 text-oralmind-800 border border-oralmind-200"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {message.role === "professor" ? (
                  <BookOpen className="h-5 w-5" />
                ) : (
                  <MessageCircle className="h-5 w-5" />
                )}
                <span className="text-sm font-semibold">
                  {message.role === "professor" ? "🎓 Professore" : "👨‍🎓 Tu"}
                </span>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div className="prose prose-sm text-sm whitespace-pre-wrap">
                {message.content}
              </div>
              {message.sources && (
                <div className="mt-3 pt-3 border-t border-oralmind-200">
                  <p className="text-xs font-medium mb-1">📚 Fonti consultate:</p>
                  <div className="text-xs opacity-75">
                    {message.sources.length} sezione/i del documento
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-oralmind-100 rounded-2xl p-4 max-w-2xl border border-oralmind-200">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="h-5 w-5 text-oralmind-600" />
                <span className="text-sm font-semibold">🎓 Professore</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-oralmind-600"></div>
                <p className="text-sm text-oralmind-700">
                  Sto analizzando il documento e consultando le fonti pertinenti...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Voice Recording */}
      <div className="bg-white border-2 rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="lg"
            onClick={isRecording ? onStopRecording : onStartRecording}
            className={`${isRecording ? "animate-pulse bg-red-500 hover:bg-red-600" : "bg-oralmind-500 hover:bg-oralmind-600"} transition-all`}
            disabled={isProcessing}
          >
            {isRecording ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
            {isRecording ? "🔴 Stop Registrazione" : "🎤 Registra Domanda"}
          </Button>
          
          <div className="flex-1">
            <p className="font-medium">
              {isRecording
                ? "🔴 Registrazione in corso... Fai la tua domanda sul documento"
                : recordedAudio
                ? "✅ Registrazione completata - Clicca 'Elabora' per inviare"
                : "🎤 Registra vocalmente la tua domanda accademica"}
            </p>
            {transcriptionStatus === "in_progress" && (
              <p className="text-sm text-oralmind-600 mt-1 animate-pulse">
                🤖 Trascrizione AI in corso...
              </p>
            )}
            {lastTranscription && transcriptionStatus === "done" && (
              <p className="text-sm text-success-700 mt-1 bg-success-50 p-2 rounded">
                📝 <strong>Trascritto:</strong> "<span className="italic">{lastTranscription}</span>"
              </p>
            )}
            {transcriptionStatus === "error" && (
              <p className="text-sm text-destructive mt-1 bg-destructive-50 p-2 rounded">
                ❌ Errore nella trascrizione. Riprova la registrazione.
              </p>
            )}
          </div>
          
          {recordedAudio && !isRecording && (
            <Button
              onClick={onProcessVoiceQuestion}
              disabled={isProcessing}
              className="bg-green-500 hover:bg-green-600 text-white"
              size="lg"
            >
              <Send className="h-4 w-4 mr-2" />
              Elabora
            </Button>
          )}
        </div>
      </div>

      {/* Text Input */}
      <div className="bg-gray-50 border-2 rounded-xl p-6">
        <div className="space-y-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={currentQuestion}
              onChange={e => setCurrentQuestion(e.target.value)}
              placeholder="Scrivi qui la tua domanda accademica sul documento..."
              className="flex-1 px-4 py-3 border-2 rounded-lg focus:border-oralmind-500 focus:outline-none text-base"
              onKeyPress={e =>
                e.key === "Enter" && !e.shiftKey && onAskQuestion(currentQuestion)
              }
              disabled={isProcessing}
            />
            <Button
              onClick={() => onAskQuestion(currentQuestion)}
              disabled={isProcessing || !currentQuestion.trim() || !hasApiKey}
              className="bg-oralmind-500 hover:bg-oralmind-600 px-6"
              size="lg"
            >
              <Send className="h-4 w-4 mr-2" />
              Chiedi
            </Button>
          </div>
          
          {/* Domande suggerite */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="h-4 w-4 text-oralmind-600" />
              <span className="text-sm font-medium text-oralmind-700">Domande suggerite:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(question)}
                  className="text-left p-3 bg-white rounded-lg border hover:border-oralmind-300 hover:bg-oralmind-25 transition-colors text-sm"
                  disabled={isProcessing}
                >
                  💡 {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {!hasApiKey && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
          <p className="text-orange-800 text-center">
            ⚠️ <strong>Configura la tua API Key OpenAI</strong> per utilizzare il Professore Virtuale con ChatGPT
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfessorChatStep;
