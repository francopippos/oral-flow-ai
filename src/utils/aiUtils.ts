
import { findRelevantChunks, createEmbedding, Chunk } from './ragUtils';

const OPENAI_API_KEY = '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';

export const generateProfessorResponse = async (
  question: string,
  chunks: Chunk[],
  conversationHistory: Array<{role: string, message: string}> = []
): Promise<{response: string, sources: Chunk[]}> => {
  try {
    console.log('🎓 Professore sta elaborando la domanda:', question.substring(0, 100));
    
    // Step 1: Crea embedding della domanda
    const questionEmbedding = await createEmbedding(question);
    
    // Step 2: Trova chunk più rilevanti
    const relevantChunks = findRelevantChunks(questionEmbedding, chunks, 3);
    console.log('📖 Trovati', relevantChunks.length, 'chunk rilevanti');
    
    // Step 3: Costruisci contesto
    const context = relevantChunks
      .map((chunk, index) => `[FONTE ${index + 1}]:\n${chunk.content}`)
      .join('\n\n---\n\n');
    
    // Step 4: Genera risposta con GPT-4
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Sei un professore universitario esperto e autorevole. 

REGOLE FONDAMENTALI:
1. Rispondi SOLO basandoti sui contenuti forniti nel CONTESTO
2. Se la domanda non trova risposta nel contesto, dillo chiaramente
3. Usa un tono accademico ma accessibile
4. Fornisci spiegazioni approfondite e precise
5. Cita sempre le fonti quando possibile
6. Se necessario, fornisci esempi e collegamenti concettuali
7. Mantieni alta autorevolezza scientifica
8. Rispondi in modo strutturato e chiaro

STILE:
- Inizio con una risposta diretta
- Sviluppo con dettagli e approfondimenti  
- Conclusione con implicazioni o collegamenti
- Usa terminologia tecnica appropriata
- Mantieni rigore accademico

Non inventare informazioni non presenti nel contesto fornito.`
          },
          ...conversationHistory.map(msg => ({
            role: msg.role === 'professor' ? 'assistant' : 'user',
            content: msg.message
          })),
          {
            role: 'user',
            content: `CONTESTO ACCADEMICO:
${context}

DOMANDA DELLO STUDENTE:
${question}

Fornisci una risposta da professore universitario, precisa e autorevole.`
          }
        ],
        max_tokens: 800,
        temperature: 0.3, // Bassa per precisione accademica
      }),
    });

    if (!response.ok) {
      throw new Error(`Errore API: ${response.status}`);
    }

    const data = await response.json();
    const professorResponse = data.choices[0].message.content;
    
    console.log('✅ Risposta del professore generata');
    
    return {
      response: professorResponse,
      sources: relevantChunks
    };
    
  } catch (error) {
    console.error('❌ Errore generazione risposta professore:', error);
    return {
      response: "Mi dispiace, si è verificato un problema tecnico. Puoi ripetere la domanda?",
      sources: []
    };
  }
};

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    console.log('🎯 Trascrizione audio in corso...');
    
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');
    formData.append('model', 'whisper-1');
    formData.append('language', 'it');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Errore trascrizione: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Trascrizione completata:', data.text);
    return data.text;
  } catch (error) {
    console.error('❌ Errore nella trascrizione:', error);
    throw error;
  }
};

// Mantengo la funzione legacy per compatibilità
export const analyzeWithOralMindAI = generateProfessorResponse;
