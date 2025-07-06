
import { pipeline } from '@huggingface/transformers';

let embeddingPipeline: any = null;

const initializeEmbeddingModel = async () => {
  if (!embeddingPipeline) {
    console.log('🧠 Inizializzando modello embedding...');
    try {
      embeddingPipeline = await pipeline(
        'feature-extraction',
        'mixedbread-ai/mxbai-embed-xsmall-v1',
        { 
          device: 'webgpu',
          progress_callback: (progress: any) => {
            if (progress.status === 'downloading') {
              console.log(`📥 Download modello REALE: ${Math.round(progress.progress || 0)}%`);
            }
          }
        }
      );
      console.log('✅ Modello embedding pronto');
    } catch (error) {
      console.error('❌ Errore nell\'inizializzazione del modello:', error);
      throw new Error('Impossibile inizializzare il modello di embedding');
    }
  }
  return embeddingPipeline;
};

export const createEmbeddings = async (chunks: string[]): Promise<number[][]> => {
  try {
    console.log('🧠 Creando embedding REALI per', chunks.length, 'chunk...');
    
    const model = await initializeEmbeddingModel();
    const embeddings: number[][] = [];
    
    for (let i = 0; i < chunks.length; i++) {
      console.log(`📊 Processando chunk ${i + 1}/${chunks.length}`);
      
      try {
        // Genera embedding reale usando il modello HuggingFace
        const output = await model(chunks[i], { pooling: 'mean', normalize: true });
        const embedding = Array.from(output.data) as number[];
        embeddings.push(embedding);
      } catch (chunkError) {
        console.error(`❌ ERRORE CRITICO nel chunk ${i + 1}:`, chunkError);
        throw new Error(`Impossibile processare chunk ${i + 1}: ${chunkError}`);
      }
      
      // Piccola pausa per non sovraccaricare
      if (i < chunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log('✅ Embedding REALI creati con successo');
    return embeddings;
  } catch (error) {
    console.error('❌ ERRORE CRITICO nella creazione degli embedding:', error);
    throw new Error(`Impossibile creare embedding reali: ${error}. Sistema RAG non può funzionare senza embedding validi.`);
  }
};

export const findRelevantChunks = async (
  question: string,
  chunks: string[],
  embeddings: number[][]
): Promise<string[]> => {
  try {
    console.log('🔍 Ricerca semantica REALE per:', question.substring(0, 50) + '...');
    
    const model = await initializeEmbeddingModel();
    
    // Genera embedding REALE per la domanda
    const questionOutput = await model(question, { pooling: 'mean', normalize: true });
    const questionEmbedding = Array.from(questionOutput.data) as number[];

    // Calcola similarità coseno REALE
    const similarities = embeddings.map((embedding, index) => ({
      index,
      similarity: cosineSimilarity(questionEmbedding, embedding),
      chunk: chunks[index]
    }));

    // Ordina per similarità e prendi i top 3-5 chunk più rilevanti
    const topChunks = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 4) // Prendiamo i 4 chunk più rilevanti
      .filter(item => item.similarity > 0.1) // Soglia più bassa per catturare più contenuti
      .map(item => {
        console.log(`📋 Chunk rilevante (similarità: ${item.similarity.toFixed(3)}): ${item.chunk.substring(0, 100)}...`);
        return item.chunk;
      });

    console.log('✅ Trovati', topChunks.length, 'chunk REALMENTE rilevanti');
    return topChunks.length > 0 ? topChunks : chunks.slice(0, 3); // Fallback ai primi chunk
  } catch (error) {
    console.error('❌ ERRORE CRITICO nella ricerca semantica:', error);
    throw new Error(`Ricerca semantica fallita: ${error}. Sistema RAG non funzionante.`);
  }
};

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    console.warn('⚠️ Vettori con lunghezze diverse:', a.length, 'vs', b.length);
    return 0;
  }
  
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  
  return dotProduct / (magnitudeA * magnitudeB);
}
