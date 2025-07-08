/**
 * Sistema RAG locale di emergenza quando OpenAI non è disponibile
 */

export const askLocalPdfProfessor = async (
  question: string,
  contextChunks: string[]
): Promise<string> => {
  if (!contextChunks || contextChunks.length === 0) {
    return "🔍 Non ho trovato informazioni rilevanti nel documento per rispondere alla tua domanda.";
  }

  console.log('🎓 [PROFESSORE LOCALE] Elaborando domanda con AI locale...');
  
  // Analisi locale semplificata ma efficace
  const questionLower = question.toLowerCase();
  const keywords = questionLower.split(/\s+/).filter(word => word.length > 3);
  
  // Trova i chunk più rilevanti usando keyword matching
  const scoredChunks = contextChunks.map((chunk, index) => {
    const chunkLower = chunk.toLowerCase();
    const matches = keywords.filter(keyword => chunkLower.includes(keyword)).length;
    const relevanceScore = matches / keywords.length;
    
    return {
      chunk,
      score: relevanceScore,
      index
    };
  }).sort((a, b) => b.score - a.score);

  const bestChunks = scoredChunks.slice(0, 3).filter(item => item.score > 0);
  
  if (bestChunks.length === 0) {
    return `🤔 **Analisi locale completata**

Non ho trovato corrispondenze dirette nel documento per la tua domanda: "${question}"

**Suggerimenti:**
• Prova con termini più specifici presenti nel documento
• Verifica l'ortografia dei termini tecnici
• Riforma la domanda in modo più semplice

**Nota:** Sistema in modalità locale (senza OpenAI) - funzionalità limitata ma sempre disponibile.`;
  }

  // Genera una risposta strutturata basata sui chunk trovati
  const contextText = bestChunks.map(item => item.chunk).join('\n\n');
  
  const localResponse = `📚 **Risposta del Professore Virtuale (Modalità Locale)**

**Sulla base del documento analizzato, ecco cosa ho trovato:**

${contextText}

---

**Analisi locale:** Ho trovato ${bestChunks.length} sezione/i rilevanti nel documento che potrebbero rispondere alla tua domanda.

*🔧 Sistema in modalità locale - Per risposte più elaborate e precise, configura una API Key OpenAI valida.*`;

  return localResponse;
};