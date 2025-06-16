
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    console.log('📄 Iniziando estrazione REALE dal PDF:', file.name);
    
    // Importazione dinamica di pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configurazione worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js`;
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
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
    
    if (!fullText || fullText.length < 100) {
      throw new Error('Il PDF sembra vuoto o non contiene testo estraibile');
    }
    
    console.log(`✅ Estratto testo dal PDF: ${fullText.length} caratteri`);
    console.log('📋 Anteprima testo:', fullText.substring(0, 200) + '...');
    
    return fullText;
  } catch (error) {
    console.error('❌ Errore nell\'estrazione REALE dal PDF:', error);
    throw new Error(`Impossibile estrarre il testo dal PDF: ${error}`);
  }
};
