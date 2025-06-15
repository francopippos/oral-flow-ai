
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRAGDemo } from '@/hooks/useRAGDemo';
import { processDocument } from '@/utils/ragUtils';
import { generateProfessorResponse } from '@/utils/aiUtils';
import { Upload, Send, FileText, Brain, Search, Zap, Loader2 } from 'lucide-react';

interface RAGDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RAGDemoModal = ({ isOpen, onClose }: RAGDemoModalProps) => {
  const {
    step,
    setStep,
    uploadedFile,
    setUploadedFile,
    isProcessing,
    setIsProcessing,
    chunks,
    setChunks,
    conversation,
    setConversation,
    currentQuestion,
    setCurrentQuestion,
    isGeneratingResponse,
    setIsGeneratingResponse,
    fileInputRef,
    resetDemo
  } = useRAGDemo();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Carica solo file PDF');
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);

    try {
      const processedChunks = await processDocument(file);
      setChunks(processedChunks);
      setStep(1);
    } catch (error) {
      console.error('Errore processing:', error);
      alert('Errore nel processing del documento');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuestionSubmit = async () => {
    if (!currentQuestion.trim() || isGeneratingResponse) return;

    const question = currentQuestion.trim();
    setCurrentQuestion('');
    setIsGeneratingResponse(true);

    // Aggiungi domanda dello studente
    setConversation(prev => [...prev, {
      role: 'student',
      message: question,
      timestamp: new Date()
    }]);

    try {
      const { response, sources } = await generateProfessorResponse(
        question, 
        chunks, 
        conversation.map(msg => ({ role: msg.role, message: msg.message }))
      );

      // Aggiungi risposta del professore
      setConversation(prev => [...prev, {
        role: 'professor',
        message: response,
        sources,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Errore risposta:', error);
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleClose = () => {
    resetDemo();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            🎓 Professore Universitario Virtuale - RAG Demo
          </DialogTitle>
        </DialogHeader>

        {step === 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Carica il tuo documento accademico</h3>
              <p className="text-muted-foreground mb-6">
                Il professore analizzerà il documento e sarà pronto a rispondere a qualsiasi domanda
              </p>
            </div>

            <div 
              className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors bg-gradient-to-br from-blue-50 to-indigo-50"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <p className="text-blue-700 font-medium">Clicca per caricare PDF</p>
              <p className="text-sm text-muted-foreground mt-2">Solo documenti PDF</p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {uploadedFile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium text-blue-800">📄 {uploadedFile.name}</div>
                    {isProcessing ? (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Processing in corso...</span>
                      </div>
                    ) : (
                      <div className="text-sm text-blue-600">✅ Documento processato</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">🧠 Processing RAG in corso...</h4>
                <div className="space-y-2 text-sm text-yellow-700">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Estrazione testo dal PDF</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>Chunking semantico del contenuto</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4" />
                    <span>Creazione embeddings con text-embedding-3-large</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Setup vector store per ricerca semantica</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                🎓 Professore pronto! Documento analizzato: {uploadedFile?.name}
              </h3>
              <p className="text-green-700 text-sm">
                {chunks.length} chunk creati • Vector store attivo • Pronto per domande accademiche
              </p>
            </div>

            <div className="border rounded-lg p-4 h-96 overflow-y-auto space-y-4 bg-gray-50">
              {conversation.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'student' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-lg px-4 py-3 rounded-lg ${
                    msg.role === 'student' 
                      ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                  }`}>
                    <div className="text-xs text-gray-500 mb-1">
                      {msg.role === 'student' ? '👨‍🎓 Studente' : '🎓 Professore'}
                    </div>
                    <div className="text-sm">{msg.message}</div>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <div className="text-xs text-gray-500">
                          📚 Fonti: {msg.sources.length} chunk utilizzati
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isGeneratingResponse && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-700">Il professore sta elaborando...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Input
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="Fai una domanda accademica sul documento..."
                onKeyPress={(e) => e.key === 'Enter' && handleQuestionSubmit()}
                disabled={isGeneratingResponse}
                className="flex-1"
              />
              <Button 
                onClick={handleQuestionSubmit}
                disabled={!currentQuestion.trim() || isGeneratingResponse}
                className="px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => { resetDemo(); }}>
                Nuovo Documento
              </Button>
              <Button onClick={handleClose} className="bg-blue-500 hover:bg-blue-600">
                Chiudi Demo
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RAGDemoModal;
