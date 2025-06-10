
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Play, Loader2 } from 'lucide-react';

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
  return (
    <div className="space-y-4">
      <div className="text-center bg-gradient-to-r from-oralmind-50 to-success-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">🎓 Interrogazione in Corso con Professor OralMind</h3>
        <p className="text-muted-foreground">
          📚 Documento: <strong>{uploadedFile?.name}</strong>
        </p>
        <p className="text-sm text-oralmind-600 mt-2">
          🎤 Registra la tua voce per esporre l'argomento
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
                : 'bg-white text-oralmind-800 border border-oralmind-200'
            }`}>
              {msg.role === 'ai' && <div className="text-xs text-oralmind-600 mb-1">🧠 Professor OralMind</div>}
              {msg.role === 'user' && <div className="text-xs text-success-600 mb-1">🎤 Studente</div>}
              <div className="text-sm">{msg.message}</div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-lg border border-oralmind-200 flex items-center space-x-2 shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-oralmind-600" />
              <span className="text-oralmind-800 text-sm">🧠 Professor OralMind sta elaborando...</span>
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
              🎤 Inizia Registrazione
            </Button>
          ) : (
            <Button 
              onClick={onStopRecording}
              className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white animate-pulse"
            >
              <MicOff className="h-5 w-5 mr-2" />
              ⏹️ Termina Registrazione
            </Button>
          )}

          {recordedAudio && (
            <Button 
              onClick={onPlayRecording}
              variant="outline"
              className="px-4"
            >
              <Play className="h-4 w-4 mr-2" />
              🔊 Riascolta
            </Button>
          )}
        </div>

        {isRecording && (
          <div className="text-center">
            <p className="text-red-600 font-medium">🔴 Registrazione in corso... Esponi il tuo argomento</p>
            <p className="text-sm text-muted-foreground">Clicca "Termina Registrazione" quando hai finito</p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          🔄 Ricomincia
        </Button>
        <Button 
          onClick={onGenerateReport}
          disabled={conversation.length < 4}
          className="bg-success-500 hover:bg-success-600"
        >
          📊 Genera Report
        </Button>
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default ConversationStep;
