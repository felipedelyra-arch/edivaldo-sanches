import { content } from "@/content/content";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Monogram } from "@/components/ui/Monogram";
import { Picture } from "@/components/ui/Picture";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const { brand, nav, hero, intro } = content;
const [first, last] = brand.name.split(" ");

export function Hero() {
  return (
    <section id="inicio" className="relative isolate min-h-svh overflow-hidden bg-ink">
      {/* Faint site plan behind the name: the lot, the house, the north arrow. */}
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 -z-10 h-full w-full text-stone/[0.07]" aria-hidden="true">
        <path className="stroke" d="M80 120 H1120 V700 H80 Z" strokeDasharray="10 8" />
        <path className="stroke" d="M240 220 H760 V600 H240 Z M500 220 V600 M240 420 H500 M620 420 V600" />
        <path className="stroke" d="M1050 170 L1070 230 L1050 218 L1030 230 Z M1050 140 V170" />
        <path className="stroke" d="M80 740 H1120 M80 730 V750 M1120 730 V750" />
      </svg>

      <header className="wrap relative z-10 flex items-center justify-between gap-6 pt-5">
        <a href="#inicio" className="flex items-center gap-3" aria-label={`${brand.name}, início`}>
          <Monogram className="w-12 text-brass" strokeWidth={6} />
          <span className="hidden text-sm leading-tight text-stone-2 sm:block">
            {brand.role}
            <br />
            {brand.place}
          </span>
        </a>
        <nav aria-label="Seções">
          <ul className="flex items-center gap-5 text-sm sm:gap-8">
            {nav.map((n) => (
              <li key={n.href} className={n.href === "#contato" ? "" : "hidden md:block"}>
                <a href={n.href} className="link-draw py-2">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="wrap grid min-h-[calc(100svh-5rem)] grid-cols-12 items-end gap-x-6 gap-y-10 pb-10 pt-10 md:pb-14">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="display text-[21vw] text-stone lg:text-[clamp(4rem,15.5vw,15rem)]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block">{first}</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em] lg:pl-[0.9em]">
              <span data-hero-line className="block">{last}</span>
            </span>
          </h1>
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end lg:pl-[calc(15vw*0.9)]">
            <div className="max-w-[42rem]">
              <p className="overflow-hidden display text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.1] tracking-[-0.01em]">
                <span data-hero-line className="block">{hero.statement}</span>
              </p>
              <p className="mt-4 overflow-hidden text-stone-2">
                <span data-hero-line className="block">{hero.support}</span>
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 lg:pl-[calc(15vw*0.9)]">
            <a href={buildWhatsAppLink({ kind: "hero" })} target="_blank" rel="noopener noreferrer" className="btn btn-brass">
              <WhatsAppIcon />
              {hero.cta}
              <span className="sr-only"> {content.ui.newTab}</span>
            </a>
            <a href="#historia" className="btn btn-ghost link-draw">
              {hero.secondary}
              <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* Portrait in a measured frame: vertical dimension line reads the career span. */}
        <figure className="relative col-span-10 col-start-2 sm:col-span-6 sm:col-start-4 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-center">
          <div className="relative ml-10 aspect-[587/808] overflow-hidden bg-ink-2">
            <div data-hero-img className="h-full w-full">
              <Picture image={hero.image} priority />
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 flex w-8 flex-col items-center text-brass" aria-hidden="true">
            <span className="h-px w-4 bg-current" />
            <span className="num py-2 text-xs">{intro.from}</span>
            <span className="w-px flex-1 bg-current" />
            <span className="display my-3 text-lg [writing-mode:vertical-rl] rotate-180 text-stone">{hero.span}</span>
            <span className="w-px flex-1 bg-current" />
            <span className="num py-2 text-xs">{intro.to}</span>
            <span className="h-px w-4 bg-current" />
          </div>
        </figure>
      </div>
    </section>
  );
}
