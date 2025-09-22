
import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import BetaCTA from '../components/BetaCTA';
import Footer from '../components/Footer';
import DemoModal from '../components/DemoModal';
import LoginModal from '../components/LoginModal';
import VirtualProfessorDemo from '../components/VirtualProfessorDemo';
import { TranslationProvider } from '../components/TranslationProvider';

const Index = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfessorDemoOpen, setIsProfessorDemoOpen] = useState(false);

  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Benefits />
          <BetaCTA />
          
          {/* Full Demo Section - Keep the original detailed demo */}
          <section id="full-demo" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Demo Completa della Piattaforma
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Scopri nel dettaglio come Lovable trasforma le tue idee in applicazioni web complete. 
                  Questa demo ti mostra tutte le funzionalità avanzate disponibili nella beta privata.
                </p>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={() => setIsProfessorDemoOpen(true)}
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold text-lg px-12 py-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
                >
                  🚀 Avvia Demo Completa
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        
        <DemoModal 
          isOpen={isDemoOpen} 
          onClose={() => setIsDemoOpen(false)} 
        />
        
        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
        />
        
        <VirtualProfessorDemo 
          isOpen={isProfessorDemoOpen} 
          onClose={() => setIsProfessorDemoOpen(false)} 
        />
      </div>
    </TranslationProvider>
  );
};

export default Index;
