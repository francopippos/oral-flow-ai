/**
 * Optimized relevance scoring and chunk selection algorithms
 */
import { estimateTokens } from './tokenUtils';

const COMMON_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
  'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did',
  'will', 'would', 'could', 'should', 'may', 'might', 'can', 'what', 'how', 'when',
  'where', 'why', 'who', 'which', 'this', 'that', 'these', 'those'
]);

const MATH_TERMS = new Set([
  'equation', 'formula', 'calculate', 'solve', 'function', 'derivative', 'integral',
  'matrix', 'vector', 'probability', 'theorem', 'proof', 'algorithm', 'coefficient',
  'variable', 'constant', 'graph', 'plot', 'chart', 'data', 'statistics',
  '=', '+', '-', '*', '/', '^', '√', '∑', '∫', '∂', 'α', 'β', 'γ', 'δ', 'π', 'σ'
]);

export interface ScoredChunk {
  content: string;
  score: number;
  tokens: number;
  index: number;
}

// Optimized relevance scoring with caching
const scoringCache = new Map<string, number>();

export const scoreChunkRelevance = (question: string, chunk: string, index: number = 0): number => {
  const cacheKey = `${question.slice(0, 50)}:${chunk.slice(0, 50)}`;
  
  if (scoringCache.has(cacheKey)) {
    return scoringCache.get(cacheKey)!;
  }
  
  const questionLower = question.toLowerCase();
  const chunkLower = chunk.toLowerCase();
  
  // Extract meaningful words
  const questionWords = questionLower
    .split(/\s+/)
    .filter(word => word.length > 2 && !COMMON_WORDS.has(word));
  
  if (questionWords.length === 0) {
    scoringCache.set(cacheKey, 0);
    return 0;
  }
  
  let score = 0;
  
  // Exact phrase matches (highest weight)
  const phrases = extractPhrases(questionLower);
  for (const phrase of phrases) {
    if (chunkLower.includes(phrase)) {
      score += 2.0;
    }
  }
  
  // Individual word matches with position weighting
  let wordMatches = 0;
  for (const word of questionWords) {
    if (chunkLower.includes(word)) {
      wordMatches++;
      
      // Bonus for exact word boundaries and early position
      const wordRegex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = chunkLower.match(wordRegex) || [];
      const firstIndex = chunkLower.indexOf(word);
      const positionBonus = Math.max(0, 1 - (firstIndex / chunkLower.length));
      
      score += matches.length * (0.5 + positionBonus * 0.3);
    }
  }
  
  // Word match ratio
  const wordMatchRatio = wordMatches / questionWords.length;
  score += wordMatchRatio * 1.0;
  
  // Length and quality bonuses/penalties
  if (chunk.length < 100) score *= 0.5; // Penalty for very short chunks
  if (chunk.length > 2000) score *= 0.8; // Small penalty for very long chunks
  
  // Mathematical content bonus
  if (containsMathTerms(questionLower) && containsMathTerms(chunkLower)) {
    score += 0.5;
  }
  
  // Position penalty (later chunks slightly less preferred)
  const positionPenalty = Math.max(0, 1 - (index * 0.05));
  score *= positionPenalty;
  
  const finalScore = Math.max(0, score);
  scoringCache.set(cacheKey, finalScore);
  
  // Cleanup cache if too large
  if (scoringCache.size > 1000) {
    const firstKey = scoringCache.keys().next().value;
    scoringCache.delete(firstKey);
  }
  
  return finalScore;
};

// Extract meaningful phrases
const extractPhrases = (text: string): string[] => {
  const phrases: string[] = [];
  const words = text.split(/\s+/).filter(w => w.length > 2);
  
  for (let i = 0; i < words.length - 1; i++) {
    if (!COMMON_WORDS.has(words[i]) && !COMMON_WORDS.has(words[i + 1])) {
      phrases.push(`${words[i]} ${words[i + 1]}`);
    }
    
    if (i < words.length - 2 && !COMMON_WORDS.has(words[i + 2])) {
      phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
    }
  }
  
  return phrases;
};

// Check for mathematical terms
const containsMathTerms = (text: string): boolean => {
  return Array.from(MATH_TERMS).some(term => text.includes(term));
};

// Pre-filter chunks by relevance with optimized scoring
export const preFilterChunks = (
  question: string,
  chunks: string[],
  maxChunks: number = 20,
  minScore: number = 0.1
): { filteredChunks: string[], stats: { filtered: number, total: number, avgScore: number } } => {
  
  console.log(`🔍 Pre-filtering ${chunks.length} chunks...`);
  
  const scoredChunks: ScoredChunk[] = chunks.map((chunk, index) => ({
    content: chunk,
    score: scoreChunkRelevance(question, chunk, index),
    tokens: estimateTokens(chunk),
    index
  }));
  
  const relevantChunks = scoredChunks
    .filter(item => item.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxChunks);
  
  const avgScore = relevantChunks.length > 0 
    ? relevantChunks.reduce((sum, item) => sum + item.score, 0) / relevantChunks.length 
    : 0;
  
  console.log(`✅ Pre-filtering: ${relevantChunks.length}/${chunks.length} chunks, avg score: ${avgScore.toFixed(2)}`);
  
  return {
    filteredChunks: relevantChunks.map(item => item.content),
    stats: {
      filtered: relevantChunks.length,
      total: chunks.length,
      avgScore
    }
  };
};

// Maximum Marginal Relevance for diversity
export const maximumMarginalRelevance = (
  scoredChunks: ScoredChunk[],
  maxTokens: number,
  diversityWeight: number = 0.3
): ScoredChunk[] => {
  const selected: ScoredChunk[] = [];
  const remaining = [...scoredChunks];
  let totalTokens = 0;
  
  while (remaining.length > 0 && totalTokens < maxTokens) {
    let bestChunk: ScoredChunk | null = null;
    let bestScore = -1;
    let bestIndex = -1;
    
    for (let i = 0; i < remaining.length; i++) {
      const chunk = remaining[i];
      
      if (totalTokens + chunk.tokens > maxTokens) continue;
      
      // Calculate MMR score
      const relevanceScore = chunk.score;
      const maxSimilarity = selected.length > 0
        ? Math.max(...selected.map(s => calculateTextSimilarity(chunk.content, s.content)))
        : 0;
      
      const mmrScore = relevanceScore - (diversityWeight * maxSimilarity);
      
      if (mmrScore > bestScore) {
        bestScore = mmrScore;
        bestChunk = chunk;
        bestIndex = i;
      }
    }
    
    if (bestChunk && bestIndex >= 0) {
      selected.push(bestChunk);
      totalTokens += bestChunk.tokens;
      remaining.splice(bestIndex, 1);
    } else {
      break;
    }
  }
  
  return selected;
};

// Simple Jaccard similarity for text
const calculateTextSimilarity = (text1: string, text2: string): number => {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return union.size === 0 ? 0 : intersection.size / union.size;
};