
export const askProfessor = async (
  question: string,
  relevantChunks: string[]
): Promise<string> => {
  try {
    console.log('👨‍🏫 Il Professore Virtuale sta elaborando la risposta con i chunk del documento...');

    // Se troviamo chunk rilevanti (dal documento dell'utente)
    if (relevantChunks && relevantChunks.length > 0) {
      // Prepariamo una risposta "accademica" sul contenuto trovato
      const contextPreview = relevantChunks.map((chunk, i) => 
        `Estratto [${i + 1}]:\n${chunk.trim()}`
      ).join('\n\n---\n\n');

      // Simuliamo una risposta che riassume e spiega i chunk rilevanti
      let answer = `Dopo aver consultato con attenzione il materiale fornito, posso offrirti questa risposta basata esclusivamente sul tuo documento:\n\n`;

      answer += contextPreview;

      answer += `\n\n👉 Se hai bisogno di chiarimenti sui punti appena citati, chiedimi pure ulteriori dettagli. La mia risposta si basa SOLO sui contenuti che mi hai fornito.`;

      // Simuliamo un'elaborazione (per realismo della demo)
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      console.log('✅ Risposta del Professore AI generata dal documento.');
      return answer;
    }

    // Se NON ci sono chunk rilevanti, rispondi in modo neutrale
    return `Non ho trovato informazioni rilevanti sul tema richiesto nel documento che hai fornito. Ti suggerisco di provare a riformulare la domanda o fornire materiale più pertinente.`;

  } catch (error) {
    console.error('❌ Errore nella risposta del professore:', error);
    return "Mi dispiace, c'è stato un problema tecnico nell'elaborazione della tua domanda. Come professore, preferisco non fornire risposte imprecise. Potresti ripetere la domanda?";
  }
};
