import { createClient } from '@supabase/supabase-js';

interface EnhancedChatOptions {
  contextDepth?: 'minimal' | 'standard' | 'comprehensive';
  maxTokens?: number;
  useAdaptiveRetrieval?: boolean;
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

// Get Supabase client
function getSupabaseClient() {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  );
}

// Enhanced chat function with adaptive retrieval
export async function askEnhancedBistroProfessor(
  question: string, 
  contextChunks: string[],
  options: EnhancedChatOptions = {}
): Promise<string> {
  const { 
    contextDepth = 'standard',
    maxTokens = 8000,
    useAdaptiveRetrieval = true
  } = options;

  try {
    console.log('🚀 Enhanced Bistro Professor request:', {
      question: question.substring(0, 100) + '...',
      chunks: contextChunks.length,
      contextDepth,
      maxTokens,
      adaptiveRetrieval: useAdaptiveRetrieval
    });

    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.functions.invoke('enhanced-bistro-chat', {
      body: {
        question,
        contextChunks,
        maxTokens,
        contextDepth,
        useAdaptiveRetrieval
      }
    });

    if (error) {
      console.error('Enhanced Bistro API error:', error);
      throw new Error(`API Error: ${error.message}`);
    }

    const response = data as EnhancedChatResponse;

    if (!response.success) {
      throw new Error(response.answer || 'Unknown error occurred');
    }

    console.log('✅ Enhanced response received:', {
      strategy: response.strategy,
      chunksUsed: response.chunksUsed,
      totalAvailable: response.totalChunksAvailable,
      contextDepth: response.contextDepth
    });

    return response.answer;

  } catch (error) {
    console.error('Enhanced Bistro Professor error:', error);

    // User-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes('Invalid OpenAI API key')) {
        throw new Error('🔑 OpenAI API key non valida. Verifica la configurazione della chiave API.');
      } else if (error.message.includes('rate limit')) {
        throw new Error('⏱️ Limite di velocità OpenAI raggiunto. Riprova tra qualche momento.');
      } else if (error.message.includes('quota')) {
        throw new Error('💰 Quota OpenAI esaurita. Verifica il tuo account OpenAI.');
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error('🌐 Errore di connessione. Verifica la tua connessione internet e riprova.');
      }
    }

    throw new Error('❌ Errore nell\'elaborazione della richiesta. Riprova più tardi.');
  }
}

// Smart chunk relevance scoring for local filtering
export function scoreChunkRelevance(question: string, chunk: string): number {
  const questionLower = question.toLowerCase();
  const chunkLower = chunk.toLowerCase();
  
  // Extract meaningful words from question (filter out common words)
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'what', 'how', 'when', 'where', 'why', 'who', 'which']);
  
  const questionWords = questionLower
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.has(word));

  if (questionWords.length === 0) return 0;

  // Calculate relevance score
  let score = 0;
  
  // Exact phrase matches (highest weight)
  const questionPhrases = extractPhrases(questionLower);
  for (const phrase of questionPhrases) {
    if (chunkLower.includes(phrase)) {
      score += 2.0;
    }
  }
  
  // Individual word matches
  let wordMatches = 0;
  for (const word of questionWords) {
    if (chunkLower.includes(word)) {
      wordMatches++;
      // Bonus for exact word boundaries
      const wordRegex = new RegExp(`\\b${word}\\b`, 'gi');
      const exactMatches = (chunkLower.match(wordRegex) || []).length;
      score += exactMatches * 0.5;
    }
  }
  
  // Normalize by question complexity
  const wordMatchRatio = wordMatches / questionWords.length;
  score += wordMatchRatio * 1.0;
  
  // Length penalty for very short chunks
  if (chunk.length < 100) {
    score *= 0.5;
  }
  
  // Bonus for mathematical content if question seems mathematical
  if (hasMathematicalTerms(questionLower) && hasMathematicalTerms(chunkLower)) {
    score += 0.5;
  }
  
  return Math.max(0, score);
}

// Extract meaningful phrases from question
function extractPhrases(text: string): string[] {
  const phrases: string[] = [];
  const words = text.split(/\s+/);
  
  // Extract 2-3 word phrases
  for (let i = 0; i < words.length - 1; i++) {
    if (words[i].length > 2 && words[i + 1].length > 2) {
      phrases.push(`${words[i]} ${words[i + 1]}`);
    }
    
    if (i < words.length - 2 && words[i + 2].length > 2) {
      phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
    }
  }
  
  return phrases;
}

// Check if text contains mathematical terms
function hasMathematicalTerms(text: string): boolean {
  const mathTerms = [
    'equation', 'formula', 'calculate', 'solve', 'function', 'derivative', 'integral',
    'matrix', 'vector', 'probability', 'theorem', 'proof', 'algorithm', 'coefficient',
    'variable', 'constant', 'graph', 'plot', 'chart', 'data', 'statistics',
    '=', '+', '-', '*', '/', '^', '√', '∑', '∫', '∂', 'α', 'β', 'γ', 'δ', 'π', 'σ'
  ];
  
  return mathTerms.some(term => text.includes(term));
}

