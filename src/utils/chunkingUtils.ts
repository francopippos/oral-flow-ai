
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export const createTextChunks = async (text: string): Promise<string[]> => {
  try {
    console.log('🧩 Iniziando chunking semantico del testo...');
    
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 700,
      chunkOverlap: 100,
      separators: ['\n\n', '\n', '. ', '! ', '? ', '; ', ': ', ', ', ' ', ''],
    });

    const chunks = await splitter.splitText(text);
    
    // Filtra i chunk troppo corti
    const filteredChunks = chunks.filter(chunk => chunk.trim().length > 50);
    
    console.log(`✅ Creati ${filteredChunks.length} chunk semantici`);
    return filteredChunks;
  } catch (error) {
    console.error('❌ Errore nel chunking:', error);
    // Fallback: divisione semplice
    const simpleChunks = text.split('\n\n').filter(chunk => chunk.trim().length > 50);
    return simpleChunks.slice(0, 20); // Limita per evitare troppi chunk
  }
};
