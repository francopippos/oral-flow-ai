import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export const askBistroProfessor = async (question: string, contextChunks: string[]): Promise<string> => {
  try {
    console.log('🤖 [BISTRO] Sending question to Bistro AI...', question.substring(0, 100))
    
    const { data, error } = await supabase.functions.invoke('bistro-chat', {
      body: {
        question,
        contextChunks
      }
    })

    if (error) {
      console.error('❌ [BISTRO] Supabase function error:', error)
      throw new Error(`Bistro AI unavailable: ${error.message}`)
    }

    if (!data.success) {
      console.error('❌ [BISTRO] API error:', data.error)
      throw new Error(data.error || 'Bistro AI error')
    }

    console.log('✅ [BISTRO] Response received successfully')
    
    let response = data.answer
    
    // Add optimization info if available
    if (data.strategy && data.strategy !== 'full') {
      response += `\n\n---\n📊 **Bistro Processing:** Used ${data.chunksUsed} document sections (${data.strategy} optimization)`
    }
    
    return response

  } catch (error: any) {
    console.error('❌ [BISTRO] Critical error:', error)
    
    // Provide user-friendly error messages
    if (error.message?.includes('fetch')) {
      throw new Error('NETWORK_ERROR: Unable to connect to Bistro AI services')
    } else if (error.message?.includes('API key')) {
      throw new Error('SERVICE_UNAVAILABLE: Bistro AI service is temporarily unavailable')
    } else {
      throw new Error(`BISTRO_ERROR: ${error.message || 'Unknown error occurred'}`)
    }
  }
}

export const createEmbeddingsWithBistro = async (texts: string[]): Promise<number[][]> => {
  try {
    console.log('🧠 [BISTRO] Creating embeddings for', texts.length, 'texts...')
    
    const { data, error } = await supabase.functions.invoke('bistro-embeddings', {
      body: {
        texts
      }
    })

    if (error) {
      console.error('❌ [BISTRO] Embeddings error:', error)
      throw new Error(`Bistro embeddings unavailable: ${error.message}`)
    }

    if (!data.success) {
      console.error('❌ [BISTRO] Embeddings API error:', data.error)
      throw new Error(data.error || 'Bistro embeddings error')
    }

    console.log('✅ [BISTRO] Embeddings created successfully')
    return data.embeddings

  } catch (error: any) {
    console.error('❌ [BISTRO] Embeddings critical error:', error)
    
    // Provide user-friendly error messages
    if (error.message?.includes('fetch')) {
      throw new Error('NETWORK_ERROR: Unable to connect to Bistro AI services')
    } else {
      throw new Error(`BISTRO_EMBEDDINGS_ERROR: ${error.message || 'Unknown error occurred'}`)
    }
  }
}

// Cosine similarity for finding relevant chunks
export const cosineSimilarity = (a: number[], b: number[]): number => {
  const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

export const findRelevantChunksWithBistro = async (
  question: string, 
  chunks: string[], 
  embeddings: number[][],
  topK: number = 3
): Promise<{ chunks: string[], sourceInfo: string }> => {
  try {
    if (embeddings.length === 0) {
      // Fallback to simple text search
      console.log('⚠️ [BISTRO] No embeddings available, using text search fallback')
      const lowerQuestion = question.toLowerCase()
      const scoredChunks = chunks.map((chunk, index) => {
        const lowerChunk = chunk.toLowerCase()
        const words = lowerQuestion.split(' ').filter(word => word.length > 3)
        const score = words.reduce((acc, word) => {
          return acc + (lowerChunk.includes(word) ? 1 : 0)
        }, 0)
        return { chunk, score, index }
      })
      
      const relevantChunks = scoredChunks
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)
        .map(item => item.chunk)
      
      return {
        chunks: relevantChunks,
        sourceInfo: `Text search found ${relevantChunks.length} relevant sections`
      }
    }

    // Create embedding for the question
    console.log('🔍 [BISTRO] Creating question embedding...')
    const questionEmbeddings = await createEmbeddingsWithBistro([question])
    const questionEmbedding = questionEmbeddings[0]

    // Calculate similarities
    const similarities = embeddings.map((chunkEmbedding, index) => ({
      index,
      similarity: cosineSimilarity(questionEmbedding, chunkEmbedding),
      chunk: chunks[index]
    }))

    // Sort by similarity and take top K
    const relevantChunks = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .filter(item => item.similarity > 0.1) // Minimum similarity threshold
      .map(item => item.chunk)

    const avgSimilarity = similarities
      .slice(0, topK)
      .reduce((sum, item) => sum + item.similarity, 0) / Math.min(topK, similarities.length)

    return {
      chunks: relevantChunks,
      sourceInfo: `Semantic search with Bistro AI (${relevantChunks.length} sections, avg. relevance: ${(avgSimilarity * 100).toFixed(1)}%)`
    }

  } catch (error) {
    console.error('❌ [BISTRO] Error in semantic search:', error)
    
    // Fallback to simple text search
    const lowerQuestion = question.toLowerCase()
    const scoredChunks = chunks.map((chunk, index) => {
      const lowerChunk = chunk.toLowerCase()
      const words = lowerQuestion.split(' ').filter(word => word.length > 3)
      const score = words.reduce((acc, word) => {
        return acc + (lowerChunk.includes(word) ? 1 : 0)
      }, 0)
      return { chunk, score, index }
    })
    
    const relevantChunks = scoredChunks
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(item => item.chunk)
    
    return {
      chunks: relevantChunks,
      sourceInfo: `Fallback text search (Bistro AI temporarily unavailable)`
    }
  }
}