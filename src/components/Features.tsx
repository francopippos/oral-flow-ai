
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
              Tecnologia all'avanguardia
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              Funzionalità <span className="gradient-text">Rivoluzionarie</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              OralMind combina intelligenza artificiale avanzata e metodologie didattiche innovative 
              per offrirti un'esperienza di apprendimento unica e personalizzata.
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
          
          {/* Call to action */}
          <div className="text-center mt-20 animate-fade-in">
            <button className="modern-button group px-10 py-5 text-xl font-bold">
              Scopri Tutte le Funzionalità
              <TrendingUp className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
