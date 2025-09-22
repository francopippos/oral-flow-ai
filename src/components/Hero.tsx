import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Zap, Code, Sparkles } from 'lucide-react';
import DemoModal from './DemoModal';
import VirtualProfessorDemo from './VirtualProfessorDemo';
import ScarcityCounter from './ScarcityCounter';
import { useTranslation } from '../hooks/useTranslation';

const Hero = () => {
  const { t } = useTranslation();
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isProfessorDemoOpen, setIsProfessorDemoOpen] = useState(false);

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background with modern gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-50/30 to-violet-50/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8 animate-slide-in-left">
                {/* Exclusive Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-300/30 rounded-full text-sm font-bold text-red-700">
                  <span className="animate-pulse mr-2">⚡</span>
                  {t('hero.exclusiveBadge')}
                </div>

                {/* Private Beta Badge */}
                <div className="text-primary font-bold text-sm uppercase tracking-wider">
                  {t('hero.privateBeta')} • {t('hero.inviteOnly')}
                </div>
                
                {/* Main Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                  {t('hero.title')}
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
                  {t('hero.subtitle')}
                </p>
                
                {/* Description */}
                <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-2xl">
                  {t('hero.description')}
                </p>

                {/* Scarcity Counter */}
                <ScarcityCounter />

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-start items-start">
                  <Button 
                    size="lg"
                    className="h-16 px-8 text-lg font-bold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white rounded-2xl shadow-xl group w-full sm:w-auto"
                  >
                    {t('hero.requestAccess')}
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-16 px-8 text-lg font-semibold border-2 border-primary/20 hover:bg-primary/5 rounded-2xl group w-full sm:w-auto"
                    onClick={() => setIsDemoOpen(true)}
                  >
                    <Play className="mr-3 h-6 w-6" />
                    {t('hero.watchDemo')}
                  </Button>
                </div>

                {/* Exclusivity Features */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center group">
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-2">-90%</div>
                    <div className="text-sm text-muted-foreground font-medium">{t('hero.stat1')}</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">99%</div>
                    <div className="text-sm text-muted-foreground font-medium">{t('hero.stat2')}</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-primary bg-clip-text text-transparent mb-2">500+</div>
                    <div className="text-sm text-muted-foreground font-medium">{t('hero.stat3')}</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Lovable Demo */}
              <div className="relative animate-slide-in-right">
                <div className="relative">
                  {/* Main demo card with glass effect */}
                  <div className="glass-card p-10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <div className="relative space-y-8">
                      {/* AI Prompt Simulation */}
                      <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl border border-primary/10 glow-effect">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-500 rounded-2xl flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg text-foreground">"Crea un e-commerce completo"</div>
                          <div className="text-sm text-primary font-medium">AI sta generando l'app...</div>
                        </div>
                      </div>

                      {/* Code Generation Simulation */}
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-2xl flex items-center justify-center">
                            <Code className="h-5 w-5 text-white" />
                          </div>
                          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-4 max-w-xs border border-primary/20">
                            <p className="text-sm font-medium text-foreground">
                              "Sto creando il frontend React, il database e l'autenticazione..."
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-4 max-w-xs border border-green-500/20">
                            <p className="text-sm font-medium text-foreground">
                              "✨ App completa pronta! Deploy automatico in corso..."
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-primary rounded-2xl flex items-center justify-center">
                            <Zap className="h-5 w-5 text-white" />
                          </div>
                          <div className="bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-2xl p-4 max-w-xs border border-blue-500/20">
                            <p className="text-sm font-medium text-foreground">
                              "🚀 La tua app è live! Vuoi aggiungere il sistema di pagamenti?"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-primary to-blue-500 rounded-full opacity-10"></div>
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full opacity-10"></div>
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