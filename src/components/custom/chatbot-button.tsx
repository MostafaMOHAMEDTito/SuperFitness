import { useState } from "react";
import { Button } from "../ui/button";
import ChatWindow from "../features/chatbot/chat-window";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "use-intl";
import { useLocation } from "react-router-dom";

export default function ChatButton() {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  // Navigation
  const location = useLocation();

  // States
  const [isOpen, setIsOpen] = useState(false);

  // Functions
  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  // Variables
  const isAuthPage = location.pathname.includes("/auth");

  // Check if the page is the auth page
  if (isAuthPage) return null;

  return (
    <section dir={locale === "ar" ? "rtl" : "ltr"}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-12 end-5 z-40"
          >
            <ChatWindow />

            {/* Close button positioned at the top of the window */}
            <motion.div
              className="absolute -top-[120px] start-1/2 -translate-x-1/2 z-50"
              initial={false}
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}/assets/chatbot.png`}
                  alt="Chatbot"
                  width={120}
                  height={0}
                  className="drop-shadow-[0_0_24px_#FF4100]"
                />

                <Button
                  onClick={toggleChat}
                  size="lg"
                  className="rounded-full h-auto px-5 py-2.5 flex items-center justify-center bg-main hover:bg-main-hover text-white shadow-[0_0_70px_0_#c2410c] text-base"
                >
                  {t("tap-to-close", { defaultMessage: "Tap To Close" })}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Only show the main button when chat is closed */}
      {!isOpen && (
        <motion.div
          className={`${
            locale === "ar"
              ? "rtl fixed bottom-4 left-4 z-50"
              : "ltr fixed bottom-4 right-4 z-50"
          }`}
          initial={false}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex flex-col items-center justify-center">
            <img
              src={`${import.meta.env.BASE_URL}/assets/chatbot.png`}
              alt="Chatbot"
              width={120}
              height={0}
              className="drop-shadow-[0_0_24px_#FF4100]"
            />

            <Button
              onClick={toggleChat}
              size="lg"
              className="rounded-full h-auto px-5 py-2.5 flex items-center justify-center bg-main hover:bg-main-hover text-white text-base shadow-[0_0_16px_#FF4100]"
            >
              {t("hey-ask-me", { defaultMessage: "Hey Ask Me" })}
            </Button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
