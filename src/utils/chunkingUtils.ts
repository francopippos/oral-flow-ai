
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export const createTextChunks = async (text: string): Promise<string[]> => {
  try {
    console.log('🧩 Chunking intelligente:', `${text.length} caratteri`);
    
    if (text.length < 200) {
      console.log('📄 Documento breve, chunk singolo');
      return [text];
    }
    
    // Pre-processing semplificato
    let processedText = text
      .replace(/=== PAGINA (\d+) ===/g, '\n\n--- Pagina $1 ---\n')
      .replace(/\[Pagina \d+: Contenuto prevalentemente grafico\/visuale\]/g, '')
      .replace(/\[Pagina \d+: Errore nell'estrazione[^\]]*\]/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    // Configurazione adattiva
    const documentLength = processedText.length;
    let chunkSize: number;
    let chunkOverlap: number;
    
    if (documentLength < 5000) {
      chunkSize = 800;
      chunkOverlap = 150;
    } else if (documentLength < 20000) {
      chunkSize = 1200;
      chunkOverlap = 250;
    } else {
      chunkSize = 1600;
      chunkOverlap = 400;
    }
    
    console.log(`⚙️ Chunk: ${chunkSize} caratteri, overlap ${chunkOverlap}`);
    
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
      separators: [
        '\n\n## ',
        '\n--- Pagina',
        '\n\n',
        '\n',
        '. ',
        '! ',
        '? ',
        '; ',
        ': ',
        ', ',
        ' ',
        ''
      ]
    });

    const rawChunks = await splitter.splitText(processedText);
    console.log(`📝 Chunk grezzi: ${rawChunks.length}`);
    
    // Filtro qualità permissivo
    const qualityChunks = rawChunks
      .map(chunk => chunk.trim())
      .filter(chunk => {
        const words = chunk.split(/\s+/).length;
        return chunk.length >= 100 && // Minimo 100 caratteri
               words >= 15 && // Minimo 15 parole
               !chunk.match(/^[\s\-=]+$/); // Non solo separatori
      })
      .slice(0, 45); // Limite per performance
    
    console.log(`✅ Chunk di qualità: ${qualityChunks.length}`);
    
    // Fallback se pochi chunk
    if (qualityChunks.length < 3 && processedText.length > 1000) {
      console.log('🔄 Pochi chunk, approccio permissivo...');
      
      const permissiveChunks = rawChunks
        .map(c => c.trim())
        .filter(c => c.length >= 80 && c.split(/\s+/).length >= 10)
        .slice(0, 35);
      
      if (permissiveChunks.length > qualityChunks.length) {
        console.log('✅ Approccio permissivo migliore');
        return permissiveChunks;
      }
    }
    
    // Fallback finale - divisione per paragrafi
    if (qualityChunks.length === 0) {
      console.log('🆘 Fallback paragrafi...');
      
      const paragraphChunks = processedText
        .split(/\n\n+/)
        .filter(para => para.trim().length >= 80)
        .slice(0, 30);
      
      if (paragraphChunks.length > 0) {
        console.log(`✅ Chunk paragrafi: ${paragraphChunks.length}`);
        return paragraphChunks;
      }
      
      // Ultimo fallback - divisione fissa
      const fixedChunks: string[] = [];
      for (let i = 0; i < processedText.length; i += 1000) {
        const chunk = processedText.substring(i, i + 1000).trim();
        if (chunk.length >= 80) {
          fixedChunks.push(chunk);
        }
      }
      
      return fixedChunks.length > 0 ? fixedChunks : [processedText.substring(0, 2000)];
    }
    
    // Preview dei primi chunk
    qualityChunks.slice(0, 2).forEach((chunk, i) => {
      const preview = chunk.replace(/\n/g, ' ').substring(0, 100);
      console.log(`📋 Chunk ${i + 1}: "${preview}..." (${chunk.length} char)`);
    });
    
    console.log(`🎯 Chunking completato: ${qualityChunks.length} sezioni`);
    return qualityChunks;
    
  } catch (error) {
    console.error('❌ Errore chunking:', error);
    
    // Fallback robusto
    console.log('🔄 Fallback semplice...');
    
    try {
      const simpleChunks = text
        .split(/\n\n+/)
        .map(p => p.trim())
        .filter(p => p.length >= 50)
        .slice(0, 25);
      
      if (simpleChunks.length >= 2) {
        console.log(`✅ Fallback: ${simpleChunks.length} chunk`);
        return simpleChunks;
      }
      
      // Fallback finale
      return [text.substring(0, 2000)];
      
    } catch (fallbackError) {
      console.error('❌ Fallback fallito:', fallbackError);
      return [text.substring(0, 2000)];
    }
  }
};
