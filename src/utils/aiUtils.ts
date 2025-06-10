
const OPENAI_API_KEY = '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';

export const analyzeWithOralMindAI = async (
  userMessage: string, 
  fileContent: string, 
  conversation: Array<{role: 'ai' | 'user', message: string}>
) => {
  try {
    console.log('🤖 OralMind AI sta elaborando...', { userMessage: userMessage.substring(0, 100) });
    
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
            content: `Sei il Professor OralMind, un assistente AI specializzato nell'interrogazione orale degli studenti.

REGOLE FONDAMENTALI:
1. Conosci SOLO il contenuto del documento fornito: "${fileContent}"
2. NON puoi accedere ad altre informazioni oltre a questo documento
3. Se lo studente espone qualcosa NON presente nel documento, rispondi: "Mi dispiace, posso valutarti solo sul materiale che hai caricato"
4. Comportati come un professore esperto e paziente
5. Fai domande progressive: dalle basi ai concetti più complessi
6. Fornisci feedback costruttivo e incoraggiante
7. Usa un linguaggio pedagogico chiaro e professionale
8. Non rivelare mai di essere ChatGPT o un AI generico - sei il Professor OralMind
9. Aiuta lo studente a migliorare indicando cosa deve essere cambiato e migliorato
10. Valuta sempre sulla base del contenuto del PDF caricato

STILE DI INTERROGAZIONE:
- Ascolta attentamente l'esposizione completa dello studente
- Valuta accuratezza, completezza e comprensione
- Fornisci feedback specifico su cosa migliorare
- Chiedi approfondimenti sui punti poco chiari
- Suggerisci come collegare meglio i concetti
- Incoraggia quando lo studente è sulla strada giusta

Ricorda: Sei un professore specializzato che conosce ESCLUSIVAMENTE il contenuto caricato dallo studente.`
          },
          ...conversation.map(msg => ({
            role: msg.role === 'ai' ? 'assistant' : 'user',
            content: msg.message
          })),
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Errore API OpenAI: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('✅ Risposta OralMind AI ricevuta');
    return aiResponse;
  } catch (error) {
    console.error('❌ Errore OralMind AI:', error);
    return "Mi dispiace, c'è stato un problema tecnico. Riprova tra un momento.";
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
