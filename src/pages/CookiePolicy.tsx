import Header from '../components/Header';
import Footer from '../components/Footer';
import { TranslationProvider } from '../components/TranslationProvider';

const CookiePolicy = () => {
  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Cookie Policy</h1>
            
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-semibold mb-4">1. Cosa sono i Cookie</h2>
              <p className="mb-6">
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo 
                quando visiti un sito web. Ci aiutano a migliorare la tua esperienza e a fornire 
                funzionalità personalizzate.
              </p>

              <h2 className="text-2xl font-semibold mb-4">2. Tipi di Cookie Utilizzati</h2>
              
              <h3 className="text-xl font-semibold mb-3">Cookie Necessari</h3>
              <p className="mb-4">
                Questi cookie sono essenziali per il funzionamento del sito e non possono essere disabilitati:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Cookie di sessione per mantenere il login</li>
                <li>Cookie di sicurezza per prevenire attacchi</li>
                <li>Cookie di preferenze per le impostazioni del sito</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Cookie di Performance</h3>
              <p className="mb-4">
                Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Google Analytics per statistiche anonime</li>
                <li>Cookie per monitorare le performance del sito</li>
                <li>Cookie per tracciare errori e problemi tecnici</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Cookie di Funzionalità</h3>
              <p className="mb-4">
                Questi cookie permettono al sito di ricordare le tue scelte:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Lingua preferita</li>
                <li>Tema scuro/chiaro</li>
                <li>Impostazioni di accessibilità</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">3. Gestione dei Cookie</h2>
              <p className="mb-4">
                Puoi gestire i cookie attraverso le impostazioni del tuo browser:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie</li>
                <li><strong>Firefox:</strong> Opzioni → Privacy e sicurezza → Cookie</li>
                <li><strong>Safari:</strong> Preferenze → Privacy → Cookie</li>
                <li><strong>Edge:</strong> Impostazioni → Privacy → Cookie</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">4. Cookie di Terze Parti</h2>
              <p className="mb-6">
                Alcuni cookie sono impostati da servizi di terze parti che utilizziamo:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Google Analytics per le statistiche</li>
                <li>Supabase per l'autenticazione</li>
                <li>CDN per il caricamento delle risorse</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">5. Aggiornamenti della Policy</h2>
              <p className="mb-6">
                Questa Cookie Policy può essere aggiornata periodicamente. Ti consigliamo di 
                consultarla regolarmente per rimanere informato sui cookie che utilizziamo.
              </p>

              <h2 className="text-2xl font-semibold mb-4">6. Contatti</h2>
              <p className="mb-6">
                Per domande sui cookie, contattaci all'indirizzo: 
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

export default CookiePolicy;