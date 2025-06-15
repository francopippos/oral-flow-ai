
const OPENAI_API_KEY = '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';

interface Chunk {
  text: string;
  embedding: number[];
  index: number;
}

export const generateProfessorResponse = async (
  studentInput: string,
  relevantChunks: Chunk[],
  documentName: string
): Promise<string> => {
  try {
    console.log('👨‍🏫 Generando risposta del Professore Universitario...');
    
    const context = relevantChunks.map((chunk, index) => 
      `[Sezione ${index + 1}]\n${chunk.text}`
    ).join('\n\n---\n\n');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Sei un Professore Universitario esperto e autorevole. Stai conducendo un'interrogazione orale con uno studente che ha studiato il documento "${documentName}".

COMPORTAMENTO:
- Rispondi in modo preciso, approfondito e professionale
- Usa un tono autorevole ma incoraggiante, tipico di un professore universitario
- Valuta l'accuratezza e la completezza dell'esposizione dello studente
- Fornisci correzioni costruttive quando necessario
- Fai domande di approfondimento per testare la comprensione
- Evidenzia collegamenti tra concetti
- Usa terminologia accademica appropriata

REGOLE FONDAMENTALI:
- Basa le tue risposte ESCLUSIVAMENTE sul contenuto fornito nel contesto
- Non inventare informazioni non presenti nel documento
- Se lo studente dice qualcosa di impreciso, correggilo gentilmente
- Riconosci quando lo studente espone correttamente i concetti
- Proponi sempre una domanda di follow-up per approfondire

CONTESTO DAL DOCUMENTO:
${context}`
          },
          {
            role: 'user',
            content: `Lo studente ha detto: "${studentInput}"`
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Errore API OpenAI: ${response.status}`);
    }

    const data = await response.json();
    const professorResponse = data.choices[0].message.content;
    
    console.log('✅ Risposta del Professore generata');
    return professorResponse;
  } catch (error) {
    console.error('❌ Errore nella generazione della risposta:', error);
    return "Mi dispiace, c'è stato un problema tecnico. Potresti ripetere la tua esposizione?";
  }
};
