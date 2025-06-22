
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    console.log('📄 Iniziando estrazione REALE dal PDF:', file.name);
    
    // Importazione dinamica di pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configurazione worker con versione CORRETTA per pdfjs-dist 5.3.31
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/5.3.31/pdf.worker.min.js`;
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ 
      data: arrayBuffer,
      verbosity: 0 // Riduci i log di debug
    }).promise;
    
    let fullText = '';
    
    console.log(`📑 Processando ${pdf.numPages} pagine...`);
    
    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`📄 Estrazione pagina ${i}/${pdf.numPages}`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // Estrai tutto il testo dalla pagina
      const pageText = textContent.items
        .map((item: any) => {
          // Assicurati che l'item abbia la proprietà str
          return item.str || '';
        })
        .join(' ')
        .replace(/\s+/g, ' ') // Normalizza gli spazi
        .trim();
      
      if (pageText) {
        fullText += pageText + '\n\n';
      }
    }
    
    // Pulizia finale del testo
    fullText = fullText
      .replace(/\n{3,}/g, '\n\n') // Max 2 newline consecutive
      .replace(/\s+/g, ' ') // Normalizza spazi
      .trim();
    
    if (!fullText || fullText.length < 10) {
      throw new Error('Il PDF sembra vuoto o non contiene testo estraibile. Assicurati che non sia un PDF scannerizzato o protetto.');
    }
    
    console.log(`✅ Estratto testo dal PDF: ${fullText.length} caratteri`);
    console.log('📋 Anteprima testo:', fullText.substring(0, 200) + '...');
    
    return fullText;
  } catch (error) {
    console.error('❌ Errore nell\'estrazione REALE dal PDF:', error);
    
    // Messaggi di errore più specifici
    const errorMessage = error.toString();
    if (errorMessage.includes('Invalid PDF')) {
      throw new Error('Il file PDF sembra corrotto o non valido.');
    } else if (errorMessage.includes('password')) {
      throw new Error('Il PDF è protetto da password e non può essere elaborato.');
    } else if (errorMessage.includes('worker') || errorMessage.includes('version')) {
      throw new Error('Errore nel caricamento del sistema PDF. Riprova tra qualche secondo.');
    } else {
      throw new Error(`Impossibile estrarre il testo dal PDF: ${error}. Prova con un altro file PDF.`);
    }
  }
};
