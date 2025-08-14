
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Play, Loader2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface ConversationStepProps {
  uploadedFile: File | null;
  conversation: Array<{role: 'ai' | 'user', message: string}>;
  isRecording: boolean;
  isProcessing: boolean;
  recordedAudio: Blob | null;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPlayRecording: () => void;
  onReset: () => void;
  onGenerateReport: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const ConversationStep = ({
  uploadedFile,
  conversation,
  isRecording,
  isProcessing,
  recordedAudio,
  onStartRecording,
  onStopRecording,
  onPlayRecording,
  onReset,
  onGenerateReport,
  audioRef
}: ConversationStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="text-center bg-gradient-to-r from-oralflow-50 to-success-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">{t('conversation.title')}</h3>
        <p className="text-muted-foreground">
          {t('conversation.document')} <strong>{uploadedFile?.name}</strong>
        </p>
        <p className="text-sm text-oralflow-600 mt-2">
          {t('conversation.recordVoice')}
        </p>
      </div>

      <div className="border rounded-lg p-4 h-80 overflow-y-auto space-y-4 bg-gray-50">
        {conversation.map((msg, index) => (
          <div 
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-sm ${
              msg.role === 'user' 
                ? 'bg-success-100 text-success-800 border border-success-200' 
                : 'bg-white text-oralflow-800 border border-oralflow-200'
            }`}>
              {msg.role === 'ai' && <div className="text-xs text-oralflow-600 mb-1">{t('conversation.professor')}</div>}
              {msg.role === 'user' && <div className="text-xs text-success-600 mb-1">{t('conversation.student')}</div>}
              <div className="text-sm">{msg.message}</div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
             <div className="bg-white px-4 py-3 rounded-lg border border-oralflow-200 flex items-center space-x-2 shadow-sm">
               <Loader2 className="h-4 w-4 animate-spin text-oralflow-600" />
               <span className="text-oralflow-800 text-sm">{t('conversation.processing')}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-3">
        <div className="flex justify-center space-x-4">
          {!isRecording ? (
            <Button 
              onClick={onStartRecording}
              disabled={isProcessing}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white"
            >
              <Mic className="h-5 w-5 mr-2" />
              {t('conversation.startRecording')}
            </Button>
          ) : (
            <Button 
              onClick={onStopRecording}
              className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white animate-pulse"
            >
              <MicOff className="h-5 w-5 mr-2" />
              {t('conversation.stopRecording')}
            </Button>
          )}

          {recordedAudio && (
            <Button 
              onClick={onPlayRecording}
              variant="outline"
              className="px-4"
            >
              <Play className="h-4 w-4 mr-2" />
              {t('conversation.playback')}
            </Button>
          )}
        </div>

        {isRecording && (
          <div className="text-center">
            <p className="text-red-600 font-medium">{t('conversation.recordingInProgress')}</p>
            <p className="text-sm text-muted-foreground">{t('conversation.stopWhenDone')}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          {t('conversation.restart')}
        </Button>
        <Button 
          onClick={onGenerateReport}
          disabled={conversation.length < 4}
          className="bg-success-500 hover:bg-success-600"
        >
          {t('conversation.generateReport')}
        </Button>
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default ConversationStep;
