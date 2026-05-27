"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { sendMessage, subscribeAllMessages } from "@/lib/chat";
import type { ChatMessage, ChatThread } from "@/lib/types";

function formatTime(ts: number) {
  const d = new Date(ts);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return (
    d.toLocaleDateString([], { month: "short", day: "numeric" }) +
    " " +
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
}

function buildThreads(messages: ChatMessage[]): ChatThread[] {
  const map = new Map<string, ChatThread>();
  for (const m of messages) {
    let thread = map.get(m.threadId);
    if (!thread) {
      thread = {
        threadId: m.threadId,
        visitorName: m.visitorName,
        lastMessage: m.text,
        lastMessageAt: m.createdAt,
        messages: [],
      };
      map.set(m.threadId, thread);
    }
    thread.messages.push(m);
    if (m.createdAt >= thread.lastMessageAt) {
      thread.lastMessage = m.text;
      thread.lastMessageAt = m.createdAt;
    }
    if (m.sender === "visitor") {
      thread.visitorName = m.visitorName;
    }
  }
  return Array.from(map.values()).sort(
    (a, b) => b.lastMessageAt - a.lastMessageAt,
  );
}

export default function AdminChat() {
  const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return subscribeAllMessages(setAllMessages);
  }, []);

  const threads = useMemo(() => buildThreads(allMessages), [allMessages]);

  const activeThread = useMemo(
    () => threads.find((t) => t.threadId === activeThreadId) ?? null,
    [threads, activeThreadId],
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages.length]);

  useEffect(() => {
    if (activeThreadId) inputRef.current?.focus();
  }, [activeThreadId]);

  const handleSend = useCallback(async () => {
    if (!activeThread || !text.trim() || sending) return;
    setSending(true);
    try {
      await sendMessage(
        activeThread.threadId,
        "Lavara",
        text.trim(),
        "admin",
      );
      setText("");
    } finally {
      setSending(false);
    }
  }, [activeThread, text, sending]);

  return (
    <section className="mt-12">
      <h2 className="text-[10px] uppercase tracking-[0.45em] text-muted">
        Customer Chat — {threads.length} conversation
        {threads.length !== 1 ? "s" : ""}
      </h2>

      <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border-light)]">
        <div className="flex h-[500px]">
          {/* Thread list */}
          <div
            className={`w-full shrink-0 overflow-y-auto border-r border-[var(--border-light)] md:w-[280px] lg:w-[320px] ${
              activeThreadId ? "hidden md:block" : ""
            }`}
          >
            {threads.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                <MessageCircle
                  className="h-8 w-8 text-muted/40"
                  strokeWidth={1.2}
                />
                <p className="text-[12.5px] text-muted">
                  No conversations yet.
                </p>
              </div>
            )}
            {threads.map((t) => (
              <button
                key={t.threadId}
                onClick={() => setActiveThreadId(t.threadId)}
                className={`flex w-full flex-col gap-1 border-b border-[var(--border-light)] px-5 py-4 text-left transition-colors hover:bg-[var(--section-beige)] ${
                  t.threadId === activeThreadId
                    ? "bg-[var(--section-beige)]"
                    : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-serif text-[15px] font-light">
                    {t.visitorName || "Anonymous"}
                  </span>
                  <span className="shrink-0 text-[9px] uppercase tracking-[0.2em] text-muted">
                    {formatTime(t.lastMessageAt)}
                  </span>
                </div>
                <p className="truncate text-[12px] text-muted">
                  {t.lastMessage}
                </p>
              </button>
            ))}
          </div>

          {/* Active conversation */}
          <div
            className={`flex flex-1 flex-col ${!activeThreadId ? "hidden md:flex" : "flex"}`}
          >
            {!activeThread ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                <MessageCircle
                  className="h-8 w-8 text-muted/40"
                  strokeWidth={1.2}
                />
                <p className="text-[12.5px] text-muted">
                  Select a conversation to reply.
                </p>
              </div>
            ) : (
              <>
                {/* Conversation header */}
                <div className="flex items-center gap-3 border-b border-[var(--border-light)] px-5 py-3">
                  <button
                    onClick={() => setActiveThreadId(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--section-beige)] md:hidden"
                    aria-label="Back to conversations"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
                  </button>
                  <div>
                    <p className="font-serif text-[16px] font-light">
                      {activeThread.visitorName || "Anonymous"}
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-muted">
                      {activeThread.messages.length} message
                      {activeThread.messages.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <div className="flex flex-col gap-3">
                    {activeThread.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col ${m.sender === "admin" ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[13px] leading-[1.6] ${
                            m.sender === "admin"
                              ? "rounded-br-sm bg-[var(--button-dark)] text-[var(--background)]"
                              : "rounded-bl-sm bg-[var(--section-beige)] text-foreground"
                          }`}
                        >
                          {m.text}
                        </div>
                        <span className="mt-1 px-1 text-[9px] uppercase tracking-[0.2em] text-muted">
                          {m.sender === "admin"
                            ? "You"
                            : m.visitorName || "Visitor"}{" "}
                          &middot; {formatTime(m.createdAt)}
                        </span>
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>
                </div>

                {/* Reply input */}
                <div className="border-t border-[var(--border-light)] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type a reply..."
                      className="flex-1 rounded-lg border border-[var(--border-light)] bg-transparent px-4 py-2.5 text-[13px] outline-none transition-colors placeholder:text-muted/50 focus:border-foreground"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!text.trim() || sending}
                      aria-label="Send reply"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--button-dark)] text-[var(--background)] transition-opacity disabled:opacity-40"
                    >
                      <Send className="h-4 w-4" strokeWidth={1.6} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
