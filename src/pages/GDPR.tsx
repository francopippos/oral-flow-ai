import Header from '../components/Header';
import Footer from '../components/Footer';
import { TranslationProvider } from '../components/TranslationProvider';

const GDPR = () => {
  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Conformità GDPR</h1>
            
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-semibold mb-4">1. Introduzione al GDPR</h2>
              <p className="mb-6">
                Il Regolamento Generale sulla Protezione dei Dati (GDPR) è un regolamento dell'Unione Europea 
                che protegge i dati personali dei cittadini europei. OralMind è pienamente conforme al GDPR.
              </p>

              <h2 className="text-2xl font-semibold mb-4">2. Base Giuridica per il Trattamento</h2>
              <p className="mb-4">
                Trattiamo i tuoi dati personali sulla base di:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Consenso:</strong> Quando ti registri e accetti i nostri termini</li>
                <li><strong>Esecuzione del contratto:</strong> Per fornire il servizio richiesto</li>
                <li><strong>Interesse legittimo:</strong> Per migliorare il servizio e la sicurezza</li>
                <li><strong>Obbligo legale:</strong> Per rispettare normative applicabili</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">3. I Tuoi Diritti GDPR</h2>
              
              <h3 className="text-xl font-semibold mb-3">Diritto di Accesso</h3>
              <p className="mb-4">
                Hai il diritto di sapere quali dati personali abbiamo su di te e come li utilizziamo.
              </p>

              <h3 className="text-xl font-semibold mb-3">Diritto di Rettifica</h3>
              <p className="mb-4">
                Puoi richiedere la correzione di dati personali inesatti o incompleti.
              </p>

              <h3 className="text-xl font-semibold mb-3">Diritto alla Cancellazione</h3>
              <p className="mb-4">
                Puoi richiedere la cancellazione dei tuoi dati personali ("diritto all'oblio").
              </p>

              <h3 className="text-xl font-semibold mb-3">Diritto alla Limitazione</h3>
              <p className="mb-4">
                Puoi richiedere di limitare il trattamento dei tuoi dati in certe circostanze.
              </p>

              <h3 className="text-xl font-semibold mb-3">Diritto alla Portabilità</h3>
              <p className="mb-4">
                Puoi richiedere una copia dei tuoi dati in un formato strutturato e leggibile.
              </p>

              <h3 className="text-xl font-semibold mb-3">Diritto di Opposizione</h3>
              <p className="mb-4">
                Puoi opporti al trattamento dei tuoi dati per scopi di marketing diretto.
              </p>

              <h2 className="text-2xl font-semibold mb-4">4. Come Esercitare i Tuoi Diritti</h2>
              <p className="mb-4">
                Per esercitare qualsiasi dei tuoi diritti GDPR:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Invia una richiesta a <a href="mailto:gdpr@oralmind.ai" className="text-primary hover:underline">gdpr@oralmind.ai</a></li>
                <li>Includi una prova della tua identità</li>
                <li>Specifica chiaramente quale diritto vuoi esercitare</li>
                <li>Risponderemo entro 30 giorni</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">5. Trasferimenti Internazionali</h2>
              <p className="mb-6">
                I tuoi dati possono essere trasferiti e elaborati in paesi al di fuori dell'UE. 
                Garantiamo che tutti i trasferimenti siano protetti da adeguate salvaguardie legali.
              </p>

              <h2 className="text-2xl font-semibold mb-4">6. Conservazione dei Dati</h2>
              <p className="mb-6">
                Conserviamo i tuoi dati personali solo per il tempo necessario agli scopi per cui 
                sono stati raccolti, o come richiesto dalla legge.
              </p>

              <h2 className="text-2xl font-semibold mb-4">7. Sicurezza dei Dati</h2>
              <p className="mb-6">
                Implementiamo misure tecniche e organizzative appropriate per garantire un livello 
                di sicurezza adeguato al rischio, inclusa la crittografia e il controllo degli accessi.
              </p>

              <h2 className="text-2xl font-semibold mb-4">8. Violazioni dei Dati</h2>
              <p className="mb-6">
                In caso di violazione dei dati personali, notificheremo l'autorità di controllo competente 
                entro 72 ore e, se necessario, gli interessati senza indebito ritardo.
              </p>

              <h2 className="text-2xl font-semibold mb-4">9. Reclami</h2>
              <p className="mb-6">
                Se ritieni che il trattamento dei tuoi dati violi il GDPR, hai il diritto di presentare 
                un reclamo all'autorità di controllo competente nel tuo paese.
              </p>

              <h2 className="text-2xl font-semibold mb-4">10. Contatti</h2>
              <p className="mb-6">
                Per qualsiasi domanda relativa al GDPR o ai tuoi diritti:
                <br />
                Email: <a href="mailto:gdpr@oralmind.ai" className="text-primary hover:underline">gdpr@oralmind.ai</a>
                <br />
                Data Protection Officer: <a href="mailto:dpo@oralmind.ai" className="text-primary hover:underline">dpo@oralmind.ai</a>
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

export default GDPR;