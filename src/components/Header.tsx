
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Brain } from 'lucide-react';
import LoginModal from './LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navItems = [
    { name: 'Funzionalità', href: '#features' },
    { name: 'Come Funziona', href: '#how-it-works' },
    { name: 'Benefici', href: '#benefits' },
    { name: 'Testimonianze', href: '#testimonials' },
  ];

  return (
    <>
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-xl border-b border-white/20 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-primary to-pink-500 rounded-2xl shadow-lg glow-effect">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-display font-bold gradient-text">OralMind</span>
            </div>

            {/* Desktop Navigation with enhanced styling */}
            <nav className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-foreground hover:text-primary transition-all duration-300 font-medium text-lg group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-violet-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            {/* Enhanced CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 font-semibold px-6 py-2 rounded-xl transition-all duration-300"
                onClick={() => setIsLoginOpen(true)}
              >
                Accedi
              </Button>
              <button className="modern-button px-6 py-3 text-lg font-semibold">
                Prova Gratis
              </button>
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-foreground hover:text-primary transition-colors rounded-xl hover:bg-primary/5"
              >
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden animate-fade-in">
              <div className="px-4 pt-4 pb-6 space-y-4 bg-white/95 backdrop-blur-xl border-t border-white/20 rounded-b-2xl shadow-lg">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 rounded-xl font-medium text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col space-y-3 pt-4 border-t border-primary/10">
                  <Button 
                    variant="outline" 
                    className="border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 font-semibold py-3 rounded-xl"
                    onClick={() => {
                      setIsLoginOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Accedi
                  </Button>
                  <button className="modern-button py-3 text-lg font-semibold">
                    Prova Gratis
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;
