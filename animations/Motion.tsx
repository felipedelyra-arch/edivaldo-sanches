"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MOTION_OK } from "./gsap";
import { smooth } from "./lenis";

const fmt = new Intl.NumberFormat("pt-BR");

/**
 * Global motion layer, driven by data attributes so sections stay server components:
 * [data-reveal] > [data-r]  staggered entrance · [data-count] count-up · [data-draw] stroke draw
 * [data-parallax] slow image drift · [data-hscroll] pinned horizontal timeline (desktop only).
 * Everything lives in gsap.matchMedia, so reduced motion gets the static page and cleanup is automatic.
 */
export function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.11 });
      smooth.lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      if (document.documentElement.hasAttribute("data-intro")) lenis.stop();
      const resume = () => lenis.start();
      window.addEventListener("es:intro-done", resume);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((group) => {
        const items = group.querySelectorAll("[data-r]");
        gsap.from(items.length ? items : group, {
          y: 28,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: 0 };
        el.textContent = fmt.format(0);
        gsap.to(obj, {
          v: end,
          duration: 2.2,
          ease: "power3.out",
          onUpdate: () => (el.textContent = fmt.format(Math.round(obj.v))),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<SVGElement>("[data-draw]").forEach((svg) => {
        const lines = svg.querySelectorAll("path, line, rect, circle, polyline");
        gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.to(lines, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          stagger: 0.06,
          scrollTrigger: { trigger: svg, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6, scale: 1.12 },
          { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: el.parentElement, scrub: true } },
        );
      });

      return () => {
        window.removeEventListener("es:intro-done", resume);
        gsap.ticker.remove(tick);
        lenis.destroy();
        smooth.lenis = null;
      };
    });

    mm.add(`(min-width: 900px) and ${MOTION_OK}`, () => {
      gsap.utils.toArray<HTMLElement>("[data-hscroll]").forEach((section) => {
        const viewport = section.querySelector<HTMLElement>("[data-viewport]");
        const track = section.querySelector<HTMLElement>("[data-track]");
        const bar = section.querySelector<HTMLElement>("[data-progress]");
        if (!viewport || !track) return;
        gsap.set(viewport, { overflow: "hidden" });
        const distance = () => track.scrollWidth - viewport.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.8,
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            onUpdate: (st) => bar && gsap.set(bar, { scaleX: st.progress }),
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
