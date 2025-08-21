import { useLocale, useTranslations } from "use-intl";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  type SavedConversation,
  deleteConversation,
  loadConversations
} from "@/lib/services/chat-history.service";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils/utils";

type ChatHeaderProps = {
  onClearChat?: () => void;
  conversations: SavedConversation[];
  onConversationSelect: (id: string) => void;
  onNewConversation: () => void;
  activeConversationId?: string;
  onConversationsUpdated?: () => void;
};

export default function ChatHeader({
  onClearChat,
  conversations = [],
  onConversationSelect,
  onNewConversation,
  activeConversationId,
  onConversationsUpdated,
}: ChatHeaderProps) {
  // Translation
  const t = useTranslations();
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null);
  const [displayedConversations, setDisplayedConversations] = useState<SavedConversation[]>(conversations);

  // Update displayed conversations when props change
  useEffect(() => {
    // Filter out any potential duplicates by ID
    const uniqueConversations = conversations.filter((conversation, index, self) =>
      index === self.findIndex(c => c.id === conversation.id)
    );
    
    setDisplayedConversations(uniqueConversations);
  }, [conversations]);

  // Functions
  const handleDeleteClick = useCallback((id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setConversationToDelete(id);
    setDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (conversationToDelete) {
      if (deleteConversation(conversationToDelete)) {
        // If the active conversation was deleted, create a new one
        if (conversationToDelete === activeConversationId) {
          onNewConversation();
        }

        // Get updated conversations list
        const updatedConversations = loadConversations();
        setDisplayedConversations(updatedConversations);

        // Notify parent component about the update
        if (onConversationsUpdated) {
          onConversationsUpdated();
        }
      }
    }
    setDeleteDialogOpen(false);
    setConversationToDelete(null);
  }, [conversationToDelete, activeConversationId, onNewConversation, onConversationsUpdated]);

  return (
    <>
      <nav className="flex justify-between items-center py-3 px-6 bg-white/60 dark:bg-black/60">
        {/* Navbar title */}
        <h2 className="text-lg font-baloo font-medium text-zinc-800 dark:text-main-foreground">
          {t("smart-coach")}
        </h2>

        <div className="flex items-center gap-3">
          {/* Clear chat button */}
          {onClearChat && (
            <div
              onClick={onClearChat}
              className="text-main cursor-pointer"
              title={t("clear-chat")}
            >
              <MdDelete size={22} />
            </div>
          )}

          {/* Menu toggler icon */}
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-main cursor-pointer"
            title={t("previous-chats")}
          >
            <HiMiniBars3CenterLeft size={25} />
          </div>
        </div>

        {/* Previous conversations sidebar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 bottom-0 w-[80%] md:w-[70%] rounded-2xl bg-white/50 dark:bg-black/50 backdrop-blur-sm z-50"
            >
              {/* List heading */}
              <div className="flex flex-col justify-between p-5 gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    onNewConversation();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs"
                >
                  <IoAdd size={16} />
                  {t("new-chat")}
                </Button>

                <h3
                  className={cn(
                    "text-base rtl:text-end font-baloo font-medium text-zinc-800 dark:text-main-foreground",
                    dir === "rtl" && "text-end"
                  )}
                >
                  {t("prev-conversations")}
                </h3>
              </div>

              {/* Conversations list */}
              <ul className="px-3 overflow-y-auto max-h-[80%]">
                {displayedConversations.length === 0 ? (
                  <li className="py-3 text-center text-zinc-500 dark:text-zinc-400 text-sm">
                    {t("no-conversations")}
                  </li>
                ) : (
                  displayedConversations.map((conversation) => (
                    <li
                      key={conversation.id}
                      className={`py-3 border-b border-[#777] flex items-center justify-between gap-3 cursor-pointer hover:bg-white/10 dark:hover:bg-black/10 px-2  ${
                        activeConversationId === conversation.id
                          ? "bg-white/20 dark:bg-black/20"
                          : ""
                      }`}
                      onClick={() => {
                        onConversationSelect(conversation.id);
                        setIsOpen(false);
                      }}
                    >
                      <span
                        className={cn(
                          "text-zinc-800 dark:text-main-foreground text-sm truncate",
                          dir === "rtl" && "text-end"
                        )}
                      >
                        {conversation.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <MdDelete
                          size={16}
                          className="text-red-500 cursor-pointer hover:text-red-700"
                          onClick={(e) => handleDeleteClick(conversation.id, e)}
                          title={t("delete")}
                        />
                        <IoIosArrowForward size={16} className="text-main" />
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("delete-confirmation-title")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("delete-confirmation-description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
