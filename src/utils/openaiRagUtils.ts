
import { optimizeChunksForTokens, compressChunks, getOptimalStrategy, estimateTokens } from './tokenUtils';

/**
 * Sistema RAG ottimizzato con gestione intelligente dei token per OpenAI
 */
export const askOpenAIPdfProfessor = async (
  apiKey: string,
  question: string,
  contextChunks: string[]
): Promise<string> => {
  if (!contextChunks || contextChunks.length === 0) {
    return "🔍 Non ho trovato informazioni rilevanti nel documento per rispondere alla tua domanda. Prova a riformulare la domanda o verifica che il PDF contenga informazioni sull'argomento richiesto.";
  }

  // ===== OTTIMIZZAZIONE TOKEN INTELLIGENTE =====
  console.log(`🧮 [TOKEN MANAGEMENT] Input iniziale: ${contextChunks.length} chunk`);
  
  // Determina strategia ottimale
  const strategy = getOptimalStrategy(contextChunks);
  console.log(`🎯 [STRATEGY] Strategia selezionata: ${strategy.strategy} (max ${strategy.maxTokens} token)`);
  
  // Applica ottimizzazione basata sulla strategia
  let optimizedChunks: string[];
  
  switch (strategy.strategy) {
    case 'full':
      optimizedChunks = contextChunks;
      console.log(`✅ [FULL] Uso tutti i chunk: ${contextChunks.length}`);
      break;
      
    case 'optimized':
      optimizedChunks = optimizeChunksForTokens(contextChunks, strategy.maxTokens);
      console.log(`⚡ [OPTIMIZED] Chunk ottimizzati: ${optimizedChunks.length}`);
      break;
      
    case 'compressed':
      const selectedForCompression = contextChunks.slice(0, strategy.maxChunks);
      optimizedChunks = compressChunks(selectedForCompression, strategy.maxTokens);
      console.log(`🗜️ [COMPRESSED] Chunk compressi: ${optimizedChunks.length}`);
      break;
      
    case 'summarized':
      // Per documenti molto grandi, usa solo i chunk più rilevanti
      optimizedChunks = contextChunks
        .slice(0, strategy.maxChunks)
        .map(chunk => {
          // Estrai solo le parti più significative
          const sentences = chunk.split(/[.!?]+/).filter(s => s.trim().length > 20);
          return sentences.slice(0, 3).join('. ') + '.';
        });
      console.log(`📝 [SUMMARIZED] Chunk riassunti: ${optimizedChunks.length}`);
      break;
      
    default:
      optimizedChunks = contextChunks.slice(0, 8);
  }
  
  // Verifica finale dei token
  const finalTokens = optimizedChunks.reduce((sum, chunk) => sum + estimateTokens(chunk), 0);
  console.log(`🎯 [FINAL CHECK] Token finali: ${finalTokens} (limite: ${strategy.maxTokens})`);
  
  if (finalTokens > strategy.maxTokens) {
    console.log(`⚠️ [EMERGENCY] Ancora troppi token, compressione finale...`);
    optimizedChunks = compressChunks(optimizedChunks, strategy.maxTokens * 0.8);
  }

  // Prompt professionale ottimizzato per risposte accademiche
  const systemPrompt = `You are a PROFESSOR who has just studied the uploaded PDF document and is now being TESTED on its contents.

🎯 CORE BEHAVIOR:
You must behave exactly like a professor who has read and mastered this specific document, and you're now answering questions about it during an oral examination.

📋 STRICT RULES:
1. **PDF-FIRST APPROACH**: Answer EXCLUSIVELY based on the document content provided below
2. **ACADEMIC HONESTY**: If the answer isn't in the PDF, clearly state: "This specific document does not cover [topic]"
3. **NO INVENTION**: Never guess, invent, or make up information not explicitly in the PDF
4. **PROFESSOR PERSONA**: Respond like an expert who studied this exact document
5. **CITE IMPLICITLY**: Reference which sections your answer comes from (e.g., "According to the material...")

🧑‍🏫 RESPONSE STYLE:
- Professional, confident, but honest about document limitations
- If information is missing: "The document I studied does not include information about..."
- Optional general knowledge: ONLY if user explicitly asks, and ALWAYS clearly marked as "However, from my general academic knowledge (not from this document)..."

📚 DOCUMENT EXTRACTS TO STUDY:
${optimizedChunks.map((chunk, idx) => `
=== SECTION ${idx + 1} ===
${chunk.trim()}
`).join('\n')}

🎓 YOUR TASK:
Answer the student's question as a professor being tested on THIS SPECIFIC DOCUMENT ONLY.
If the document doesn't contain enough information, be honest about it.
Never supplement with external knowledge unless explicitly requested and clearly labeled.`;

  try {
    console.log('🎓 [PROFESSORE REALE] Elaborando domanda:', question.substring(0, 100));
    console.log('📚 [CONTEXT REALE] Chunk utilizzati:', optimizedChunks.length);
    console.log('🧮 [TOKEN ESTIMATE] Token stimati:', estimateTokens(systemPrompt + question));
    console.log('🤖 [GPT-4o REALE] Preparando chiamata API OpenAI...');
    console.log('🔐 [API KEY] Lunghezza:', apiKey.length, 'caratteri');
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Usa GPT-4o-mini per efficienza e costi ridotti
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `STUDENT QUESTION: ${question}` }
        ],
        temperature: 0.2, // Bassa per massima aderenza al testo
        max_tokens: Math.min(1200, 4096 - estimateTokens(systemPrompt + question)), // Dinamico
        top_p: 0.9,
        frequency_penalty: 0.3, // Evita ripetizioni
        presence_penalty: 0.2
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ [OPENAI] Errore risposta:', response.status, errorData);
      
      if (response.status === 401) {
        throw new Error("API_KEY_INVALID");
      } else if (response.status === 429) {
        throw new Error("QUOTA_EXCEEDED");
      } else if (response.status === 403) {
        throw new Error("QUOTA_EXCEEDED");
      } else {
        throw new Error(`Errore OpenAI ${response.status}: ${errorData?.error?.message || 'Errore sconosciuto'}`);
      }
    }

    const data = await response.json();
    console.log('🤖 [GPT-4o RISPOSTA] Ricevuta da OpenAI:', JSON.stringify(data, null, 2).substring(0, 500) + '...');
    
    const answer = data.choices?.[0]?.message?.content?.trim();
    
    if (!answer) {
      throw new Error("Nessuna risposta generata dal modello GPT");
    }

    console.log('✅ [RISPOSTA REALE] Generata da GPT-4o:', answer.length, 'caratteri');
    console.log('📝 [PREVIEW RISPOSTA]:', answer.substring(0, 200) + '...');
    
    // Aggiungi metadata professore con info ottimizzazione
    const strategyInfo = strategy.strategy === 'full' ? 'tutte le' : `${optimizedChunks.length} sezioni ottimizzate delle ${contextChunks.length}`;
    const professionalAnswer = `${answer}

---
*🎓 Risposta del Professore Universitario Virtuale basata su ${strategyInfo} sezioni del documento caricato*`;
    
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
