"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/animations/gsap";

// Discreet ring that trails the pointer on fine-pointer devices; grows over interactive elements.
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(`(pointer: fine) and ${MOTION_OK}`, () => {
      gsap.set(el, { autoAlpha: 0, xPercent: -50, yPercent: -50 });
      const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
      const move = (e: PointerEvent) => {
        x(e.clientX);
        y(e.clientY);
        const hot = (e.target as Element).closest("a, button, [data-hot]");
        gsap.to(el, { scale: hot ? 2.2 : 1, autoAlpha: 1, duration: 0.25 });
      };
      const leave = () => gsap.to(el, { autoAlpha: 0, duration: 0.2 });
      window.addEventListener("pointermove", move);
      document.addEventListener("pointerleave", leave);
      return () => {
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden size-7 rounded-full border border-brass mix-blend-difference [@media(pointer:fine)]:block opacity-0"
    />
  );
}
