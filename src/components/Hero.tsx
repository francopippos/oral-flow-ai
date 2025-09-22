import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock, Users, Zap, Crown } from 'lucide-react';
import DemoModal from './DemoModal';
import VirtualProfessorDemo from './VirtualProfessorDemo';
import ScarcityCounter from './ScarcityCounter';
import { useTranslation } from '../hooks/useTranslation';
const Hero = () => {
  const { t } = useTranslation();
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isProfessorDemoOpen, setIsProfessorDemoOpen] = useState(false);
  
  return <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background with exclusive gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-destructive/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.08),transparent_50%)]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-10 animate-slide-in-left">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-destructive/10 to-orange-500/10 border border-destructive/20 rounded-full text-sm font-medium text-destructive">
                    <Lock className="mr-2 h-4 w-4" />
                    {t('hero.badge')}
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                      {t('hero.title')}
                    </h1>
                    
                    <div className="bg-gradient-to-r from-primary/20 to-destructive/20 border border-primary/30 rounded-2xl p-4 inline-block">
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        {t('hero.subtitle')}
                      </h2>
                    </div>
                  </div>
                  
                  <p className="text-xl md:text-2xl text-foreground leading-relaxed font-semibold max-w-2xl">
                    {t('hero.uvp')}
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    {t('hero.description')}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-start items-start">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-bold text-lg px-8 py-6 rounded-2xl shadow-lg group w-full sm:w-auto h-auto"
                  >
                    <Crown className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    {t('hero.requestAccess')}
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-lg px-8 py-6 rounded-2xl w-full sm:w-auto h-auto"
                    onClick={() => setIsDemoOpen(true)}
                  >
                    <Zap className="mr-3 h-6 w-6" />
                    {t('hero.watchVideo')}
                  </Button>
                </div>

                {/* Exclusivity messaging */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {t('hero.trustedBy')}
                  </div>
                  <div className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                    {t('hero.firstMover')}
                  </div>
                </div>
              </div>

              {/* Right Content - Scarcity & Exclusivity */}
              <div className="relative animate-slide-in-right">
                <div className="relative space-y-8">
                  {/* Scarcity Counter */}
                  <ScarcityCounter />
                  
                  {/* Exclusivity features */}
                  <div className="glass-card p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-destructive/5"></div>
                    <div className="relative space-y-6">
                      <h3 className="text-2xl font-bold text-foreground mb-6">{t('hero.earlyAccess')}</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                            <Crown className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">First-Mover Benefits</div>
                            <div className="text-sm text-muted-foreground">Shape the future of AI education</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-4 bg-success-500/5 rounded-xl border border-success-500/10">
                          <div className="w-10 h-10 bg-success-500 rounded-xl flex items-center justify-center">
                            <Zap className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">Direct Feedback Channel</div>
                            <div className="text-sm text-muted-foreground">Influence development priorities</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-4 bg-destructive/5 rounded-xl border border-destructive/10">
                          <div className="w-10 h-10 bg-destructive rounded-xl flex items-center justify-center">
                            <Lock className="h-5 w-5 text-destructive-foreground" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">Lifetime Premium Access</div>
                            <div className="text-sm text-muted-foreground">No subscription fees, ever</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-primary to-destructive rounded-full opacity-10"></div>
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-success-500 to-primary rounded-full opacity-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <VirtualProfessorDemo isOpen={isProfessorDemoOpen} onClose={() => setIsProfessorDemoOpen(false)} />
    </>;
};
export default Hero;