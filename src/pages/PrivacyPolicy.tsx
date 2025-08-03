import Header from '../components/Header';
import Footer from '../components/Footer';
import { TranslationProvider } from '../components/TranslationProvider';

const PrivacyPolicy = () => {
  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
            
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-semibold mb-4">1. Informazioni Generali</h2>
              <p className="mb-6">
                OralMind ("noi", "nostro" o "la Società") si impegna a proteggere la privacy dei propri utenti. 
                Questa Privacy Policy descrive come raccogliamo, utilizziamo e proteggiamo le informazioni personali 
                quando utilizzi il nostro servizio.
              </p>

              <h2 className="text-2xl font-semibold mb-4">2. Dati Raccolti</h2>
              <p className="mb-4">Raccogliamo i seguenti tipi di informazioni:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Informazioni di registrazione (nome, email)</li>
                <li>Dati di utilizzo del servizio</li>
                <li>File PDF caricati per l'analisi</li>
                <li>Registrazioni audio per la valutazione</li>
                <li>Cookie e tecnologie di tracciamento</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">3. Utilizzo dei Dati</h2>
              <p className="mb-4">Utilizziamo i tuoi dati per:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Fornire e migliorare il nostro servizio</li>
                <li>Personalizzare l'esperienza utente</li>
                <li>Comunicare aggiornamenti e novità</li>
                <li>Garantire la sicurezza della piattaforma</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">4. Condivisione dei Dati</h2>
              <p className="mb-6">
                Non vendiamo, affittiamo o condividiamo i tuoi dati personali con terze parti, 
                eccetto nei casi previsti dalla legge o per fornire il servizio richiesto.
              </p>

              <h2 className="text-2xl font-semibold mb-4">5. Sicurezza</h2>
              <p className="mb-6">
                Implementiamo misure di sicurezza appropriate per proteggere i tuoi dati personali 
                contro accesso non autorizzato, alterazione, divulgazione o distruzione.
              </p>

              <h2 className="text-2xl font-semibold mb-4">6. I Tuoi Diritti</h2>
              <p className="mb-4">Hai il diritto di:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Accedere ai tuoi dati personali</li>
                <li>Richiedere la correzione di dati inesatti</li>
                <li>Richiedere la cancellazione dei tuoi dati</li>
                <li>Limitare il trattamento dei tuoi dati</li>
                <li>Portabilità dei dati</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">7. Contatti</h2>
              <p className="mb-6">
                Per qualsiasi domanda riguardo questa Privacy Policy, contattaci all'indirizzo: 
                <a href="mailto:privacy@oralmind.ai" className="text-primary hover:underline ml-1">
                  privacy@oralmind.ai
                </a>
              </p>

              <p className="text-sm text-muted-foreground">
                Ultimo aggiornamento: 2024
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </TranslationProvider>
  );
};

export default PrivacyPolicy;