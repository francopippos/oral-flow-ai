/**
 * Sistema di embedding REALE con OpenAI per massima compatibilità
 */

export const createOpenAIEmbeddings = async (apiKey: string, chunks: string[]): Promise<number[][]> => {
  try {
    console.log('🤖 [OPENAI EMBEDDINGS REALI] Creando embedding per', chunks.length, 'chunk...');
    
    if (!apiKey || apiKey.length < 20) {
      throw new Error('API Key OpenAI mancante o non valida');
    }
    
    const embeddings: number[][] = [];
    
    // Processamento in batch per efficienza
    const batchSize = 5; // OpenAI permette più richieste simultanee
    
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      console.log(`📊 [OPENAI EMBEDDINGS] Processando batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(chunks.length/batchSize)} (${batch.length} chunk)`);
      
      // Chiamate parallele per il batch
      const batchPromises = batch.map(async (chunk, idx) => {
        const globalIdx = i + idx;
        console.log(`🔄 [OPENAI] Embedding chunk ${globalIdx + 1}/${chunks.length}...`);
        
        const response = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small', // Modello veloce e economico
            input: chunk.trim(),
            encoding_format: 'float'
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('❌ [OPENAI EMBEDDING] Errore risposta:', response.status, errorData);
          
          if (response.status === 401) {
            throw new Error('API Key OpenAI non valida');
          } else if (response.status === 429) {
            throw new Error('QUOTA_EXCEEDED');
          } else if (response.status === 403) {
            throw new Error('QUOTA_EXCEEDED');
          } else {
            throw new Error(`Errore OpenAI embedding ${response.status}: ${errorData?.error?.message || 'Errore sconosciuto'}`);
          }
        }
        
        const data = await response.json();
        const embedding = data.data?.[0]?.embedding;
        
        if (!embedding || !Array.isArray(embedding)) {
          throw new Error(`Embedding non valido per chunk ${globalIdx + 1}`);
        }
        
        console.log(`✅ [OPENAI] Chunk ${globalIdx + 1}: embedding di ${embedding.length} dimensioni`);
        return { index: globalIdx, embedding };
      });
      
      // Attendi il completamento del batch
      const batchResults = await Promise.all(batchPromises);
      
      // Aggiungi gli embedding nell'ordine corretto
      batchResults
        .sort((a, b) => a.index - b.index)
        .forEach(result => {
          embeddings.push(result.embedding);
        });
      
      // Pausa tra batch per evitare rate limiting
      if (i + batchSize < chunks.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log('✅ [OPENAI EMBEDDINGS REALI] Creati con successo:', embeddings.length, 'embedding');
    return embeddings;
    
  } catch (error) {
    console.error('❌ [OPENAI EMBEDDINGS] Errore critico:', error);
    throw new Error(`Impossibile creare embedding OpenAI: ${error}`);
  }
};

export const findRelevantChunksOpenAI = async (
  apiKey: string,
  question: string,
  chunks: string[],
  embeddings: number[][]
): Promise<string[]> => {
  try {
    console.log('🔍 [RICERCA SEMANTICA OPENAI] Per:', question.substring(0, 50) + '...');
    
    // Genera embedding per la domanda
    console.log('🧠 [OPENAI] Generando embedding per la domanda...');
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: question.trim(),
        encoding_format: 'float'
      })
    });
    
    if (!response.ok) {
      throw new Error(`Errore embedding domanda: ${response.status}`);
    }
    
    const data = await response.json();
    const questionEmbedding = data.data?.[0]?.embedding;
    
    if (!questionEmbedding) {
      throw new Error('Embedding domanda non valido');
    }
    
    console.log('✅ [OPENAI] Embedding domanda generato:', questionEmbedding.length, 'dimensioni');
    
    // Calcola similarità coseno
    const similarities = embeddings.map((embedding, index) => ({
      index,
      similarity: cosineSimilarity(questionEmbedding, embedding),
      chunk: chunks[index]
    }));
    
    // Ordina per similarità e prendi i top chunk
    const topChunks = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 4)
      .filter(item => item.similarity > 0.1)
      .map(item => {
        console.log(`📋 [SIMILARITÀ REALE] ${item.similarity.toFixed(3)}: ${item.chunk.substring(0, 100)}...`);
        return item.chunk;
      });
    
    console.log('✅ [RICERCA OPENAI] Trovati', topChunks.length, 'chunk rilevanti');
    return topChunks.length > 0 ? topChunks : chunks.slice(0, 3);
    
  } catch (error) {
    console.error('❌ [RICERCA OPENAI] Errore:', error);
    throw new Error(`Ricerca semantica OpenAI fallita: ${error}`);
  }
};

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    console.warn('⚠️ [COSINE] Vettori con lunghezze diverse:', a.length, 'vs', b.length);
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