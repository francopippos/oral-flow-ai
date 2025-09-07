import React, { memo, useMemo, useCallback } from "react";
import { Brain, BookOpen, MessageCircle, Mic, Send, Lightbulb, Square, RotateCcw, MessageSquare, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface OptimizedProfessorChatStepProps {
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

// Memoized message component to prevent unnecessary re-renders
const ChatMessageItem = memo(({ message, index }: { message: ChatMessage; index: number }) => (
  <div
    key={`${message.role}-${index}-${message.timestamp.getTime()}`}
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
));

ChatMessageItem.displayName = "ChatMessageItem";

// Memoized voice controls component
const VoiceControls = memo(({
  isRecording,
  speechSupported,
  isProcessing,
  onStartRecording,
  onStopRecording,
  onResetRecording,
  voiceTranscription,
  isListening,
  t
}: {
  isRecording: boolean;
  speechSupported: boolean;
  isProcessing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onResetRecording: () => void;
  voiceTranscription: string;
  isListening: boolean;
  t: (key: string) => string;
}) => (
  <div className="flex items-center gap-3">
    {!isRecording ? (
      <Button
        onClick={onStartRecording}
        disabled={!speechSupported || isProcessing}
        className="flex items-center gap-2"
        variant="default"
      >
        <Mic className="h-4 w-4" />
        {t('professorChat.startOralPractice')}
      </Button>
    ) : (
      <Button
        onClick={onStopRecording}
        variant="destructive"
        className="flex items-center gap-2"
      >
        <Square className="h-4 w-4" />
        {t('professorChat.stopExplanation')}
      </Button>
    )}

    {(isRecording || voiceTranscription) && (
      <Button
        onClick={onResetRecording}
        variant="outline"
        size="sm"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    )}
  </div>
));

VoiceControls.displayName = "VoiceControls";

const OptimizedProfessorChatStep = memo((props: OptimizedProfessorChatStepProps) => {
  const { language, t } = useTranslation();
  
  // Memoize expensive computations
  const messagesList = useMemo(() => 
    props.messages.map((message, index) => (
      <ChatMessageItem key={`msg-${index}`} message={message} index={index} />
    )), 
    [props.messages]
  );

  // Memoize event handlers to prevent re-renders
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (props.currentQuestion.trim()) {
      props.onAskQuestion(props.currentQuestion);
    }
  }, [props.currentQuestion, props.onAskQuestion]);

  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setCurrentQuestion(e.target.value);
  }, [props.setCurrentQuestion]);

  // Memoize dynamic content
  const headerInfo = useMemo(() => ({
    fileName: props.file?.name,
    chunksCount: props.chunks.length
  }), [props.file?.name, props.chunks.length]);

  const voiceCapabilitiesInfo = useMemo(() => {
    if (!props.voiceCapabilities) return null;
    
    return (
      <div className="text-xs mt-1 text-muted-foreground">
        🌍 {t('professorChat.multiLanguageSupport')} • 
        {props.detectedLanguage && props.detectedLanguage !== 'auto' && (
          <span className="ml-1 text-green-600">
            {t('professorChat.activeLanguage')}: {props.detectedLanguage}
          </span>
        )}
      </div>
    );
  }, [props.voiceCapabilities, props.detectedLanguage, t]);

  return (
    <div className="space-y-6">
      {/* Optimized Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border-2 border-primary/20">
        <div className="flex items-center space-x-4 mb-4">
          <Brain className="h-8 w-8 text-primary" />
          <div className="flex-1">
            <h3 className="text-xl font-bold">
              🎓 {t('professorChat.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('professorChat.evaluatingExplanations')} • <strong>{headerInfo.fileName}</strong> • {headerInfo.chunksCount} {t('professorChat.referenceSection')}
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
              {t('professorChat.switchDocument')}
            </Button>
            <div className="text-right">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg dark:bg-green-900 dark:text-green-200">
                <div className="font-semibold">✅ {t('professorChat.coachActive')}</div>
                <div className="text-xs">{t('professorChat.evaluationReady')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 border border-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span><strong>{t('professorChat.accuracyCheck')}:</strong> {t('professorChat.compareAgainstDocument')}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span><strong>{t('professorChat.presentationSkills')}:</strong> {t('professorChat.evaluateClarity')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span><strong>{t('professorChat.constructiveFeedback')}:</strong> {t('professorChat.improveExplanations')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Optimized Messages Display */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {props.messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-4 text-primary/50" />
            <p>{t('professorChat.coachReadyToEvaluate')}</p>
            <p className="text-xs mt-2">🔄 {t('professorChat.switchDocumentsInfo')}</p>
          </div>
        ) : (
          messagesList
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
                <span className="text-sm">🎓 {t('professorChat.coachEvaluatingExplanation')}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Voice Recording Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg border">
          <Mic className="h-4 w-4 text-primary" />
          <div className="flex-1">
            <h3 className="font-medium text-sm">🎤 {t('professorChat.practiceOralExplanation')}</h3>
            <p className="text-xs text-muted-foreground">
              {props.speechSupported 
                ? `🌍 ${t('professorChat.speakAnyLanguage')}`
                : props.supportMessage || t('professorChat.voiceNotSupported')
              }
            </p>
            {voiceCapabilitiesInfo}
          </div>
        </div>

        {/* Error Display */}
        {props.speechError && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">⚠️ {props.speechError}</p>
          </div>
        )}

        {/* Voice Controls */}
        <VoiceControls
          isRecording={props.isRecording}
          speechSupported={props.speechSupported}
          isProcessing={props.isProcessing}
          onStartRecording={props.onStartRecording}
          onStopRecording={props.onStopRecording}
          onResetRecording={props.onResetRecording}
          voiceTranscription={props.voiceTranscription}
          isListening={props.isListening}
          t={t}
        />

        {/* Real-time Listening Status */}
        {props.isListening && (
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
              </div>
              <span className="text-sm font-medium text-primary">
                🎤 {t('professorChat.recordingExplanation')}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              🌍 {t('professorChat.speakNaturally')}
            </p>
          </div>
        )}

        {/* Transcription Display */}
        {props.voiceTranscription && (
          <div className="space-y-3">
            <div className="p-3 bg-accent/20 border border-accent/30 rounded-lg">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                📝 {t('professorChat.yourOralExplanation')}
              </h4>
              <p className="text-sm">
                {props.voiceTranscription}
                {props.isListening && (
                  <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse"></span>
                )}
              </p>
            </div>

            {props.voiceTranscription && !props.isListening && (
              <Button
                onClick={props.onProcessVoiceQuestion}
                disabled={props.isProcessing}
                className="w-full flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {props.isProcessing ? t('professorChat.gettingFeedback') : `✅ ${t('professorChat.submitForAnalysis')}`}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Text Input Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg border">
          <MessageCircle className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm">💬 {t('professorChat.typeExplanation')}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {t('professorChat.typeAlternatively')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={props.currentQuestion}
            onChange={handleTextareaChange}
            placeholder={t('professorChat.typeAsIfSpeaking')}
            disabled={props.isProcessing}
            className="min-h-[100px]"
          />
          
          <Button
            type="submit"
            disabled={!props.currentQuestion.trim() || props.isProcessing}
            className="w-full flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            {props.isProcessing ? t('professorChat.analyzing') : t('professorChat.getCoachingFeedback')}
          </Button>
        </form>

        {/* Info about Bistro AI */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
          <div className="flex items-center gap-2">
            <div className="text-blue-600 dark:text-blue-400">🎓</div>
            <div className="text-sm">
              {t('professorChat.oralPresentationCoachInfo')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

OptimizedProfessorChatStep.displayName = "OptimizedProfessorChatStep";

export default OptimizedProfessorChatStep;