import { Mic, Brain, Layers } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const WhyUnique = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Layers,
      title: t('whyUnique.exclusiveTitle'),
      description: t('whyUnique.exclusiveDesc'),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Mic,
      title: t('whyUnique.realisticTitle'),
      description: t('whyUnique.realisticDesc'),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Brain,
      title: t('whyUnique.intelligentTitle'),
      description: t('whyUnique.intelligentDesc'),
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section id="why-unique" className="py-20 bg-gradient-to-br from-primary/5 via-background to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('whyUnique.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('whyUnique.subtitle')}
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-3 md:items-stretch">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center md:text-left w-full max-w-sm md:max-w-none h-full min-h-[280px] flex flex-col"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto md:mx-0 flex-shrink-0`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 flex-shrink-0">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUnique;