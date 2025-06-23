
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    console.log('📄 Iniziando estrazione PDF:', file.name, `(${Math.round(file.size / 1024 / 1024 * 100) / 100} MB)`);
    
    // Importazione dinamica di pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configurazione worker semplificata e robusta per Lovable
    const workerSources = [
      'https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js',
      'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.js'
    ];
    
    let workerConfigured = false;
    
    for (const workerSrc of workerSources) {
      try {
        console.log(`🔧 Configurando worker PDF.js:`, workerSrc);
        pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
        workerConfigured = true;
        console.log(`✅ Worker PDF.js configurato`);
        break;
      } catch (error) {
        console.warn(`⚠️ Worker fallito:`, error);
        continue;
      }
    }
    
    if (!workerConfigured) {
      console.warn('⚠️ Worker non configurato, uso fallback');
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerSources[0];
    }
    
    // Conversione file in ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    console.log(`📊 File convertito: ${arrayBuffer.byteLength} bytes`);
    
    // Caricamento PDF con configurazione semplificata
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      verbosity: 0,
      isEvalSupported: false,
      disableFontFace: false,
      useSystemFonts: true,
      stopAtErrors: false,
      maxImageSize: 50 * 1024 * 1024,
      cMapPacked: true
    });
    
    const pdf = await loadingTask.promise;
    console.log(`📑 PDF caricato: ${pdf.numPages} pagine`);
    
    // Estrazione testo ottimizzata
    const extractedPages: Array<{pageNum: number, text: string, wordCount: number}> = [];
    const maxPages = Math.min(pdf.numPages, 100);
    
    console.log(`🔄 Elaborazione ${maxPages} pagine...`);
    
    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      try {
        console.log(`📄 Pagina ${pageNum}/${maxPages}...`);
        
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent({
          includeMarkedContent: false
        });
        
        // Estrazione e pulizia testo
        const rawText = textContent.items
          .filter((item: any) => item.str && typeof item.str === 'string')
          .map((item: any) => item.str.trim())
          .filter(text => text.length > 0)
          .join(' ');
        
        // Pulizia per testi accademici
        const cleanedText = rawText
          .replace(/\s+/g, ' ')
          .replace(/([.!?])\s*([A-Z])/g, '$1\n\n$2')
          .replace(/^\d+\s*$|^Pagina\s+\d+|^Page\s+\d+/gim, '')
          .replace(/^(Capitolo|Chapter|Sezione|Section)\s+\d+/gim, '\n\n$&')
          .trim();
        
        const wordCount = cleanedText.split(/\s+/).length;
        
        if (cleanedText.length >= 50 && wordCount >= 10) {
          extractedPages.push({
            pageNum,
            text: cleanedText,
            wordCount
          });
          console.log(`✅ Pagina ${pageNum}: ${wordCount} parole`);
        } else {
          console.log(`⚠️ Pagina ${pageNum}: principalmente grafica`);
          extractedPages.push({
            pageNum,
            text: `[Pagina ${pageNum}: Contenuto prevalentemente grafico/visuale]`,
            wordCount: 0
          });
        }
        
        // Pausa per stabilità
        if (pageNum < maxPages) {
          await new Promise(resolve => setTimeout(resolve, 20));
        }
        
      } catch (pageError) {
        console.error(`❌ Errore pagina ${pageNum}:`, pageError);
        extractedPages.push({
          pageNum,
          text: `[Pagina ${pageNum}: Errore nell'estrazione]`,
          wordCount: 0
        });
      }
    }
    
    // Assemblaggio finale
    const documentSections = extractedPages.map(page => {
      return `=== PAGINA ${page.pageNum} ===\n${page.text}`;
    });
    
    let finalText = documentSections.join('\n\n');
    
    // Pulizia finale
    finalText = finalText
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s+([.!?])/g, '$1')
      .trim();
    
    // Statistiche
    const totalWords = finalText.split(/\s+/).length;
    const meaningfulPages = extractedPages.filter(p => p.wordCount >= 10).length;
    const textualContent = finalText.replace(/\[Pagina \d+:.*?\]/g, '').trim();
    
    console.log(`📊 STATISTICHE:`);
    console.log(`   • Pagine elaborate: ${extractedPages.length}`);
    console.log(`   • Pagine con testo: ${meaningfulPages}`);
    console.log(`   • Parole totali: ${totalWords}`);
    console.log(`   • Caratteri: ${finalText.length}`);
    
    // Validazione
    if (textualContent.length < 200) {
      console.warn(`⚠️ Poco testo estratto (${totalWords} parole), ma procediamo...`);
      finalText += '\n\n[NOTA: Documento con contenuto principalmente grafico. Analisi basata su testo limitato.]';
    }
    
    console.log('✅ Estrazione PDF completata');
    console.log(`📋 Anteprima: "${textualContent.substring(0, 150)}..."`);
    
    return finalText;
    
  } catch (error) {
    console.error('❌ ERRORE estrazione PDF:', error);
    
    // Gestione errori semplificata
    const errorStr = error.toString().toLowerCase();
    
    if (errorStr.includes('password') || errorStr.includes('encrypted')) {
      throw new Error('🔒 PDF protetto da password. Rimuovi la protezione e riprova.');
    }
    
    if (errorStr.includes('corrupt') || errorStr.includes('invalid')) {
      throw new Error('📄 File PDF danneggiato. Prova con un documento diverso.');
    }
    
    if (file.size > 50 * 1024 * 1024) {
      throw new Error('📏 File troppo grande (>50MB). Usa un PDF più piccolo.');
    }
    
    // Errore generico con suggerimenti
    throw new Error(`💥 Impossibile elaborare il PDF. Suggerimenti:\n• Verifica che sia un PDF valido\n• Prova con un file diverso\n• Controlla la connessione internet\n\nDettagli: ${error.message || error}`);
  }
};
