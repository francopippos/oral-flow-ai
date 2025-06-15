
export const askProfessor = async (
  question: string,
  relevantChunks: string[],
  allChunks?: string[],
  allEmbeddings?: number[][]
): Promise<string> => {
  try {
    console.log('👨‍🏫 [AI PROFESSOR] Matching massimo SEMPRE attivo. Chunks rilevanti:', relevantChunks.length);

    // Matching severo SEMPRE
    if (allChunks && allEmbeddings) {
      // Ricrea embed domanda come nel sistema di matching
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

      // Solo chunk SEVERAMENTE simili
      const STRONG_THRESHOLD = 0.7;
      const bestMatches = similars.filter(s => s.similarity >= STRONG_THRESHOLD);

      if (bestMatches.length === 0) {
        console.log('[AI PROFESSOR] Nessun chunk supera la soglia di severità.', similars.slice(0, 5).map(s => s.similarity));
        return `
Non ho trovato nessuna informazione chiaramente collegata alla tua domanda nel materiale che mi hai fornito. 
Prova a riformulare la domanda o ad arricchire il documento con parti più dettagliate sull'argomento.
        `.trim();
      }

      // SOLO estratti nettamente in topic
      let txt = `Risposta basata SOLO su informazioni trovate nel tuo PDF (matching ≥0.7). Estratti pertinenti:\n\n`;
      bestMatches.forEach((match, i) => {
        txt += `Estratto ${i + 1} (similarità ${match.similarity.toFixed(2)}):\n"${match.chunk.trim().slice(0, 420)}"${match.chunk.length > 430 ? '...' : ''}\n\n`;
      });
      txt += `\nVuoi approfondire uno di questi punti? Ricorda: rispondo soltanto con materiale tratto dal tuo documento.`;
      return txt;
    }

    // Fallback se proprio manca tutto
    return `Non sono riuscito a trovare nel documento informazioni abbastanza collegate alla domanda. Per favore, prova a specificare meglio la richiesta o fornisci un materiale più dettagliato.`;

  } catch (error) {
    console.error('❌ Errore Professore AI:', error);
    return "C'è stato un problema tecnico nell'elaborazione della domanda. Puoi riprovare o ricaricare il documento?";
  }
};
