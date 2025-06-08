
import { Upload, MessageCircle, Brain, TrendingUp, FileText, Mic } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Upload,
      title: "Carica i Tuoi Materiali",
      description: "Carica PDF, slide e appunti. OralMind impara solo dai tuoi documenti, garantendo risposte personalizzate e attinenti al programma.",
      color: "from-oralmind-500 to-oralmind-600"
    },
    {
      icon: MessageCircle,
      title: "Interrogazioni Simulate",
      description: "Parla con l'AI come se fossi in classe. Ricevi domande mirate e feedback immediato sulla tua esposizione orale.",
      color: "from-success-500 to-success-600"
    },
    {
      icon: Brain,
      title: "AI Educativa Avanzata",
      description: "Tecnologia all'avanguardia che simula l'approccio di un professore esperto, con tono incoraggiante e formativo.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Feedback Dettagliato",
      description: "Analisi di fluidità, correttezza terminologica e chiarezza espositiva con consigli personalizzati per migliorare.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: FileText,
      title: "Base Dati Personalizzata",
      description: "Nessuna informazione da internet: solo i tuoi materiali come fonte di conoscenza per una preparazione mirata.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mic,
      title: "Riconoscimento Vocale",
      description: "Tecnologia speech-to-text avanzata per comprendere al meglio la tua esposizione e fornire correzioni precise.",
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              Funzionalità <span className="gradient-text">Rivoluzionarie</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              OralMind combina intelligenza artificiale avanzata e metodologie didattiche innovative 
              per offrirti un'esperienza di apprendimento unica e personalizzata.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
