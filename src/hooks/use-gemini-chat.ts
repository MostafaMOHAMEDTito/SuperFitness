import { useState, useEffect } from 'react';
import { sendChatMessage } from '@/lib/apis/gemini.api';
import type { ChatMessage } from '@/lib/apis/gemini.api';
import { 
  loadConversations,
  getConversation, 
  saveConversation,
  type SavedConversation
} from '@/lib/services/chat-history.service';

export function useGeminiChat(initialGreeting: string, refreshKey: number = 0) {
  // States
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: initialGreeting }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [savedConversations, setSavedConversations] = useState<SavedConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>(undefined);

  // Load saved conversations on mount and when refreshKey changes
  useEffect(() => {
    const conversations = loadConversations();
    setSavedConversations(conversations);
  }, [refreshKey]);

  // Manual save function to avoid duplicate saves
  const saveCurrentConversation = (messagesToSave: ChatMessage[]) => {
    // Only save if we have at least one user message
    const hasUserMessage = messagesToSave.some(msg => msg.role === 'user');
    if (hasUserMessage && messagesToSave.length > 1) {
      const savedConv = saveConversation(messagesToSave, activeConversationId);
      setActiveConversationId(savedConv.id);
      
      // Update the list of saved conversations
      const updatedConversations = loadConversations();
      setSavedConversations(updatedConversations);
      
      return savedConv.id;
    }
    return activeConversationId;
  };

  // Load a specific conversation by ID
  const loadConversation = (id: string) => {
    const conversation = getConversation(id);
    if (conversation) {
      setMessages(conversation.messages);
      setActiveConversationId(id);
    }
  };

  // Start a new conversation
  const startNewConversation = () => {
    setMessages([{ role: 'model', content: initialGreeting }]);
    setActiveConversationId(undefined);
    setInputMessage('');
    setIsLoading(false);
    setHasError(false);
  };

  // Send a message to the Gemini API
  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Reset error state
    setHasError(false);
    
    // Add user message to chat
    const userMessage: ChatMessage = { role: 'user', content: message.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await sendChatMessage(updatedMessages);
      
      // Add AI response to chat
      const aiMessage: ChatMessage = { role: 'model', content: response };
      const newMessages = [...updatedMessages, aiMessage];
      
      // Update messages
      setMessages(newMessages);
      
      // Save conversation manually only after we have both user and model messages
      saveCurrentConversation(newMessages);
    } catch (error) {
      console.error('Error sending message:', error);
      setHasError(true);
      
      // Add error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';
      
      // Create a properly typed error message
      const modelErrorMessage: ChatMessage = { 
        role: 'model', 
        content: `Error: ${errorMessage}` 
      };
      
      // Update messages with the error
      const messagesWithError = [...updatedMessages, modelErrorMessage];
      setMessages(messagesWithError);
      
      // Save conversation with error message
      saveCurrentConversation(messagesWithError);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([{ role: 'model', content: initialGreeting }]);
    startNewConversation();
  };

  // Retry the last message
  const retryLastMessage = async () => {
    if (messages.length < 2) return;
    
    // Find the last user message
    const lastUserMessageIndex = messages.map(m => m.role).lastIndexOf('user');
    if (lastUserMessageIndex === -1) return;
    
    // Get messages up to the last user message
    const messagesToKeep = messages.slice(0, lastUserMessageIndex + 1);
    setMessages(messagesToKeep);
    
    // Retry with the last user message
    const lastUserMessage = messages[lastUserMessageIndex].content;
    await sendMessage(lastUserMessage);
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    hasError,
    sendMessage,
    clearChat,
    retryLastMessage,
    savedConversations,
    loadConversation,
    startNewConversation,
    activeConversationId
  };
} 