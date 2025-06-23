
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    console.log('📄 Iniziando estrazione REALE dal PDF:', file.name);
    
    // Importazione dinamica di pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configurazione worker - usa versione locale se CDN fallisce
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.3.31/build/pdf.worker.min.js`;
    } catch {
      // Fallback per worker locale
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.min.js';
    }
    
    const arrayBuffer = await file.arrayBuffer();
    
    // Configurazione per PDF complessi con immagini - usando solo proprietà valide
    const loadingTask = pdfjsLib.getDocument({ 
      data: arrayBuffer,
      verbosity: 0,
      disableFontFace: false, // Mantieni font per testo migliore
      isEvalSupported: false, // Sicurezza
      useSystemFonts: true, // Usa font di sistema per fallback
      stopAtErrors: false, // Non fermarsi agli errori di singole pagine
      maxImageSize: 16777216, // 16MB max per immagini
      cMapPacked: true
    });
    
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    let extractedPages = 0;
    
    console.log(`📑 Processando ${pdf.numPages} pagine (con possibili immagini/grafici)...`);
    
    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`📄 Estrazione pagina ${i}/${pdf.numPages}`);
      
      try {
        const page = await pdf.getPage(i);
        // Usando solo proprietà valide per getTextContent
        const textContent = await page.getTextContent({
          includeMarkedContent: false
        });
        
        // Estrai testo anche da elementi complessi
        const pageText = textContent.items
          .map((item: any) => {
            // Gestisci diversi tipi di elementi di testo
            if (item.str && typeof item.str === 'string') {
              return item.str.trim();
            }
            return '';
          })
          .filter(text => text.length > 0) // Rimuovi stringhe vuote
          .join(' ')
          .replace(/\s+/g, ' ') // Normalizza spazi multipli
          .trim();
        
        if (pageText && pageText.length > 3) { // Almeno qualche carattere significativo
          fullText += pageText + '\n\n';
          extractedPages++;
        } else {
          console.log(`⚠️ Pagina ${i} sembra contenere solo immagini/grafici`);
          // Aggiungi segnaposto per pagine con solo immagini
          fullText += `[Pagina ${i}: Contenuto grafico/immagini]\n\n`;
        }
        
      } catch (pageError) {
        console.warn(`⚠️ Errore nella pagina ${i}:`, pageError);
        fullText += `[Pagina ${i}: Errore nell'estrazione - possibile contenuto grafico]\n\n`;
      }
    }
    
    // Pulizia finale del testo
    fullText = fullText
      .replace(/\n{3,}/g, '\n\n') // Max 2 newline consecutive
      .replace(/\s+/g, ' ') // Normalizza tutti gli spazi
      .trim();
    
    // Verifica che abbiamo estratto almeno qualcosa di utile
    const meaningfulText = fullText.replace(/\[Pagina \d+:.*?\]/g, '').trim();
    
    if (!meaningfulText || meaningfulText.length < 50) {
      // Se abbiamo poco testo, potrebbe essere un PDF prevalentemente grafico
      if (extractedPages === 0) {
        throw new Error('Il PDF sembra essere composto principalmente da immagini scansionate. Per PDF di questo tipo, è necessario un sistema OCR più avanzato.');
      } else {
        console.log('⚠️ PDF con poco testo ma alcune pagine estratte');
        fullText = meaningfulText + '\n\n[NOTA: Questo PDF contiene molti elementi grafici/immagini che non possono essere elaborati come testo]';
      }
    }
    
    console.log(`✅ Estratto testo da ${extractedPages}/${pdf.numPages} pagine: ${fullText.length} caratteri`);
    console.log('📋 Anteprima testo:', fullText.substring(0, 300) + '...');
    
    return fullText;
    
  } catch (error) {
    console.error('❌ Errore nell\'estrazione REALE dal PDF:', error);
    
    const errorMessage = error.toString();
    
    if (errorMessage.includes('Invalid PDF')) {
      throw new Error('Il file PDF risulta corrotto o non è un PDF valido. Prova con un altro file.');
    } else if (errorMessage.includes('password')) {
      throw new Error('Il PDF è protetto da password. Rimuovi la protezione e riprova.');
    } else if (errorMessage.includes('worker') || errorMessage.includes('fetch')) {
      throw new Error('Errore di connessione nel caricamento del sistema PDF. Verifica la connessione internet e riprova.');
    } else if (errorMessage.includes('scansionate') || errorMessage.includes('OCR')) {
      throw new Error('Questo PDF è composto principalmente da immagini scansionate. Il sistema attuale funziona meglio con PDF che contengono testo selezionabile.');
    } else {
      throw new Error(`Errore nell'elaborazione del PDF: ${error.message || error}. Se il problema persiste, prova con un PDF diverso.`);
    }
  }
};
