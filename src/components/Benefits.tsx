
import { GraduationCap, Users, Clock, Target, Lightbulb, Award } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Benefits = () => {
  const { t } = useTranslation();
  const benefits = [
    {
      icon: GraduationCap,
      title: t('benefits.studentsTitle'),
      items: [
        t('benefits.studentsItem1'),
        t('benefits.studentsItem2'),
        t('benefits.studentsItem3'),
        t('benefits.studentsItem4')
      ],
      color: "from-oralmind-500 to-oralmind-600"
    },
    {
      icon: Users,
      title: t('benefits.teachersTitle'),
      items: [
        t('benefits.teachersItem1'),
        t('benefits.teachersItem2'),
        t('benefits.teachersItem3'),
        t('benefits.teachersItem4')
      ],
      color: "from-success-500 to-success-600"
    },
    {
      icon: Clock,
      title: t('benefits.efficiencyTitle'),
      items: [
        t('benefits.efficiencyItem1'),
        t('benefits.efficiencyItem2'),
        t('benefits.efficiencyItem3'),
        t('benefits.efficiencyItem4')
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Target,
      title: t('benefits.precisionTitle'),
      items: [
        t('benefits.precisionItem1'),
        t('benefits.precisionItem2'),
        t('benefits.precisionItem3'),
        t('benefits.precisionItem4')
      ],
      color: "from-orange-500 to-orange-600"
    }
  ];

  const achievements = [
    { icon: Lightbulb, value: "10x", label: t('benefits.achievement1') },
    { icon: Award, value: "95%", label: t('benefits.achievement2') },
    { icon: Clock, value: "3h", label: t('benefits.achievement3') },
    { icon: Users, value: "1000+", label: t('benefits.achievement4') }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('benefits.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('benefits.subtitle')}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="feature-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${benefit.color} p-3 mb-6`}>
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {benefit.title}
                </h3>
                <ul className="space-y-3">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-oralmind-400 to-success-400 mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-br from-oralmind-50 via-white to-success-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t('benefits.achievementsTitle')}
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('benefits.achievementsSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.label}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-oralmind-500 to-success-500 rounded-xl flex items-center justify-center">
                    <achievement.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                    {achievement.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
