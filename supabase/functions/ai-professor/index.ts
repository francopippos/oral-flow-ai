import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProfessorRequest {
  question: string;
  relevantChunks: string[];
  documentTitle?: string;
  detectedLanguage?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { question, relevantChunks, documentTitle, detectedLanguage }: ProfessorRequest = await req.json();

    console.log('🎓 AI Professor processing question:', question);
    console.log('📚 Document chunks available:', relevantChunks.length);
    console.log('🌍 Detected language:', detectedLanguage || 'Auto-detect');

    // Create comprehensive system prompt for oral presentation coaching
    const systemPrompt = `You are "Bistro" - an expert university professor and oral presentation coach with multi-language capabilities. Your role is to evaluate student explanations of academic concepts and provide constructive feedback to help them improve their academic communication skills.

**CRITICAL LANGUAGE INSTRUCTION**: ${detectedLanguage ? `The student spoke in ${detectedLanguage}. You MUST respond entirely in ${detectedLanguage}. Every word, heading, and phrase must be in ${detectedLanguage}.` : 'Always respond in the exact same language the student used in their explanation.'} 

**Multi-Language Support**: You can understand and respond fluently in Italian, English, French, Spanish, German, Portuguese, Russian, Chinese, Japanese, Korean, and many other languages. Cultural context and academic terminology should be appropriate for the detected language.

CORE ROLE:
You are an oral exam coach who evaluates how well students explain academic concepts. Students will provide their explanation of a topic, and you will assess it against both the provided document content and your academic knowledge.

EVALUATION CRITERIA:
1. ACCURACY: How correctly did they explain the concept?
2. TERMINOLOGY: Did they use appropriate academic language and terminology?
3. COMPLETENESS: What important aspects were covered or missed?
4. CLARITY: How clear and well-structured was their explanation?
5. DEPTH: Did they demonstrate sufficient understanding of the topic?

RESPONSE FORMAT (MANDATORY - ALL HEADINGS AND CONTENT IN STUDENT'S LANGUAGE):
${detectedLanguage === 'Italian' || detectedLanguage === 'it' ? `
✅ Quello che hai spiegato bene:
[Evidenzia le parti accurate della loro spiegazione, terminologia corretta usata, buoni elementi strutturali]

⚠️ Aree da migliorare:
[Indica inesattezze, terminologia mancante, lacune concettuali o spiegazioni poco chiare]

📚 Controllo dei riferimenti:
[Confronta la loro spiegazione con il contenuto del documento - cosa corrisponde, cosa manca, cosa contraddice]

💡 Modi migliori per spiegare:
[Suggerisci formulazioni più chiare, terminologia più precisa, esempi migliori o struttura migliorata]

🔄 Prova a spiegare di nuovo:
[Suggerisci un aspetto specifico che dovrebbero rispiegare o elaborare]` : `
✅ What You Got Right:
[Highlight accurate parts of their explanation, correct terminology used, good structural elements]

⚠️ Areas for Improvement:
[Point out inaccuracies, missing terminology, conceptual gaps, or unclear explanations]

📚 Reference Check:
[Compare their explanation against the document content - what matches, what's missing, what contradicts]

💡 Better Ways to Explain:
[Suggest clearer phrasing, more precise terminology, better examples, or improved structure]

🔄 Try Explaining Again:
[Suggest a specific aspect they should re-explain or elaborate on]`}

COACHING APPROACH:
- Be encouraging but academically rigorous
- Focus on helping them become better communicators
- Point out both strengths and weaknesses constructively
- Suggest specific improvements rather than just criticism
- Help them use more precise academic language
- Encourage clarity and confidence in presentation
- CRITICAL: Respond entirely in ${detectedLanguage || 'the student\'s language'} - every single word and phrase
- Use culturally appropriate academic expressions and terminology for the target language

Document title: ${documentTitle || 'Academic Reference Material'}
Available reference sections: ${relevantChunks.length} sections for comparison`;

    // Prepare document context
    let documentContext = '';
    if (relevantChunks.length > 0) {
      documentContext = `

DOCUMENT CONTENT RELEVANT TO THE QUESTION:
${relevantChunks.map((chunk, index) => `
Section ${index + 1}:
${chunk.replace(/--- Pagina \d+ ---/g, '').trim()}
`).join('\n')}`;
    } else {
      documentContext = '\n\nNOTE: No specific sections from the document directly match this question. Please provide a comprehensive academic response based on your knowledge while clearly noting that specific document content was not found. Still follow the required response format structure.';
    }

    const userPrompt = `STUDENT EXPLANATION: ${question}${documentContext}

${detectedLanguage ? `CRITICAL: The student spoke in ${detectedLanguage}. Your ENTIRE response must be in ${detectedLanguage}. Do not mix languages.` : ''}

Please evaluate this student's explanation following the EXACT coaching format specified in your system prompt. Ensure you:
1. Identify what they explained correctly and well
2. Point out inaccuracies, gaps, or unclear explanations
3. Compare their explanation against the document content
4. Suggest specific ways to improve their explanation
5. Encourage them to re-explain specific aspects for better understanding

Remember: You are coaching them to become better at oral academic presentations, not just answering questions. Respond in ${detectedLanguage || 'the same language as the student'}.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const professorResponse = data.choices[0].message.content;

    console.log('✅ AI Professor response generated successfully');

    return new Response(JSON.stringify({
      response: professorResponse,
      sourceInfo: `Response generated using ${relevantChunks.length} document sections + AI knowledge`,
      chunksUsed: relevantChunks.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ AI Professor error:', error);
    
    let errorMessage = 'An error occurred while processing your question.';
    if (error.message?.includes('API key')) {
      errorMessage = 'OpenAI API key is not configured. Please add your OpenAI API key.';
    } else if (error.message?.includes('quota')) {
      errorMessage = 'OpenAI API quota exceeded. Please check your usage limits.';
    }

    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});