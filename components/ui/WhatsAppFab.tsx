"use client";

import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { content } from "@/content/content";
import { WhatsAppIcon } from "./WhatsAppIcon";

// Appears once the hero leaves the viewport and hides again over the final contact section.
export function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contato");
    if (!hero) return;
    const state = { pastHero: false, atContact: false };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) state.pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (e.target === contact) state.atContact = e.isIntersecting;
      }
      setShow(state.pastHero && !state.atContact);
    });
    io.observe(hero);
    if (contact) io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={buildWhatsAppLink({ kind: "hero" })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${content.ui.fab} ${content.ui.newTab}`}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`group fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-brass text-ink transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] hover:scale-105 active:scale-95 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-brass motion-safe:animate-[ping_2.6s_ease-out_3]" aria-hidden="true" />
      <WhatsAppIcon className="relative size-6" />
    </a>
  );
}
