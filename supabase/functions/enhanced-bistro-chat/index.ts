import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EnhancedChatRequest {
  question: string;
  contextChunks: string[];
  maxTokens?: number;
  contextDepth?: 'minimal' | 'standard' | 'comprehensive';
  useAdaptiveRetrieval?: boolean;
}

interface ChunkWithScore {
  content: string;
  score: number;
  tokens: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      question, 
      contextChunks, 
      maxTokens = 8000,
      contextDepth = 'standard',
      useAdaptiveRetrieval = true 
    }: EnhancedChatRequest = await req.json();

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log(`🤖 Enhanced chat - Question: "${question.substring(0, 100)}..."`);
    console.log(`📊 Input chunks: ${contextChunks.length}, Max tokens: ${maxTokens}, Depth: ${contextDepth}`);

    // Enhanced context selection with adaptive retrieval
    let selectedChunks: string[];
    let strategy: string;

    if (useAdaptiveRetrieval && contextChunks.length > 0) {
      const result = await selectOptimalContext(question, contextChunks, maxTokens, contextDepth);
      selectedChunks = result.chunks;
      strategy = result.strategy;
    } else {
      // Fallback to simple token-based truncation
      selectedChunks = truncateByTokens(contextChunks, maxTokens * 0.6);
      strategy = "token_truncation";
    }

    console.log(`🎯 Selected ${selectedChunks.length} chunks using ${strategy} strategy`);

    // Enhanced system prompt
    const systemPrompt = `You are Professor Bistro, an expert academic AI assistant specializing in document analysis and scholarly discussion.

**Your Core Capabilities:**
- Deep analysis of academic texts, research papers, and educational materials
- Mathematical and scientific concept explanation
- Critical thinking and analytical reasoning
- Multi-disciplinary knowledge synthesis

**Response Guidelines:**
1. **Academic Rigor**: Provide thorough, well-reasoned responses based strictly on the provided document excerpts
2. **Evidence-Based**: Always cite specific passages when making claims
3. **Clarity & Pedagogy**: Explain complex concepts clearly, building from fundamentals
4. **Critical Analysis**: Identify key insights, patterns, and relationships in the content
5. **Mathematical Precision**: When discussing formulas or equations, provide clear explanations of variables and concepts

**Important Rules:**
- ONLY use information from the provided document excerpts
- If asked about content not in the excerpts, clearly state this limitation
- When referencing formulas or technical content, explain the context and significance
- For visual content descriptions (charts, diagrams), integrate them meaningfully into your explanations
- Maintain academic tone while being accessible

**Document Context:**
The following excerpts represent the most relevant content for answering the student's question. Some excerpts may include descriptions of visual elements like mathematical formulas, charts, or diagrams that were extracted from the original document.`;

    const userPrompt = `**Student Question:** ${question}

**Relevant Document Excerpts:**
${selectedChunks.map((chunk, i) => `\n--- Excerpt ${i + 1} ---\n${chunk}`).join('\n')}

**Instructions:** Based on these document excerpts, provide a comprehensive and academically rigorous response to the student's question. If the excerpts contain mathematical formulas, charts, or visual content descriptions, integrate them appropriately into your explanation.`;

    // Make request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 2000,
        temperature: 0.1,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error:', response.status, errorData);
      
      if (response.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your API key configuration.');
      } else if (response.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again in a moment.');
      } else {
        throw new Error(`OpenAI API error: ${response.status}`);
      }
    }

    const data = await response.json();
    const answer = data.choices[0].message.content;

    console.log(`✅ Response generated successfully using ${strategy} strategy`);

    return new Response(
      JSON.stringify({
        answer,
        strategy,
        chunksUsed: selectedChunks.length,
        totalChunksAvailable: contextChunks.length,
        contextDepth,
        success: true,
        usage: data.usage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in enhanced-bistro-chat function:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

// Enhanced context selection with adaptive algorithms
async function selectOptimalContext(
  question: string, 
  chunks: string[], 
  maxTokens: number,
  contextDepth: string
): Promise<{ chunks: string[], strategy: string }> {
  
  // Define token budgets based on context depth
  const tokenBudgets = {
    minimal: Math.floor(maxTokens * 0.4),      // ~40% of max tokens
    standard: Math.floor(maxTokens * 0.6),     // ~60% of max tokens  
    comprehensive: Math.floor(maxTokens * 0.8) // ~80% of max tokens
  };

  const targetTokens = tokenBudgets[contextDepth as keyof typeof tokenBudgets] || tokenBudgets.standard;

  try {
    // Score chunks by semantic relevance (simplified heuristic)
    const scoredChunks: ChunkWithScore[] = chunks.map((chunk, index) => {
      const score = calculateRelevanceScore(question, chunk, index);
      const tokens = estimateTokens(chunk);
      return { content: chunk, score, tokens };
    });

    // Sort by relevance score (highest first)
    scoredChunks.sort((a, b) => b.score - a.score);

    // Select chunks using Maximum Marginal Relevance approach
    const selectedChunks = maximumMarginalRelevance(scoredChunks, targetTokens);

    if (selectedChunks.length > 0) {
      return {
        chunks: selectedChunks.map(c => c.content),
        strategy: `adaptive_mmr_${contextDepth}`
      };
    }
  } catch (error) {
    console.error('Error in adaptive selection:', error);
  }

  // Fallback to token-based selection
  const fallbackChunks = truncateByTokens(chunks, targetTokens);
  return {
    chunks: fallbackChunks,
    strategy: `fallback_tokens_${contextDepth}`
  };
}

// Calculate relevance score (simplified heuristic)
function calculateRelevanceScore(question: string, chunk: string, position: number): number {
  const questionLower = question.toLowerCase();
  const chunkLower = chunk.toLowerCase();
  
  // Keyword matching score
  const questionWords = questionLower.split(/\s+/).filter(w => w.length > 3);
  const keywordMatches = questionWords.filter(word => 
    chunkLower.includes(word)
  ).length;
  
  const keywordScore = keywordMatches / Math.max(questionWords.length, 1);
  
  // Position score (earlier chunks slightly preferred)
  const positionScore = Math.max(0, 1 - (position * 0.1));
  
  // Length bonus (moderate length preferred)
  const lengthScore = Math.min(1, chunk.length / 1000);
  
  // Combined score
  return (keywordScore * 0.6) + (positionScore * 0.2) + (lengthScore * 0.2);
}

// Maximum Marginal Relevance selection
function maximumMarginalRelevance(
  scoredChunks: ChunkWithScore[], 
  maxTokens: number
): ChunkWithScore[] {
  const selected: ChunkWithScore[] = [];
  const remaining = [...scoredChunks];
  let totalTokens = 0;

  while (remaining.length > 0 && totalTokens < maxTokens) {
    let bestChunk: ChunkWithScore | null = null;
    let bestScore = -1;
    let bestIndex = -1;

    for (let i = 0; i < remaining.length; i++) {
      const chunk = remaining[i];
      
      // Skip if adding this chunk would exceed token limit
      if (totalTokens + chunk.tokens > maxTokens) continue;

      // Calculate MMR score: relevance - max similarity to selected chunks
      const relevanceScore = chunk.score;
      const diversityPenalty = selected.length > 0 ? 
        Math.max(...selected.map(s => calculateSimilarity(chunk.content, s.content))) : 0;
      
      const mmrScore = relevanceScore - (0.3 * diversityPenalty); // 0.3 is diversity weight
      
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
      break; // No more chunks can fit
    }
  }

  return selected;
}

// Simple similarity calculation (Jaccard similarity)
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

// Simple token estimation (4 chars ≈ 1 token)
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// Fallback: simple token-based truncation
function truncateByTokens(chunks: string[], maxTokens: number): string[] {
  const selected: string[] = [];
  let totalTokens = 0;

  for (const chunk of chunks) {
    const chunkTokens = estimateTokens(chunk);
    if (totalTokens + chunkTokens <= maxTokens) {
      selected.push(chunk);
      totalTokens += chunkTokens;
    } else {
      break;
    }
  }

  return selected.length > 0 ? selected : [chunks[0]?.substring(0, maxTokens * 4) || ''];
}