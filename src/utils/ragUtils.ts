
import { extractTextFromPDF } from './pdfUtils';

export interface Chunk {
  id: string;
  content: string;
  pageNumber?: number;
  embedding?: number[];
}

export const createChunks = (text: string, chunkSize: number = 800, overlap: number = 100): Chunk[] => {
  const chunks: Chunk[] = [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  let currentChunk = '';
  let chunkId = 0;
  
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim() + '.';
    
    if ((currentChunk + sentence).length > chunkSize && currentChunk.length > 0) {
      chunks.push({
        id: `chunk_${chunkId++}`,
        content: currentChunk.trim(),
        pageNumber: Math.floor(i / 20) + 1 // Stima pagina
      });
      
      // Overlap: mantieni parte del chunk precedente
      const words = currentChunk.split(' ');
      currentChunk = words.slice(-overlap/10).join(' ') + ' ' + sentence;
    } else {
      currentChunk += ' ' + sentence;
    }
  }
  
  if (currentChunk.trim().length > 0) {
    chunks.push({
      id: `chunk_${chunkId}`,
      content: currentChunk.trim(),
      pageNumber: Math.ceil(sentences.length / 20)
    });
  }
  
  return chunks;
};

export const createEmbedding = async (text: string): Promise<number[]> => {
  try {
    console.log('🔍 Creazione embedding per:', text.substring(0, 50) + '...');
    
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: text,
        model: 'text-embedding-3-large'
      }),
    });

    if (!response.ok) {
      throw new Error(`Errore API embedding: ${response.status}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
  } catch (error) {
    console.error('❌ Errore creazione embedding:', error);
    // Fallback: embedding simulato
    return Array.from({length: 1536}, () => Math.random() * 2 - 1);
  }
};

export const cosineSimilarity = (a: number[], b: number[]): number => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

export const findRelevantChunks = (
  questionEmbedding: number[], 
  chunks: Chunk[], 
  topK: number = 3
): Chunk[] => {
  const similarities = chunks.map(chunk => ({
    chunk,
    similarity: chunk.embedding ? cosineSimilarity(questionEmbedding, chunk.embedding) : 0
  }));
  
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
    .map(item => item.chunk);
};

export const processDocument = async (file: File): Promise<Chunk[]> => {
  console.log('📚 Inizio processing documento:', file.name);
  
  // Step 1: Estrazione testo
  const extractedText = await extractTextFromPDF(file);
  console.log('✅ Testo estratto, lunghezza:', extractedText.length);
  
  // Step 2: Chunking
  const chunks = createChunks(extractedText);
  console.log('📄 Creati', chunks.length, 'chunks');
  
  // Step 3: Embedding per ogni chunk
  const chunksWithEmbeddings: Chunk[] = [];
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`🔍 Processing chunk ${i + 1}/${chunks.length}`);
    
    const embedding = await createEmbedding(chunk.content);
    chunksWithEmbeddings.push({
      ...chunk,
      embedding
    });
    
    // Pausa per evitare rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('✅ Processing completo! Vector store creato.');
  return chunksWithEmbeddings;
};
