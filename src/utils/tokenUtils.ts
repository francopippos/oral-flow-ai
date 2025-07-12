/**
 * Utilities per gestione token e ottimizzazione OpenAI
 */

export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

/**
 * Stima approssimativa dei token per un testo
 * Regola: ~4 caratteri = 1 token per l'inglese, ~6 caratteri = 1 token per l'italiano
 */
export const estimateTokens = (text: string): number => {
  // Italiano ha più caratteri per token
  const avgCharsPerToken = 6;
  return Math.ceil(text.length / avgCharsPerToken);
};

/**
 * Ottimizza i chunk per rimanere entro i limiti di token
 */
export const optimizeChunksForTokens = (
  chunks: string[],
  maxInputTokens: number = 3000 // Limite conservativo per GPT-4o
): string[] => {
  console.log(`🧮 [TOKEN OPTIMIZER] Ottimizzando ${chunks.length} chunk per max ${maxInputTokens} token`);
  
  if (chunks.length === 0) return chunks;
  
  // Stima token per chunk
  const chunksWithTokens = chunks.map(chunk => ({
    content: chunk,
    tokens: estimateTokens(chunk)
  }));
  
  let totalTokens = 0;
  const selectedChunks: string[] = [];
  
  // Aggiungi chunk finché rimaniamo sotto il limite
  for (const chunk of chunksWithTokens) {
    if (totalTokens + chunk.tokens <= maxInputTokens) {
      selectedChunks.push(chunk.content);
      totalTokens += chunk.tokens;
      console.log(`✅ [TOKEN] Chunk aggiunto: ${chunk.tokens} token (totale: ${totalTokens})`);
    } else {
      console.log(`⚠️ [TOKEN] Chunk saltato: ${chunk.tokens} token (supererebbe limite)`);
      break;
    }
  }
  
  console.log(`🎯 [TOKEN OPTIMIZER] Risultato: ${selectedChunks.length}/${chunks.length} chunk, ${totalTokens} token`);
  
  return selectedChunks;
};

/**
 * Comprime i chunk mantenendo le informazioni più importanti
 */
export const compressChunks = (chunks: string[], targetTokens: number = 2000): string[] => {
  console.log(`🗜️ [COMPRESSOR] Comprimendo ${chunks.length} chunk a ~${targetTokens} token`);
  
  if (chunks.length === 0) return chunks;
  
  const totalCurrentTokens = chunks.reduce((sum, chunk) => sum + estimateTokens(chunk), 0);
  
  if (totalCurrentTokens <= targetTokens) {
    console.log(`✅ [COMPRESSOR] Già sotto il limite: ${totalCurrentTokens} token`);
    return chunks;
  }
  
  // Calcola quanto ridurre ogni chunk
  const compressionRatio = targetTokens / totalCurrentTokens;
  console.log(`📐 [COMPRESSOR] Ratio di compressione: ${compressionRatio.toFixed(2)}`);
  
  const compressedChunks = chunks.map((chunk, index) => {
    const targetLength = Math.floor(chunk.length * compressionRatio);
    
    if (targetLength < 100) {
      // Chunk troppo piccolo, mantieni almeno le prime 100 char
      return chunk.substring(0, Math.min(100, chunk.length));
    }
    
    // Trova un punto di taglio sensato (fine frase)
    const truncated = chunk.substring(0, targetLength);
    const lastSentenceEnd = Math.max(
      truncated.lastIndexOf('.'),
      truncated.lastIndexOf('!'),
      truncated.lastIndexOf('?')
    );
    
    if (lastSentenceEnd > targetLength * 0.7) {
      // Buon punto di taglio trovato
      console.log(`✂️ [COMPRESSOR] Chunk ${index + 1}: ${chunk.length} → ${lastSentenceEnd + 1} char`);
      return truncated.substring(0, lastSentenceEnd + 1);
    } else {
      // Nessun buon punto di taglio, usa il troncamento diretto
      console.log(`✂️ [COMPRESSOR] Chunk ${index + 1}: ${chunk.length} → ${targetLength} char (troncato)`);
      return truncated + '...';
    }
  });
  
  const finalTokens = compressedChunks.reduce((sum, chunk) => sum + estimateTokens(chunk), 0);
  console.log(`🎯 [COMPRESSOR] Risultato: ${totalCurrentTokens} → ${finalTokens} token`);
  
  return compressedChunks;
};

/**
 * Strategia adattiva per gestire documenti di diverse dimensioni
 */
export const getOptimalStrategy = (chunks: string[]): {
  strategy: 'full' | 'optimized' | 'compressed' | 'summarized';
  maxChunks: number;
  maxTokens: number;
} => {
  const totalTokens = chunks.reduce((sum, chunk) => sum + estimateTokens(chunk), 0);
  
  console.log(`📊 [STRATEGY] Analizzando ${chunks.length} chunk, ${totalTokens} token totali`);
  
  if (totalTokens <= 2500) {
    return { strategy: 'full', maxChunks: chunks.length, maxTokens: totalTokens };
  } else if (totalTokens <= 4000) {
    return { strategy: 'optimized', maxChunks: Math.min(12, chunks.length), maxTokens: 3000 };
  } else if (totalTokens <= 8000) {
    return { strategy: 'compressed', maxChunks: Math.min(8, chunks.length), maxTokens: 2500 };
  } else {
    return { strategy: 'summarized', maxChunks: Math.min(5, chunks.length), maxTokens: 2000 };
  }
};