import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import PolicyPage from "@/components/PolicyPage";
import { shippingReturnsPolicy } from "@/lib/policies";

export const metadata = {
  title: "Shipping & Returns — Lavara Perfumes",
  description:
    "Read the Lavara shipping, delivery, returns and refund policy before placing your order.",
};

export default function ShippingReturnsPage() {
  return (
    <>
      <Navbar />
      <BottomNav />
      <main className="flex flex-col">
        <PolicyPage
          eyebrow="Policies"
          title="Shipping & Returns"
          intro="At Lavara, we are committed to providing a smooth and reliable shopping experience. Please review our shipping and return policy carefully before placing an order."
          sections={shippingReturnsPolicy}
        />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
