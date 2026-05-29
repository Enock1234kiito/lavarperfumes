import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import EveryScent from "@/components/EveryScent";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <BottomNav />
      <main className="flex flex-col">
        <Hero />
        <Collections />
        <EveryScent />
        <Testimonial />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
