/**
 * Enhanced Bistro API utilities with optimized context selection
 */
import { getSupabaseClient, invokeFunctionWithCache, handleAPIError } from './aiApiClient';
import { selectOptimalContext, ContextDepth } from './contextSelection';
import { createEmbeddings, cosineSimilarity } from './embeddingUtils';

interface EnhancedChatOptions {
  contextDepth?: ContextDepth;
  maxTokens?: number;
  useAdaptiveRetrieval?: boolean;
  enableVisionAnalysis?: boolean;
}

interface EnhancedChatResponse {
  answer: string;
  strategy: string;
  chunksUsed: number;
  totalChunksAvailable: number;
  contextDepth: string;
  success: boolean;
  usage?: any;
}

// Enhanced chat function with optimized context selection
export async function askEnhancedBistroProfessor(
  question: string, 
  contextChunks: string[],
  options: EnhancedChatOptions = {}
): Promise<string> {
  const { 
    contextDepth = 'standard',
    maxTokens = 8000,
    useAdaptiveRetrieval = true,
    enableVisionAnalysis = false
  } = options;

  try {
    console.log('🚀 Enhanced Bistro request:', {
      question: question.substring(0, 100) + '...',
      chunks: contextChunks.length,
      contextDepth,
      maxTokens
    });

    // Pre-optimize context selection before sending to edge function
    let optimizedChunks = contextChunks;
    if (useAdaptiveRetrieval && contextChunks.length > 5) {
      const contextResult = await selectOptimalContext(question, contextChunks, {
        contextDepth,
        maxTokens: Math.floor(maxTokens * 0.7), // Reserve tokens for response
        useSemanticSearch: true
      });
      optimizedChunks = contextResult.chunks;
      console.log(`🎯 Context optimized: ${contextResult.chunks.length}/${contextChunks.length} chunks selected`);
    }

    const data = await invokeFunctionWithCache('enhanced-bistro-chat', {
      question,
      contextChunks: optimizedChunks,
      maxTokens,
      contextDepth,
      useAdaptiveRetrieval
    });

    const response = data as EnhancedChatResponse;

    console.log('✅ Enhanced response:', {
      strategy: response.strategy,
      chunksUsed: response.chunksUsed,
      contextDepth: response.contextDepth
    });

    return response.answer;

  } catch (error) {
    console.error('Enhanced Bistro error:', error);
    throw handleAPIError(error, 'Enhanced Bistro');
  }
}

// Re-export optimized functions from dedicated modules
export { scoreChunkRelevance, preFilterChunks } from './relevanceScoring';
export { createEmbeddings as createEmbeddingsWithEnhancedBistro } from './embeddingUtils';
export { findRelevantChunks as findRelevantChunksWithEnhancedBistro } from './contextSelection';

// Legacy compatibility exports - use new optimized modules instead
// These are kept for backward compatibility only