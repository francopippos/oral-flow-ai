
export const analyzeWithOralMindAI = async (
  userMessage: string, 
  fileContent: string, 
  conversation: Array<{role: 'ai' | 'user', message: string}>
) => {
  try {
    console.log('🤖 OralMind AI sta elaborando...', { userMessage: userMessage.substring(0, 100) });
    
    // Simulazione intelligente per la demo
    const response = generateAIResponse(userMessage, fileContent, conversation);
    
    // Simula tempo di elaborazione realistico
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
    
    console.log('✅ Risposta OralMind AI ricevuta');
    return response;
  } catch (error) {
    console.error('❌ Errore OralMind AI:', error);
    return "Mi dispiace, c'è stato un problema tecnico. Riprova tra un momento.";
  }
};

function generateAIResponse(userMessage: string, fileContent: string, conversation: any[]): string {
  const messageLower = userMessage.toLowerCase();
  
  // Prima risposta di benvenuto
  if (conversation.length === 0) {
    return `🎓 **Benvenuto all'interrogazione con il Professor OralMind!**

Ho analizzato attentamente il documento che hai caricato e sono pronto a condurre un'interrogazione approfondita sui contenuti.

**Modalità di Funzionamento:**
- Puoi registrare la tua voce per esporre gli argomenti
- Oppure scrivere direttamente le tue risposte
- Ti fornirò feedback costruttivo e domande di approfondimento

**Iniziamo l'Interrogazione:**
Per cominciare, ti chiedo di esporre uno degli argomenti principali trattati nel documento. Puoi scegliere tu da dove iniziare, oppure posso proporti io un argomento specifico.

Sono qui per valutare la tua preparazione e aiutarti a migliorare la comprensione della materia. Quando sei pronto, inizia pure la tua esposizione!`;
  }
  
  // Analisi delle risposte dell'utente
  if (messageLower.includes('branch') && messageLower.includes('bound')) {
    return `**Valutazione dell'Esposizione - Branch and Bound**

**Punti Positivi Identificati:**
✅ Hai citato correttamente l'argomento principale
✅ Dimostri familiarità con la terminologia

**Approfondimenti Necessari:**
🔍 Puoi spiegarmi più nel dettaglio il meccanismo di funzionamento?
🔍 Come si determina quando "tagliare" un ramo nell'albero di ricerca?
🔍 Quali sono le differenze con altri algoritmi di ottimizzazione?

**Domanda di Follow-up:**
Considerando un problema pratico come il Traveling Salesman Problem, come applicheresti il Branch and Bound? Descrivi i passaggi principali e come calcoleresti i bound.

**Feedback Pedagogico:**
La tua esposizione è sulla strada giusta. Per migliorare, cerca di collegare meglio la teoria agli esempi pratici e di spiegare il "perché" oltre al "cosa".`;
  }
  
  if (messageLower.includes('ottimizzazione') || messageLower.includes('algoritm')) {
    return `**Analisi dell'Esposizione - Algoritmi di Ottimizzazione**

**Osservazioni Positive:**
✅ Hai inquadrato correttamente il tema degli algoritmi di ottimizzazione
✅ Mostri comprensione del contesto generale

**Richieste di Approfondimento:**
📚 Puoi classificare i diversi tipi di algoritmi di ottimizzazione?
📚 Quali sono i criteri per scegliere un algoritmo rispetto a un altro?
📚 Come si valuta l'efficacia di un algoritmo di ottimizzazione?

**Sfida Accademica:**
Confronta l'approccio esatto con quello approssimato: quando è giustificabile sacrificare l'ottimalità per la velocità di esecuzione?

**Consigli per Migliorare:**
La tua preparazione è buona, ma potresti beneficiare di esempi concreti. Prova a collegare ogni concetto teorico a un'applicazione pratica.`;
  }
  
  // Risposta generica ma personalizzata
  return `**Feedback sull'Esposizione Corrente**

**Analisi della Risposta:**
Ho ascoltato attentamente la tua esposizione e posso fornire alcune osservazioni costruttive.

**Aspetti da Valorizzare:**
✅ Dimostri impegno nello studio del materiale
✅ Il tuo approccio metodologico è appropriato

**Suggerimenti per l'Approfondimento:**
🎯 Cerca di essere più specifico nei dettagli tecnici
🎯 Collega meglio i concetti teorici con esempi pratici
🎯 Spiega non solo "cosa" ma anche "come" e "perché"

**Domanda di Verifica:**
Basandoti sul documento che hai studiato, puoi elaborare maggiormente sull'argomento che hai appena esposto? Mi interessa valutare la profondità della tua comprensione.

**Orientamento Didattico:**
Ricorda che in un'interrogazione universitaria è importante dimostrare non solo la conoscenza dei fatti, ma anche la capacità di analisi critica e di collegamento tra i concetti.

Continua pure con la tua esposizione!`;
}

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    console.log('🎯 [TRASCRIZIONE REALE] Iniziando trascrizione con OpenAI Whisper...');
    console.log('🎵 [AUDIO] File da trascrivere:', audioBlob.size, 'bytes, tipo:', audioBlob.type);
    
    // Controllo API Key
    const apiKey = localStorage.getItem("openai-demo-key");
    if (!apiKey || apiKey.trim().length < 10) {
      throw new Error('API_KEY_REQUIRED');
    }
    
    // Prepara FormData per OpenAI Whisper
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', 'it'); // Italiano
    formData.append('response_format', 'text');
    
    console.log('🤖 [WHISPER] Chiamata API OpenAI per trascrizione...');
    
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ [WHISPER] Errore API:', response.status, errorData);
      
      if (response.status === 401) {
        throw new Error('API_KEY_INVALID');
      } else if (response.status === 429) {
        throw new Error('QUOTA_EXCEEDED');
      } else {
        throw new Error(`Errore trascrizione ${response.status}`);
      }
    }
    
    const transcription = await response.text();
    console.log('✅ [WHISPER REALE] Trascrizione completata:', transcription);
    
    if (!transcription.trim()) {
      throw new Error('Trascrizione vuota - parla più chiaramente');
    }
    
    return transcription.trim();
    
  } catch (error: any) {
    console.error('❌ [TRASCRIZIONE] Errore:', error);
    
    if (error.message?.includes('API_KEY')) {
      throw new Error('❌ API Key OpenAI richiesta per la trascrizione vocale. Configurala nelle impostazioni.');
    } else if (error.message?.includes('QUOTA')) {
      throw new Error('❌ Quota OpenAI esaurita. Ricarica il tuo account o usa la scrittura manuale.');
    }
    
    throw new Error('❌ Errore nella trascrizione. Verifica il microfono e riprova.');
  }
};
