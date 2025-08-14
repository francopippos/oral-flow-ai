
import { Upload, MessageCircle, Brain, TrendingUp, FileText, Mic } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Features = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: Upload,
      title: t('features.uploadTitle'),
      description: t('features.uploadDesc'),
      color: "from-oralflow-500 to-oralflow-600"
    },
    {
      icon: MessageCircle,
      title: t('features.simulationTitle'),
      description: t('features.simulationDesc'),
      color: "from-success-500 to-success-600"
    },
    {
      icon: Brain,
      title: t('features.aiTitle'),
      description: t('features.aiDesc'),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: t('features.feedbackTitle'),
      description: t('features.feedbackDesc'),
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: FileText,
      title: t('features.personalizedTitle'),
      description: t('features.personalizedDesc'),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mic,
      title: t('features.voiceTitle'),
      description: t('features.voiceDesc'),
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-gray-100/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.03),transparent_70%)]"></div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center space-y-6 mb-20 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-violet-500/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
              <span className="animate-pulse mr-2">✨</span>
              {t('features.badge')}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              {t('features.title')} <span className="gradient-text">{t('features.subtitle')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              {t('features.description')}
            </p>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Card with enhanced glass effect */}
                <div className="feature-card h-full">
                  {/* Icon with enhanced gradient */}
                  <div className={`w-16 h-16 rounded-3xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:scale-105 transition-all duration-300 shadow-lg relative`}>
                    <feature.icon className="h-8 w-8 text-white" />
                    <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  
                  {/* Hover indicator semplificato */}
                  <div className="absolute bottom-6 left-8 w-12 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-20 animate-fade-in">
            <button className="modern-button group px-10 py-5 text-xl font-bold">
              {t('features.cta')}
              <TrendingUp className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
