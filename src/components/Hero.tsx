
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Upload, MessageCircle, TrendingUp } from 'lucide-react';
import DemoModal from './DemoModal';

const Hero = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <section className="pt-24 pb-16 gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 animate-slide-in-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-oralmind-100 text-oralmind-700 rounded-full text-sm font-medium">
                    🚀 Game changer per i tuoi esami
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    AI che ti prepara alle{' '}
                    <span className="gradient-text">interrogazioni</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Carica i tuoi PDF, chatta con l'AI e migliora subito la tua esposizione orale. 
                    Niente stress, solo risultati migliori.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-oralmind-500 to-success-500 hover:from-oralmind-600 hover:to-success-600 text-white shadow-xl group"
                  >
                    Prova Subito Gratis
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-oralmind-200 text-oralmind-700 hover:bg-oralmind-50 group"
                    onClick={() => setIsDemoOpen(true)}
                  >
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Vedi Demo
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-oralmind-600">98%</div>
                    <div className="text-sm text-muted-foreground">Love it</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success-600">+40%</div>
                    <div className="text-sm text-muted-foreground">Voti Migliori</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-oralmind-600">24/7</div>
                    <div className="text-sm text-muted-foreground">Always On</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Visual Demo */}
              <div className="relative animate-slide-in-right">
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-oralmind-100">
                  <div className="space-y-6">
                    {/* Upload simulation */}
                    <div className="flex items-center space-x-3 p-4 bg-oralmind-50 rounded-lg">
                      <Upload className="h-6 w-6 text-oralmind-600" />
                      <div>
                        <div className="font-medium text-oralmind-800">Storia_Roma.pdf</div>
                        <div className="text-sm text-oralmind-600">Upload completato ✓</div>
                      </div>
                    </div>

                    {/* Conversation simulation */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-oralmind-500 to-success-500 rounded-full flex items-center justify-center">
                          <MessageCircle className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-oralmind-50 rounded-lg p-3 max-w-xs">
                          <p className="text-sm text-oralmind-800">
                            "Dimmi tutto sulla caduta dell'Impero Romano"
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-success-50 rounded-lg p-3 max-w-xs">
                          <p className="text-sm text-success-800">
                            "La caduta dell'Impero Romano..."
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-oralmind-500 to-success-500 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-oralmind-50 rounded-lg p-3 max-w-xs">
                          <p className="text-sm text-oralmind-800">
                            "Top! Ora spiegami le cause economiche"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-success-100 rounded-full animate-bounce-gentle"></div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-oralmind-100 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
};

export default Hero;
