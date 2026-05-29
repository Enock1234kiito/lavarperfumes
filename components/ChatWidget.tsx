"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { sendMessage, subscribeThread } from "@/lib/chat";
import { firebaseReady } from "@/lib/firebase";
import type { ChatMessage } from "@/lib/types";

function getThreadId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("lavara_chat_thread");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("lavara_chat_thread", id);
  }
  return id;
}

function getVisitorName(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("lavara_chat_name") || "";
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameSet, setNameSet] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = getVisitorName();
    if (saved) {
      setName(saved);
      setNameSet(true);
    }
  }, []);

  useEffect(() => {
    if (!nameSet || !firebaseReady) return;
    const threadId = getThreadId();
    return subscribeThread(threadId, setMessages);
  }, [nameSet]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open && nameSet) inputRef.current?.focus();
  }, [open, nameSet]);

  useEffect(() => {
    const onOpenChat = () => setOpen(true);
    window.addEventListener("lavara:open-chat", onOpenChat);
    return () => window.removeEventListener("lavara:open-chat", onOpenChat);
  }, []);

  const handleSetName = useCallback(() => {
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem("lavara_chat_name", trimmed);
    setName(trimmed);
    setNameSet(true);
  }, [name]);

  const handleSend = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      await sendMessage(getThreadId(), name, trimmed, "visitor");
      setText("");
    } finally {
      setSending(false);
    }
  }, [text, sending, name]);

  if (!firebaseReady) return null;

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            aria-label="Open chat"
            className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--button-dark)] text-[var(--background)] shadow-lg transition-transform hover:scale-105 sm:right-8 sm:bottom-8"
          >
            <MessageCircle className="h-6 w-6" strokeWidth={1.6} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-0 bottom-0 z-50 flex h-full w-full flex-col bg-[var(--background)] shadow-2xl sm:right-5 sm:bottom-5 sm:h-[520px] sm:w-[380px] sm:rounded-2xl sm:border sm:border-[var(--border-light)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-light)] px-5 py-4">
              <div>
                <h3 className="font-serif text-[18px] font-light tracking-[-0.005em]">
                  Lavara Chat
                </h3>
                <p className="text-[10px] uppercase tracking-[0.32em] text-muted">
                  Ask us anything
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--section-beige)]"
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>

            {/* Name prompt or messages */}
            {!nameSet ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
                <p className="text-center font-serif text-[20px] font-light">
                  Welcome to Lavara
                </p>
                <p className="text-center text-[12.5px] text-muted">
                  Enter your name to start chatting with us.
                </p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSetName()}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-[var(--border-light)] bg-transparent px-4 py-3 text-[13px] outline-none transition-colors placeholder:text-muted/50 focus:border-foreground"
                />
                <button
                  onClick={handleSetName}
                  disabled={!name.trim()}
                  className="w-full rounded-full bg-[var(--button-dark)] py-3 text-[11px] uppercase tracking-[0.28em] text-[var(--background)] transition-opacity disabled:opacity-40"
                >
                  Start Chat
                </button>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {messages.length === 0 && (
                    <p className="mt-8 text-center text-[12.5px] text-muted">
                      Send a message and we&apos;ll reply shortly.
                    </p>
                  )}
                  <div className="flex flex-col gap-3">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col ${m.sender === "visitor" ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-[1.6] ${
                            m.sender === "visitor"
                              ? "rounded-br-sm bg-[var(--button-dark)] text-[var(--background)]"
                              : "rounded-bl-sm bg-[var(--section-beige)] text-foreground"
                          }`}
                        >
                          {m.text}
                        </div>
                        <span className="mt-1 px-1 text-[9px] uppercase tracking-[0.2em] text-muted">
                          {m.sender === "admin" ? "Lavara" : name} &middot;{" "}
                          {formatTime(m.createdAt)}
                        </span>
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>
                </div>

                {/* Input */}
                <div className="border-t border-[var(--border-light)] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type a message..."
                      className="flex-1 rounded-lg border border-[var(--border-light)] bg-transparent px-4 py-2.5 text-[13px] outline-none transition-colors placeholder:text-muted/50 focus:border-foreground"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!text.trim() || sending}
                      aria-label="Send message"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--button-dark)] text-[var(--background)] transition-opacity disabled:opacity-40"
                    >
                      <Send className="h-4 w-4" strokeWidth={1.6} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
