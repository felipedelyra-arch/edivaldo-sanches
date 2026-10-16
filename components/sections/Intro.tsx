"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/animations/gsap";
import { Monogram } from "@/components/ui/Monogram";
import { content } from "@/content/content";

const { brand, intro } = content;

// House elevation + plan outline that "becomes" the monogram.
const HOUSE = [
  "M40 230 H360",
  "M80 230 V130 H320 V230",
  "M60 140 L200 50 L340 140",
  "M170 230 V170 H230 V230",
  "M105 160 H145 V200 H105 Z",
  "M255 160 H295 V200 H255 Z",
  "M40 250 H360 M40 245 V255 M360 245 V255",
];

export function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const html = document.documentElement;
    if (!el || !html.hasAttribute("data-intro")) return;

    const finish = () => {
      try {
        sessionStorage.setItem("es-intro", "1");
      } catch {}
      html.removeAttribute("data-intro");
      window.dispatchEvent(new Event("es:intro-done"));
    };

    let skipFn = () => {};
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      if (reduce) {
        tl.to(el, { autoAlpha: 0, duration: 0.5, delay: 0.6 });
        skipFn = () => tl.progress(1);
        return;
      }
      const house = el.querySelectorAll("[data-house] path");
      const mono = el.querySelectorAll("[data-mono]");
      const counter = el.querySelector("[data-counter]");
      const year = { v: intro.from };
      gsap.set([house, mono], { strokeDasharray: 1, strokeDashoffset: 1 });

      tl.to(house, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", stagger: 0.07 })
        .to("[data-house]", { autoAlpha: 0, scale: 0.6, duration: 0.45, ease: "power2.in" }, 1.05)
        .to(mono, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out", stagger: 0.04 }, 1.25)
        .from("[data-intro-line]", { yPercent: 110, duration: 0.6, ease: "expo.out", stagger: 0.08 }, 1.35)
        .to(year, {
          v: intro.to,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => counter && (counter.textContent = String(Math.round(year.v))),
        }, 1.35)
        .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.75, ease: "expo.inOut" }, 2.45)
        .from(document.querySelectorAll("[data-hero-img]"), { scale: 1.18, duration: 1.4, ease: "expo.out" }, 2.6)
        .from(document.querySelectorAll("[data-hero-line]"), { yPercent: 105, duration: 1, ease: "expo.out", stagger: 0.09 }, 2.65);

      skipFn = () => tl.progress(1);
    }, el);

    const btn = el.querySelector("[data-skip]");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skipFn();
    btn?.addEventListener("click", skipFn);
    window.addEventListener("keydown", onKey);
    return () => {
      btn?.removeEventListener("click", skipFn);
      window.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      className="intro fixed inset-0 z-50 flex-col items-center justify-center bg-ink text-stone"
      style={{ clipPath: "inset(0 0 0 0)" }}
      role="dialog"
      aria-label={brand.name}
    >
      <div className="relative grid place-items-center">
        <svg data-house viewBox="0 0 400 280" className="col-start-1 row-start-1 w-[min(78vw,440px)] text-stone-2" aria-hidden="true">
          {HOUSE.map((d) => (
            <path key={d} d={d} pathLength={1} className="stroke" strokeWidth={1.4} />
          ))}
        </svg>
        <Monogram className="col-start-1 row-start-1 w-[min(34vw,150px)] text-brass" strokeWidth={2} />
      </div>
      <div className="mt-10 text-center">
        <p className="overflow-hidden display text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.02em]">
          <span data-intro-line className="block">{brand.name}</span>
        </p>
        <p className="mt-3 overflow-hidden text-stone-2">
          <span data-intro-line className="block">
            {brand.role} · {brand.place}
          </span>
        </p>
        <p className="mt-6 overflow-hidden display text-4xl text-brass num" aria-hidden="true">
          <span data-intro-line data-counter className="block">{intro.from}</span>
        </p>
      </div>
      <button data-skip type="button" className="btn btn-ghost link-draw absolute bottom-6 right-6 min-h-11 text-sm text-stone-2 hover:text-stone">
        {intro.skip}
      </button>
    </div>
  );
}
