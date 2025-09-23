
import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhyUnique from '../components/WhyUnique';
import WhoIsItFor from '../components/WhoIsItFor';
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
          <HowItWorks />
          <WhyUnique />
          <WhoIsItFor />
          <BetaCTA />
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
