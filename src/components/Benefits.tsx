
import { GraduationCap, Users, Clock, Target, Lightbulb, Award } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: GraduationCap,
      title: "Per gli Studenti",
      items: [
        "Miglioramento della sicurezza nell'esposizione orale",
        "Preparazione mirata basata sui propri materiali",
        "Feedback immediato e costruttivo",
        "Disponibilità 24/7 per sessioni di studio"
      ],
      color: "from-oralmind-500 to-oralmind-600"
    },
    {
      icon: Users,
      title: "Per gli Insegnanti",
      items: [
        "Supporto nell'individuazione delle difficoltà degli studenti",
        "Strumento complementare alla didattica tradizionale",
        "Monitoraggio dei progressi nel tempo",
        "Riduzione del carico di lavoro per le verifiche orali"
      ],
      color: "from-success-500 to-success-600"
    },
    {
      icon: Clock,
      title: "Efficienza Temporale",
      items: [
        "Studio più efficace e mirato",
        "Sessioni personalizzate di durata variabile",
        "Riduzione del tempo necessario per la preparazione",
        "Ottimizzazione delle sessioni di ripasso"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Target,
      title: "Precisione e Personalizzazione",
      items: [
        "Utilizzo esclusivo dei propri materiali di studio",
        "Adattamento al livello e al ritmo individuale",
        "Focus su aree specifiche di miglioramento",
        "Approccio pedagogico scientificamente validato"
      ],
      color: "from-orange-500 to-orange-600"
    }
  ];

  const achievements = [
    { icon: Lightbulb, value: "10x", label: "Più Efficace dello Studio Tradizionale" },
    { icon: Award, value: "95%", label: "Miglioramento nelle Valutazioni" },
    { icon: Clock, value: "3h", label: "Risparmio Medio di Studio Settimanale" },
    { icon: Users, value: "1000+", label: "Studenti Già Soddisfatti" }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              I <span className="gradient-text">Benefici</span> di OralMind
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Scopri come OralMind può trasformare l'esperienza di apprendimento 
              per studenti e insegnanti, creando un ambiente educativo più efficace e coinvolgente.
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
                Risultati <span className="gradient-text">Straordinari</span>
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I dati parlano chiaro: OralMind sta rivoluzionando il modo in cui gli studenti 
                si preparano alle interrogazioni orali.
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
