
/**
 * Sistema RAG reale con OpenAI GPT per Professore Universitario Virtuale
 */
export const askOpenAIPdfProfessor = async (
  apiKey: string,
  question: string,
  contextChunks: string[]
): Promise<string> => {
  if (!contextChunks || contextChunks.length === 0) {
    return "🔍 Non ho trovato informazioni rilevanti nel documento per rispondere alla tua domanda. Prova a riformulare la domanda o verifica che il PDF contenga informazioni sull'argomento richiesto.";
  }

  // Prompt professionale ottimizzato per risposte accademiche
  const systemPrompt = `Sei un Professore Universitario esperto, rigoroso e didattico.

COMPORTAMENTO RICHIESTO:
- Rispondi SOLO usando le informazioni contenute negli estratti del documento forniti
- Se le informazioni non sono sufficienti, ammettilo onestamente
- Mantieni sempre un tono professionale, accademico ma accessibile
- Struttura le risposte in modo chiaro e pedagogico
- Fornisci esempi quando possibile
- Collega concetti diversi quando appropriato

FORMATO RISPOSTA:
- Inizia con una breve introduzione al tema
- Sviluppa la risposta principale basandoti sui contenuti
- Conclude con eventuali collegamenti o approfondimenti
- Usa formattazione markdown per chiarezza

ESTRATTI DAL DOCUMENTO CARICATO:
${contextChunks.map((chunk, idx) => `
=== ESTRATTO ${idx + 1} ===
${chunk.trim()}
`).join('\n')}

IMPORTANTE: 
- Basa la risposta ESCLUSIVAMENTE su questi estratti
- Non inventare informazioni
- Se gli estratti non contengono abbastanza informazioni, specificalo
- Cita implicitamente da quale estratto provengono le informazioni principali`;

  try {
    console.log('🎓 [PROFESSORE] Elaborando domanda:', question.substring(0, 100));
    console.log('📚 [CONTEXT] Chunk utilizzati:', contextChunks.length);
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o", // Usa GPT-4o per qualità accademica superiore e velocità
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `DOMANDA DELL'STUDENTE: ${question}` }
        ],
        temperature: 0.2, // Bassa per massima aderenza al testo
        max_tokens: 1500, // Spazio sufficiente per risposte elaborate
        top_p: 0.9,
        frequency_penalty: 0.3, // Evita ripetizioni
        presence_penalty: 0.2
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ [OPENAI] Errore risposta:', response.status, errorData);
      
      if (response.status === 401) {
        throw new Error("API Key OpenAI non valida o scaduta");
      } else if (response.status === 429) {
        throw new Error("Limite di chiamate raggiunto. Riprova tra qualche minuto");
      } else if (response.status === 403) {
        throw new Error("Credito OpenAI esaurito. Controlla il tuo account");
      } else {
        throw new Error(`Errore OpenAI ${response.status}: ${errorData?.error?.message || 'Errore sconosciuto'}`);
      }
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content?.trim();
    
    if (!answer) {
      throw new Error("Nessuna risposta generata dal modello GPT");
    }

    console.log('✅ [RISPOSTA] Generata:', answer.length, 'caratteri');
    
    // Aggiungi metadata professore se la risposta è valida
    const professionalAnswer = `${answer}

---
*🎓 Risposta del Professore Universitario Virtuale basata su ${contextChunks.length} sezione/i del documento caricato*`;
    
    return professionalAnswer;
    
  } catch (err: any) {
    console.error("❌ [PROFESSORE] Errore sistema:", err);
    
    // Gestione errori specifica e utile
    if (err.message.includes('API key') || err.message.includes('401')) {
      return "❌ **Errore API Key:** La tua API Key OpenAI non è valida. Verifica di aver inserito la chiave corretta nelle impostazioni.";
    } else if (err.message.includes('rate limit') || err.message.includes('429')) {
      return "⏳ **Limite raggiunto:** Tropppe richieste in poco tempo. Attendi 1-2 minuti e riprova.";
    } else if (err.message.includes('insufficient_quota') || err.message.includes('403')) {
      return "💳 **Credito esaurito:** Il tuo account OpenAI ha esaurito il credito disponibile. Ricarica il tuo account su platform.openai.com";
    } else if (err.message.includes('network') || err.message.includes('fetch')) {
      return "🌐 **Errore connessione:** Problemi di rete. Controlla la tua connessione internet e riprova.";
    }
    
    return `❌ **Errore del Professore Virtuale:** ${err.message}\n\n🔧 **Suggerimenti:**\n• Verifica la tua API Key OpenAI\n• Controlla la connessione internet\n• Riprova tra qualche secondo`;
  }
};

/**
 * Verifica validità API Key OpenAI
 */
export const validateOpenAIApiKey = async (apiKey: string): Promise<boolean> => {
  if (!apiKey || apiKey.length < 20) return false;
  
  try {
    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        "Authorization": "Bearer " + apiKey
      }
    });
    
    return response.ok;
  } catch {
    return false;
  }
};
