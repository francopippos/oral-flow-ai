
import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import DemoModal from '../components/DemoModal';
import FunctionalDemoModal from '../components/FunctionalDemoModal';
import LoginModal from '../components/LoginModal';
import { TranslationProvider } from '../components/TranslationProvider';

const Index = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isFunctionalDemoOpen, setIsFunctionalDemoOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Benefits />
          <Testimonials />
        </main>
        <Footer />
        
        <DemoModal 
          isOpen={isDemoOpen} 
          onClose={() => setIsDemoOpen(false)} 
        />
        
        <FunctionalDemoModal 
          isOpen={isFunctionalDemoOpen} 
          onClose={() => setIsFunctionalDemoOpen(false)} 
        />
        
        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
        />
      </div>
    </TranslationProvider>
  );
};

export default Index;
