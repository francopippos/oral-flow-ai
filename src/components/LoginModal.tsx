
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, GraduationCap, BookOpen, Users, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { t } = useTranslation();
  const [userType, setUserType] = useState<'student' | 'teacher' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleUserTypeSelect = (type: 'student' | 'teacher') => {
    setUserType(type);
  };

  const handleBack = () => {
    setUserType(null);
    setEmail('');
    setPassword('');
    setIsSignUp(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Account già esistente",
            description: "Questo indirizzo email è già registrato. Prova ad accedere invece.",
            variant: "destructive"
          });
        } else if (error.message.includes('Invalid login credentials')) {
          toast({
            title: t('auth.invalidCredentials'),
            description: t('auth.invalidCredentialsDesc'),
            variant: "destructive"
          });
        } else {
          toast({
            title: t('auth.authError'),
            description: error.message,
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: isSignUp ? t('auth.registrationComplete') : t('auth.loginComplete'),
          description: isSignUp 
            ? t('auth.checkEmail')
            : t('auth.welcomeMessage'),
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: t('auth.unexpectedError'),
        description: t('auth.unexpectedErrorDesc'),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const studentFeatures = [
    { icon: BookOpen, text: "Interrogazioni simulate" },
    { icon: Users, text: "Modalità gruppo" },
    { icon: BarChart3, text: "Tracciamento progressi" }
  ];

  const teacherFeatures = [
    { icon: Users, text: "Gestione classi" },
    { icon: BarChart3, text: "Analytics studenti" },
    { icon: Settings, text: "Configurazione AI" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text text-center">
            {userType ? 'Accedi' : 'Scegli il tuo profilo'}
          </DialogTitle>
        </DialogHeader>

        {!userType ? (
          // User type selection
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Seleziona come vuoi utilizzare OralMind
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleUserTypeSelect('student')}
                className="w-full p-6 border-2 border-oralmind-200 rounded-xl hover:border-oralmind-400 hover:bg-oralmind-50 transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-oralmind-100 rounded-full group-hover:bg-oralmind-200 transition-colors">
                    <GraduationCap className="h-8 w-8 text-oralmind-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-oralmind-800">Studente</h3>
                    <p className="text-sm text-muted-foreground">
                      Esercitati per le interrogazioni
                    </p>
                    <div className="mt-2 space-y-1">
                      {studentFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-oralmind-600">
                          <feature.icon className="h-3 w-3" />
                          <span>{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleUserTypeSelect('teacher')}
                className="w-full p-6 border-2 border-success-200 rounded-xl hover:border-success-400 hover:bg-success-50 transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-success-100 rounded-full group-hover:bg-success-200 transition-colors">
                    <User className="h-8 w-8 text-success-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-success-800">Professore</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitora e guida i tuoi studenti
                    </p>
                    <div className="mt-2 space-y-1">
                      {teacherFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-success-600">
                          <feature.icon className="h-3 w-3" />
                          <span>{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          // Login/Signup form
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={`p-4 rounded-lg ${
              userType === 'student' ? 'bg-oralmind-50' : 'bg-success-50'
            }`}>
              <div className="flex items-center space-x-3">
                {userType === 'student' ? (
                  <GraduationCap className="h-6 w-6 text-oralmind-600" />
                ) : (
                  <User className="h-6 w-6 text-success-600" />
                )}
                <span className={`font-medium ${
                  userType === 'student' ? 'text-oralmind-800' : 'text-success-800'
                }`}>
                  {isSignUp ? t('auth.registration') : t('auth.login')} {userType === 'student' ? t('auth.student') : t('auth.professor')}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la-tua-email@esempio.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="La tua password"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Indietro
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className={`flex-1 ${
                  userType === 'student' 
                    ? 'bg-oralmind-500 hover:bg-oralmind-600' 
                    : 'bg-success-500 hover:bg-success-600'
                } text-white`}
              >
                {loading ? 'Caricamento...' : (isSignUp ? 'Registrati' : 'Accedi')}
              </Button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-muted-foreground hover:text-oralmind-600 transition-colors"
              >
                {isSignUp ? 'Hai già un account? Accedi' : 'Non hai un account? Registrati'}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
