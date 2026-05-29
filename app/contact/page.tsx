import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata = {
  title: "Contact Us — Lavara Perfumes",
  description:
    "Get in touch with Lavara Perfumes for shipping, orders, returns, or general enquiries.",
};

const EMAIL = "hello@lavaraperfumes.com";
const PHONE = "+233 53 772 9075";
const WHATSAPP_NUMBER = "233537729075";

const channels = [
  {
    Icon: Mail,
    label: "Email",
    detail: EMAIL,
    href: `mailto:${EMAIL}`,
    note: "We typically reply within 1–2 business days.",
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    detail: PHONE,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    note: "Fastest way to reach us for orders and questions.",
  },
  {
    Icon: Phone,
    label: "Phone",
    detail: PHONE,
    href: `tel:${PHONE.replace(/\s/g, "")}`,
    note: "Available Monday – Saturday, 9am – 6pm GMT.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <BottomNav />
      <main className="flex flex-col">
        <section className="bg-background py-10 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-[860px] px-5 sm:px-6 lg:px-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.32em] text-foreground transition-colors hover:text-foreground sm:text-[11.5px]"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span className="border-b border-foreground/40 pb-0.5">Back</span>
            </Link>

            <header className="mt-8 border-b border-[var(--border-light)] pb-8 sm:mt-12 sm:pb-10">
              <p className="text-[10.5px] uppercase tracking-[0.45em] text-muted sm:text-[11.5px]">
                Get in Touch
              </p>
              <h1 className="mt-3 font-serif text-[34px] font-light leading-[1.02] tracking-[-0.01em] sm:text-[52px] lg:text-[76px] xl:text-[88px]">
                Contact Us
              </h1>
              <p className="mt-5 max-w-2xl text-[13.5px] leading-[1.8] text-muted sm:mt-7 sm:text-[14.5px]">
                We&rsquo;d love to hear from you. Whether you have a question about
                an order, need help choosing a fragrance, or want to share
                feedback, we&rsquo;re here to listen.
              </p>
            </header>

            <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5">
              {channels.map(({ Icon, label, detail, href, note }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex h-full flex-col gap-4 border border-[var(--border-light)] p-6 transition-colors hover:border-foreground sm:p-7"
                  >
                    <Icon className="h-6 w-6 text-foreground" strokeWidth={1.3} />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.32em] text-muted sm:text-[10.5px]">
                        {label}
                      </p>
                      <p className="mt-2 break-words font-serif text-[18px] font-light tracking-[-0.005em] sm:text-[20px]">
                        {detail}
                      </p>
                    </div>
                    <p className="mt-auto text-[12.5px] leading-[1.7] text-muted sm:text-[13px]">
                      {note}
                    </p>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-12 border-t border-[var(--border-light)] pt-8 sm:mt-16 sm:pt-10">
              <h2 className="font-serif text-[22px] font-light tracking-[-0.005em] sm:text-[26px]">
                Customer Care Hours
              </h2>
              <ul className="mt-4 flex flex-col gap-2 text-[13.5px] leading-[1.8] text-foreground/85 sm:text-[14.5px]">
                <li className="flex justify-between gap-4 border-b border-[var(--border-light)] py-2">
                  <span>Monday – Friday</span>
                  <span className="text-muted">9:00 – 18:00 GMT</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-[var(--border-light)] py-2">
                  <span>Saturday</span>
                  <span className="text-muted">10:00 – 16:00 GMT</span>
                </li>
                <li className="flex justify-between gap-4 py-2">
                  <span>Sunday & Public Holidays</span>
                  <span className="text-muted">Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
