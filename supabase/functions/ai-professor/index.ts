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

    // Create comprehensive system prompt
    const systemPrompt = `You are an expert university professor with deep knowledge across all academic disciplines. Your role is to provide comprehensive, educational responses that combine:

1. DOCUMENT ANALYSIS: The specific content from the uploaded PDF document
2. EXPANDED KNOWLEDGE: Your extensive academic knowledge to provide context, examples, and deeper insights
3. PEDAGOGICAL APPROACH: Clear explanations suitable for university-level learning

When answering:
- Start by directly addressing the question using the document content
- Expand with your broader knowledge to provide context and deeper understanding
- Include relevant examples, connections to other concepts, and academic insights
- Structure your response in a clear, educational manner
- Be comprehensive but accessible
- Always distinguish between what comes from the document vs. your additional knowledge

Document title: ${documentTitle || 'Uploaded PDF'}
Document sections available: ${relevantChunks.length} relevant sections found`;

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
      documentContext = '\n\nNOTE: No specific sections from the document directly match this question. Please provide a general academic response based on your knowledge while noting that specific document content was not found.';
    }

    const userPrompt = `STUDENT QUESTION: ${question}${documentContext}

Please provide a comprehensive professor-level response that combines the document content (when available) with your academic expertise. Make your response detailed, educational, and engaging.`;

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