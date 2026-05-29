import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import GalleryGrid from "@/components/GalleryGrid";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <BottomNav />
      <main className="flex flex-col">
        <Suspense fallback={null}>
          <GalleryGrid />
        </Suspense>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
