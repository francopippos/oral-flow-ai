import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VisionAnalysisRequest {
  imageBase64: string;
  pageNumber: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, pageNumber }: VisionAnalysisRequest = await req.json();

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log(`🔍 Analyzing page ${pageNumber} for visual content...`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert at analyzing academic documents. Your task is to extract and describe visual content from PDF pages including:

1. Mathematical formulas and equations (convert to LaTeX when possible)
2. Charts, graphs, and diagrams (provide detailed descriptions)
3. Tables and data visualizations
4. Scientific illustrations and technical drawings

Format your response as JSON with these fields:
{
  "hasVisualContent": boolean,
  "mathFormulas": [{"latex": "formula", "description": "explanation"}],
  "charts": [{"type": "chart_type", "description": "detailed description", "data_insights": "key findings"}],
  "diagrams": [{"type": "diagram_type", "description": "comprehensive description"}],
  "tables": [{"description": "table content summary", "key_data": "important values"}],
  "summary": "Overall summary of visual content and its academic significance"
}

Be thorough and academic in your descriptions. If no significant visual content is found, set hasVisualContent to false.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this PDF page for mathematical formulas, charts, graphs, diagrams, and other visual content. Extract and describe everything that would be valuable for academic understanding.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/png;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 2000,
        temperature: 0.1
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI Vision API Error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;

    let analysis;
    try {
      // Try to parse as JSON
      analysis = JSON.parse(analysisText);
    } catch {
      // Fallback: treat as plain text
      analysis = {
        hasVisualContent: true,
        summary: analysisText,
        mathFormulas: [],
        charts: [],
        diagrams: [],
        tables: []
      };
    }

    console.log(`✅ Page ${pageNumber} analysis complete. Visual content: ${analysis.hasVisualContent}`);

    return new Response(
      JSON.stringify({
        success: true,
        pageNumber,
        analysis,
        usage: data.usage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in pdf-vision-analysis function:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});