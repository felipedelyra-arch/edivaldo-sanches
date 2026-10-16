import { content } from "@/content/content";
import { Picture } from "@/components/ui/Picture";

const { about } = content;

export function About() {
  return (
    <section id="historia" aria-labelledby="quem-e" className="on-paper bg-paper text-ink">
      <div className="grid md:grid-cols-12">
        <div className="relative h-[70svh] overflow-hidden md:col-span-5 md:h-auto md:min-h-[100svh]">
          <div data-parallax className="h-full w-full">
            <Picture image={about.image} />
          </div>
        </div>
        <div className="wrap flex flex-col justify-center gap-10 py-24 md:col-span-7 md:py-36 md:pl-16" data-reveal>
          <h2 id="quem-e" data-r className="display max-w-[19ch] text-[clamp(3rem,6vw,6rem)]">
            {about.title}
          </h2>
          <div data-r className="grid max-w-[38rem] gap-5 text-lg">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-ink/75">{about.family}</p>
          </div>
          <figure data-r className="max-w-[40rem] border-l-2 border-brass pl-6">
            <blockquote className="display text-[clamp(1.6rem,2.4vw,2.25rem)] leading-[1.15] tracking-[-0.01em]">
              “{about.quote.text}”
            </blockquote>
            <figcaption className="mt-5 text-sm text-ink/75">
              {about.quote.author}, {about.quote.origin}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
