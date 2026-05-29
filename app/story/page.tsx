import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { images } from "@/lib/images";

export const metadata = {
  title: "Our Story — Lavara Perfumes",
  description:
    "Lavara is more than scent. Discover the story behind a house built on emotion, memory, identity and quiet expression.",
};

export default function StoryPage() {
  return (
    <>
      <Navbar />
      <BottomNav />
      <main className="flex flex-col">
        <section className="bg-background pb-16 sm:pb-24 lg:pb-32">
          <div className="mx-auto max-w-[760px] px-5 pt-8 sm:px-6 sm:pt-12 lg:px-12 lg:pt-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.32em] text-foreground transition-colors hover:text-foreground sm:text-[11.5px]"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span className="border-b border-foreground/40 pb-0.5">Back</span>
            </Link>
          </div>

          {/* Hero image */}
          <div className="relative mt-8 h-[42vh] min-h-[260px] w-full overflow-hidden sm:mt-12 sm:h-[55vh] lg:h-[65vh]">
            <Image
              src={images.storyStill}
              alt="A quiet still life — a Lavara fragrance and warm light"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          <article className="mx-auto mt-12 max-w-[720px] px-5 sm:mt-20 sm:px-6 lg:px-12">
            <p className="text-center text-[10.5px] uppercase tracking-[0.45em] text-muted sm:text-[11.5px]">
              The House of Lavara
            </p>
            <h1 className="mt-4 text-center font-serif text-[40px] font-light leading-[1.02] tracking-[-0.01em] sm:mt-6 sm:text-[64px] lg:text-[104px] xl:text-[120px]">
              Our Story
            </h1>

            <p className="mx-auto mt-8 max-w-[600px] text-center font-serif text-[17px] font-light leading-[1.55] tracking-[-0.005em] text-foreground/90 sm:mt-12 sm:text-[22px] lg:mt-16 lg:max-w-[720px] lg:text-[30px] xl:text-[34px]">
              At Lavara, fragrance is more than scent — it is emotion, memory,
              identity, and quiet expression.
            </p>

            <div className="mx-auto mt-14 flex max-w-[620px] flex-col gap-7 text-[15px] leading-[1.85] text-foreground/85 sm:mt-20 sm:gap-9 sm:text-[16.5px] lg:text-[17px]">
              <p>
                There are people who have always felt different. Present in the
                room, yet somehow unseen. Surrounded by others, yet carrying a
                quiet sense of solitude. People who feel deeply, think
                differently, and often struggle to express what lives inside
                them without being misunderstood.
              </p>

              <p className="font-serif text-[22px] font-light italic leading-[1.4] tracking-[-0.005em] text-foreground sm:text-[28px] lg:text-[32px]">
                Lavara was born from that feeling.
              </p>

              <p>
                For a long time, words never felt enough. Thoughts felt too
                layered to explain, emotions too personal to translate, and
                individuality too easily judged. Yet there was always one
                language that required no permission, no explanation, and no
                validation —{" "}
                <span className="italic">scent</span>.
              </p>

              <p className="font-serif text-[22px] font-light italic leading-[1.4] tracking-[-0.005em] text-foreground sm:text-[28px] lg:text-[32px]">
                Fragrance became a form of communication.
              </p>

              <p>
                A way to say what could not always be spoken. A way to express
                identity without noise. Through scent, presence became emotion.
                Through scent, memory became tangible. Through scent, feeling
                became unforgettable.
              </p>

              <p>
                We believe what you wear should say something about you before
                you speak. The way you dress, the energy you carry, and the
                fragrance that lingers after you leave all become part of the
                story you tell the world.
              </p>

              <p>
                Lavara exists for those who feel deeply. For those who see
                beauty in emotion, mystery, individuality, softness, longing,
                confidence, peace, desire, and quiet strength. For those who
                want to be remembered not because they were loud, but because
                they made people feel something.
              </p>

              <p>
                Every fragrance is created with intention — not simply to smell
                beautiful, but to create atmosphere, memory, and connection. A
                familiar scent that reminds someone of a feeling. A moment
                suspended in time. A presence that lingers long after goodbye.
              </p>
            </div>

            {/* Closing stanza */}
            <div className="mx-auto mt-16 max-w-[600px] border-t border-[var(--border-light)] pt-12 text-center sm:mt-24 sm:pt-16">
              <p className="font-serif text-[22px] font-light italic leading-[1.5] tracking-[-0.005em] text-foreground sm:text-[28px] lg:text-[32px]">
                Because some memories are not seen.
                <br />
                They are felt.
              </p>
              <p className="mx-auto mt-8 max-w-[480px] text-[15px] leading-[1.85] text-foreground/85 sm:mt-10 sm:text-[16.5px]">
                And sometimes, the most powerful thing you leave behind is a
                feeling no one can explain — only remember.
              </p>
            </div>

            {/* Sign-off */}
            <div className="mt-16 flex flex-col items-center gap-4 text-center sm:mt-24">
              <span className="font-serif text-[28px] font-light tracking-[0.45em] text-foreground sm:text-[36px]">
                LAVARA
              </span>
              <p className="font-serif text-[15px] italic text-muted sm:text-[17px]">
                Wear the feeling. Become the memory.
              </p>

              <Link
                href="/gallery"
                className="mt-8 inline-block border border-foreground/80 px-7 py-3.5 text-[10.5px] uppercase tracking-[0.32em] text-foreground transition-colors hover:bg-foreground hover:text-background sm:mt-12 sm:px-9 sm:py-4 sm:text-[11.5px]"
              >
                Discover the Collection
              </Link>
            </div>
          </article>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
