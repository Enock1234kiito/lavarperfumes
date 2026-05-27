export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  gallery?: string[];
  imagePath?: string;
  category: string;
  featured: boolean;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
};

export type ChatMessage = {
  id: string;
  threadId: string;
  visitorName: string;
  text: string;
  sender: "visitor" | "admin";
  createdAt: number;
};

export type ChatThread = {
  threadId: string;
  visitorName: string;
  lastMessage: string;
  lastMessageAt: number;
  messages: ChatMessage[];
};
