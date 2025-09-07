/**
 * Legacy Bistro API utilities - use enhanced version for new features
 */
import { getSupabaseClient, invokeFunctionWithCache, handleAPIError } from './aiApiClient';
import { createEmbeddings, cosineSimilarity } from './embeddingUtils';
import { findRelevantChunks } from './contextSelection';

export const askBistroProfessor = async (question: string, contextChunks: string[]): Promise<string> => {
  try {
    console.log('🤖 [BISTRO] Sending question...', question.substring(0, 100));
    
    const data = await invokeFunctionWithCache('bistro-chat', {
      question,
      contextChunks
    });

    let response = data.answer;
    
    // Add optimization info if available
    if (data.strategy && data.strategy !== 'full') {
      response += `\n\n---\n📊 **Bistro Processing:** Used ${data.chunksUsed} document sections (${data.strategy} optimization)`;
    }
    
    console.log('✅ [BISTRO] Response received');
    return response;

  } catch (error: any) {
    throw handleAPIError(error, 'BISTRO');
  }
}

// Use optimized embeddings from new module
export const createEmbeddingsWithBistro = createEmbeddings;

// Re-export optimized similarity function
export { cosineSimilarity };

// Use optimized context selection
export const findRelevantChunksWithBistro = async (
  question: string, 
  chunks: string[], 
  embeddings: number[][],
  topK: number = 3
): Promise<{ chunks: string[], sourceInfo: string }> => {
  const result = await findRelevantChunks(question, chunks, embeddings, topK);
  return {
    chunks: result.chunks,
    sourceInfo: result.sourceInfo
  };
};