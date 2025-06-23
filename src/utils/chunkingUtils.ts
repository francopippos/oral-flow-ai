
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export const createTextChunks = async (text: string): Promise<string[]> => {
  try {
    console.log('🧩 Iniziando chunking SEMANTICO del testo...');
    console.log(`📊 Testo totale: ${text.length} caratteri`);
    
    // Pre-processing per PDF con elementi grafici
    let processedText = text
      .replace(/\[Pagina \d+: Contenuto grafico\/immagini\]/g, '') // Rimuovi segnaposti grafici vuoti
      .replace(/\[Pagina \d+: Errore nell'estrazione[^\]]+\]/g, '') // Rimuovi errori di estrazione
      .replace(/\n{3,}/g, '\n\n') // Normalizza newline
      .trim();
    
    // Se il testo è molto corto dopo la pulizia, mantieni anche i segnaposti
    if (processedText.length < 200) {
      processedText = text; // Usa il testo originale
      console.log('📝 Testo corto dopo pulizia, mantengo contenuto originale');
    }
    
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 800, // Chunk più grandi per catturare più contesto
      chunkOverlap: 200, // Overlap maggiore per continuità
      separators: [
        '\n\n\n', // Separatori di sezione
        '\n\n',   // Paragrafi
        '\n',     // Righe
        '. ',     // Frasi
        '! ',
        '? ',
        '; ',
        ', ',
        ' ',      // Parole
        ''        // Caratteri
      ],
    });

    const chunks = await splitter.splitText(processedText);
    
    // Filtra e pulisci chunk
    const filteredChunks = chunks
      .map(chunk => chunk.trim())
      .filter(chunk => {
        // Mantieni chunk con contenuto significativo
        const cleanChunk = chunk.replace(/\[Pagina \d+:.*?\]/g, '').trim();
        
        return chunk.length >= 80 && // Almeno 80 caratteri
               (cleanChunk.length >= 40 || chunk.includes('[Pagina')) && // O contenuto grafico
               chunk.split(/\s+/).length >= 8; // Almeno 8 "parole"
      })
      .slice(0, 30); // Limite massimo chunk
    
    // Se abbiamo troppo pochi chunk, ridividi con parametri più permissivi
    if (filteredChunks.length < 3 && processedText.length > 500) {
      console.log('🔄 Pochi chunk generati, riprovo con parametri più permissivi...');
      
      const permissiveSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 600,
        chunkOverlap: 100,
        separators: ['\n\n', '\n', '. ', ' ', '']
      });
      
      const newChunks = await permissiveSplitter.splitText(processedText);
      const newFiltered = newChunks
        .map(c => c.trim())
        .filter(c => c.length >= 50)
        .slice(0, 25);
      
      if (newFiltered.length > filteredChunks.length) {
        console.log('✅ Chunking permissivo ha prodotto più risultati');
        return newFiltered;
      }
    }
    
    console.log(`✅ Creati ${filteredChunks.length} chunk semantici validi`);
    
    // Log dei primi chunk per debug
    filteredChunks.slice(0, 2).forEach((chunk, i) => {
      console.log(`📋 Chunk ${i + 1} anteprima:`, chunk.substring(0, 120) + '...');
    });
    
    if (filteredChunks.length === 0) {
      // Fallback: crea almeno un chunk con tutto il testo disponibile
      console.log('⚠️ Nessun chunk valido, creo chunk di fallback');
      return [processedText.substring(0, 1500)]; // Primi 1500 caratteri
    }
    
    return filteredChunks;
  } catch (error) {
    console.error('❌ Errore nel chunking semantico:', error);
    
    // Fallback: divisione semplice del testo
    console.log('🔄 Fallback: divisione semplice del testo');
    const simpleChunks = text
      .split(/\n\n+/)
      .filter(chunk => chunk.trim().length >= 100)
      .slice(0, 20);
    
    if (simpleChunks.length > 0) {
      return simpleChunks;
    }
    
    // Ultimo fallback
    return [text.substring(0, 1500)];
  }
};
