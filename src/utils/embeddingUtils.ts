
export const createEmbeddings = async (chunks: string[]): Promise<number[][]> => {
  try {
    console.log('🧠 Creando embedding per', chunks.length, 'chunk...');
    
    // Simulazione di embedding per la demo
    // In produzione, qui useremmo una vera API di embedding
    const embeddings: number[][] = [];
    
    for (let i = 0; i < chunks.length; i++) {
      // Generiamo embedding deterministici basati sul contenuto
      const embedding = generateDeterministicEmbedding(chunks[i]);
      embeddings.push(embedding);
      
      // Piccola pausa per simulare l'elaborazione
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    console.log('✅ Embedding creati con successo');
    return embeddings;
  } catch (error) {
    console.error('❌ Errore nella creazione degli embedding:', error);
    // Fallback: return deterministic embeddings
    return chunks.map((chunk, index) => generateDeterministicEmbedding(chunk));
  }
};

function generateDeterministicEmbedding(text: string): number[] {
  // Genera un embedding deterministico basato sul testo
  const embedding = new Array(1536).fill(0);
  const words = text.toLowerCase().split(/\s+/);
  
  words.forEach((word, index) => {
    const hash = simpleHash(word);
    const pos = hash % 1536;
    embedding[pos] += 1 / (index + 1);
  });
  
  // Normalizza il vettore
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export const findRelevantChunks = async (
  question: string,
  chunks: string[],
  embeddings: number[][]
): Promise<string[]> => {
  try {
    console.log('🔍 Ricerca semantica per:', question.substring(0, 50) + '...');
    
    // Genera embedding per la domanda
    const questionEmbedding = generateDeterministicEmbedding(question);

    // Calcola similarità coseno
    const similarities = embeddings.map((embedding, index) => ({
      index,
      similarity: cosineSimilarity(questionEmbedding, embedding),
      chunk: chunks[index]
    }));

    // Ordina per similarità e prendi i top 3 chunk
    const topChunks = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3)
      .map(item => item.chunk);

    console.log('✅ Trovati', topChunks.length, 'chunk rilevanti');
    return topChunks;
  } catch (error) {
    console.error('❌ Errore nella ricerca semantica:', error);
    // Fallback: return first few chunks
    return chunks.slice(0, 3);
  }
};

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}
