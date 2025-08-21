import type { ChatMessage } from "../apis/gemini.api";

// Define the structure of a saved conversation
export interface SavedConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// The key used for storing conversations in local storage
const STORAGE_KEY = 'fitness-chat-conversations';

// Maximum number of conversations to keep
const MAX_CONVERSATIONS = 10;

// Get a title from the first user message in a conversation
const getTitleFromMessages = (messages: ChatMessage[]): string => {
  const firstUserMessage = messages.find(msg => msg.role === 'user');
  if (!firstUserMessage) return 'New conversation';
  
  // Use the first 30 characters of the message as a title
  const title = firstUserMessage.content.trim().substring(0, 30);
  return title.length < firstUserMessage.content.length ? `${title}...` : title;
};

// Load all saved conversations from local storage
export const loadConversations = (): SavedConversation[] => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return [];
    
    const conversations = JSON.parse(savedData) as SavedConversation[];
    // Sort conversations by updatedAt date (most recent first)
    return conversations.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch (error) {
    console.error('Failed to load conversations:', error);
    return [];
  }
};

// Save a conversation to local storage
export const saveConversation = (messages: ChatMessage[], existingId?: string): SavedConversation => {
  try {
    // Load existing conversations
    const conversations = loadConversations();
    
    // Get current date as ISO string
    const now = new Date().toISOString();
    
    // Check if we're updating an existing conversation or creating a new one
    if (existingId) {
      // Find the existing conversation
      const existingIndex = conversations.findIndex(conv => conv.id === existingId);
      
      if (existingIndex !== -1) {
        // Update existing conversation
        const updatedConversation: SavedConversation = {
          ...conversations[existingIndex],
          messages,
          title: getTitleFromMessages(messages),
          updatedAt: now
        };
        
        conversations[existingIndex] = updatedConversation;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
        
        return updatedConversation;
      }
    }
    
    // Create a new conversation
    const newConversation: SavedConversation = {
      id: crypto.randomUUID(), // Generate a unique ID
      title: getTitleFromMessages(messages),
      messages,
      createdAt: now,
      updatedAt: now
    };
    
    // Add the new conversation and limit the total number
    const updatedConversations = [newConversation, ...conversations].slice(0, MAX_CONVERSATIONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConversations));
    
    return newConversation;
  } catch (error) {
    console.error('Failed to save conversation:', error);
    throw error;
  }
};

// Delete a conversation from local storage
export const deleteConversation = (id: string): boolean => {
  try {
    const conversations = loadConversations();
    const filteredConversations = conversations.filter(conv => conv.id !== id);
    
    if (filteredConversations.length === conversations.length) {
      // No conversation was deleted
      return false;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredConversations));
    return true;
  } catch (error) {
    console.error('Failed to delete conversation:', error);
    return false;
  }
};

// Get a specific conversation by ID
export const getConversation = (id: string): SavedConversation | null => {
  try {
    const conversations = loadConversations();
    return conversations.find(conv => conv.id === id) || null;
  } catch (error) {
    console.error('Failed to get conversation:', error);
    return null;
  }
};

// Delete all conversations
export const clearAllConversations = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear conversations:', error);
    return false;
  }
}; 