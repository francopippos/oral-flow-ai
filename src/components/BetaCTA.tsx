import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import DemoModal from './DemoModal';
import VirtualProfessorDemo from './VirtualProfessorDemo';

const BetaCTA = () => {
  const { t } = useTranslation();
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isProfessorDemoOpen, setIsProfessorDemoOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-blue-50/50 to-violet-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-violet-500/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
              <span className="animate-pulse mr-2">⚡</span>
              {t('betaCTA.exclusiveBadge')}
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              {t('betaCTA.title')}
            </h2>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t('betaCTA.description')}
            </p>

            {/* Benefits List */}
            <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm border border-primary/10 rounded-2xl p-6">
                <div className="text-primary font-semibold mb-2">✨ {t('betaCTA.benefit1Title')}</div>
                <p className="text-sm text-muted-foreground">{t('betaCTA.benefit1Desc')}</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-primary/10 rounded-2xl p-6">
                <div className="text-primary font-semibold mb-2">🚀 {t('betaCTA.benefit2Title')}</div>
                <p className="text-sm text-muted-foreground">{t('betaCTA.benefit2Desc')}</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-primary/10 rounded-2xl p-6">
                <div className="text-primary font-semibold mb-2">💎 {t('betaCTA.benefit3Title')}</div>
                <p className="text-sm text-muted-foreground">{t('betaCTA.benefit3Desc')}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white rounded-2xl shadow-lg group w-full sm:w-auto"
              >
                {t('betaCTA.requestAccess')}
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg font-semibold border-2 border-primary/20 hover:bg-primary/5 rounded-2xl group w-full sm:w-auto"
                onClick={() => setIsDemoOpen(true)}
              >
                <Play className="mr-3 h-6 w-6" />
                {t('betaCTA.watchDemo')}
              </Button>
            </div>

            {/* Small print */}
            <p className="text-sm text-muted-foreground/80">
              {t('betaCTA.smallPrint')}
            </p>
          </div>
        </div>
      </div>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <VirtualProfessorDemo isOpen={isProfessorDemoOpen} onClose={() => setIsProfessorDemoOpen(false)} />
    </section>
  );
};

export default BetaCTA;