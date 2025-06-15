
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, Mic, MicOff, FileText, Brain, User, BookOpen } from 'lucide-react';
import { extractTextFromPDF } from '@/utils/pdfUtils';
import { createTextChunks } from '@/utils/chunkingUtils';
import { createEmbeddings, findRelevantChunks } from '@/utils/embeddingUtils';
import { transcribeAudio } from '@/utils/aiUtils';
import { generateProfessorResponse } from '@/utils/professorUtils';

interface Chunk {
  text: string;
  embedding: number[];
  index: number;
}

interface UniversityProfessorDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const UniversityProfessorDemo = ({ isOpen, onClose }: UniversityProfessorDemoProps) => {
  const [step, setStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [conversation, setConversation] = useState<Array<{role: 'professor' | 'student', message: string, sources?: Chunk[]}>>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Carica solo file PDF');
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);

    try {
      console.log('📄 Estrazione testo dal PDF...');
      const extractedText = await extractTextFromPDF(file);
      
      console.log('🧩 Creazione chunk semantici...');
      const textChunks = await createTextChunks(extractedText);
      
      console.log('🔮 Creazione embeddings...');
      const chunksWithEmbeddings = await createEmbeddings(textChunks);
      
      setChunks(chunksWithEmbeddings);
      setStep(1);
      
      // Messaggio di benvenuto del professore
      setConversation([{
        role: 'professor',
        message: `Perfetto! Ho analizzato il documento "${file.name}" e l'ho suddiviso in ${textChunks.length} sezioni tematiche. Sono pronto per l'interrogazione. Puoi iniziare registrando la tua voce per esporre un argomento o fare una domanda sul contenuto del documento.`,
      }]);
      
    } catch (error) {
      console.error('❌ Errore nell\'elaborazione:', error);
      alert('Errore nell\'elaborazione del PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        await processStudentAudio(audioBlob);
        setAudioChunks([]);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('❌ Errore nell\'avvio della registrazione:', error);
      alert('Errore nell\'accesso al microfono');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const processStudentAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    
    try {
      console.log('🎯 Trascrizione audio studente...');
      const studentText = await transcribeAudio(audioBlob);
      
      // Aggiungi il messaggio dello studente
      setConversation(prev => [...prev, {
        role: 'student',
        message: studentText
      }]);
      
      console.log('🔍 Ricerca chunk rilevanti...');
      const relevantChunks = await findRelevantChunks(studentText, chunks);
      
      console.log('👨‍🏫 Generazione risposta del professore...');
      const professorResponse = await generateProfessorResponse(
        studentText, 
        relevantChunks, 
        uploadedFile?.name || 'documento'
      );
      
      // Aggiungi la risposta del professore
      setConversation(prev => [...prev, {
        role: 'professor',
        message: professorResponse,
        sources: relevantChunks
      }]);
      
    } catch (error) {
      console.error('❌ Errore nell\'elaborazione audio:', error);
      alert('Errore nell\'elaborazione della registrazione');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStep(0);
    setUploadedFile(null);
    setChunks([]);
    setConversation([]);
    setIsProcessing(false);
    setIsRecording(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text flex items-center">
            <Brain className="h-6 w-6 mr-2" />
            🎓 Professore Universitario Virtuale
          </DialogTitle>
        </DialogHeader>

        {step === 0 && (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-oralmind-50 rounded-lg p-6">
                <BookOpen className="h-12 w-12 text-oralmind-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Carica il tuo Documento Accademico</h3>
                <p className="text-muted-foreground mb-4">
                  Il Professore AI analizzerà il documento e sarà pronto per l'interrogazione
                </p>
              </div>
              
              <div className="border-2 border-dashed border-oralmind-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-oralmind-500 mx-auto mb-4" />
                <p className="text-oralmind-700 mb-4">Trascina qui il tuo PDF o clicca per caricare</p>
                <Button onClick={() => fileInputRef.current?.click()} disabled={isProcessing}>
                  {isProcessing ? 'Elaborazione in corso...' : 'Seleziona PDF'}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              
              {isProcessing && (
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-oralmind-600">
                    <Brain className="h-5 w-5 animate-pulse" />
                    <span>Il Professore AI sta analizzando il documento...</span>
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    • Estrazione del testo<br/>
                    • Creazione chunk semantici<br/>
                    • Generazione embeddings vettoriali
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-success-600" />
                <div>
                  <h4 className="font-semibold text-success-800">Documento Analizzato</h4>
                  <p className="text-sm text-success-700">{uploadedFile?.name}</p>
                  <p className="text-xs text-success-600">{chunks.length} sezioni tematiche identificate</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
              {conversation.map((msg, index) => (
                <div key={index} className={`flex items-start space-x-3 ${msg.role === 'student' ? 'justify-end' : ''}`}>
                  {msg.role === 'professor' && (
                    <div className="w-8 h-8 bg-oralmind-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-oralmind-600" />
                    </div>
                  )}
                  
                  <div className={`rounded-lg p-3 max-w-sm ${
                    msg.role === 'professor' 
                      ? 'bg-oralmind-50 text-oralmind-800' 
                      : 'bg-success-50 text-success-800'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-oralmind-200">
                        <p className="text-xs text-oralmind-600 font-medium">
                          📚 Fonti consultate: {msg.sources.length} sezioni del documento
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {msg.role === 'student' && (
                    <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                      <Mic className="h-4 w-4 text-success-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex items-center justify-center space-x-2 text-oralmind-600">
                  <Brain className="h-5 w-5 animate-pulse" />
                  <span>Il Professore sta elaborando la risposta...</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Button
                variant={isRecording ? "destructive" : "default"}
                size="icon"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                className={isRecording ? "animate-pulse" : ""}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              
              <div className="flex-1">
                <span className="text-sm text-muted-foreground">
                  {isRecording 
                    ? "🔴 Registrazione in corso... Esponi l'argomento o fai una domanda" 
                    : "🎤 Clicca per iniziare l'interrogazione vocale"
                  }
                </span>
                {!isRecording && (
                  <div className="text-xs text-gray-500 mt-1">
                    Il Professore AI analizzerà la tua esposizione e risponderà basandosi sul documento
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UniversityProfessorDemo;
