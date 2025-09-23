import { GraduationCap, Target, Lightbulb } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const WhoIsItFor = () => {
  const { t } = useTranslation();
  
  const audiences = [
    {
      icon: GraduationCap,
      title: t('whoIsItFor.studentsTitle'),
      description: t('whoIsItFor.studentsDesc'),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Target,
      title: t('whoIsItFor.improvementTitle'),
      description: t('whoIsItFor.improvementDesc'),
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Lightbulb,
      title: t('whoIsItFor.innovativeTitle'),
      description: t('whoIsItFor.innovativeDesc'),
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section id="who-is-it-for" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('whoIsItFor.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('whoIsItFor.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {audiences.map((audience, index) => (
              <div 
                key={index}
                className="group bg-background border border-border/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${audience.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <audience.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{audience.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor;