
const OPENAI_API_KEY = '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';

export const askProfessor = async (
  question: string,
  relevantChunks: string[]
): Promise<string> => {
  try {
    console.log('👨‍🏫 Il Professore Virtuale sta elaborando la risposta...');
    
    const context = relevantChunks.join('\n\n---\n\n');
    
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
            content: `Sei un Professore Universitario Virtuale esperto e autorevole. 

ISTRUZIONI FONDAMENTALI:
1. Rispondi ESCLUSIVAMENTE basandoti sui contenuti forniti nel contesto
2. Se la domanda non può essere risposta con il materiale fornito, dillo chiaramente
3. Mantieni un tono accademico, preciso e autorevole tipico di un professore universitario
4. Fornisci risposte approfondite, citando specificamente le sezioni rilevanti
5. Organizza la risposta in modo logico e strutturato
6. Usa terminologia tecnica appropriata
7. Se opportuno, collega i concetti tra loro
8. Concludi con domande di approfondimento per stimolare la riflessione critica

STILE:
- Autorevole ma accessibile
- Preciso e dettagliato
- Pedagogicamente efficace
- Accademicamente rigoroso

Ricorda: Sei un professore che conosce SOLO il materiale del documento caricato.`
          },
          {
            role: 'user',
            content: `Agisci come un professore universitario esperto. Rispondi in modo preciso, approfondito e autorevole alla seguente domanda, basandoti sui contenuti forniti.

CONTESTO DEL DOCUMENTO:
${context}

DOMANDA DELLO STUDENTE:
${question}

Fornisci una risposta completa, precisa e autorevole come farebbe un professore universitario durante un esame orale.`
          }
        ],
        max_tokens: 800,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`Errore API OpenAI: ${response.status}`);
    }

    const data = await response.json();
    const professorResponse = data.choices[0].message.content;
    
    console.log('✅ Risposta del Professore Virtuale completata');
    return professorResponse;
  } catch (error) {
    console.error('❌ Errore nella risposta del professore:', error);
    return "Mi dispiace, c'è stato un problema tecnico nell'elaborazione della tua domanda. Come professore, preferisco non fornire risposte imprecise. Potresti ripetere la domanda?";
  }
};
