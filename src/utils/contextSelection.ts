/**
 * Optimized context selection with adaptive strategies
 */
import { preFilterChunks, maximumMarginalRelevance, ScoredChunk } from './relevanceScoring';
import { estimateTokens, optimizeChunksForTokens } from './tokenUtils';
import { createEmbeddings, calculateSimilarities } from './embeddingUtils';

export type ContextDepth = 'minimal' | 'standard' | 'comprehensive';

export interface ContextSelectionOptions {
  contextDepth?: ContextDepth;
  maxTokens?: number;
  useSemanticSearch?: boolean;
  diversityWeight?: number;
  minRelevanceScore?: number;
}

export interface ContextResult {
  chunks: string[];
  strategy: string;
  stats: {
    originalCount: number;
    filteredCount: number;
    selectedCount: number;
    totalTokens: number;
    avgRelevance?: number;
    method: string;
  };
}

// Token budgets based on context depth
const TOKEN_BUDGETS: Record<ContextDepth, (max: number) => number> = {
  minimal: (max) => Math.floor(max * 0.4),
  standard: (max) => Math.floor(max * 0.6),
  comprehensive: (max) => Math.floor(max * 0.8)
};

export const selectOptimalContext = async (
  question: string,
  chunks: string[],
  options: ContextSelectionOptions = {}
): Promise<ContextResult> => {
  
  const {
    contextDepth = 'standard',
    maxTokens = 8000,
    useSemanticSearch = true,
    diversityWeight = 0.3,
    minRelevanceScore = 0.1
  } = options;
  
  console.log('Context selection starting...');
  
  const targetTokens = TOKEN_BUDGETS[contextDepth](maxTokens);
  
  // Step 1: Pre-filter by text relevance
  const preFiltered = preFilterChunks(
    question, 
    chunks, 
    Math.min(30, chunks.length * 2),
    minRelevanceScore
  );
  
  if (preFiltered.filteredChunks.length === 0) {
    return {
      chunks: chunks.slice(0, Math.min(3, chunks.length)),
      strategy: 'fallback_first_chunks',
      stats: {
        originalCount: chunks.length,
        filteredCount: 0,
        selectedCount: Math.min(3, chunks.length),
        totalTokens: estimateTokens(chunks.slice(0, 3).join(' ')),
        method: 'fallback'
      }
    };
  }
  
  let selectedChunks: string[] = [];
  let strategy = '';
  let method = '';
  
  try {
    if (useSemanticSearch && preFiltered.filteredChunks.length > 1) {
      console.log('Using semantic search...');
      
      const [questionEmbeddings, chunkEmbeddings] = await Promise.all([
        createEmbeddings([question]),
        createEmbeddings(preFiltered.filteredChunks)
      ]);
      
      const similarities = calculateSimilarities(
        questionEmbeddings[0], 
        chunkEmbeddings
      );
      
      const scoredChunks: ScoredChunk[] = similarities.map(({ index, similarity }) => ({
        content: preFiltered.filteredChunks[index],
        score: similarity,
        tokens: estimateTokens(preFiltered.filteredChunks[index]),
        index
      }));
      
      const mmrSelected = maximumMarginalRelevance(
        scoredChunks.sort((a, b) => b.score - a.score),
        targetTokens,
        diversityWeight
      );
      
      selectedChunks = mmrSelected.map(chunk => chunk.content);
      strategy = `semantic_mmr_${contextDepth}`;
      method = 'semantic_search';
      
    } else {
      throw new Error('Semantic search disabled or insufficient chunks');
    }
    
  } catch (error) {
    console.log('Falling back to text-based selection...');
    
    const scoredChunks: ScoredChunk[] = preFiltered.filteredChunks.map((chunk, index) => ({
      content: chunk,
      score: preFiltered.stats.avgScore,
      tokens: estimateTokens(chunk),
      index
    }));
    
    const mmrSelected = maximumMarginalRelevance(
      scoredChunks,
      targetTokens,
      diversityWeight
    );
    
    selectedChunks = mmrSelected.map(chunk => chunk.content);
    strategy = `text_mmr_${contextDepth}`;
    method = 'text_search';
  }
  
  // Final optimization to fit token budget
  if (selectedChunks.length > 0) {
    const totalTokens = selectedChunks.reduce((sum, chunk) => sum + estimateTokens(chunk), 0);
    
    if (totalTokens > targetTokens) {
      selectedChunks = optimizeChunksForTokens(selectedChunks, targetTokens);
      strategy += '_optimized';
    }
  }
  
  const finalTokens = selectedChunks.reduce((sum, chunk) => sum + estimateTokens(chunk), 0);
  
  return {
    chunks: selectedChunks,
    strategy,
    stats: {
      originalCount: chunks.length,
      filteredCount: preFiltered.stats.filtered,
      selectedCount: selectedChunks.length,
      totalTokens: finalTokens,
      avgRelevance: preFiltered.stats.avgScore,
      method
    }
  };
};

// Smart chunk relevance for simple cases
export const findRelevantChunks = async (
  question: string,
  chunks: string[],
  embeddings: number[][] = [],
  topK: number = 10
): Promise<{ chunks: string[], sourceInfo: string, stats: any }> => {
  
  const options: ContextSelectionOptions = {
    contextDepth: 'standard',
    maxTokens: topK * 500,
    useSemanticSearch: embeddings.length === chunks.length,
  };
  
  const result = await selectOptimalContext(question, chunks, options);
  
  return {
    chunks: result.chunks.slice(0, topK),
    sourceInfo: `${result.strategy} (${result.chunks.length}/${chunks.length} chunks)`,
    stats: result.stats
  };
};