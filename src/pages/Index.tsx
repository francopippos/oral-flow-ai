
import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import DemoModal from '../components/DemoModal';
import LoginModal from '../components/LoginModal';
import { TranslationProvider } from '../components/TranslationProvider';

const Index = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
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
          
          {/* Beta CTA Section */}
          <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-destructive/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center px-6 py-3 bg-destructive/10 border border-destructive/20 rounded-full text-destructive font-semibold">
                    🔥 Only 7 spots remaining
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                    Ready to Build the Future?
                  </h2>
                  
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Join an exclusive group of innovators testing the most advanced AI development platform. 
                    Transform your ideas into production-ready web applications in minutes, not months.
                  </p>
                  
                  <div className="bg-gradient-to-r from-primary/5 to-destructive/5 border border-primary/20 rounded-3xl p-8 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-foreground mb-4">What You Get:</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-foreground">Lifetime premium access</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                        <span className="text-foreground">Direct feedback channel</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-destructive rounded-full"></div>
                        <span className="text-foreground">Shape product roadmap</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-foreground">Personal onboarding call</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="bg-gradient-to-r from-primary to-destructive hover:from-primary/90 hover:to-destructive/90 text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-200">
                      🚀 Request Beta Access
                    </button>
                    <button 
                      onClick={() => setIsDemoOpen(true)}
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-xl px-12 py-6 rounded-2xl transition-all duration-200"
                    >
                      Watch Demo First
                    </button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Applications reviewed within 24 hours • No commitment required
                  </p>
                </div>
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
      </div>
    </TranslationProvider>
  );
};

export default Index;
