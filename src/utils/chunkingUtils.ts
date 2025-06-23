
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export const createTextChunks = async (text: string): Promise<string[]> => {
  try {
    console.log('🧩 Iniziando chunking ACCADEMICO intelligente...');
    console.log(`📊 Documento: ${text.length} caratteri, ${text.split(/\s+/).length} parole`);
    
    if (text.length < 200) {
      console.log('⚠️ Documento troppo breve per chunking elaborato');
      return [text];
    }
    
    // Pre-processing specifico per documenti universitari
    let processedText = text
      // Mantieni separatori di sezione importanti
      .replace(/=== PAGINA (\d+) ===/g, '\n\n--- Pagina $1 ---\n')
      // Pulisci note tecniche mantenendo contenuto utile  
      .replace(/\[Pagina \d+: Contenuto prevalentemente grafico\/visuale\]/g, '')
      .replace(/\[Pagina \d+: Errore nell'estrazione[^\]]*\]/g, '')
      // Normalizza strutture accademiche comuni
      .replace(/\n(Capitolo|Chapter|Sezione|Section)\s+(\d+)/gi, '\n\n## $1 $2')
      .replace(/\n(Bibliografia|References|Conclusioni|Conclusions)/gi, '\n\n## $1')
      // Ottimizza formattazione
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    // Strategia di chunking adattiva basata su contenuto accademico
    const documentLength = processedText.length;
    let chunkSize: number;
    let chunkOverlap: number;
    let separators: string[];
    
    if (documentLength < 5000) {
      // Documento breve - chunk più piccoli
      chunkSize = 800;
      chunkOverlap = 150;
    } else if (documentLength < 20000) {
      // Documento medio - bilanciamento
      chunkSize = 1200;
      chunkOverlap = 250;
    } else {
      // Documento lungo - chunk più grandi per contesto
      chunkSize = 1600;
      chunkOverlap = 400;
    }
    
    // Separatori ottimizzati per testi accademici
    separators = [
      '\n\n## ', // Titoli sezione
      '\n--- Pagina', // Separatori pagina
      '\n\n', // Paragrafi
      '\n', // Righe
      '. ', // Frasi
      '! ',
      '? ',
      '; ',
      ': ',
      ', ',
      ' ',
      ''
    ];
    
    console.log(`⚙️ Configurazione chunking: ${chunkSize} caratteri, overlap ${chunkOverlap}`);
    
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
      separators,
    });

    const rawChunks = await splitter.splitText(processedText);
    console.log(`📝 Chunk grezzi generati: ${rawChunks.length}`);
    
    // Filtro qualitativo avanzato per chunks accademici
    const qualityChunks = rawChunks
      .map((chunk, index) => ({
        index,
        text: chunk.trim(),
        words: chunk.trim().split(/\s+/).length,
        sentences: chunk.split(/[.!?]+/).length,
        hasAcademicMarkers: /\b(quindi|pertanto|inoltre|tuttavia|infatti|ad esempio|in particolare|secondo|come|risulta|emerge|dimostra|evidenzia)\b/gi.test(chunk)
      }))
      .filter(chunk => {
        // Criteri di qualità per contenuto universitario
        return chunk.text.length >= 150 && // Lunghezza minima
               chunk.words >= 25 && // Almeno 25 parole
               chunk.sentences >= 2 && // Almeno 2 frasi
               !chunk.text.match(/^[\s\-=]+$/) && // Non solo separatori
               chunk.text.split(/\s+/).filter(w => w.length >= 4).length >= 10; // Almeno 10 parole significative
      })
      .map(chunk => chunk.text)
      .slice(0, 50); // Limite ragionevole per performance
    
    console.log(`✅ Chunk qualitativi: ${qualityChunks.length}`);
    
    // Se abbiamo pochi chunk di qualità, proviamo approccio più permissivo
    if (qualityChunks.length < 5 && processedText.length > 2000) {
      console.log('🔄 Pochi chunk di qualità, tento approccio permissivo...');
      
      const permissiveSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: Math.max(600, chunkSize - 200),
        chunkOverlap: Math.max(100, chunkOverlap - 50),
        separators: ['\n\n', '\n', '. ', '! ', '? ', ': ', ' ', '']
      });
      
      const permissiveChunks = await permissiveSplitter.splitText(processedText);
      const filteredPermissive = permissiveChunks
        .map(c => c.trim())
        .filter(c => c.length >= 100 && c.split(/\s+/).length >= 15)
        .slice(0, 40);
      
      if (filteredPermissive.length > qualityChunks.length) {
        console.log('✅ Approccio permissivo più produttivo');
        return filteredPermissive;
      }
    }
    
    // Verifica finale e fallback
    if (qualityChunks.length === 0) {
      console.log('⚠️ Nessun chunk di qualità, genero chunk di emergenza...');
      
      // Chunking di emergenza basato su paragrafi
      const emergencyChunks = processedText
        .split(/\n\n+/)
        .filter(para => para.trim().length >= 100)
        .slice(0, 30);
      
      if (emergencyChunks.length > 0) {
        console.log(`🆘 Chunk di emergenza: ${emergencyChunks.length}`);
        return emergencyChunks;
      }
      
      // Ultimo fallback - divisione fissa
      const fixedChunks: string[] = [];
      for (let i = 0; i < processedText.length; i += 1000) {
        const chunk = processedText.substring(i, i + 1000).trim();
        if (chunk.length >= 100) {
          fixedChunks.push(chunk);
        }
      }
      
      return fixedChunks.length > 0 ? fixedChunks : [processedText.substring(0, 2000)];
    }
    
    // Log di verifica qualità
    qualityChunks.slice(0, 3).forEach((chunk, i) => {
      const preview = chunk.replace(/\n/g, ' ').substring(0, 120);
      console.log(`📋 Chunk ${i + 1}: "${preview}..." (${chunk.length} char)`);
    });
    
    console.log(`🎯 Chunking accademico completato: ${qualityChunks.length} sezioni di qualità`);
    return qualityChunks;
    
  } catch (error) {
    console.error('❌ Errore nel chunking accademico:', error);
    
    // Fallback semplificato ma robusto
    console.log('🔄 Attivando chunking di fallback...');
    
    try {
      // Divisione per paragrafi come fallback primario
      const paragraphChunks = text
        .split(/\n\n+/)
        .map(p => p.trim())
        .filter(p => p.length >= 80 && p.split(/\s+/).length >= 12)
        .slice(0, 35);
      
      if (paragraphChunks.length >= 3) {
        console.log(`✅ Fallback paragrafi: ${paragraphChunks.length} chunk`);
        return paragraphChunks;
      }
      
      // Fallback finale - divisione fissa semplice
      const simpleChunks: string[] = [];
      const chunkLength = Math.max(800, Math.floor(text.length / 20));
      
      for (let i = 0; i < text.length; i += chunkLength) {
        const chunk = text.substring(i, i + chunkLength).trim();
        if (chunk.length >= 100) {
          simpleChunks.push(chunk);
        }
      }
      
      console.log(`🆘 Fallback fisso: ${simpleChunks.length} chunk`);
      return simpleChunks.length > 0 ? simpleChunks : [text.substring(0, 2000)];
      
    } catch (fallbackError) {
      console.error('❌ Anche il fallback è fallito:', fallbackError);
      return [text.substring(0, 2000)];
    }
  }
};
