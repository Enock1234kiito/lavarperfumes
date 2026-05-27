import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db, firebaseReady } from "./firebase";
import type { ChatMessage } from "./types";

const COLLECTION = "chatMessages";

function getCollection() {
  if (!db) throw new Error("Firebase not configured");
  return collection(db, COLLECTION);
}

export async function sendMessage(
  threadId: string,
  visitorName: string,
  text: string,
  sender: "visitor" | "admin",
) {
  await addDoc(getCollection(), {
    threadId,
    visitorName,
    text,
    sender,
    createdAt: serverTimestamp(),
  });
}

export function subscribeThread(
  threadId: string,
  onData: (msgs: ChatMessage[]) => void,
  onError?: (err: Error) => void,
): () => void {
  if (!firebaseReady || !db) return () => {};

  const q = query(
    getCollection(),
    where("threadId", "==", threadId),
    orderBy("createdAt", "asc"),
  );

  return onSnapshot(
    q,
    (snap) => {
      const msgs: ChatMessage[] = snap.docs.map((d) => {
        const data = d.data();
        const ts = data.createdAt as Timestamp | null;
        return {
          id: d.id,
          threadId: data.threadId,
          visitorName: data.visitorName,
          text: data.text,
          sender: data.sender,
          createdAt: ts ? ts.toMillis() : Date.now(),
        };
      });
      onData(msgs);
    },
    onError,
  );
}

export function subscribeAllMessages(
  onData: (msgs: ChatMessage[]) => void,
  onError?: (err: Error) => void,
): () => void {
  if (!firebaseReady || !db) return () => {};

  const q = query(getCollection(), orderBy("createdAt", "asc"));

  return onSnapshot(
    q,
    (snap) => {
      const msgs: ChatMessage[] = snap.docs.map((d) => {
        const data = d.data();
        const ts = data.createdAt as Timestamp | null;
        return {
          id: d.id,
          threadId: data.threadId,
          visitorName: data.visitorName,
          text: data.text,
          sender: data.sender,
          createdAt: ts ? ts.toMillis() : Date.now(),
        };
      });
      onData(msgs);
    },
    onError,
  );
}
