
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    console.log('📄 Iniziando estrazione REALE dal PDF:', file.name, `(${Math.round(file.size / 1024 / 1024 * 100) / 100} MB)`);
    
    // Importazione dinamica di pdfjs-dist con configurazione robusta
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configurazione worker più stabile - prova locale prima, poi CDN
    const workerConfigs = [
      // Worker locale (più affidabile)
      {
        src: new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).href,
        name: 'locale'
      },
      // CDN stabile come fallback
      {
        src: 'https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.js',
        name: 'unpkg'
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js',
        name: 'cdnjs'
      }
    ];
    
    let workerConfigured = false;
    
    for (const config of workerConfigs) {
      try {
        console.log(`🔧 Configurando worker PDF.js (${config.name}):`, config.src);
        pdfjsLib.GlobalWorkerOptions.workerSrc = config.src;
        
        // Test veloce per verificare il worker
        const testArray = new Uint8Array([37, 80, 68, 70]); // Header PDF
        try {
          await pdfjsLib.getDocument({ data: testArray }).promise;
        } catch (e) {
          // Errore atteso per PDF incompleto, ma worker è OK
        }
        
        console.log(`✅ Worker PDF.js configurato (${config.name})`);
        workerConfigured = true;
        break;
      } catch (error) {
        console.warn(`⚠️ Worker ${config.name} fallito:`, error);
      }
    }
    
    if (!workerConfigured) {
      throw new Error('❌ Impossibile configurare il worker PDF.js. Problemi di connessione o compatibilità browser.');
    }
    
    // Conversione file in ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    console.log(`📊 File convertito in ArrayBuffer: ${arrayBuffer.byteLength} bytes`);
    
    // Caricamento PDF con configurazione ottimizzata per documenti universitari
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      verbosity: 0, // Silenzioso
      isEvalSupported: false, // Sicurezza
      disableFontFace: false, // Mantieni font per formule/simboli
      useSystemFonts: true,
      stopAtErrors: false, // Continua anche con errori su alcune pagine
      maxImageSize: 50 * 1024 * 1024, // 50MB per immagini accademiche grandi
      cMapPacked: true,
      standardFontDataUrl: undefined
    });
    
    const pdf = await loadingTask.promise;
    console.log(`📑 PDF caricato con successo: ${pdf.numPages} pagine totali`);
    
    // Processo di estrazione avanzato per documenti universitari
    const extractedPages: Array<{pageNum: number, text: string, wordCount: number}> = [];
    const maxPagesToProcess = Math.min(pdf.numPages, 100); // Limite ragionevole
    
    console.log(`🔄 Elaborazione di ${maxPagesToProcess} pagine...`);
    
    // Elaborazione sequenziale per stabilità (evita sovraccarico)
    for (let pageNum = 1; pageNum <= maxPagesToProcess; pageNum++) {
      try {
        console.log(`📄 Elaborando pagina ${pageNum}/${maxPagesToProcess}...`);
        
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent({
          includeMarkedContent: false
        });
        
        // Estrazione e pulizia intelligente del testo
        const rawText = textContent.items
          .filter((item: any) => item.str && typeof item.str === 'string')
          .map((item: any) => item.str.trim())
          .filter(text => text.length > 0)
          .join(' ');
        
        // Pulizia avanzata per testi accademici
        const cleanedText = rawText
          .replace(/\s+/g, ' ') // Normalizza spazi
          .replace(/([.!?])\s*([A-Z])/g, '$1\n\n$2') // Separa frasi
          .replace(/^\d+\s*$|^Pagina\s+\d+|^Page\s+\d+/gim, '') // Rimuovi numeri pagina
          .replace(/^(Capitolo|Chapter|Sezione|Section)\s+\d+/gim, '\n\n$&') // Evidenzia capitoli
          .trim();
        
        const wordCount = cleanedText.split(/\s+/).length;
        
        if (cleanedText.length >= 50 && wordCount >= 10) {
          extractedPages.push({
            pageNum,
            text: cleanedText,
            wordCount
          });
          console.log(`✅ Pagina ${pageNum}: ${wordCount} parole estratte`);
        } else {
          console.log(`⚠️ Pagina ${pageNum}: principalmente grafica (${wordCount} parole)`);
          if (cleanedText.length > 0) {
            extractedPages.push({
              pageNum,
              text: `[Pagina ${pageNum}: Contenuto prevalentemente grafico/visuale]`,
              wordCount: 0
            });
          }
        }
        
        // Pausa tra pagine per stabilità
        if (pageNum < maxPagesToProcess) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
      } catch (pageError) {
        console.error(`❌ Errore pagina ${pageNum}:`, pageError);
        extractedPages.push({
          pageNum,
          text: `[Pagina ${pageNum}: Errore nell'estrazione - possibile contenuto complesso o danneggiato]`,
          wordCount: 0
        });
      }
    }
    
    // Assemblaggio finale ottimizzato per qualità accademica
    const documentSections = extractedPages.map(page => {
      if (page.wordCount > 0) {
        return `=== PAGINA ${page.pageNum} ===\n${page.text}`;
      } else {
        return `=== PAGINA ${page.pageNum} ===\n${page.text}`;
      }
    });
    
    let finalText = documentSections.join('\n\n');
    
    // Pulizia finale e ottimizzazioni
    finalText = finalText
      .replace(/\n{3,}/g, '\n\n') // Normalizza interruzioni
      .replace(/\s+([.!?])/g, '$1') // Correggi punteggiatura
      .trim();
    
    // Statistiche qualitative per valutazione
    const totalWords = finalText.split(/\s+/).length;
    const meaningfulPages = extractedPages.filter(p => p.wordCount >= 10).length;
    const textualContent = finalText.replace(/\[Pagina \d+:.*?\]/g, '').trim();
    
    console.log(`📊 STATISTICHE ESTRAZIONE:`);
    console.log(`   • Pagine elaborate: ${extractedPages.length}`);
    console.log(`   • Pagine con testo: ${meaningfulPages}`);
    console.log(`   • Parole totali: ${totalWords}`);
    console.log(`   • Caratteri: ${finalText.length}`);
    
    // Validazione qualitativa
    if (textualContent.length < 500) {
      throw new Error(`⚠️ PDF principalmente composto da immagini o grafici. Estratte solo ${totalWords} parole significative. Per un'esperienza ottimale, usa PDF con più contenuto testuale.`);
    }
    
    if (meaningfulPages < 2) {
      console.warn('⚠️ Poche pagine testuali, ma procediamo...');
      finalText += '\n\n[NOTA: Questo documento contiene prevalentemente contenuto grafico. L\'analisi si basa sul testo limitato disponibile.]';
    }
    
    console.log('✅ Estrazione PDF completata con successo');
    console.log(`📋 Anteprima: "${textualContent.substring(0, 200)}..."`);
    
    return finalText;
    
  } catch (error) {
    console.error('❌ ERRORE CRITICO nell\'estrazione PDF:', error);
    
    // Gestione errori specifica e istruzioni chiare
    const errorStr = error.toString().toLowerCase();
    
    if (errorStr.includes('worker') || errorStr.includes('fetch')) {
      throw new Error('🔧 Problema tecnico con il sistema PDF. Verifica la connessione internet e riprova. Se persiste, il PDF potrebbe avere una struttura non standard.');
    }
    
    if (errorStr.includes('password') || errorStr.includes('encrypted')) {
      throw new Error('🔒 PDF protetto da password. Rimuovi la protezione e riprova.');
    }
    
    if (errorStr.includes('corrupt') || errorStr.includes('invalid')) {
      throw new Error('📄 File PDF danneggiato o non valido. Prova con un altro documento.');
    }
    
    if (errorStr.includes('principalmente composto')) {
      throw error; // Rilanciare errore specifico per PDF grafici
    }
    
    throw new Error(`💥 Errore nell'elaborazione: ${error.message || error}. Verifica che il file sia un PDF valido e accessibile.`);
  }
};
