import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SignatureSection from "@/components/SignatureSection";
import StorySection from "@/components/StorySection";
import BestSellers from "@/components/BestSellers";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <SignatureSection />
        <StorySection />
        <BestSellers />
        <Testimonial />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
