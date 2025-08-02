import { supabase } from "@/integrations/supabase/client";

export const askAIProfessor = async (
  question: string,
  relevantChunks: string[],
  documentTitle?: string
): Promise<string> => {
  try {
    console.log('🎓 [AI PROFESSOR] Processing question:', question.substring(0, 100));
    console.log(`📚 Document chunks: ${relevantChunks.length}`);

    const { data, error } = await supabase.functions.invoke('ai-professor', {
      body: {
        question,
        relevantChunks,
        documentTitle
      }
    });

    if (error) {
      console.error('❌ [AI PROFESSOR] Edge function error:', error);
      throw new Error(`AI_PROFESSOR_ERROR: ${error.message}`);
    }

    if (data.error) {
      console.error('❌ [AI PROFESSOR] API error:', data.error);
      throw new Error(`AI_PROFESSOR_ERROR: ${data.error}`);
    }

    console.log('✅ [AI PROFESSOR] Response received successfully');
    return data.response;

  } catch (error) {
    console.error('❌ [AI PROFESSOR] Critical error:', error);
    
    if (error.message?.includes('API key')) {
      return `🎓 **AI Professor System Error**

The OpenAI API key is not configured. Please add your OpenAI API key to use the AI Professor feature.

**What you can do:**
• Contact the administrator to configure the OpenAI API key
• Try again once the API key is properly set up

The AI Professor combines document content with comprehensive AI knowledge to provide detailed, educational responses.`;
    }
    
    if (error.message?.includes('quota')) {
      return `🎓 **AI Professor Temporarily Unavailable**

The AI service has reached its usage limit for today.

**What you can do:**
• Try again later when the quota resets
• Contact the administrator about upgrading the service plan

Thank you for your patience while we work to restore full functionality.`;
    }

    return `🎓 **AI Professor Technical Error**

There was a technical issue processing your question.

**Error details:** ${error.message || 'Unknown error'}

**What you can do:**
• Try rephrasing your question
• Try again in a few moments
• Check your internet connection

The AI Professor is designed to provide comprehensive responses combining document analysis with expert knowledge.`;
  }
};