"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/content/content";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { scrollToEl } from "@/animations/lenis";

const { method } = content;
const TOTAL = method.steps.length;

/**
 * The "live thing": a drawing sheet that completes as the visitor walks the 11 steps.
 * Server render shows the finished sheet (no-JS fallback); scroll or a click moves it to that step.
 */
export function Method() {
  const [step, setStep] = useState(TOTAL);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = items.current.filter(Boolean) as HTMLLIElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const first = els[0];
    if (first && first.getBoundingClientRect().top > window.innerHeight) setStep(0);
    return () => io.disconnect();
  }, []);

  const on = (at: number) => (step >= at ? "on" : undefined);
  const current = method.steps[Math.max(0, step - 1)];
  const phase = method.phases.find((p) => p.id === current.phase);

  return (
    <section id="metodo" aria-labelledby="metodo-titulo" className="on-paper bg-paper py-24 text-ink md:py-36">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-7" data-reveal>
          <h2 id="metodo-titulo" data-r className="display text-[clamp(3.4rem,9vw,9rem)]">
            {method.title}
          </h2>
          <p data-r className="mt-6 max-w-[34rem] text-lg">
            {method.lead}
          </p>
        </div>

        {/* Sticky sheet */}
        {/* On phones the wrapper dissolves so the sheet sticks across the whole grid while steps pass under it. */}
        <div className="max-lg:contents lg:col-span-7 lg:row-span-2">
          <div className="sticky top-0 z-10 col-span-12 self-start bg-paper pb-3 pt-3 lg:top-10 lg:pt-0 lg:pb-4">
            <figure className="sheet relative bg-paper-2 p-2 sm:p-5">
              <svg viewBox="0 0 400 300" className="w-full text-ink" role="img" aria-label={`${method.sheet.label}: ${step >= TOTAL ? method.done : current.title}`}>
                {/* 1 lot, north arrow */}
                <rect data-at="1" className={`stroke ${on(1) ?? ""}`} x="40" y="30" width="320" height="240" pathLength={1} strokeDasharray="1" />
                <path data-at="1" className={`stroke ${on(1) ?? ""}`} d="M372 50 L380 70 L372 65 L364 70 Z M372 36 V50" pathLength={1} />
                {/* 2 survey dimensions */}
                <path data-at="2" className={`stroke ${on(2) ?? ""}`} d="M40 284 H360 M40 279 V289 M360 279 V289 M24 30 V270 M19 30 H29 M19 270 H29" pathLength={1} />
                <text data-at="2" className={on(2)} x="200" y="296" textAnchor="middle" fontSize="9" fill="currentColor">12,00</text>
                <text data-at="2" className={on(2)} x="14" y="154" textAnchor="middle" fontSize="9" fill="currentColor" transform="rotate(-90 14 154)">30,00</text>
                {/* 3 bubble diagram */}
                <g data-at="3" className={on(3)} fill="none" stroke="#b8875a" strokeDasharray="3 3">
                  <circle cx="145" cy="150" r="42" />
                  <circle cx="255" cy="110" r="30" />
                  <circle cx="228" cy="190" r="24" />
                  <circle cx="282" cy="190" r="24" />
                </g>
                {/* 4 envelope */}
                <rect data-at="4" className={`stroke ${on(4) ?? ""}`} x="90" y="70" width="220" height="160" pathLength={1} strokeWidth="2.5" />
                {/* 5 interior walls */}
                <path data-at="5" className={`stroke ${on(5) ?? ""}`} d="M200 70 V230 M200 150 H310 M250 150 V230" pathLength={1} />
                {/* 6 doors, windows, room names */}
                <path data-at="6" className={`stroke ${on(6) ?? ""}`} d="M130 230 A20 20 0 0 1 150 210 M150 210 V230 M120 70 H170 M120 74 H170 M230 70 H280 M230 74 H280 M200 175 A15 15 0 0 1 215 160 M250 205 A15 15 0 0 1 265 190" pathLength={1} />
                <g data-at="6" className={on(6)} fontSize="8" fill="currentColor">
                  <text x="145" y="150" textAnchor="middle">SALA</text>
                  <text x="255" y="112" textAnchor="middle">COZINHA</text>
                  <text x="225" y="195" textAnchor="middle">QTO 1</text>
                  <text x="280" y="195" textAnchor="middle">QTO 2</text>
                </g>
                {/* 7 approval stamp */}
                <g data-at="7" className={on(7)} transform="rotate(-8 329 255)" fill="none" stroke="#7a5330">
                  <rect x="256" y="240" width="146" height="30" strokeWidth="1.5" />
                  <text x="329" y="258" textAnchor="middle" fontSize="6.6" fill="#7a5330" stroke="none">{method.sheet.stamp.toUpperCase()}</text>
                </g>
                {/* 8 complementary: electrical + plumbing */}
                <path data-at="8" className={`stroke ${on(8) ?? ""}`} d="M110 90 Q160 120 190 90 M220 90 Q250 130 300 90 M225 215 L290 215" stroke="#7a5330" strokeDasharray="4 3" pathLength={1} />
                {/* 9 site supervision: wall hatch */}
                <g data-at="9" className={on(9)} stroke="currentColor" strokeWidth="5" fill="none" opacity="0.85">
                  <rect x="90" y="70" width="220" height="160" />
                </g>
                {/* 10 tracking: checkmarks in rooms */}
                <path data-at="10" className={`stroke ${on(10) ?? ""}`} d="M138 168 l5 5 l10 -12 M248 126 l5 5 l10 -12 M218 210 l5 5 l10 -12 M273 210 l5 5 l10 -12" stroke="#7a5330" strokeWidth="1.5" pathLength={1} />
                {/* 11 specs: finishes + key at the door */}
                <path data-at="11" className={`stroke ${on(11) ?? ""}`} d="M110 100 h20 v20 h-20 Z M270 100 h20 v20 h-20 Z" pathLength={1} />
                <g data-at="11" className={on(11)} fill="none" stroke="#7a5330" strokeWidth="2">
                  <circle cx="140" cy="252" r="7" />
                  <path d="M147 252 H172 M164 252 V259 M170 252 V258" />
                </g>
              </svg>
              {/* Title block (carimbo) */}
              <figcaption className="mt-2 grid sm:mt-3 grid-cols-[auto_1fr_auto] items-end gap-x-5 bg-paper px-4 py-3 text-sm" aria-live="polite">
                <span className="display num text-4xl leading-none text-brass-ink">
                  {String(Math.max(step, 1)).padStart(2, "0")}
                  <span className="text-xl text-ink/50">/{TOTAL}</span>
                </span>
                <span className="leading-tight">
                  <span className="block text-ink/70">{phase?.name}</span>
                  <span className="block font-medium">{step >= TOTAL ? method.done : current.title}</span>
                </span>
                <span className="hidden text-right text-xs leading-tight text-ink/70 sm:block">
                  {content.brand.name}
                  <br />
                  {content.brand.role}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Steps */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 lg:pt-[40vh]">
          {method.phases.map((p) => (
            <div key={p.id} className="mb-16">
              <h3 className="display mb-6 text-5xl text-brass-ink">{p.name}</h3>
              <ol className="grid gap-2">
                {method.steps.map((s, i) =>
                  s.phase === p.id ? (
                    <li key={s.title} data-step={i + 1} ref={(el) => { items.current[i] = el; }}>
                      <button
                        type="button"
                        onClick={(e) => { setStep(i + 1); scrollToEl(e.currentTarget, -window.innerHeight * 0.45); }}
                        aria-current={step === i + 1 ? "step" : undefined}
                        className={`grid w-full grid-cols-[3rem_1fr] gap-x-4 px-3 py-4 text-left transition-colors duration-300 ${step === i + 1 ? "bg-ink text-paper" : step > i + 1 ? "text-ink" : "text-ink/55 hover:bg-paper-2"}`}
                      >
                        <span className="display num text-3xl leading-none">{i + 1}</span>
                        <span>
                          <span className="block text-lg font-medium leading-snug">{s.title}</span>
                          <span className={`mt-1 block ${step === i + 1 ? "text-paper/80" : "opacity-80"}`}>{s.text}</span>
                        </span>
                      </button>
                    </li>
                  ) : null,
                )}
              </ol>
            </div>
          ))}
          <div className="bg-ink p-7 text-paper" data-reveal>
            <h3 data-r className="display text-4xl leading-none">{method.team.title}</h3>
            <p data-r className="mt-4 text-paper/85">{method.team.text}</p>
            <a data-r href={buildWhatsAppLink({ kind: "metodo" })} target="_blank" rel="noopener noreferrer" className="btn btn-brass mt-6">
              {method.cta}
              <span className="arrow" aria-hidden="true">→</span>
              <span className="sr-only"> {content.ui.newTab}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
