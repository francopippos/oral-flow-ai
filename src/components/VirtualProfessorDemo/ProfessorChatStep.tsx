import { Brain, BookOpen, MessageCircle, Mic, Send, Lightbulb, Square, RotateCcw, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  currentQuestion: string;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onResetRecording: () => void;
  onProcessVoiceQuestion: () => void;
  setCurrentQuestion: (value: string) => void;
  onAskQuestion: (question: string) => void;
  // Speech-to-text props
  isRecording: boolean;
  isListening: boolean;
  voiceTranscription: string;
  isTranscribing: boolean;
  speechError: string | null;
  speechSupported: boolean;
}

const ProfessorChatStep = (props: ProfessorChatStepProps) => {
  
  const suggestedQuestions = [
    "Riassumi i concetti principali del documento",
    "Spiega gli aspetti più complessi in modo semplice",
    "Quali sono i punti chiave da ricordare?",
    "Collega i diversi argomenti trattati"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (props.currentQuestion.trim()) {
      props.onAskQuestion(props.currentQuestion);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Sistema RAG */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border-2 border-primary/20">
        <div className="flex items-center space-x-4 mb-4">
          <Brain className="h-8 w-8 text-primary" />
          <div className="flex-1">
            <h3 className="text-xl font-bold">🎓 Professore Universitario Virtuale Attivo</h3>
            <p className="text-muted-foreground">
              Sistema RAG operativo • <strong>{props.file?.name}</strong> • {props.chunks.length} sezioni semantiche
            </p>
          </div>
          <div className="text-right">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg dark:bg-green-900 dark:text-green-200">
              <div className="font-semibold">✅ ChatGPT Attivo</div>
              <div className="text-xs">Risposte AI avanzate</div>
            </div>
          </div>
        </div>

        {/* Info AI Capacità */}
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 border border-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span><strong>Analisi Semantica:</strong> Comprende il contenuto in profondità</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span><strong>Risposte Contestualizzate:</strong> Basate sui tuoi documenti</span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span><strong>Approccio Didattico:</strong> Spiegazioni chiare e strutturate</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MESSAGGI CHAT ===== */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {props.messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-4 text-primary/50" />
            <p>Il Professore è pronto a rispondere alle tue domande sul documento caricato!</p>
          </div>
        ) : (
          props.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground border"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                <div className="text-xs mt-2 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Loading indicator */}
        {props.isProcessing && (
          <div className="flex justify-start">
            <div className="bg-secondary text-secondary-foreground p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                </div>
                <span className="text-sm">🎓 Il Professore sta elaborando la risposta...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== REGISTRAZIONE VOCALE REALE ===== */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg border">
          <Mic className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm">🎤 Registra la tua domanda</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {props.speechSupported 
                ? "Clicca e parla: il tuo audio verrà trascritto automaticamente"
                : "⚠️ Riconoscimento vocale non supportato in questo browser"
              }
            </p>
          </div>
        </div>

        {/* Errore Speech Recognition */}
        {props.speechError && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">⚠️ {props.speechError}</p>
          </div>
        )}

        {/* Controlli registrazione */}
        <div className="flex items-center gap-3">
          {!props.isRecording ? (
            <Button
              onClick={props.onStartRecording}
              disabled={!props.speechSupported || props.isProcessing}
              className="flex items-center gap-2"
              variant="default"
            >
              <Mic className="h-4 w-4" />
              Inizia Registrazione
            </Button>
          ) : (
            <Button
              onClick={props.onStopRecording}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Stop Registrazione
            </Button>
          )}

          {(props.isRecording || props.voiceTranscription) && (
            <Button
              onClick={props.onResetRecording}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Stato ascolto in tempo reale */}
        {props.isListening && (
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
              </div>
              <span className="text-sm font-medium text-primary">
                🎤 Sto ascoltando...
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Parla chiaramente verso il microfono
            </p>
          </div>
        )}

        {/* Trascrizione in tempo reale */}
        {props.voiceTranscription && (
          <div className="space-y-3">
            <div className="p-3 bg-accent/20 border border-accent/30 rounded-lg">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                📝 Trascrizione:
              </h4>
              <p className="text-sm">
                {props.voiceTranscription}
                {props.isListening && (
                  <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse"></span>
                )}
              </p>
            </div>

            {/* Conferma e processo */}
            {props.voiceTranscription && !props.isListening && (
              <Button
                onClick={props.onProcessVoiceQuestion}
                disabled={props.isProcessing}
                className="w-full flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {props.isProcessing ? "Elaborando..." : "✅ Conferma e Invia"}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* ===== INPUT TESTUALE ===== */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg border">
          <MessageCircle className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm">💬 Scrivi la tua domanda</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Digita la tua domanda o usa una delle domande suggerite
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={props.currentQuestion}
            onChange={(e) => props.setCurrentQuestion(e.target.value)}
            placeholder="Scrivi la tua domanda qui..."
            disabled={props.isProcessing}
            className="min-h-[100px]"
          />
          
          <Button
            type="submit"
            disabled={!props.currentQuestion.trim() || props.isProcessing}
            className="w-full flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            {props.isProcessing ? "Elaborando..." : "Invia Domanda"}
          </Button>
        </form>

        {/* Domande suggerite */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            💡 Domande suggerite:
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => props.setCurrentQuestion(question)}
                disabled={props.isProcessing}
                className="text-left justify-start h-auto p-3 text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Warning se manca API Key */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-800">
          <div className="flex items-center gap-2">
            <div className="text-yellow-600 dark:text-yellow-400">⚠️</div>
            <div className="text-sm">
              <strong>ChatGPT è il fulcro di questa applicazione:</strong> per risposte accurate e contestualizzate, è necessaria un'API Key OpenAI valida.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorChatStep;