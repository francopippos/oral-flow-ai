
/**
 * Utility to call OpenAI GPT-3.5/4 for RAG over PDF chunks.
 */
export const askOpenAIPdfProfessor = async (
  apiKey: string,
  question: string,
  contextChunks: string[]
): Promise<string> => {
  const systemPrompt = `
Sei un professore universitario scrupoloso. Usa solo le seguenti informazioni tratte da un documento PDF per rispondere alle domande. Se la risposta non è contenuta nei dati forniti, ammettilo esplicitamente. Scrivi in modo sintetico e preciso.
-----
${contextChunks.map((ch, idx) => `Estratto ${idx+1}:\n${ch}`).join('\n\n')}
-----
Rispondi solo se trovi l'informazione nei dati sopra.
`;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Puoi cambiare in "gpt-4" se vuoi 
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question }
        ],
        temperature: 0.0, // massima aderenza al testo fornito
        max_tokens: 700
      })
    });
    if (!response.ok) {
      const out = await response.json();
      throw new Error(out?.error?.message || "Errore chiamata OpenAI");
    }
    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content?.trim();
    return answer || "Nessuna risposta generata dal modello.";
  } catch (err: any) {
    console.error("Errore chiamata GPT:", err);
    return "C'è stato un errore nel generare la risposta con OpenAI.";
  }
};
