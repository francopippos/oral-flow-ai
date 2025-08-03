import Header from '../components/Header';
import Footer from '../components/Footer';
import { TranslationProvider } from '../components/TranslationProvider';

const TermsOfService = () => {
  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Termini di Servizio</h1>
            
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-semibold mb-4">1. Accettazione dei Termini</h2>
              <p className="mb-6">
                Utilizzando OralMind, accetti di essere vincolato da questi Termini di Servizio. 
                Se non accetti questi termini, non utilizzare il nostro servizio.
              </p>

              <h2 className="text-2xl font-semibold mb-4">2. Descrizione del Servizio</h2>
              <p className="mb-6">
                OralMind è una piattaforma di intelligenza artificiale che aiuta gli studenti a 
                prepararsi per le interrogazioni orali attraverso simulazioni interattive e feedback personalizzato.
              </p>

              <h2 className="text-2xl font-semibold mb-4">3. Registrazione e Account</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>Devi fornire informazioni accurate e complete durante la registrazione</li>
                <li>Sei responsabile della sicurezza del tuo account e password</li>
                <li>Devi notificarci immediatamente di qualsiasi uso non autorizzato del tuo account</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">4. Uso Accettabile</h2>
              <p className="mb-4">Ti impegni a NON:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Utilizzare il servizio per scopi illegali o non autorizzati</li>
                <li>Caricare contenuti offensivi, diffamatori o inappropriati</li>
                <li>Tentare di accedere non autorizzatamente ai nostri sistemi</li>
                <li>Interferire con il normale funzionamento del servizio</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">5. Proprietà Intellettuale</h2>
              <p className="mb-6">
                Tutti i contenuti, il software e la tecnologia di OralMind sono di nostra proprietà 
                o concessi in licenza. Mantieni i diritti sui contenuti che carichi, ma ci concedi 
                una licenza per elaborarli e fornirti il servizio.
              </p>

              <h2 className="text-2xl font-semibold mb-4">6. Limitazioni di Responsabilità</h2>
              <p className="mb-6">
                OralMind è fornito "così com'è". Non garantiamo che il servizio sarà sempre disponibile 
                o privo di errori. La nostra responsabilità è limitata al massimo consentito dalla legge.
              </p>

              <h2 className="text-2xl font-semibold mb-4">7. Modifiche ai Termini</h2>
              <p className="mb-6">
                Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. 
                Le modifiche saranno comunicate e diventeranno effettive dopo la pubblicazione.
              </p>

              <h2 className="text-2xl font-semibold mb-4">8. Contatti</h2>
              <p className="mb-6">
                Per domande sui Termini di Servizio, contattaci all'indirizzo: 
                <a href="mailto:legal@oralmind.ai" className="text-primary hover:underline ml-1">
                  legal@oralmind.ai
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

export default TermsOfService;