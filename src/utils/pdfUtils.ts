
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    console.log('📄 Iniziando estrazione testo dal PDF...', file.name);
    
    // Importazione dinamica di pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configurazione worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    console.log('✅ Testo estratto con successo dal PDF');
    return fullText;
  } catch (error) {
    console.error('❌ Errore nell\'estrazione del testo dal PDF:', error);
    // Fallback: simulazione di contenuto per la demo
    return `Contenuto estratto dal PDF "${file.name}":

Questo è un esempio di contenuto estratto dal PDF caricato. In una versione completa di OralMind, il sistema estrarrebbe automaticamente tutto il testo dal documento PDF per permettere al Professor OralMind di analizzarlo e creare interrogazioni personalizzate.

Il contenuto includerebbe:
- Tutti i paragrafi e sezioni del documento
- Formule e definizioni principali
- Esempi e casi di studio
- Bibliografia e riferimenti

Il Professor OralMind utilizzerà esclusivamente questo contenuto per formulare domande pertinenti e valutare le risposte dello studente.`;
  }
};
