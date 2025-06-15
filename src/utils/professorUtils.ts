
export const askProfessor = async (
  question: string,
  relevantChunks: string[],
  allChunks?: string[],
  allEmbeddings?: number[][]
): Promise<string> => {
  try {
    console.log('👨‍🏫 [AI PROFESSOR] Elaborazione... Chunks rilevanti:', relevantChunks.length);

    // Se viene fornita anche la lista completa dei chunk e embeddings, usiamo il matching preciso
    if (allChunks && allEmbeddings) {
      // Ricrea embed domanda come nel sistema di matching (copiato da embeddingUtils)
      const generateDeterministicEmbedding = (text: string): number[] => {
        const embedding = new Array(1536).fill(0);
        const words = text.toLowerCase().split(/\s+/);
        words.forEach((word, index) => {
          let hash = 0;
          for (let i = 0; i < word.length; i++) {
            const char = word.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
          }
          const pos = Math.abs(hash) % 1536;
          embedding[pos] += 1 / (index + 1);
        });
        const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
        return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
      };

      const cosineSimilarity = (a: number[], b: number[]): number => {
        const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
        const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
        const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
        return dotProduct / (magnitudeA * magnitudeB);
      };

      // Compute question embedding & match
      const questionEmbedding = generateDeterministicEmbedding(question);
      const similars = allEmbeddings.map((emb, idx) => ({
        similarity: cosineSimilarity(questionEmbedding, emb),
        chunk: allChunks[idx]
      }));

      similars.sort((a, b) => b.similarity - a.similarity);
      // Filtro SOLO chunk col matching > 0.7 (regolabile)
      const STRONG_THRESHOLD = 0.7;
      const bestMatches = similars.filter(s => s.similarity >= STRONG_THRESHOLD);

      if (bestMatches.length === 0) {
        // Niente corrispondenza significativa
        console.log(
          '[AI PROFESSOR] Nessun chunk supera la soglia di similarità.',
          similars.slice(0, 5).map(s => s.similarity)
        );
        return `Non ho trovato informazioni sufficientemente rilevanti nel materiale che hai fornito per rispondere a questa domanda.\n
Ti suggerisco di riformulare la domanda o caricare un documento che contenga maggiori dettagli sull'argomento richiesto.`;
      }

      // Restituisci risposta SOLO su questi estratti sopra soglia
      let txt = `Risposta basata esclusivamente sul materiale caricato. Ho trovato ${bestMatches.length} estratto/i pertinente/i:\n\n`;
      bestMatches.forEach((match, i) => {
        txt += `Estratto dal PDF n.${i+1}:\n"${match.chunk.trim().slice(0, 420)}"${match.chunk.length>430?'...':''}\n\n`;
      });
      txt += `Se desideri approfondimenti su questi punti, chiedi pure! Ricorda che la mia risposta si basa SOLO sul materiale caricato.`;
      return txt;
    }

    // Flusso DEMO STANDARD (fallback vecchia versione)
    if (relevantChunks && relevantChunks.length > 0) {
      const contextPreview = relevantChunks.map((chunk, i) => 
        `Estratto [${i + 1}]:\n${chunk.trim()}`
      ).join('\n\n---\n\n');
      let answer = `Dopo aver consultato il materiale fornito, posso offrirti questa risposta basata esclusivamente sul tuo documento:\n\n`;
      answer += contextPreview;
      answer += `\n\n👉 Se hai bisogno di chiarimenti sui punti appena citati, chiedimi pure ulteriori dettagli. La mia risposta si basa SOLO sui contenuti che mi hai fornito.`;
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      console.log('✅ Risposta AI dai chunk.');
      return answer;
    }

    // Nessun matching
    return `Non ho trovato informazioni rilevanti e coerenti nel documento fornito per rispondere a questa domanda. Ti consiglio di riformulare la domanda o caricare un materiale più pertinente.`;
  } catch (error) {
    console.error('❌ Errore Professore AI:', error);
    return "C'è stato un problema tecnico nell'elaborazione della domanda. Come professore AI, preferisco non fornire risposte incerte. Puoi ripetere la domanda o ricaricare il documento?";
  }
};
