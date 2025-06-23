
export const askProfessor = async (
  question: string,
  relevantChunks: string[],
  allChunks?: string[],
  allEmbeddings?: number[][]
): Promise<string> => {
  try {
    console.log('👨‍🏫 [PROFESSORE UNIVERSITARIO] Analizzando domanda:', question.substring(0, 100));
    console.log(`📚 Sezioni rilevanti trovate: ${relevantChunks.length}`);

    if (relevantChunks.length === 0) {
      return `🎓 **Professore:** Non ho individuato sezioni specifiche del documento che trattino direttamente questo argomento.

**Suggerimenti:**
• Riprova con terminologia più specifica presente nel documento
• Verifica che l'argomento sia effettivamente trattato nel materiale caricato
• Considera di riformulare la domanda in modo più preciso

Sono qui per aiutarti a comprendere al meglio il contenuto del documento. Prova con una nuova domanda! 📖`;
    }

    // Analisi e sintesi accademica del contenuto rilevante
    let professorResponse = `🎓 **Professore Universitario - Risposta basata sul documento:**\n\n`;
    
    // Introduzione contestuale
    professorResponse += `In base all'analisi del documento che hai caricato, posso fornirti le seguenti informazioni specifiche:\n\n`;
    
    // Sezioni rilevanti con analisi
    relevantChunks.forEach((chunk, index) => {
      const chunkPreview = chunk.length > 400 ? chunk.substring(0, 400) + '...' : chunk;
      const cleanChunk = chunkPreview
        .replace(/--- Pagina \d+ ---/g, '')
        .replace(/\n+/g, ' ')
        .trim();
      
      professorResponse += `**📖 Sezione ${index + 1}${relevantChunks.length > 1 ? ` di ${relevantChunks.length}` : ''}:**\n`;
      professorResponse += `"${cleanChunk}"\n\n`;
    });
    
    // Analisi professionale finale
    if (relevantChunks.length > 1) {
      professorResponse += `**🧠 Sintesi accademica:**\n`;
      professorResponse += `Le sezioni estratte forniscono una visione ${relevantChunks.length > 2 ? 'multidimensionale' : 'bidirezionale'} dell'argomento richiesto. `;
      professorResponse += `Il materiale evidenzia aspetti interconnessi che meritano approfondimento.\n\n`;
    }
    
    // Invito all'approfondimento
    professorResponse += `**💡 Domande di approfondimento suggerite:**\n`;
    professorResponse += `• Desideri che elabori uno degli aspetti specifici emersi?\n`;
    professorResponse += `• Ci sono collegamenti con altre parti del documento che ti interessano?\n`;
    professorResponse += `• Vuoi che analizzi più nel dettaglio qualche concetto particolare?\n\n`;
    
    professorResponse += `*Come professore, sono qui per guidarti nella comprensione approfondita del materiale. Ogni domanda è un'opportunità di apprendimento!* 🎯`;

    console.log('✅ Risposta professionale formulata');
    return professorResponse;
    
  } catch (error) {
    console.error('❌ Errore nel sistema professionale:', error);
    
    return `🎓 **Professore:** Mi dispiace, si è verificato un problema tecnico nell'analisi del documento.

**Cosa puoi fare:**
• Riprova con la stessa domanda
• Verifica che il documento sia stato caricato correttamente
• Prova con una domanda diversa

Il sistema di analisi è progettato per essere robusto, quindi questo problema dovrebbe essere temporaneo. 🔧`;
  }
};
