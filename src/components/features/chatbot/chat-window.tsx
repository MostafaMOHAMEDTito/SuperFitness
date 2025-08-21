// components/ChatWindow.tsx

import { useRef, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import ChatHeader from "./chat-header";
import { useLocale, useTranslations } from "use-intl";
import { FiSend } from "react-icons/fi";
import { IoReload } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useGeminiChat } from "@/hooks/use-gemini-chat";
import { cn } from "@/lib/utils/utils";

export default function ChatWindow() {
    // Translation
    const t = useTranslations();
    const locale = useLocale();

    // States
    const [refreshKey, setRefreshKey] = useState(0);

    // Hooks
    const {
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
    } = useGeminiChat(t("fitness-assistant-greeting", {
      defaultMessage: "Hello! I'm your fitness assistant. How can I help you today?"
    }), refreshKey);
    
    // Refs
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Side effects
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Functions
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputMessage.trim()) return;
      
      await sendMessage(inputMessage);
      
      // Reset textarea height
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    };

    const handleConversationsUpdated = () => {
      setRefreshKey(prev => prev + 1);
    };
    
    // Handle Enter key press - send message on Enter, add new line on Shift+Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    };

  return (
    <div className="w-[90vw] md:w-[350px] h-[70vh] md:h-[500px] border-2 border-main rounded-2xl overflow-hidden shadow-lg relative">
      {/* Background */}
      <img 
        src="/assets/chat-window-bg.jpg" 
        alt="chat window background" 
        className="absolute w-full h-full z-0 object-cover"
      />
      <div className="absolute w-full h-full z-10 bg-white/40  dark:bg-black/70 backdrop-blur-[8px]"></div>
      
      {/* Content Container */}
      <div className="relative w-full h-full z-30 flex flex-col">
        {/* Chat Header */}
        <ChatHeader 
          onClearChat={clearChat} 
          conversations={savedConversations}
          onConversationSelect={loadConversation}
          onNewConversation={startNewConversation}
          activeConversationId={activeConversationId}
          onConversationsUpdated={handleConversationsUpdated}
        />

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="flex flex-col gap-4">
            {messages.length <= 1 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center opacity-70">
                <h3 className="text-lg font-medium mb-2">{t("smart-coach")}</h3>
                <p className="text-sm mb-4">{t("chat-welcome-message")}</p>
                <p className="text-xs">{t("chat-privacy-notice")}</p>
              </div>
            ) : (
                // Messages
              messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex gap-2 w-[95%] ${message.role === 'user' ? 'flex-row-reverse self-end' : ''}`}
                >
                {/* Sender Avatar */}
                  <img 
                    src={message.role === 'user' ? "/public/assets/default-user.jpg" : "/assets/chatbot.png"} 
                    alt={`${message.role} avatar`} 
                    className={cn("rounded-full shrink-0 object-contain", message.role === 'user' ? "size-8" : "size-10")}
                  />

                  {/* Message Container */}
                  <div className={cn(message.role === 'user' ? "bg-main/60" : "bg-white/50 dark:bg-black/50", `backdrop-blur-sm rounded-2xl p-3`, message.role === 'user' ? "rtl:text-end rounded-tr-none" : "rtl:text-start rounded-tl-none")}>
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    
                    {/* Retry button for error messages */}
                    {hasError && message.role === 'model' && index === messages.length - 1 && (
                      <Button 
                        onClick={retryLastMessage}
                        size="sm" 
                        variant="outline" 
                        className="mt-2 flex items-center gap-1 text-xs bg-white/20"
                        disabled={isLoading}
                      >
                        <IoReload size={14} />
                        {t("retry")}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-2 w-[95%]">
                <img src="/assets/chatbot.png" alt="bot typing" className="size-8 rounded-full shrink-0"/>
                <div className="bg-white/50 dark:bg-black/70 backdrop-blur-sm rounded-2xl p-3">
                  <p className="text-sm">{t("typing")}</p>
                </div>
              </div>
            )}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message input */}
        <form 
          dir={locale === "ar" ? "rtl" : "ltr"} 
          onSubmit={handleSubmit} 
          className="px-3 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-black/30"
        >
          <div className="relative flex items-end">
            <Textarea 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("ask-me-anything")} 
              className="pr-12 pl-10 py-2 max-h-24 rounded-full resize-none bg-white/50 dark:bg-black/50"
              disabled={isLoading}
              autoExpand
              ref={inputRef}
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute bottom-1 right-1 h-8 w-8"
              disabled={isLoading || !inputMessage.trim()}
            >
              <FiSend size={16} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
