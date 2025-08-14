import { Brain, BookOpen, MessageCircle, Mic, Send, Lightbulb, Square, RotateCcw, MessageSquare, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "../../hooks/useTranslation";

interface ChatMessage {
  role: "user" | "bistro";
  content: string;
  timestamp: Date;
  sources?: string[];
}

interface VoiceCapabilities {
  canUseBrowserSpeech: boolean;
  canRecordAudio: boolean;
  canUseServerTranscription: boolean;
  isMobile: boolean;
  recommendedMode: 'browser-speech' | 'server-transcription' | 'none';
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
  onNewDocumentUpload: () => void;
  // Speech-to-text props
  isRecording: boolean;
  isListening: boolean;
  voiceTranscription: string;
  isTranscribing: boolean;
  speechError: string | null;
  speechSupported: boolean;
  voiceCapabilities?: VoiceCapabilities;
  supportMessage?: string;
  detectedLanguage?: string;
}

const ProfessorChatStep = (props: ProfessorChatStepProps) => {
  const { language } = useTranslation();
  
  const suggestedExplanations = [
    "Explain electric charge and electron movement as if teaching it to a study group",
    "Describe Coulomb's Law and its applications like you're presenting to a professor", 
    "Present the concept of electric fields as if giving an oral exam answer",
    "Explain electromagnetic induction as if you're teaching a lab session"
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
            <h3 className="text-xl font-bold">
              🎓 {language === 'it' ? 'Coach di Presentazione Orale - Feedback Accademico' : 'Oral Presentation Coach - Academic Feedback'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'it' ? 'Valutando Spiegazioni' : 'Evaluating Explanations'} • <strong>{props.file?.name}</strong> • {props.chunks.length} {language === 'it' ? 'sezioni di riferimento' : 'reference sections'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={props.onNewDocumentUpload}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Switch Document
            </Button>
            <div className="text-right">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg dark:bg-green-900 dark:text-green-200">
                <div className="font-semibold">✅ Coach Active</div>
                <div className="text-xs">Evaluation ready</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info AI Capacità */}
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 border border-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span><strong>Accuracy Check:</strong> Compare against document content</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span><strong>Presentation Skills:</strong> Evaluate clarity and terminology</span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span><strong>Constructive Feedback:</strong> Improve your explanations</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MESSAGGI CHAT ===== */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {props.messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-4 text-primary/50" />
            <p>Oral Presentation Coach is ready to evaluate your explanations and provide feedback!</p>
            <p className="text-xs mt-2">🔄 Switch documents anytime • 💡 Explain concepts for evaluation • 📋 Get structured coaching feedback</p>
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
                <span className="text-sm">🎓 Coach is evaluating your explanation...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== REGISTRAZIONE VOCALE REALE ===== */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg border">
          <Mic className="h-4 w-4 text-primary" />
          <div className="flex-1">
            <h3 className="font-medium text-sm">🎤 Practice Oral Explanation</h3>
            <p className="text-xs text-muted-foreground">
              {props.speechSupported 
                ? "🌍 Speak in any language - AI auto-detects and responds appropriately"
                : props.supportMessage || "Voice recognition not supported"
              }
            </p>
            {props.voiceCapabilities && (
              <div className="text-xs mt-1 text-muted-foreground">
                🌍 Multi-lang: 🇮🇹 🇺🇸 🇫🇷 🇪🇸 🇩🇪 🇧🇷 🇷🇺 🇨🇳 🇯🇵 🇰🇷 • 
                {props.detectedLanguage && props.detectedLanguage !== 'auto' && (
                  <span className="ml-1 text-green-600">Active: {props.detectedLanguage}</span>
                )}
              </div>
            )}
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
              Start Oral Practice
            </Button>
          ) : (
            <Button
              onClick={props.onStopRecording}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Stop Explanation
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
                🎤 Recording your explanation...
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              🌍 Speak naturally in your preferred language. The system will automatically detect and process your speech, whether you're speaking Italian, English, or any other supported language.
            </p>
          </div>
        )}

        {/* Trascrizione in tempo reale */}
        {props.voiceTranscription && (
          <div className="space-y-3">
            <div className="p-3 bg-accent/20 border border-accent/30 rounded-lg">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                📝 Your Oral Explanation:
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
                {props.isProcessing ? "Getting Feedback..." : "✅ Submit for Analysis"}
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
            <h3 className="font-semibold text-sm">💬 Type your explanation</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Alternatively, write out your explanation as if you were speaking it aloud
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={props.currentQuestion}
            onChange={(e) => props.setCurrentQuestion(e.target.value)}
            placeholder="Type your explanation as if speaking to an audience..."
            disabled={props.isProcessing}
            className="min-h-[100px]"
          />
          
          <Button
            type="submit"
            disabled={!props.currentQuestion.trim() || props.isProcessing}
            className="w-full flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            {props.isProcessing ? "Analyzing..." : "Get Coaching Feedback"}
          </Button>
        </form>

        {/* Domande suggerite */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            💡 Practice explanations to try:
          </h4>
          
           <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedExplanations.map((explanation, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => props.setCurrentQuestion(explanation)}
                disabled={props.isProcessing}
                className="text-left justify-start h-auto p-3 text-xs"
              >
                {explanation}
              </Button>
            ))}
          </div>
        </div>

        {/* Info about Bistro AI */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
          <div className="flex items-center gap-2">
            <div className="text-blue-600 dark:text-blue-400">🎓</div>
            <div className="text-sm">
              <strong>Oral Presentation Coach:</strong> Evaluates your explanations against document content and academic standards. 
              Provides structured feedback to improve your academic communication skills.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorChatStep;