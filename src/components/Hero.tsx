
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Upload, MessageCircle, TrendingUp, BookOpen } from 'lucide-react';
import DemoModal from './DemoModal';
import VirtualProfessorDemo from './VirtualProfessorDemo';
import { useTranslation } from '../hooks/useTranslation';

const Hero = () => {
  const { t } = useTranslation();
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isProfessorDemoOpen, setIsProfessorDemoOpen] = useState(false);

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background with modern gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-blue-50/30 to-violet-50/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(239,68,68,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.05),transparent_50%)]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-10 animate-slide-in-left">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-violet-500/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
                    <span className="animate-pulse mr-2">🚀</span>
                    {t('hero.badge')}
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                    {t('hero.title')}{' '}
                    <span className="gradient-text">OralMind</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
                    {t('hero.subtitle')}
                  </p>
                  
                  <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-2xl">
                    {t('hero.description')}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="modern-button group px-8 py-4 text-lg font-semibold">
                    {t('hero.tryDemo')}
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 font-semibold text-lg px-8 py-4 rounded-2xl group neon-border"
                    onClick={() => setIsDemoOpen(true)}
                  >
                    <div className="flex items-center">
                      <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                      {t('hero.watchVideo')}
                    </div>
                  </Button>
                </div>

                {/* Professor Demo Button */}
                <div className="pt-6">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg group w-full sm:w-auto"
                    onClick={() => setIsProfessorDemoOpen(true)}
                  >
                    <BookOpen className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    {t('hero.professorDemo')}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3 font-medium">
                    {t('hero.professorDemoDesc')}
                  </p>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8">
                  <div className="text-center group">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-2">98%</div>
                    <div className="text-sm text-muted-foreground font-medium">{t('hero.stat1')}</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold bg-gradient-to-r from-success-500 to-emerald-500 bg-clip-text text-transparent mb-2">+40%</div>
                    <div className="text-sm text-muted-foreground font-medium">{t('hero.stat2')}</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-primary bg-clip-text text-transparent mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground font-medium">{t('hero.stat3')}</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Enhanced Visual Demo */}
              <div className="relative animate-slide-in-right">
                <div className="relative">
                  {/* Main demo card with glass effect */}
                  <div className="glass-card p-10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <div className="relative space-y-8">
                      {/* Upload simulation with glow */}
                      <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl border border-primary/10 glow-effect">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-500 rounded-2xl flex items-center justify-center">
                          <Upload className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg text-foreground">Storia_Rinascimento.pdf</div>
                          <div className="text-sm text-primary font-medium">Caricato con successo ✓</div>
                        </div>
                      </div>

                      {/* Enhanced conversation simulation */}
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-2xl flex items-center justify-center">
                            <MessageCircle className="h-5 w-5 text-white" />
                          </div>
                          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-4 max-w-xs border border-primary/20">
                            <p className="text-sm font-medium text-foreground">
                              "Parlami delle caratteristiche principali del Rinascimento italiano"
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <div className="bg-gradient-to-r from-success-500/10 to-emerald-500/10 rounded-2xl p-4 max-w-xs border border-success-500/20">
                            <p className="text-sm font-medium text-foreground">
                              "Il Rinascimento italiano si caratterizza per..."
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-primary rounded-2xl flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          <div className="bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-2xl p-4 max-w-xs border border-blue-500/20">
                            <p className="text-sm font-medium text-foreground">
                              "Ottima esposizione! Potresti approfondire il concetto di umanesimo?"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements semplificati */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-primary to-blue-500 rounded-full opacity-10"></div>
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-success-500 to-emerald-500 rounded-full opacity-10"></div>
                  <div className="absolute top-1/2 -right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-primary rounded-full opacity-15"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <VirtualProfessorDemo isOpen={isProfessorDemoOpen} onClose={() => setIsProfessorDemoOpen(false)} />
    </>
  );
};

export default Hero;
