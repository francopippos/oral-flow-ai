
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Upload, MessageCircle, TrendingUp, GraduationCap } from 'lucide-react';
import DemoModal from './DemoModal';
import UniversityProfessorDemo from './UniversityProfessorDemo';

const Hero = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isProfessorDemoOpen, setIsProfessorDemoOpen] = useState(false);

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
                    🚀 Rivoluziona il tuo metodo di studio
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Trasforma le tue{' '}
                    <span className="gradient-text">interrogazioni</span>{' '}
                    con l'AI
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    OralMind è l'intelligenza artificiale che ti aiuta a migliorare le tue capacità di esposizione orale, 
                    utilizzando esclusivamente i tuoi materiali di studio. Preparati alle interrogazioni come mai prima d'ora.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-oralmind-500 to-success-500 hover:from-oralmind-600 hover:to-success-600 text-white shadow-xl group"
                  >
                    Inizia Subito Gratis
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-oralmind-200 text-oralmind-700 hover:bg-oralmind-50 group"
                    onClick={() => setIsDemoOpen(true)}
                  >
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Guarda la Demo
                  </Button>
                </div>

                {/* Nuovo bottone per la demo del Professore Universitario */}
                <div className="pt-4">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-oralmind-400 text-oralmind-700 hover:bg-oralmind-100 group"
                    onClick={() => setIsProfessorDemoOpen(true)}
                  >
                    <GraduationCap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    🎓 Prova la Demo: Professore Universitario Virtuale
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-oralmind-600">98%</div>
                    <div className="text-sm text-muted-foreground">Studenti Soddisfatti</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success-600">+40%</div>
                    <div className="text-sm text-muted-foreground">Miglioramento Orale</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-oralmind-600">24/7</div>
                    <div className="text-sm text-muted-foreground">Sempre Disponibile</div>
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
                        <div className="font-medium text-oralmind-800">Storia_Rinascimento.pdf</div>
                        <div className="text-sm text-oralmind-600">Caricato con successo ✓</div>
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
                            "Parlami delle caratteristiche principali del Rinascimento italiano"
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-success-50 rounded-lg p-3 max-w-xs">
                          <p className="text-sm text-success-800">
                            "Il Rinascimento italiano si caratterizza per..."
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-oralmind-500 to-success-500 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-oralmind-50 rounded-lg p-3 max-w-xs">
                          <p className="text-sm text-oralmind-800">
                            "Ottima esposizione! Potresti approfondire il concetto di umanesimo?"
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
      <UniversityProfessorDemo 
        isOpen={isProfessorDemoOpen} 
        onClose={() => setIsProfessorDemoOpen(false)} 
      />
    </>
  );
};

export default Hero;
