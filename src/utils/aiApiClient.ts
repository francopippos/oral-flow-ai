/**
 * Centralized AI API client with optimized caching and error handling
 */
import { createClient } from '@supabase/supabase-js';

// Singleton Supabase client with caching
let supabaseClient: ReturnType<typeof createClient> | null = null;

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(
      'https://muilijjxilogkwazfxlp.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11aWxpamp4aWxvZ2t3YXpmeGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNDQ0MjEsImV4cCI6MjA2OTcyMDQyMX0.uVAxiBkxcnG1JmVVSuI-QkOqLMdvFMpL4rVHAtBHNP4'
    );
  }
  return supabaseClient;
};

// Enhanced error handling
export interface AIError extends Error {
  code: 'NETWORK_ERROR' | 'SERVICE_UNAVAILABLE' | 'API_ERROR' | 'RATE_LIMIT' | 'QUOTA_EXCEEDED';
  retryable: boolean;
}

export const createAIError = (message: string, code: AIError['code'], retryable = false): AIError => {
  const error = new Error(message) as AIError;
  error.code = code;
  error.retryable = retryable;
  return error;
};

export const handleAPIError = (error: any, serviceName: string): AIError => {
  console.error(`❌ [${serviceName}] Error:`, error);
  
  if (error.message?.includes('fetch')) {
    return createAIError('Connection failed. Check your internet connection.', 'NETWORK_ERROR', true);
  }
  
  if (error.message?.includes('rate limit')) {
    return createAIError('Rate limit exceeded. Please try again in a moment.', 'RATE_LIMIT', true);
  }
  
  if (error.message?.includes('quota')) {
    return createAIError('Service quota exceeded. Please check your account.', 'QUOTA_EXCEEDED', false);
  }
  
  if (error.message?.includes('API key')) {
    return createAIError('Service temporarily unavailable.', 'SERVICE_UNAVAILABLE', false);
  }
  
  return createAIError(error.message || 'Unknown error occurred', 'API_ERROR', false);
};

// Optimized function invocation with caching
const functionCache = new Map<string, { data: any; timestamp: number; ttl: number }>();

export const invokeFunctionWithCache = async (
  functionName: string, 
  body: any, 
  cacheTTL = 0 // Cache TTL in milliseconds, 0 = no cache
): Promise<any> => {
  const cacheKey = cacheTTL > 0 ? `${functionName}:${JSON.stringify(body)}` : null;
  
  // Check cache
  if (cacheKey && functionCache.has(cacheKey)) {
    const cached = functionCache.get(cacheKey)!;
    if (Date.now() - cached.timestamp < cached.ttl) {
      console.log(`🚀 [CACHE] Cache hit for ${functionName}`);
      return cached.data;
    }
    functionCache.delete(cacheKey);
  }
  
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.functions.invoke(functionName, { body });
  
  if (error) {
    throw handleAPIError(error, functionName.toUpperCase());
  }
  
  if (!data.success) {
    throw createAIError(data.error || `${functionName} failed`, 'API_ERROR');
  }
  
  // Cache successful responses
  if (cacheKey && cacheTTL > 0) {
    functionCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      ttl: cacheTTL
    });
    
    // Cleanup old cache entries (max 100 items)
    if (functionCache.size > 100) {
      const oldestKey = functionCache.keys().next().value;
      functionCache.delete(oldestKey);
    }
  }
  
  return data;
};