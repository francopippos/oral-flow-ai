
// Utility functions for OpenAI-based embeddings and RAG

export interface ChunkWithEmbedding {
  text: string;
  embedding: number[];
  index: number;
  similarity?: number;
}

// Create embeddings for text chunks using OpenAI API
export async function createEmbeddingsForChunks(apiKey: string, chunks: string[]): Promise<number[][]> {
  const embeddings: number[][] = [];
  
  console.log('🧠 [EMBEDDING] Creazione embeddings per', chunks.length, 'chunk...');
  
  // Process chunks in batches to avoid rate limits
  const batchSize = 5;
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    console.log(`🔄 [EMBEDDING] Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(chunks.length/batchSize)}`);
    
    try {
      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: batch,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      // Add embeddings from this batch
      for (const embeddingData of data.data) {
        embeddings.push(embeddingData.embedding);
      }
      
      // Small delay between batches to respect rate limits
      if (i + batchSize < chunks.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
    } catch (error) {
      console.error(`❌ [EMBEDDING] Errore batch ${Math.floor(i/batchSize) + 1}:`, error);
      throw error;
    }
  }
  
  console.log('✅ [EMBEDDING] Completato:', embeddings.length, 'embeddings creati');
  return embeddings;
}

// Create embedding for a single text (like user question)
export async function createEmbedding(apiKey: string, text: string): Promise<number[]> {
  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
  } catch (error) {
    console.error('❌ [EMBEDDING] Errore creazione embedding singolo:', error);
    throw error;
  }
}

// Find most relevant chunks using cosine similarity
export async function findRelevantChunks(
  apiKey: string,
  question: string,
  chunks: string[],
  embeddings: number[][],
  topK: number = 3
): Promise<{ chunks: string[], sourceInfo: string }> {
  if (chunks.length !== embeddings.length) {
    console.warn('⚠️ [SEARCH] Mismatch tra chunks e embeddings, uso ricerca testuale');
    return findRelevantChunksTextBased(question, chunks, topK);
  }

  try {
    console.log('🔍 [SEARCH] Ricerca semantica per:', question.substring(0, 50) + '...');
    
    // Create embedding for the question
    const questionEmbedding = await createEmbedding(apiKey, question);
    
    const similarities: ChunkWithEmbedding[] = [];

    for (let i = 0; i < chunks.length; i++) {
      const similarity = cosineSimilarity(questionEmbedding, embeddings[i]);
      similarities.push({
        text: chunks[i],
        embedding: embeddings[i],
        index: i,
        similarity
      });
    }

    // Sort by similarity (highest first) and take top K
    similarities.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
    
    const topChunks = similarities.slice(0, topK);
    const relevantChunks = topChunks.map(item => item.text);
    
    // Check if we found relevant content
    const avgSimilarity = topChunks.reduce((sum, item) => sum + (item.similarity || 0), 0) / topChunks.length;
    const sourceInfo = avgSimilarity > 0.3 ? 
      "✅ Answer sourced from the PDF" : 
      "⚠️ This answer was not found in the PDF. General GPT knowledge was used.";
    
    console.log('🎯 [SEARCH] Trovati', relevantChunks.length, 'chunk rilevanti (avg similarity:', avgSimilarity.toFixed(3), ')');
    
    return { chunks: relevantChunks, sourceInfo };
    
  } catch (error) {
    console.error('❌ [SEARCH] Errore ricerca semantica:', error);
    // Fallback to text-based search
    return findRelevantChunksTextBased(question, chunks, topK);
  }
}

// Fallback text-based search when embeddings are not available
export function findRelevantChunksTextBased(
  question: string,
  chunks: string[],
  topK: number = 3
): { chunks: string[], sourceInfo: string } {
  console.log('🔍 [FALLBACK] Ricerca testuale per:', question.substring(0, 50) + '...');
  
  const questionWords = question.toLowerCase().split(/\s+/).filter(word => word.length > 2);
  
  const scored = chunks.map((chunk, index) => {
    const chunkLower = chunk.toLowerCase();
    let score = 0;
    
    // Count word matches
    for (const word of questionWords) {
      const matches = (chunkLower.match(new RegExp(word, 'g')) || []).length;
      score += matches;
    }
    
    // Boost score for exact phrase matches
    if (chunkLower.includes(question.toLowerCase())) {
      score += 10;
    }
    
    return {
      text: chunk,
      index,
      score
    };
  });
  
  // Sort by score and return top K
  scored.sort((a, b) => b.score - a.score);
  const relevantChunks = scored.slice(0, topK).map(item => item.text);
  
  const sourceInfo = scored[0]?.score > 0 ? 
    "⚠️ Answer sourced from PDF using text search (no semantic similarity)" :
    "⚠️ This answer was not found in the PDF. General GPT knowledge was used.";
  
  console.log('🎯 [FALLBACK] Trovati', relevantChunks.length, 'chunk con ricerca testuale');
  
  return { chunks: relevantChunks, sourceInfo };
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    console.warn('⚠️ Vettori con lunghezze diverse:', vecA.length, 'vs', vecB.length);
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (normA * normB);
}
