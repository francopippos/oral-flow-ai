import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, MessageCircle, Mic, MicOff, TrendingUp, FileText, Users, Smartphone, Cloud, User, Play, Pause } from 'lucide-react';
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [aiTypingStep, setAiTypingStep] = useState(0);
  const [userTypingStep, setUserTypingStep] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1 = normale, 0.5 = lento, 2 = veloce

  const professorModes = {
    severo: {
      name: t('demoModal.professorSevere'),
      description: t('demoModal.professorSevereDesc'),
      color: "text-red-700",
      bgColor: "bg-red-50",
      invitation: t('demoModal.professorSevereInvitation'),
      feedback: t('demoModal.professorSevereFeedback')
    },
    comprensivo: {
      name: t('demoModal.professorUnderstanding'), 
      description: t('demoModal.professorUnderstandingDesc'),
      color: "text-green-700",
      bgColor: "bg-green-50",
      invitation: t('demoModal.professorUnderstandingInvitation'),
      feedback: t('demoModal.professorUnderstandingFeedback')
    },
    tecnico: {
      name: t('demoModal.professorTechnical'),
      description: t('demoModal.professorTechnicalDesc'), 
      color: "text-blue-700", 
      bgColor: "bg-blue-50",
      invitation: t('demoModal.professorTechnicalInvitation'),
      feedback: t('demoModal.professorTechnicalFeedback')
    }
  };

  const demoSteps = [
    {
      title: t('demoModal.step1Title'),
      subtitle: t('demoModal.step1Subtitle'),
      content: (
        <div className="space-y-4">
           <div className="border-2 border-dashed border-oralflow-300 rounded-lg p-8 text-center">
             <Upload className="h-12 w-12 text-oralflow-500 mx-auto mb-4" />
             <p className="text-oralflow-700">{t('demoModal.dragDrop')}</p>
             <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-muted-foreground">
               <div className="flex items-center space-x-1">
                 <Cloud className="h-4 w-4" />
                 <span>{t('demoModal.googleDrive')}</span>
               </div>
               <div className="flex items-center space-x-1">
                 <Cloud className="h-4 w-4" />
                 <span>{t('demoModal.classroom')}</span>
               </div>
             </div>
          </div>
          {uploadProgress > 0 && (
            <div className="space-y-2">
               <div className="flex items-center space-x-3 p-3 bg-oralflow-50 rounded-lg">
                 <FileText className="h-6 w-6 text-oralflow-600" />
                <div className="flex-1">
                  <div className="font-medium">{t('demoModal.documentName')}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-oralflow-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              {uploadProgress === 100 && (
                <div className="text-center p-4 bg-success-50 rounded-lg">
                  <p className="text-success-700 font-medium">{t('demoModal.fileAnalyzed')}</p>
                  <p className="text-sm text-success-600 mt-1">{t('demoModal.conceptsIdentified')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )
    },
    {
      title: t('demoModal.step2Title'),
      subtitle: t('demoModal.step2Subtitle'),
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="font-semibold mb-4">{t('demoModal.professorModes')}</h4>
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
            <h5 className="font-medium text-oralmind-800">{t('demoModal.advancedPersonalization')}</h5>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-oralmind-600" />
                <span>{t('demoModal.levelAdaptation')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-oralmind-600" />
                <span>{t('demoModal.progressiveQuestions')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-oralmind-600" />
                <span>{t('demoModal.personalizedFeedback')}</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: t('demoModal.step3Title'),
      subtitle: `${t('demoModal.step3Subtitle')} ${professorModes[professorMode as keyof typeof professorModes].name}`,
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-medium text-oralmind-800">{t('demoModal.conversationSimulation')}</h5>
            <div className="flex items-center space-x-2">
              <select 
                value={playbackSpeed} 
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="text-xs px-2 py-1 border rounded-md bg-white"
              >
                <option value={0.5}>0.5x (Lento)</option>
                <option value={1}>1x (Normale)</option>
                <option value={1.5}>1.5x (Veloce)</option>
              </select>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex items-center space-x-2"
              >
                {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isAutoPlaying ? t('demoModal.pause') : t('demoModal.play')}</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 max-h-80 overflow-y-auto border rounded-lg p-4 bg-gray-50">
            {/* Prima domanda dell'AI */}
            <div className="flex items-start space-x-3 animate-fade-in">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${professorModes[professorMode as keyof typeof professorModes].bgColor}`}>
                <User className={`h-4 w-4 ${professorModes[professorMode as keyof typeof professorModes].color}`} />
              </div>
               <div className={`${professorModes[professorMode as keyof typeof professorModes].bgColor} rounded-lg p-3 max-w-sm`}>
                 <p className={`text-sm ${professorModes[professorMode as keyof typeof professorModes].color}`}>
                   "{professorModes[professorMode as keyof typeof professorModes].invitation}"
                 </p>
                {aiTypingStep >= 1 && (
                  <div className="mt-2 text-xs text-gray-600">
                    {t('demoModal.aiPrepared')}
                  </div>
                )}
              </div>
            </div>
            
            {/* Risposta dello studente */}
            {step >= 2 && userTypingStep >= 1 && (
              <div className="flex justify-end animate-fade-in">
                 <div className="bg-success-50 rounded-lg p-3 max-w-sm">
                   <p className="text-sm text-success-800">
                     "{t('demoModal.studentResponse')}"
                   </p>
                  <div className="mt-2 flex items-center space-x-2 text-xs text-success-600">
                    <Mic className="h-3 w-3" />
                    <span>{t('demoModal.voiceTranscription')}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Feedback dettagliato dell'AI */}
            {step >= 2 && aiTypingStep >= 2 && (
              <div className="flex items-start space-x-3 animate-fade-in">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${professorModes[professorMode as keyof typeof professorModes].bgColor}`}>
                  <TrendingUp className={`h-4 w-4 ${professorModes[professorMode as keyof typeof professorModes].color}`} />
                </div>
                <div className={`${professorModes[professorMode as keyof typeof professorModes].bgColor} rounded-lg p-3 max-w-sm`}>
                  <p className={`text-sm ${professorModes[professorMode as keyof typeof professorModes].color}`}>
                    "{professorModes[professorMode as keyof typeof professorModes].feedback}"
                  </p>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{t('demoModal.clarity').replace(':', '')}</span>
                      <span className="font-semibold">9/10</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>{t('demoModal.precision').replace(':', '')}</span>
                      <span className="font-semibold">8/10</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>{t('demoModal.completeness').replace(':', '')}</span>
                      <span className="font-semibold">7/10</span>
                    </div>
                  </div>
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
            <div className="flex-1">
              <span className="text-sm text-muted-foreground">
                {isRecording ? t('demoModal.recording') : t('demoModal.clickToRespond')}
              </span>
              {!isRecording && (
                <div className="text-xs text-gray-500 mt-1">
                  {t('demoModal.supports30Languages')}
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      title: t('demoModal.step4Title'),
      subtitle: `${t('demoModal.step4Subtitle')} ${professorModes[professorMode as keyof typeof professorModes].name}`,
      content: (
        <div className="space-y-4">
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <h4 className="font-semibold text-success-800 mb-3 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              📊 {t('demoModal.evaluationTitle')}
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-success-700">{t('demoModal.clarity')}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-success-200 rounded-full h-2">
                    <div className="bg-success-600 h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                  <span className="text-sm font-bold text-success-800">9/10</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-success-700">{t('demoModal.precision')}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-success-200 rounded-full h-2">
                    <div className="bg-success-600 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                  <span className="text-sm font-bold text-success-800">8/10</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-success-700">{t('demoModal.completeness')}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-success-200 rounded-full h-2">
                    <div className="bg-success-600 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <span className="text-sm font-bold text-success-800">7/10</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-success-700">{t('demoModal.fluency')}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-success-200 rounded-full h-2">
                    <div className="bg-success-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-sm font-bold text-success-800">8.5/10</span>
                </div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-success-100 rounded-lg">
              <p className="text-sm text-success-800 font-medium">{t('demoModal.personalizedSuggestions')}</p>
              <ul className="text-sm text-success-700 mt-1 space-y-1">
                <li>{t('demoModal.excellentExamples')}</li>
                <li>{t('demoModal.betterConnections')}</li>
                <li>{t('demoModal.deepenEconomic')}</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              {t('demoModal.advancedFeatures')}
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2 text-orange-700">
                <Users className="h-4 w-4" />
                <span>{t('demoModal.groupExams')}</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-700">
                <MessageCircle className="h-4 w-4" />
                <span>{t('demoModal.aiDebates')}</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-700">
                <TrendingUp className="h-4 w-4" />
                <span>{t('demoModal.progressTracking')}</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-700">
                <FileText className="h-4 w-4" />
                <span>{t('demoModal.exportableReports')}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-oralmind-50 border border-oralmind-200 rounded-lg p-4">
            <h4 className="font-semibold text-oralmind-800 mb-2 flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              {t('demoModal.multiPlatform')}
            </h4>
            <p className="text-sm text-oralmind-700 mb-2">
              {t('demoModal.studyAnywhere')}
            </p>
            <div className="flex items-center space-x-4 text-xs text-oralmind-600">
              <span>{t('demoModal.webApp')}</span>
              <span>{t('demoModal.mobileApps')}</span>
              <span>{t('demoModal.cloudSync')}</span>
              <span>{t('demoModal.autoBackup')}</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Gestione automatica dei passaggi nella demo
  useEffect(() => {
    if (!isOpen || !isAutoPlaying) return;

    const speedMultiplier = 1 / playbackSpeed; // Inverse per rallentare quando speed < 1

    if (step === 0) {
      // Simulazione caricamento file - più lenta
      const uploadTimer = setTimeout(() => {
        setUploadProgress(30);
        setTimeout(() => setUploadProgress(65), 1200 * speedMultiplier);
        setTimeout(() => setUploadProgress(100), 2400 * speedMultiplier);
        setTimeout(() => setStep(1), 4000 * speedMultiplier);
      }, 1500 * speedMultiplier);
      return () => clearTimeout(uploadTimer);
    }

    if (step === 1) {
      // Configurazione AI - molto più tempo per leggere
      const configTimer = setTimeout(() => setStep(2), 6000 * speedMultiplier);
      return () => clearTimeout(configTimer);
    }

    if (step === 2) {
      // Simulazione conversazione graduale - molto più lenta
      const conversationTimer1 = setTimeout(() => setAiTypingStep(1), 2000 * speedMultiplier);
      const conversationTimer2 = setTimeout(() => setUserTypingStep(1), 6000 * speedMultiplier);
      const conversationTimer3 = setTimeout(() => setAiTypingStep(2), 10000 * speedMultiplier);
      const conversationTimer4 = setTimeout(() => setStep(3), 15000 * speedMultiplier);
      
      return () => {
        clearTimeout(conversationTimer1);
        clearTimeout(conversationTimer2);
        clearTimeout(conversationTimer3);
        clearTimeout(conversationTimer4);
      };
    }
  }, [isOpen, step, isAutoPlaying, playbackSpeed]);

  const handleNext = () => {
    if (step < demoSteps.length - 1) {
      setStep(step + 1);
      if (step === 1) {
        setAiTypingStep(0);
        setUserTypingStep(0);
      }
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      if (step === 2) {
        setAiTypingStep(0);
        setUserTypingStep(0);
      }
    }
  };

  const handleClose = () => {
    setStep(0);
    setUploadProgress(0);
    setIsRecording(false);
    setProfessorMode('comprensivo');
    setIsAutoPlaying(true);
    setAiTypingStep(0);
    setUserTypingStep(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            Demo Completa - Esperienza AI Avanzata
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Progress indicator migliorato */}
          <div className="flex items-center space-x-2">
            {demoSteps.map((stepItem, index) => (
              <div key={index} className="flex items-center flex-1">
                <div
                  className={`h-3 w-3 rounded-full ${
                    index <= step ? 'bg-oralmind-500' : 'bg-gray-200'
                  } transition-colors duration-300`}
                />
                {index < demoSteps.length - 1 && (
                  <div className={`h-0.5 flex-1 ${
                    index < step ? 'bg-oralmind-500' : 'bg-gray-200'
                  } transition-colors duration-300`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Step counter */}
          <div className="text-center text-sm text-muted-foreground">
            Passaggio {step + 1} di {demoSteps.length}
          </div>
          
          {/* Current step */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">{demoSteps[step].title}</h3>
              <p className="text-muted-foreground">{demoSteps[step].subtitle}</p>
            </div>
            
            <div className="min-h-[400px]">
              {demoSteps[step].content}
            </div>
          </div>
          
          {/* Navigation migliorata */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={step === 0}
              className="flex items-center space-x-2"
            >
              <span>← Precedente</span>
            </Button>
            
            <div className="text-center">
              {step === 2 && (
                <div className="text-sm text-muted-foreground">
                  {isAutoPlaying ? "Demo automatica attiva" : "Demo in pausa"}
                </div>
              )}
            </div>
            
            <div className="space-x-2">
              {step < demoSteps.length - 1 ? (
                <Button onClick={handleNext} className="flex items-center space-x-2">
                  <span>Successivo →</span>
                </Button>
              ) : (
                <Button onClick={handleClose} className="bg-oralmind-500 hover:bg-oralmind-600 flex items-center space-x-2">
                  <span>Inizia Ora</span>
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
