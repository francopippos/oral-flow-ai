
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    console.log('📄 Iniziando estrazione REALE dal PDF:', file.name);
    
    // Importazione dinamica di pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configurazione worker più robusta con multiple fallback
    const workerSources = [
      // CDN principale
      `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js`,
      // CDN alternativo
      `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.js`,
      // Versione locale come ultimo fallback
      `/node_modules/pdfjs-dist/build/pdf.worker.min.js`
    ];
    
    let workerConfigured = false;
    for (const workerSrc of workerSources) {
      try {
        pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
        console.log('🔧 Tentativo configurazione worker:', workerSrc);
        
        // Test rapido per verificare se il worker funziona
        const testBuffer = new ArrayBuffer(8);
        await pdfjsLib.getDocument({ data: testBuffer }).promise.catch(() => {
          // Errore atteso per buffer vuoto, ma significa che il worker è caricato
        });
        
        workerConfigured = true;
        console.log('✅ Worker configurato con successo:', workerSrc);
        break;
      } catch (error) {
        console.warn('⚠️ Worker fallito:', workerSrc, error);
        continue;
      }
    }
    
    if (!workerConfigured) {
      throw new Error('Impossibile configurare il worker PDF. Verifica la connessione internet.');
    }
    
    const arrayBuffer = await file.arrayBuffer();
    
    // Configurazione ottimizzata per PDF complessi
    const loadingTask = pdfjsLib.getDocument({ 
      data: arrayBuffer,
      verbosity: 0, // Riduci log
      disableFontFace: false,
      isEvalSupported: false,
      useSystemFonts: true,
      stopAtErrors: false,
      maxImageSize: 32 * 1024 * 1024, // 32MB per immagini grandi
      cMapPacked: true,
      standardFontDataUrl: undefined // Evita caricamenti esterni aggiuntivi
    });
    
    const pdf = await loadingTask.promise;
    console.log(`📑 PDF caricato: ${pdf.numPages} pagine`);
    
    let fullText = '';
    let successfulPages = 0;
    const pageContents: string[] = [];
    
    // Elabora tutte le pagine in parallelo per velocità
    const pagePromises = [];
    for (let i = 1; i <= Math.min(pdf.numPages, 50); i++) { // Limite a 50 pagine per performance
      pagePromises.push(
        pdf.getPage(i).then(async (page) => {
          try {
            const textContent = await page.getTextContent({
              includeMarkedContent: false,
              disableCombineTextItems: false
            });
            
            const pageText = textContent.items
              .map((item: any) => {
                if (item.str && typeof item.str === 'string') {
                  return item.str.trim();
                }
                return '';
              })
              .filter(text => text.length > 0)
              .join(' ')
              .replace(/\s+/g, ' ')
              .trim();
            
            return { pageNum: i, text: pageText, success: true };
          } catch (error) {
            console.warn(`⚠️ Errore pagina ${i}:`, error);
            return { pageNum: i, text: `[Pagina ${i}: Contenuto non testuale/grafico]`, success: false };
          }
        }).catch((error) => {
          console.warn(`❌ Impossibile caricare pagina ${i}:`, error);
          return { pageNum: i, text: `[Pagina ${i}: Errore di caricamento]`, success: false };
        })
      );
    }
    
    const results = await Promise.all(pagePromises);
    
    // Ordina i risultati per numero di pagina
    results.sort((a, b) => a.pageNum - b.pageNum);
    
    // Costruisci il testo finale
    results.forEach((result) => {
      if (result.text && result.text.length > 10) {
        pageContents.push(`--- PAGINA ${result.pageNum} ---\n${result.text}`);
        if (result.success) successfulPages++;
      } else {
        pageContents.push(`--- PAGINA ${result.pageNum} ---\n[Pagina contenente principalmente elementi grafici]`);
      }
    });
    
    fullText = pageContents.join('\n\n');
    
    // Pulizia finale del testo
    fullText = fullText
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Verifica qualità dell'estrazione
    const meaningfulText = fullText.replace(/\[Pagina \d+:.*?\]/g, '').trim();
    
    if (meaningfulText.length < 100) {
      if (successfulPages === 0) {
        throw new Error('Il PDF sembra essere composto principalmente da immagini scansionate. Prova con un PDF che contiene più testo selezionabile.');
      } else {
        fullText += '\n\n[NOTA: Questo PDF contiene molti elementi grafici. Il testo estratto potrebbe essere limitato.]';
      }
    }
    
    console.log(`✅ Estrazione completata: ${successfulPages}/${results.length} pagine con testo`);
    console.log(`📊 Caratteri estratti: ${fullText.length}`);
    console.log('📋 Anteprima:', fullText.substring(0, 200) + '...');
    
    return fullText;
    
  } catch (error) {
    console.error('❌ Errore nell\'estrazione dal PDF:', error);
    
    const errorMessage = error.toString().toLowerCase();
    
    if (errorMessage.includes('worker') || errorMessage.includes('fetch')) {
      throw new Error('Errore nel sistema di elaborazione PDF. Riprova tra qualche secondo o verifica la connessione internet.');
    } else if (errorMessage.includes('invalid pdf') || errorMessage.includes('corrupted')) {
      throw new Error('Il file PDF risulta danneggiato o non valido. Prova con un altro file PDF.');
    } else if (errorMessage.includes('password')) {
      throw new Error('Il PDF è protetto da password. Rimuovi la protezione e riprova.');
    } else if (errorMessage.includes('scansionate') || errorMessage.includes('immagini')) {
      throw new Error('Questo PDF è principalmente composto da immagini. Il sistema attuale funziona meglio con PDF contenenti testo selezionabile.');
    } else {
      throw new Error(`Errore nell'elaborazione del PDF: ${error.message || error}. Prova con un file diverso o riprova tra qualche momento.`);
    }
  }
};
