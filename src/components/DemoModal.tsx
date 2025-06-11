
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, MessageCircle, Mic, MicOff, TrendingUp, FileText, Users, Smartphone, Cloud, User } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [professorMode, setProfessorMode] = useState('comprensivo');

  const professorModes = {
    severo: {
      name: t('demo.severe'),
      description: t('demo.severeDesc'),
      color: "text-red-700",
      bgColor: "bg-red-50",
      question: "Dimmi ESATTAMENTE quando inizia il Rinascimento e perché proprio in quel momento storico.",
      feedback: "La tua risposta è imprecisa. Il Rinascimento non ha una data di inizio univoca. Devi essere più specifico sui fattori scatenanti."
    },
    comprensivo: {
      name: t('demo.understanding'),
      description: t('demo.understandingDesc'),
      color: "text-green-700",
      bgColor: "bg-green-50",
      question: "Raccontami del Rinascimento, prenditi il tempo che ti serve per organizzare i pensieri.",
      feedback: "Molto bene! Hai colto i punti principali. Potresti approfondire il ruolo dell'umanesimo?"
    },
    tecnico: {
      name: t('demo.technical'),
      description: t('demo.technicalDesc'),
      color: "text-blue-700", 
      bgColor: "bg-blue-50",
      question: "Analizza la correlazione tra il fenomeno dell'umanesimo quattrocentesco e le trasformazioni socio-economiche dell'epoca.",
      feedback: "Interessante approccio metodologico. Considera anche l'impatto delle innovazioni tecniche sulla diffusione culturale."
    }
  };

  const demoSteps = [
    {
      title: t('demo.uploadMaterials'),
      subtitle: t('demo.uploadSubtitle'),
      content: (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-oralmind-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-oralmind-500 mx-auto mb-4" />
            <p className="text-oralmind-700">Trascina qui i tuoi PDF o clicca per caricare</p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Cloud className="h-4 w-4" />
                <span>Google Drive</span>
              </div>
              <div className="flex items-center space-x-1">
                <Cloud className="h-4 w-4" />
                <span>Classroom</span>
              </div>
            </div>
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
      title: t('demo.aiConfiguration'),
      subtitle: t('demo.aiSubtitle'),
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="font-semibold mb-4">{t('demo.professorModes')}</h4>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(professorModes).map(([key, mode]) => (
                <button
                  key={key}
                  onClick={() => setProfessorMode(key)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    professorMode === key 
                      ? `${mode.bgColor} border-current ${mode.color}` 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">{mode.name}</div>
                      <div className="text-sm text-muted-foreground">{mode.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-oralmind-50 rounded-lg p-4 space-y-2">
            <h5 className="font-medium text-oralmind-800">Funzionalità Extra:</h5>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-oralmind-600" />
                <span>App Mobile</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-oralmind-600" />
                <span>Modalità Gruppo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cloud className="h-4 w-4 text-oralmind-600" />
                <span>Sync Cloud</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-oralmind-600" />
                <span>Analytics</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: t('demo.simulation'),
      subtitle: `Conversazione con ${professorModes[professorMode as keyof typeof professorModes].name}`,
      content: (
        <div className="space-y-4">
          <div className="space-y-3 max-h-64 overflow-y-auto">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${professorModes[professorMode as keyof typeof professorModes].bgColor}`}>
                <User className={`h-4 w-4 ${professorModes[professorMode as keyof typeof professorModes].color}`} />
              </div>
              <div className={`${professorModes[professorMode as keyof typeof professorModes].bgColor} rounded-lg p-3 max-w-xs`}>
                <p className={`text-sm ${professorModes[professorMode as keyof typeof professorModes].color}`}>
                  "{professorModes[professorMode as keyof typeof professorModes].question}"
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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${professorModes[professorMode as keyof typeof professorModes].bgColor}`}>
                  <TrendingUp className={`h-4 w-4 ${professorModes[professorMode as keyof typeof professorModes].color}`} />
                </div>
                <div className={`${professorModes[professorMode as keyof typeof professorModes].bgColor} rounded-lg p-3 max-w-xs`}>
                  <p className={`text-sm ${professorModes[professorMode as keyof typeof professorModes].color}`}>
                    "{professorModes[professorMode as keyof typeof professorModes].feedback}"
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
      title: t('demo.feedback'),
      subtitle: `Analisi dettagliata da ${professorModes[professorMode as keyof typeof professorModes].name}`,
      content: (
        <div className="space-y-4">
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <h4 className="font-semibold text-success-800 mb-2">✨ Valutazione</h4>
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
            <h4 className="font-semibold text-orange-800 mb-2">💡 Modalità Gruppo Disponibile</h4>
            <p className="text-sm text-orange-700 mb-2">Esercitati con i compagni:</p>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Interrogazioni a turno con peer review</li>
              <li>• Dibattiti guidati dall'AI</li>
              <li>• Competizioni amichevoli tra studenti</li>
            </ul>
          </div>
          
          <div className="bg-oralmind-50 border border-oralmind-200 rounded-lg p-4">
            <h4 className="font-semibold text-oralmind-800 mb-2">📱 Continua su Mobile</h4>
            <p className="text-sm text-oralmind-700">
              Scarica l'app per esercitarti ovunque con sessioni audio-only perfette per i tuoi spostamenti.
            </p>
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
    setProfessorMode('comprensivo');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            {t('demo.title')}
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
              {t('demo.prev')}
            </Button>
            
            <div className="space-x-2">
              {step < demoSteps.length - 1 ? (
                <Button onClick={handleNext}>
                  {t('demo.next')}
                </Button>
              ) : (
                <Button onClick={handleClose} className="bg-oralmind-500 hover:bg-oralmind-600">
                  {t('demo.start')}
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
