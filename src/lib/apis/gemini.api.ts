import { AxiosError } from 'axios';
import geminiClient from './gemini-client';

// Define the API key from environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBBpCJhkmkR3u0avkXAH5yJR2r7urd5Vow';
// Updated API URL to match the official documentation
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Message types
export type ChatMessage = {
  role: 'user' | 'model' | 'system';
  content: string;
};

// Request type
type GeminiRequest = {
  contents: {
    role?: string;
    parts: {
      text: string;
    }[];
  }[];
  generationConfig?: {
    temperature?: number;
    maxOutputTokens?: number;
  };
};

// Response type
export type GeminiResponse = {
  candidates?: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
  promptFeedback?: {
    blockReason?: string;
    safetyRatings?: {
      category: string;
      probability: string;
    }[];
  };
  error?: {
    code: number;
    message: string;
    status: string;
  };
};

// Error messages - we'll keep these hardcoded since services typically don't have access to the translation system
const ERROR_MESSAGES = {
  en: {
    configError: "I apologize, but my connection to the AI service is not configured properly. Please contact support."
  },
  ar: {
    configError: "أعتذر، ولكن اتصالي بخدمة الذكاء الاصطناعي غير مُعد بشكل صحيح. يرجى التواصل مع الدعم."
  }
};

// System prompt to specialize the model as a fitness coach
const SYSTEM_PROMPT = `
You are a friendly and professional fitness assistant for Super Fitness app.
Your primary role is to help users with their fitness journey by:

1. Providing guidance on exercises, workout routines, and fitness techniques
2. Offering nutritional advice and meal planning suggestions
3. Answering questions about fitness, health, and wellness
4. Providing motivation and encouragement
5. Helping users set realistic fitness goals

Keep your responses concise, friendly, and focused on health and fitness.
Avoid giving medical advice or diagnosing conditions.
Always encourage users to consult with healthcare professionals when appropriate.

When responding to workout or exercise queries, prioritize safety and proper form.
`;

// Convert chat messages to Gemini API format
const formatMessages = (messages: ChatMessage[]): GeminiRequest => {
  const formattedContents = [];
  
  // Add system prompt as a user message if not already included
  const hasSystemMessage = messages.some(msg => msg.role === 'system');
  
  if (!hasSystemMessage) {
    formattedContents.push({
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }]
    });
  }
  
  // Add user and model messages with their roles
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    
    // Skip system messages as we handle them separately
    if (message.role === 'system') continue;
    
    // Only use 'user' or 'model' roles as per API requirements
    const role = message.role === 'user' ? 'user' : 'model';
    
    formattedContents.push({
      role,
      parts: [{ text: message.content }]
    });
  }
  
  return {
    contents: formattedContents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800
    }
  };
};

// Get appropriate error message based on browser language
const getErrorMessage = (messageKey: keyof typeof ERROR_MESSAGES.en) => {
  // Get user's language preference, defaulting to English
  const userLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
  return ERROR_MESSAGES[userLang as keyof typeof ERROR_MESSAGES][messageKey];
};

interface GeminiErrorResponse {
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

// Send a message to Gemini API
export const sendChatMessage = async (messages: ChatMessage[]): Promise<string> => {
  try {
    // Check if API key is available
    if (!GEMINI_API_KEY) {
      console.error('Gemini API key is not configured');
      return getErrorMessage('configError');
    }
    
    console.log('Using API key:', GEMINI_API_KEY.substring(0, 4) + '...');
    
    // Extract system messages but don't include them directly
    // (they'll be handled specially in formatMessages)
    const nonSystemMessages = messages.filter(msg => msg.role !== 'system');
    const formattedMessages = formatMessages(nonSystemMessages);
    
    console.log('Gemini API URL:', GEMINI_API_URL);
    console.log('Formatted request payload:', JSON.stringify(formattedMessages, null, 2));
    
    try {
      // Use geminiClient for the request
      const response = await geminiClient.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        formattedMessages
      );
      
      console.log('Raw API response:', response.data);
      
      const data = response.data as GeminiResponse;
      console.log('Received response from Gemini API');
      
      // Extract the text from the response
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        console.error('API returned error:', data.error);
        return `API Error: ${data.error.message}`;
      } else {
        console.error('Invalid response format from Gemini API:', data);
        return 'I received a response from the AI service, but it was in an unexpected format. Please try again or contact support.';
      }
    } catch (apiError) {
      const error = apiError as AxiosError<GeminiErrorResponse>;
      console.error('Error calling Gemini API:', error);
      console.error('Error details:', error.response?.data || error.message);
      
      const errorData = error.response?.data as GeminiErrorResponse;
      
      if (errorData?.error) {
        console.error('API Error Details:', errorData.error);
        return `API Error: ${errorData.error.message || 'Unknown API error'}`;
      }
      
      // Check for specific error types
      if (error.response?.status === 403) {
        return 'The API key may be invalid or doesn\'t have permission to access this service. Please contact support.';
      } else if (error.response?.status === 429) {
        return 'The AI service quota has been exceeded. Please try again later or contact support.';
      } else if (error.response?.status === 400) {
        // Bad request - likely an issue with our request format
        const message = error.response?.data?.error?.message || 'Invalid request format';
        console.error('Bad Request Error:', message);
        return `API format error: ${message}. Please contact support.`;
      } else if (!navigator.onLine) {
        return 'You appear to be offline. Please check your internet connection.';
      }
      
      return `AI service error: ${error.message || 'Unknown error'}. Please try again or contact support.`;
    }
  } catch (err) {
    const error = err as Error;
    console.error('Unexpected error in sendChatMessage:', error);
    return `An unexpected error occurred: ${error.message}. Please try again or contact support.`;
  }
};