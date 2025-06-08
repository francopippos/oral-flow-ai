
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, MessageCircle, Mic, MicOff, TrendingUp, FileText } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [step, setStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const demoSteps = [
    {
      title: "Caricamento Materiali",
      subtitle: "Carica i tuoi documenti di studio",
      content: (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-oralmind-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-oralmind-500 mx-auto mb-4" />
            <p className="text-oralmind-700">Trascina qui i tuoi PDF o clicca per caricare</p>
          </div>
          {uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 bg-oralmind-50 rounded-lg">
                <FileText className="h-6 w-6 text-oralmind-600" />
                <div className="flex-1">
                  <div className="font-medium">Storia_Rinascimento.pdf</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-oralmind-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Analisi AI",
      subtitle: "L'intelligenza artificiale analizza i tuoi materiali",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-oralmind-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <p className="text-oralmind-700">Elaborazione dei contenuti in corso...</p>
          </div>
          <div className="bg-oralmind-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm">Identificazione argomenti principali</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm">Creazione mappa concettuale</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-oralmind-300 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Preparazione domande...</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Interrogazione Simulata",
      subtitle: "Inizia la conversazione con l'AI",
      content: (
        <div className="space-y-4">
          <div className="space-y-3 max-h-64 overflow-y-auto">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-oralmind-500 to-success-500 rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div className="bg-oralmind-50 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-oralmind-800">
                  "Ciao! Sono pronto per la tua interrogazione sul Rinascimento. Iniziamo con una domanda generale: quali sono le caratteristiche principali di questo periodo storico?"
                </p>
              </div>
            </div>
            
            {step >= 2 && (
              <div className="flex justify-end">
                <div className="bg-success-50 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-success-800">
                    "Il Rinascimento è caratterizzato da una rinascita culturale e artistica che inizia in Italia nel XIV secolo..."
                  </p>
                </div>
              </div>
            )}
            
            {step >= 2 && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-oralmind-500 to-success-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div className="bg-oralmind-50 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-oralmind-800">
                    "Ottima risposta! Hai menzionato i punti chiave. Ora approfondisci: che ruolo ha avuto l'umanesimo in questo contesto?"
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Button
              variant={isRecording ? "destructive" : "default"}
              size="icon"
              onClick={() => setIsRecording(!isRecording)}
              className={isRecording ? "animate-pulse" : ""}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <span className="text-sm text-muted-foreground">
              {isRecording ? "Registrazione in corso..." : "Clicca per rispondere"}
            </span>
          </div>
        </div>
      )
    },
    {
      title: "Feedback Personalizzato",
      subtitle: "Ricevi analisi dettagliata della tua performance",
      content: (
        <div className="space-y-4">
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <h4 className="font-semibold text-success-800 mb-2">✨ Ottimo lavoro!</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-success-700">Chiarezza espositiva:</span>
                <span className="text-sm font-medium text-success-800">9/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-success-700">Correttezza terminologica:</span>
                <span className="text-sm font-medium text-success-800">8/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-success-700">Completezza:</span>
                <span className="text-sm font-medium text-success-800">7/10</span>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-2">💡 Suggerimenti per migliorare</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Cerca di collegare meglio l'umanesimo alla produzione artistica</li>
              <li>• Approfondisci il ruolo delle città-stato italiane</li>
              <li>• Menziona figure chiave come Lorenzo de' Medici</li>
            </ul>
          </div>
          
          <div className="bg-oralmind-50 border border-oralmind-200 rounded-lg p-4">
            <h4 className="font-semibold text-oralmind-800 mb-2">📚 Materiali consigliati per approfondire</h4>
            <ul className="text-sm text-oralmind-700 space-y-1">
              <li>• Capitolo 3: "L'umanesimo civile" (pagina 45)</li>
              <li>• Slide 12-15: "Arte e mecenati"</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (isOpen && step === 0) {
      const timer = setTimeout(() => {
        setUploadProgress(100);
        setTimeout(() => setStep(1), 500);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, step]);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNext = () => {
    if (step < demoSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    setStep(0);
    setUploadProgress(0);
    setIsRecording(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            Demo OralMind
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center space-x-2">
            {demoSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index <= step ? 'bg-oralmind-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          
          {/* Current step */}
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">{demoSteps[step].title}</h3>
              <p className="text-muted-foreground">{demoSteps[step].subtitle}</p>
            </div>
            
            <div className="min-h-[300px]">
              {demoSteps[step].content}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={step === 0}
            >
              Indietro
            </Button>
            
            <div className="space-x-2">
              {step < demoSteps.length - 1 ? (
                <Button onClick={handleNext}>
                  Avanti
                </Button>
              ) : (
                <Button onClick={handleClose} className="bg-oralmind-500 hover:bg-oralmind-600">
                  Inizia Gratis
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
