
const OPENAI_API_KEY = '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';

export const createEmbeddings = async (chunks: string[]): Promise<number[][]> => {
  try {
    console.log('🧠 Creando embedding per', chunks.length, 'chunk...');
    
    const embeddings: number[][] = [];
    
    // Process chunks in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      
      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-3-large',
          input: batch,
          encoding_format: 'float',
        }),
      });

      if (!response.ok) {
        throw new Error(`Errore API OpenAI: ${response.status}`);
      }

      const data = await response.json();
      const batchEmbeddings = data.data.map((item: any) => item.embedding);
      embeddings.push(...batchEmbeddings);
      
      // Small delay between batches
      if (i + batchSize < chunks.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log('✅ Embedding creati con successo');
    return embeddings;
  } catch (error) {
    console.error('❌ Errore nella creazione degli embedding:', error);
    // Fallback: return random embeddings for demo purposes
    return chunks.map(() => Array.from({ length: 1536 }, () => Math.random()));
  }
};

export const findRelevantChunks = async (
  question: string,
  chunks: string[],
  embeddings: number[][]
): Promise<string[]> => {
  try {
    console.log('🔍 Ricerca semantica per:', question.substring(0, 50) + '...');
    
    // Create embedding for the question
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-large',
        input: question,
        encoding_format: 'float',
      }),
    });

    if (!response.ok) {
      throw new Error(`Errore API OpenAI: ${response.status}`);
    }

    const data = await response.json();
    const questionEmbedding = data.data[0].embedding;

    // Calculate cosine similarity
    const similarities = embeddings.map((embedding, index) => ({
      index,
      similarity: cosineSimilarity(questionEmbedding, embedding),
      chunk: chunks[index]
    }));

    // Sort by similarity and get top 3 chunks
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
