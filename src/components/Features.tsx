
import { Upload, MessageCircle, Brain, TrendingUp, FileText, Mic } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Upload,
      title: "Upload & Go",
      description: "Trascina i tuoi PDF e in pochi secondi l'AI li studia e li capisce meglio di te.",
      color: "from-oralmind-500 to-oralmind-600"
    },
    {
      icon: MessageCircle,
      title: "Chat Smart",
      description: "L'AI ti interroga come un prof vero, ma senza giudicarti. Fail safe per provare e riprovare.",
      color: "from-success-500 to-success-600"
    },
    {
      icon: Brain,
      title: "AI che Capisce",
      description: "Non è ChatGPT random. È addestrata sui TUOI materiali per darti feedback super specifici.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Feedback Preciso",
      description: "Ti dice esattamente cosa non va e come migliorare. Niente consigli generici.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: FileText,
      title: "Zero Distrazioni",
      description: "Solo i tuoi contenuti, niente Wikipedia random. Focus totale sui tuoi esami.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mic,
      title: "Parla & Basta",
      description: "Registra la tua voce, l'AI capisce tutto e ti dà feedback istantaneo. Game over ansia.",
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
              Features che <span className="gradient-text">Spacchettano</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tutto quello che ti serve per smettere di odiare le interrogazioni e iniziare a dominarle.
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
