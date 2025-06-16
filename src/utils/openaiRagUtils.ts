
/**
 * Utility to call OpenAI GPT with REAL PDF chunks for accurate RAG responses.
 */
export const askOpenAIPdfProfessor = async (
  apiKey: string,
  question: string,
  contextChunks: string[]
): Promise<string> => {
  if (!contextChunks || contextChunks.length === 0) {
    return "Non ho trovato informazioni rilevanti nel documento per rispondere alla tua domanda. Prova a riformulare la domanda o verifica che il PDF contenga informazioni sull'argomento richiesto.";
  }

  const systemPrompt = `Sei un professore universitario esperto e scrupoloso. 

REGOLE FONDAMENTALI:
- Rispondi ESCLUSIVAMENTE usando le informazioni contenute negli estratti del documento forniti qui sotto
- Se la risposta non è presente negli estratti, dillo chiaramente
- Non inventare o aggiungere informazioni non presenti negli estratti
- Mantieni un tono professionale e accademico
- Struttura la risposta in modo chiaro e dettagliato quando possibile

ESTRATTI DAL DOCUMENTO:
${contextChunks.map((chunk, idx) => `
=== ESTRATTO ${idx + 1} ===
${chunk}
`).join('\n')}

IMPORTANTE: Basa la tua risposta SOLO su questi estratti. Se non trovi informazioni sufficienti, ammettilo esplicitamente.`;

  try {
    console.log('🤖 Chiamata OpenAI con', contextChunks.length, 'chunk rilevanti');
    console.log('❓ Domanda:', question);
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4", // Usa GPT-4 per risposte più accurate
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Domanda: ${question}` }
        ],
        temperature: 0.1, // Bassa temperatura per massima aderenza al testo
        max_tokens: 1000,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Errore OpenAI:', errorData);
      throw new Error(errorData?.error?.message || `Errore OpenAI: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content?.trim();
    
    if (!answer) {
      throw new Error("Nessuna risposta generata dal modello");
    }

    console.log('✅ Risposta OpenAI generata:', answer.substring(0, 100) + '...');
    return answer;
    
  } catch (err: any) {
    console.error("❌ Errore nella chiamata GPT:", err);
    
    if (err.message.includes('API key')) {
      return "❌ Errore: API Key OpenAI non valida. Controlla la tua chiave API.";
    } else if (err.message.includes('rate limit')) {
      return "❌ Errore: Limite di chiamate raggiunto. Riprova tra qualche minuto.";
    } else if (err.message.includes('insufficient_quota')) {
      return "❌ Errore: Credito OpenAI esaurito. Controlla il tuo account OpenAI.";
    }
    
    return `❌ Errore nella generazione della risposta: ${err.message}. Riprova o controlla la tua API Key.`;
  }
};
