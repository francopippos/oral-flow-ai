
import { Upload, BookOpen, Mic, MessageCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = [
    {
      icon: Upload,
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BookOpen,
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc'),
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Mic,
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
      color: "from-green-500 to-green-600"
    },
    {
      icon: MessageCircle,
      title: t('howItWorks.step4Title'),
      description: t('howItWorks.step4Desc'),
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 gradient-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`grid lg:grid-cols-2 gap-8 items-center animate-fade-in ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} p-4 mb-6`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Visual */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="relative">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-oralflow-100">
                      <div className="space-y-4">
                        {/* Dynamic content based on step */}
                        {index === 0 && (
                          <div className="space-y-3">
                             <div className="flex items-center space-x-3 p-3 bg-oralflow-50 rounded-lg">
                               <div className="w-10 h-10 bg-oralflow-100 rounded-lg flex items-center justify-center">
                                📄
                              </div>
                              <div>
                                <div className="font-medium">Diritto_Privato.pdf</div>
                                <div className="text-sm text-muted-foreground">2.3 MB</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
                              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                                📊
                              </div>
                              <div>
                                <div className="font-medium">Slides_Fisica.pptx</div>
                                <div className="text-sm text-muted-foreground">5.1 MB</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {index === 1 && (
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                📖
                              </div>
                              <div>
                                <div className="font-medium">AI Analysis</div>
                                <div className="text-sm text-muted-foreground">Processing content...</div>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full w-2/3 animate-pulse"></div>
                            </div>
                          </div>
                        )}

                        {index === 2 && (
                          <div className="space-y-4">
                             <div className="flex items-center space-x-3">
                               <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-spin">
                                 <Mic className="h-4 w-4 text-white m-2" />
                               </div>
                               <div className="text-sm">{t('howItWorks.analyzing')}</div>
                             </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-3/4 animate-pulse"></div>
                            </div>
                          </div>
                        )}

                        {index === 3 && (
                          <div className="space-y-3">
                            <div className="bg-success-50 rounded-lg p-3">
                              <div className="text-sm font-medium text-success-800">🎤 "{t('howItWorks.question')}"</div>
                            </div>
                             <div className="bg-oralflow-50 rounded-lg p-3">
                               <div className="text-sm text-oralflow-800">⚡ {t('howItWorks.responding')}</div>
                            </div>
                          </div>
                        )}

                        {index === 4 && (
                          <div className="space-y-3">
                            <div className="bg-success-100 rounded-lg p-3">
                              <div className="text-sm font-medium text-success-800">✨ {t('howItWorks.excellent')}</div>
                              <div className="text-xs text-success-600 mt-1">{t('howItWorks.clarity')}</div>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-3">
                              <div className="text-sm text-orange-800">💡 {t('howItWorks.suggestion')}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-oralflow-200 rounded-full animate-bounce-gentle"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-success-200 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