// Pre-filter chunks by relevance before sending to API
export function preFilterChunks(
  question: string, 
  chunks: string[], 
  maxChunks: number = 20
): { filteredChunks: string[], stats: { filtered: number, total: number } } {
  
  console.log(`🔍 Pre-filtering ${chunks.length} chunks for relevance...`);
  
  // Score all chunks
  const scoredChunks = chunks.map((chunk, index) => ({
    content: chunk,
    score: scoreChunkRelevance(question, chunk),
    index
  }));
  
  // Sort by relevance and take top chunks
  const sortedChunks = scoredChunks
    .filter(item => item.score > 0.1) // Minimum relevance threshold
    .sort((a, b) => b.score - a.score)
    .slice(0, maxChunks);
  
  const filteredChunks = sortedChunks.map(item => item.content);
  
  console.log(`✅ Pre-filtering complete: ${filteredChunks.length}/${chunks.length} chunks selected`);
  
  return {
    filteredChunks,
    stats: {
      filtered: filteredChunks.length,
      total: chunks.length
    }
  };
}

// Generate embeddings (fallback for advanced use cases)
export async function createEmbeddingsWithEnhancedBistro(texts: string[]): Promise<number[][]> {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.functions.invoke('bistro-embeddings', {
      body: { texts }
    });

    if (error) throw error;

    return data.embeddings || [];
  } catch (error) {
    console.error('Enhanced embeddings error:', error);
    throw new Error(`Failed to generate embeddings: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Find relevant chunks with enhanced semantic search
export async function findRelevantChunksWithEnhancedBistro(
  question: string, 
  chunks: string[], 
  embeddings: number[][] = [],
  options: {
    topK?: number;
    useSemanticSearch?: boolean;
    contextDepth?: 'minimal' | 'standard' | 'comprehensive';
  } = {}
): Promise<{ chunks: string[], sourceInfo: string, stats: any }> {
  
  const { 
    topK = 10, 
    useSemanticSearch = true,
    contextDepth = 'standard' 
  } = options;

  try {
    console.log(`🎯 Finding relevant chunks: ${chunks.length} available, seeking top ${topK}`);

    let relevantChunks: string[] = [];
    let sourceInfo = '';
    let stats = {};

    // First, pre-filter by text relevance
    const preFiltered = preFilterChunks(question, chunks, Math.min(chunks.length, 30));
    
    let semanticSearchSuccessful = false;
    
    if (useSemanticSearch && embeddings.length === chunks.length) {
      // Enhanced semantic search with embeddings
      console.log('🧠 Using semantic search with embeddings...');
      
      try {
        // Generate question embedding
        const questionEmbeddings = await createEmbeddingsWithEnhancedBistro([question]);
        const questionEmbedding = questionEmbeddings[0];
        
        if (questionEmbedding) {
          // Calculate similarities for pre-filtered chunks
          const similarities = preFiltered.filteredChunks.map((chunk, i) => {
            const chunkIndex = chunks.indexOf(chunk);
            const similarity = cosineSimilarity(questionEmbedding, embeddings[chunkIndex]);
            return { chunk, similarity, index: chunkIndex };
          });
          
          // Sort by similarity and take top K
          relevantChunks = similarities
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, topK)
            .map(item => item.chunk);
          
          sourceInfo = `semantic_search_enhanced (${relevantChunks.length}/${chunks.length} chunks)`;
          stats = {
            method: 'semantic_enhanced',
            preFiltered: preFiltered.stats,
            similarities: similarities.slice(0, 3).map(s => s.similarity.toFixed(3))
          };
          semanticSearchSuccessful = true;
        }
      } catch (embeddingError) {
        console.warn('Semantic search failed, falling back to text-based search:', embeddingError);
      }
    }
    
    if (!semanticSearchSuccessful || relevantChunks.length === 0) {
      // Enhanced text-based search
      console.log('📝 Using enhanced text-based search...');
      
      relevantChunks = preFiltered.filteredChunks.slice(0, topK);
      sourceInfo = `text_search_enhanced (${relevantChunks.length}/${chunks.length} chunks)`;
      stats = {
        method: 'text_enhanced',
        preFiltered: preFiltered.stats
      };
    }

    console.log(`✅ Selected ${relevantChunks.length} relevant chunks using ${sourceInfo}`);
    
    return { chunks: relevantChunks, sourceInfo, stats };

  } catch (error) {
    console.error('Enhanced chunk selection error:', error);
    
    // Final fallback
    const fallbackChunks = chunks.slice(0, Math.min(topK, chunks.length));
    return { 
      chunks: fallbackChunks, 
      sourceInfo: `fallback (${fallbackChunks.length}/${chunks.length} chunks)`,
      stats: { method: 'fallback', error: error instanceof Error ? error.message : 'Unknown error' }
    };
  }
}

// Cosine similarity calculation
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  return magnitude === 0 ? 0 : dotProduct / magnitude;
}