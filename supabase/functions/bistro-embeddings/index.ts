import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmbeddingRequest {
  texts: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { texts }: EmbeddingRequest = await req.json()

    // Get OpenAI API key from Supabase secrets
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: texts,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI Embeddings API Error:', response.status, errorData)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const embeddings = data.data.map((item: any) => item.embedding)

    return new Response(
      JSON.stringify({ 
        embeddings,
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
    console.error('Error in bistro-embeddings function:', error)
    
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