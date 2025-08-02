import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatRequest {
  question: string;
  contextChunks: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { question, contextChunks }: ChatRequest = await req.json()

    // Get OpenAI API key from Supabase secrets
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Optimize context chunks based on token limits
    const estimateTokens = (text: string): number => {
      return Math.ceil(text.length / 4)
    }

    const maxContextTokens = 12000
    const questionTokens = estimateTokens(question)
    const availableTokens = maxContextTokens - questionTokens - 800 // Reserve for response

    let optimizedChunks = contextChunks
    let strategy = 'full'
    let totalTokens = contextChunks.reduce((sum, chunk) => sum + estimateTokens(chunk), 0)

    if (totalTokens > availableTokens) {
      // Strategy 1: Use only first few chunks
      let accumulatedTokens = 0
      optimizedChunks = []
      for (const chunk of contextChunks) {
        const chunkTokens = estimateTokens(chunk)
        if (accumulatedTokens + chunkTokens <= availableTokens) {
          optimizedChunks.push(chunk)
          accumulatedTokens += chunkTokens
        } else {
          break
        }
      }
      strategy = 'optimized'
    }

    const systemPrompt = `You are BISTRO, an advanced AI assistant from the OralFlow AI stack. You are acting as a PROFESSOR who has just studied the uploaded PDF document and is now being TESTED on its contents.

🎯 CORE BEHAVIOR:
You must behave exactly like a professor who has read and mastered this specific document, and you're now answering questions about it during an oral examination.

📋 STRICT RULES:
1. **PDF-FIRST APPROACH**: Answer EXCLUSIVELY based on the document content provided below
2. **ACADEMIC HONESTY**: If the answer isn't in the PDF, clearly state: "This specific document does not cover [topic]"
3. **NO INVENTION**: Never guess, invent, or make up information not explicitly in the PDF
4. **PROFESSOR PERSONA**: Respond like an expert who studied this exact document
5. **CITE IMPLICITLY**: Reference which sections your answer comes from (e.g., "According to the material...")

🧑‍🏫 RESPONSE STYLE:
- Professional, confident, but honest about document limitations
- If information is missing: "The document I studied does not include information about..."
- Optional general knowledge: ONLY if user explicitly asks, and ALWAYS clearly marked as "However, from my general academic knowledge (not from this document)..."

📚 DOCUMENT EXTRACTS TO STUDY:
${optimizedChunks.map((chunk, idx) => `
=== SECTION ${idx + 1} ===
${chunk.trim()}
`).join('\n')}

🎓 YOUR TASK:
Answer the student's question as Bistro, a professor being tested on THIS SPECIFIC DOCUMENT ONLY.
If the document doesn't contain enough information, be honest about it.
Never supplement with external knowledge unless explicitly requested and clearly labeled.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `STUDENT QUESTION: ${question}` }
        ],
        temperature: 0.2,
        max_tokens: 1200,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API Error:', response.status, errorData)
      
      if (response.status === 401) {
        throw new Error('Invalid API key')
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded')
      } else {
        throw new Error(`OpenAI API error: ${response.status}`)
      }
    }

    const data = await response.json()
    const answer = data.choices[0]?.message?.content || 'No response generated'

    return new Response(
      JSON.stringify({ 
        answer,
        strategy,
        chunksUsed: optimizedChunks.length,
        success: true 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in bistro-chat function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})