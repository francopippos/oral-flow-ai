
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, MessageCircle, TrendingUp, FileText, Brain, Mic, Play, Pause } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      id: 'upload',
      title: 'Upload Materiali',
      subtitle: 'Carica i tuoi PDF',
      icon: Upload,
      duration: 3000,
      content: (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-oralmind-200 rounded-lg p-8 text-center bg-oralmind-50">
            <Upload className="h-12 w-12 text-oralmind-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-oralmind-800">Trascina qui i tuoi PDF</p>
            <p className="text-sm text-oralmind-600 mt-2">o clicca per selezionare</p>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border animate-fade-in">
            <FileText className="h-6 w-6 text-success-600" />
            <div>
              <p className="font-medium">Storia_Antica.pdf</p>
              <p className="text-sm text-success-600">✓ Upload completato</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'analysis',
      title: 'AI Analysis',
      subtitle: 'L\'AI studia il contenuto',
      icon: Brain,
      duration: 4000,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-oralmind-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-white animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI sta studiando il tuo PDF...</h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-oralmind-500 to-success-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${progress * 25}%` }}></div>
            </div>
          </div>
          <div className="bg-oralmind-50 rounded-lg p-4">
            <p className="text-sm text-oralmind-700">
              📚 Analizzando struttura del documento...<br/>
              🧠 Identificando concetti chiave...<br/>
              🎯 Preparando domande personalizzate...
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'conversation',
      title: 'Conversazione',
      subtitle: 'Chat con l\'AI prof',
      icon: MessageCircle,
      duration: 6000,
      content: (
        <div className="space-y-4 max-h-80 overflow-y-auto">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-oralmind-500 to-success-500 rounded-full flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <div className="bg-oralmind-100 rounded-lg p-3 max-w-xs">
              <p className="text-sm">Ciao! Ho studiato il tuo PDF sulla Storia Antica. Iniziamo: parlami dell'Impero Romano, quando nasce e quali sono le sue caratteristiche principali?</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-success-100 rounded-lg p-3 max-w-xs">
              <div className="flex items-center space-x-2 mb-2">
                <Mic className="h-4 w-4 text-success-600" />
                <span className="text-xs text-success-600">Registrazione vocale</span>
              </div>
              <p className="text-sm">L'Impero Romano nasce nel 27 a.C. con Augusto ed è caratterizzato da un sistema di governo monarchico, espansione territoriale nel Mediterraneo e organizzazione militare avanzata...</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-oralmind-500 to-success-500 rounded-full flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div className="bg-oralmind-100 rounded-lg p-3 max-w-xs">
              <p className="text-sm">Ottimo inizio! La tua esposizione è chiara e precisa. Potresti approfondire il passaggio dalla Repubblica all'Impero? Cosa cambia concretamente?</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-success-100 rounded-lg p-3 max-w-xs">
              <p className="text-sm">Il passaggio avviene dopo le guerre civili. Augusto mantiene le istituzioni repubblicane ma concentra il potere reale nelle sue mani...</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'feedback',
      title: 'Feedback AI',
      subtitle: 'Analisi dettagliata',
      icon: TrendingUp,
      duration: 4000,
      content: (
        <div className="space-y-4">
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <h4 className="font-semibold text-success-800 mb-2">📊 Valutazione Complessiva: 8.5/10</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Chiarezza Espositiva</span>
                  <span className="text-success-600">9/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Correttezza Contenuti</span>
                  <span className="text-success-600">8/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Approfondimento</span>
                  <span className="text-orange-600">7/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Suggerimenti</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ottima conoscenza delle date e dei fatti principali</li>
              <li>• Potresti aggiungere più dettagli sulle conseguenze sociali</li>
              <li>• Prova a collegare gli eventi storici alle cause economiche</li>
            </ul>
          </div>

          <div className="bg-oralmind-50 rounded-lg p-4">
            <h4 className="font-semibold text-oralmind-800 mb-2">🚀 Prossimi passi</h4>
            <p className="text-sm text-oralmind-700">
              Continua così! Per il prossimo round, focus su: struttura sociale dell'Impero e sistema economico.
            </p>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            if (currentStep < steps.length - 1) {
              setCurrentStep(current => current + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return newProgress;
        });
      }, steps[currentStep].duration / 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setProgress(0);
      setIsPlaying(true);
    }
  }, [isOpen]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            🚀 Demo OralMind
          </DialogTitle>
        </DialogHeader>

        {/* Step Navigation */}
        <div className="flex items-center justify-between mb-6 space-x-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                index === currentStep
                  ? 'border-oralmind-500 bg-oralmind-50'
                  : index < currentStep
                  ? 'border-success-500 bg-success-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <step.icon className={`h-5 w-5 ${
                  index === currentStep
                    ? 'text-oralmind-600'
                    : index < currentStep
                    ? 'text-success-600'
                    : 'text-gray-400'
                }`} />
                <div className="text-left">
                  <div className={`text-sm font-medium ${
                    index === currentStep
                      ? 'text-oralmind-800'
                      : index < currentStep
                      ? 'text-success-800'
                      : 'text-gray-600'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.subtitle}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{steps[currentStep].title}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayPause}
              className="flex items-center space-x-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isPlaying ? 'Pausa' : 'Play'}</span>
            </Button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-oralmind-500 to-success-500 h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current Step Content */}
        <div className="min-h-[400px]">
          {steps[currentStep].content}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep(currentStep - 1);
                setProgress(0);
                setIsPlaying(true);
              }
            }}
            disabled={currentStep === 0}
          >
            Indietro
          </Button>
          
          <div className="flex space-x-3">
            {currentStep === steps.length - 1 ? (
              <Button 
                onClick={onClose}
                className="bg-gradient-to-r from-oralmind-500 to-success-500 text-white"
              >
                Inizia Gratis! 🚀
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (currentStep < steps.length - 1) {
                    setCurrentStep(currentStep + 1);
                    setProgress(0);
                    setIsPlaying(true);
                  }
                }}
                className="bg-gradient-to-r from-oralmind-500 to-success-500 text-white"
              >
                Avanti
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
