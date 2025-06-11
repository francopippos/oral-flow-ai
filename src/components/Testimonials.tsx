
import { Star, Quote } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Marco Rossi",
      role: "Studente di Liceo Scientifico",
      content: "OralMind ha completamente trasformato il mio approccio alle interrogazioni. Prima ero sempre nervoso, ora mi sento sicuro e preparato. I feedback dell'AI sono incredibilmente utili!",
      rating: 5,
      subject: "Matematica e Fisica"
    },
    {
      name: "Prof.ssa Elena Bianchi",
      role: "Insegnante di Storia",
      content: "Uno strumento rivoluzionario per i miei studenti. Ho notato un miglioramento significativo nella loro capacità espositiva e nella sicurezza durante le interrogazioni orali.",
      rating: 5,
      subject: "Storia e Filosofia"
    },
    {
      name: "Giulia Verdi",
      role: "Studentessa Universitaria",
      content: "Uso OralMind per prepararmi agli esami orali universitari. La capacità dell'AI di adattarsi ai miei materiali specifici è impressionante. Non potrei più farne a meno!",
      rating: 5,
      subject: "Giurisprudenza"
    },
    {
      name: "Alessandro Neri",
      role: "Studente di Liceo Classico",
      content: "Finalmente uno strumento che mi aiuta davvero a migliorare nell'esposizione orale. L'AI è paziente e i suoi consigli sono sempre pertinenti. Voto aumentato del 30%!",
      rating: 5,
      subject: "Latino e Greco"
    }
  ];

  return (
    <section id="testimonials" className="py-20 gradient-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('testimonials.title')} <span className="gradient-text">OralMind</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('testimonials.description')}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-oralmind-100 hover:shadow-lg transition-all duration-300 animate-fade-in relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-oralmind-200">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-oralmind-500 to-success-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-oralmind-600 font-medium">{testimonial.subject}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 animate-fade-in">
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-oralmind-100 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t('testimonials.cta.title')} <span className="gradient-text">{t('testimonials.cta.subtitle')}</span>
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('testimonials.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-oralmind-500 to-success-500 hover:from-oralmind-600 hover:to-success-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {t('testimonials.cta.tryFree')}
                </button>
                <button className="border-2 border-oralmind-200 text-oralmind-700 hover:bg-oralmind-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  {t('testimonials.cta.learnMore')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
