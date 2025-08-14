
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useOralFlowDemo } from '@/hooks/useOralMindDemo';
import { useAudioRecording } from '@/hooks/useAudioRecording';
import { extractTextFromPDF } from '@/utils/pdfUtils';
import { analyzeWithOralFlowAI, transcribeAudio } from '@/utils/aiUtils';
import FileUploadStep from './FileUploadStep';
import ConversationStep from './ConversationStep';
import ReportStep from './ReportStep';

interface FunctionalDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FunctionalDemoModal = ({ isOpen, onClose }: FunctionalDemoModalProps) => {
  const {
    step,
    setStep,
    uploadedFile,
    setUploadedFile,
    fileContent,
    setFileContent,
    isAnalyzing,
    setIsAnalyzing,
    conversation,
    setConversation,
    isProcessing,
    setIsProcessing,
    report,
    setReport,
    fileInputRef,
    audioRef,
    resetDemo
  } = useOralFlowDemo();

  const {
    recordedAudio,
    isRecording,
    startRecording,
    stopRecording,
    resetRecording
  } = useAudioRecording();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Formato non supportato. Carica solo file PDF.');
      return;
    }

    setUploadedFile(file);
    setIsAnalyzing(true);

    try {
      console.log('📄 Estrazione testo dal PDF...', file.name);
      const extractedText = await extractTextFromPDF(file);
      setFileContent(extractedText);
      
      setTimeout(async () => {
        const initialAnalysis = await analyzeWithOralFlowAI(
          `Analizza questo documento PDF per preparare un'interrogazione: "${extractedText}". Presenta brevemente il contenuto e invita lo studente a iniziare la sua esposizione registrando la sua voce.`,
          extractedText,
          []
        );
        
        setIsAnalyzing(false);
        setStep(1);
        setConversation([{
          role: 'ai',
          message: initialAnalysis
        }]);
      }, 2000);
    } catch (error) {
      console.error('Errore nell\'elaborazione del PDF:', error);
      setIsAnalyzing(false);
      alert('Errore nell\'elaborazione del PDF. Riprova con un altro file.');
    }
  };

  const handleStopRecording = async () => {
    stopRecording();
    
    // Wait for recorded audio to be set
    setTimeout(async () => {
      if (recordedAudio) {
        setIsProcessing(true);
        
        try {
          const transcription = await transcribeAudio(recordedAudio);
          
          setConversation(prev => [...prev, { role: 'user', message: transcription }]);
          
          const aiResponse = await analyzeWithOralFlowAI(transcription, fileContent, conversation);
          setConversation(prev => [...prev, { role: 'ai', message: aiResponse }]);
          
        } catch (error) {
          console.error('❌ Errore nella trascrizione:', error);
          alert('Errore nella trascrizione audio. Riprova.');
        } finally {
          setIsProcessing(false);
        }
      }
    }, 100);
  };

  const playRecording = () => {
    if (recordedAudio && audioRef.current) {
      const audioUrl = URL.createObjectURL(recordedAudio);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  };

  const generateOralFlowReport = async () => {
    setIsProcessing(true);
    
     console.log('📊 Generazione report OralFlow...');
     
     const conversationSummary = conversation
       .map(msg => `${msg.role === 'user' ? 'Studente' : 'Professor OralFlow'}: ${msg.message}`)
       .join('\n\n');
     
     const reportPrompt = `Genera un report di valutazione dettagliato basato su questa interrogazione orale condotta dal Professor OralFlow.

DOCUMENTO STUDIATO: "${uploadedFile?.name}"

CONVERSAZIONE:
${conversationSummary}

FORMATO DEL REPORT:
📋 REPORT DI VALUTAZIONE ORALFLOW
📚 Documento: [nome file]
📅 Data: [data odierna]

🎯 VALUTAZIONE GENERALE: [voto/10 con motivazione]

✅ PUNTI DI FORZA:
[Elenca 3-4 aspetti positivi dell'esposizione]

🔄 AREE DI MIGLIORAMENTO:
[Elenca 2-3 aspetti da migliorare con indicazioni specifiche]

💡 CONSIGLI PERSONALIZZATI:
[Suggerimenti specifici per migliorare lo studio e l'esposizione]

📈 PROSSIMI PASSI:
[Raccomandazioni concrete per il proseguimento dello studio]

🏆 COMMENTO FINALE:
[Commento motivazionale del Professor OralFlow]

---
Generato da OralFlow - Il tuo assistente AI per l'interrogazione orale`;

    const report = await analyzeWithOralFlowAI(reportPrompt, fileContent, conversation);
    setReport(report);
    setIsProcessing(false);
    setStep(2);
  };

  const downloadReport = () => {
     const reportContent = `${report}\n\n---\nGenerato da OralFlow\nData: ${new Date().toLocaleDateString('it-IT')}\nDocumento analizzato: ${uploadedFile?.name}`;
     
     const blob = new Blob([reportContent], { type: 'text/plain; charset=utf-8' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = `OralFlow_Report_${new Date().toLocaleDateString('it-IT').replace(/\//g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    resetDemo();
    resetRecording();
    onClose();
  };

  const handleReset = () => {
    resetDemo();
    resetRecording();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            🧠 OralFlow - Demo Funzionale
          </DialogTitle>
        </DialogHeader>

        {step === 0 && (
          <FileUploadStep
            uploadedFile={uploadedFile}
            isAnalyzing={isAnalyzing}
            onFileUpload={handleFileUpload}
            fileInputRef={fileInputRef}
          />
        )}

        {step === 1 && (
          <ConversationStep
            uploadedFile={uploadedFile}
            conversation={conversation}
            isRecording={isRecording}
            isProcessing={isProcessing}
            recordedAudio={recordedAudio}
            onStartRecording={startRecording}
            onStopRecording={handleStopRecording}
            onPlayRecording={playRecording}
            onReset={handleReset}
            onGenerateReport={generateOralFlowReport}
            audioRef={audioRef}
          />
        )}

        {step === 2 && (
          <ReportStep
            report={report}
            uploadedFile={uploadedFile}
            onReset={handleReset}
            onDownloadReport={downloadReport}
            onClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FunctionalDemoModal;
