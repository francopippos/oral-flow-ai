
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export const createTextChunks = async (text: string): Promise<string[]> => {
  try {
    console.log('🧩 Iniziando chunking SEMANTICO del testo...');
    console.log(`📊 Testo totale: ${text.length} caratteri`);
    
    if (text.length < 100) {
      console.log('⚠️ Testo troppo corto per chunking');
      return [text];
    }
    
    // Pre-processing per PDF con contenuto misto
    let processedText = text
      .replace(/--- PAGINA \d+ ---\n/g, '\n\n') // Rimuovi separatori di pagina
      .replace(/\[Pagina \d+: Contenuto non testuale\/grafico\]/g, '') // Rimuovi segnaposti vuoti
      .replace(/\[Pagina \d+: Errore di caricamento\]/g, '') // Rimuovi errori
      .replace(/\n{3,}/g, '\n\n') // Normalizza newline
      .trim();
    
    // Se il testo è ancora molto corto, mantieni l'originale
    if (processedText.length < 200 && text.length > processedText.length) {
      processedText = text;
      console.log('📝 Mantengo testo originale per preservare contenuto');
    }
    
    // Configurazione chunking adattiva basata sulla lunghezza del testo
    const textLength = processedText.length;
    let chunkSize = 1000;
    let chunkOverlap = 200;
    
    if (textLength < 2000) {
      chunkSize = 500;
      chunkOverlap = 100;
    } else if (textLength > 10000) {
      chunkSize = 1200;
      chunkOverlap = 300;
    }
    
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
      separators: [
        '\n\n\n',
        '\n\n',
        '\n',
        '. ',
        '! ',
        '? ',
        '; ',
        ', ',
        ' ',
        ''
      ],
    });

    const chunks = await splitter.splitText(processedText);
    
    // Filtra e ottimizza chunk
    const filteredChunks = chunks
      .map(chunk => chunk.trim())
      .filter(chunk => {
        // Mantieni chunk significativi
        const cleanChunk = chunk.replace(/\[.*?\]/g, '').trim();
        return chunk.length >= 100 && // Almeno 100 caratteri
               cleanChunk.length >= 50 && // Almeno 50 caratteri di contenuto
               chunk.split(/\s+/).length >= 10; // Almeno 10 parole
      })
      .slice(0, 40); // Limite massimo chunk
    
    // Se abbiamo pochi chunk, prova con parametri più permissivi
    if (filteredChunks.length < 3 && processedText.length > 1000) {
      console.log('🔄 Pochi chunk generati, uso parametri più permissivi...');
      
      const permissiveSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 800,
        chunkOverlap: 150,
        separators: ['\n\n', '\n', '. ', '! ', '? ', ' ', '']
      });
      
      const newChunks = await permissiveSplitter.splitText(processedText);
      const newFiltered = newChunks
        .map(c => c.trim())
        .filter(c => c.length >= 80 && c.split(/\s+/).length >= 8)
        .slice(0, 30);
      
      if (newFiltered.length > filteredChunks.length) {
        console.log('✅ Chunking permissivo ha prodotto più risultati');
        return newFiltered;
      }
    }
    
    console.log(`✅ Creati ${filteredChunks.length} chunk semantici`);
    
    // Debug: mostra primi chunk
    filteredChunks.slice(0, 3).forEach((chunk, i) => {
      console.log(`📋 Chunk ${i + 1} (${chunk.length} caratteri):`, chunk.substring(0, 100) + '...');
    });
    
    // Fallback finale se non abbiamo chunk validi
    if (filteredChunks.length === 0) {
      console.log('⚠️ Nessun chunk valido, creo chunk di emergenza');
      const emergencyChunks = [];
      for (let i = 0; i < processedText.length; i += 1000) {
        const chunk = processedText.substring(i, i + 1000).trim();
        if (chunk.length >= 50) {
          emergencyChunks.push(chunk);
        }
      }
      return emergencyChunks.length > 0 ? emergencyChunks : [processedText.substring(0, 1500)];
    }
    
    return filteredChunks;
    
  } catch (error) {
    console.error('❌ Errore nel chunking:', error);
    
    // Fallback: divisione semplice
    console.log('🔄 Fallback: divisione semplice del testo');
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length >= 100);
    
    if (paragraphs.length > 0) {
      return paragraphs.slice(0, 25);
    }
    
    // Ultimo fallback: chunk fissi
    const fixedChunks = [];
    for (let i = 0; i < text.length; i += 1000) {
      const chunk = text.substring(i, i + 1000).trim();
      if (chunk.length >= 50) {
        fixedChunks.push(chunk);
      }
    }
    
    return fixedChunks.length > 0 ? fixedChunks : [text.substring(0, 1500)];
  }
};
