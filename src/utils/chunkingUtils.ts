
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export const createTextChunks = async (text: string): Promise<string[]> => {
  try {
    console.log('🧩 Iniziando chunking semantico del testo...');
    
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 700,
      chunkOverlap: 100,
      separators: ['\n\n', '\n', '. ', '! ', '? ', ', ', ' ', ''],
    });

    const chunks = await splitter.splitText(text);
    
    // Filter out very short chunks
    const filteredChunks = chunks.filter(chunk => chunk.trim().length > 50);
    
    console.log(`✅ Creati ${filteredChunks.length} chunk semantici`);
    return filteredChunks;
  } catch (error) {
    console.error('❌ Errore nel chunking:', error);
    // Fallback: simple splitting
    const simpleChunks = text.split('\n\n').filter(chunk => chunk.trim().length > 50);
    return simpleChunks.slice(0, 20); // Limit to avoid too many chunks
  }
};
