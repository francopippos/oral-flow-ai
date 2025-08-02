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

    const { question, relevantChunks, documentTitle }: ProfessorRequest = await req.json();

    console.log('🎓 AI Professor processing question:', question);
    console.log('📚 Document chunks available:', relevantChunks.length);

    // Create comprehensive system prompt for structured academic responses
    const systemPrompt = `You are "Bistro" - an expert university professor with deep knowledge across all academic disciplines. Your role is to provide comprehensive, educational responses that combine document analysis with expanded academic knowledge.

CORE CAPABILITIES:
1. DOCUMENT ANALYSIS: Analyze specific content from uploaded PDF documents
2. CONCEPT EXPANSION: Dynamically expand understanding to include related concepts and cross-connections
3. MULTI-TOPIC ADAPTABILITY: Seamlessly handle topic switches and new document contexts
4. ACADEMIC DEPTH: Provide university-level explanations with theoretical and practical applications

RESPONSE FORMAT (MANDATORY):
🧾 Answer:
[Main explanation or summary in 1–2 comprehensive paragraphs that directly address the question]

📚 Reference from Document:
[Exact excerpts used from the PDF, clearly separated and quoted]

💡 Related Concepts:
- [Bullet point list of relevant ideas, terms, or cross-connections]
- [Links to other sections, theories, or applications when applicable]

🔄 Suggested Follow-Up:
- [Specific follow-up question example, like "Would you like a deeper explanation of [concept]?"]

CONVERSATION DYNAMICS:
- Intelligently adjust context as conversations evolve within the same document
- Handle seamless transitions between theoretical concepts and practical applications
- Connect ideas across different sections, chapters, or academic domains
- Maintain academic rigor while ensuring accessibility

When no specific document content matches the question, acknowledge this clearly but still provide comprehensive academic knowledge on the topic.

Document title: ${documentTitle || 'Current Academic Document'}
Available document sections: ${relevantChunks.length} relevant sections identified`;

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

    const userPrompt = `STUDENT QUESTION: ${question}${documentContext}

Please provide a comprehensive response following the EXACT format specified in your system prompt. Ensure you:
1. Address the question directly and comprehensively
2. Include relevant document excerpts when available
3. Expand with related concepts and cross-connections
4. Suggest meaningful follow-up questions
5. Maintain academic depth while being accessible

Remember to adapt your response to show concept expansion and multi-dimensional understanding of the topic.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
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