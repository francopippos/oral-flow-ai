
const OPENAI_API_KEY = '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';

interface Chunk {
  text: string;
  embedding: number[];
  index: number;
}

export const createEmbeddings = async (chunks: string[]): Promise<Chunk[]> => {
  const chunksWithEmbeddings: Chunk[] = [];
  
  try {
    console.log(`🔮 Creando embeddings per ${chunks.length} chunk...`);
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      
      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-3-large',
          input: chunk,
        }),
      });

      if (!response.ok) {
        throw new Error(`Errore API OpenAI: ${response.status}`);
      }

      const data = await response.json();
      const embedding = data.data[0].embedding;

      chunksWithEmbeddings.push({
        text: chunk,
        embedding: embedding,
        index: i,
      });
      
      // Piccola pausa per evitare rate limiting
      if (i < chunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log(`✅ Embeddings creati per ${chunksWithEmbeddings.length} chunk`);
    return chunksWithEmbeddings;
  } catch (error) {
    console.error('❌ Errore nella creazione degli embeddings:', error);
    throw error;
  }
};

export const findRelevantChunks = async (query: string, chunks: Chunk[]): Promise<Chunk[]> => {
  try {
    console.log('🔍 Creazione embedding per la query...');
    
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-large',
        input: query,
      }),
    });

    if (!response.ok) {
      throw new Error(`Errore API OpenAI: ${response.status}`);
    }

    const data = await response.json();
    const queryEmbedding = data.data[0].embedding;
    
    // Calcola la similarità coseno con tutti i chunk
    const similarities = chunks.map(chunk => ({
      chunk,
      similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
    }));
    
    // Ordina per similarità e prendi i top 3
    similarities.sort((a, b) => b.similarity - a.similarity);
    const topChunks = similarities.slice(0, 3).map(item => item.chunk);
    
    console.log(`✅ Trovati ${topChunks.length} chunk rilevanti`);
    return topChunks;
  } catch (error) {
    console.error('❌ Errore nella ricerca dei chunk:', error);
    // Fallback: restituisce i primi 3 chunk
    return chunks.slice(0, 3);
  }
};

const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};
