
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export const createTextChunks = async (text: string): Promise<string[]> => {
  try {
    console.log('🧩 Iniziando chunking SEMANTICO del testo...');
    console.log(`📊 Testo totale: ${text.length} caratteri`);
    
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 700, // Chunk più grandi per catturare più contesto
      chunkOverlap: 150, // Overlap maggiore per non perdere continuità
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

    const chunks = await splitter.splitText(text);
    
    // Filtra chunk troppo corti e pulisci
    const filteredChunks = chunks
      .map(chunk => chunk.trim())
      .filter(chunk => {
        // Rimuovi chunk troppo corti o che contengono solo spazi/numeri
        return chunk.length >= 100 && 
               chunk.split(' ').length >= 15 && // Almeno 15 parole
               !/^\s*[\d\s\.\-_]+\s*$/.test(chunk); // Non solo numeri/simboli
      })
      .slice(0, 25); // Limite massimo per evitare troppi chunk
    
    console.log(`✅ Creati ${filteredChunks.length} chunk semantici validi`);
    
    // Log dei primi chunk per debug
    filteredChunks.slice(0, 3).forEach((chunk, i) => {
      console.log(`📋 Chunk ${i + 1} anteprima:`, chunk.substring(0, 100) + '...');
    });
    
    if (filteredChunks.length === 0) {
      throw new Error('Nessun chunk valido creato dal testo estratto');
    }
    
    return filteredChunks;
  } catch (error) {
    console.error('❌ Errore nel chunking semantico:', error);
    throw new Error('Impossibile creare chunk dal testo: ' + error);
  }
};
