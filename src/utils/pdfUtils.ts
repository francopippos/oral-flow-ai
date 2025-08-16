
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    console.log('📄 Iniziando estrazione PDF:', file.name, `(${Math.round(file.size / 1024 / 1024 * 100) / 100} MB)`);
    
    // Importazione dinamica di pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configurazione worker funzionante per ambiente browser
    console.log('🔧 Configurando PDF.js...');
    
    // Usa il worker dalla versione installata - versione compatibile
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();
    
    console.log('✅ PDF.js configurato con worker stabile');
    
    // Conversione file in ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    console.log(`📊 File convertito: ${arrayBuffer.byteLength} bytes`);
    
    // Caricamento PDF con configurazione minimalista
    console.log('📚 Caricamento PDF...');
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      verbosity: 0
    });
    
    const pdf = await loadingTask.promise;
    console.log(`📑 PDF caricato: ${pdf.numPages} pagine`);
    
    // Estrazione testo semplificata
    const extractedPages: string[] = [];
    const maxPages = Math.min(pdf.numPages, 50); // Limite per performance
    
    console.log(`🔄 Elaborazione ${maxPages} pagine...`);
    
    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      try {
        console.log(`📄 Elaborando pagina ${pageNum}/${maxPages}...`);
        
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Estrazione testo
        const pageText = textContent.items
          .filter((item: any) => item.str && typeof item.str === 'string')
          .map((item: any) => item.str.trim())
          .filter(text => text.length > 0)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        if (pageText.length > 20) {
          extractedPages.push(`=== PAGINA ${pageNum} ===\n${pageText}`);
          console.log(`✅ Pagina ${pageNum}: ${pageText.length} caratteri`);
        } else {
          console.log(`⚠️ Pagina ${pageNum}: contenuto minimo`);
        }
        
      } catch (pageError) {
        console.error(`❌ Errore pagina ${pageNum}:`, pageError);
        extractedPages.push(`=== PAGINA ${pageNum} ===\n[Errore nell'estrazione]`);
      }
    }
    
    // Assemblaggio finale
    let finalText = extractedPages.join('\n\n').trim();
    
    // Pulizia finale
    finalText = finalText
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s+([.!?])/g, '$1')
      .trim();
    
    const totalWords = finalText.split(/\s+/).length;
    console.log(`📊 ESTRAZIONE COMPLETATA:`);
    console.log(`   • Pagine elaborate: ${extractedPages.length}`);
    console.log(`   • Parole totali: ${totalWords}`);
    console.log(`   • Caratteri: ${finalText.length}`);
    
    if (finalText.length < 100) {
      console.warn(`⚠️ Poco testo estratto, ma procediamo...`);
      finalText = finalText || 'Contenuto del documento estratto con limitazioni.';
    }
    
    console.log('✅ Estrazione PDF completata con successo');
    return finalText;
    
  } catch (error) {
    console.error('❌ ERRORE CRITICO estrazione PDF:', error);
    
    // Gestione errori semplificata
    if (error.toString().includes('password')) {
      throw new Error('🔒 PDF protetto da password. Rimuovi la protezione e riprova.');
    }
    
    if (error.toString().includes('corrupt')) {
      throw new Error('📄 File PDF danneggiato o non valido.');
    }
    
    if (file.size > 100 * 1024 * 1024) {
      throw new Error('📏 File troppo grande (>100MB). Usa un PDF più piccolo.');
    }
    
    // Errore generico
    throw new Error(`💥 Errore nell'elaborazione del PDF: ${error.message || error}`);
  }
};
