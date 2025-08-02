import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get OpenAI API key from Supabase secrets
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Parse the multipart form data
    const formData = await req.formData();
    const audioFile = formData.get('file') as File;
    
    if (!audioFile) {
      throw new Error('No audio file provided');
    }

    console.log('🎵 [WHISPER] Processing audio file:', audioFile.name, audioFile.size, 'bytes');

    // Prepare FormData for OpenAI Whisper
    const whisperFormData = new FormData();
    whisperFormData.append('file', audioFile);
    whisperFormData.append('model', 'whisper-1');
    whisperFormData.append('language', 'it');
    whisperFormData.append('response_format', 'text');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: whisperFormData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ [WHISPER] OpenAI API Error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const transcription = await response.text();
    console.log('✅ [WHISPER] Transcription completed successfully');

    if (!transcription.trim()) {
      throw new Error('Transcription was empty - please speak more clearly');
    }

    return new Response(
      JSON.stringify({ 
        transcription: transcription.trim(),
        success: true 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('❌ [WHISPER] Error in transcription function:', error);
    
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
    );
  }
});