"use client";

import { useRef, useState } from "react";
import { content, type Work } from "@/content/content";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Picture } from "@/components/ui/Picture";
import { TechDrawing } from "@/components/ui/TechDrawing";

const { works } = content;
type Filter = (typeof works.filters)[number]["id"];

// Editorial rhythm: spans cycle so no two neighbours share a shape.
const SPANS = ["md:col-span-8", "md:col-span-4", "md:col-span-5", "md:col-span-7", "md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-12"];

export function Works() {
  const [filter, setFilter] = useState<Filter>("todas");
  const [open, setOpen] = useState<Work | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const list = works.items.filter((w) => filter === "todas" || w.category === filter);

  const show = (w: Work) => {
    setOpen(w);
    dialog.current?.showModal();
  };

  return (
    <section id="obras" aria-labelledby="obras-titulo" className="bg-ink py-24 md:py-36">
      <div className="wrap">
        <div className="grid grid-cols-12 items-end gap-6" data-reveal>
          <h2 id="obras-titulo" data-r className="display col-span-12 text-[clamp(4.5rem,13vw,13rem)] md:col-span-7">
            {works.title}
          </h2>
          <div data-r className="col-span-12 md:col-span-5">
            <p className="text-lg text-stone-2">{works.lead}</p>
            <div role="group" aria-label="Filtrar obras" className="mt-6 flex flex-wrap gap-2">
              {works.filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={`min-h-11 rounded-full px-5 text-sm transition-colors ${filter === f.id ? "bg-stone text-ink" : "bg-ink-2 text-stone hover:bg-stone/15"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12">
          {list.map((w, i) => (
            <li key={w.id} className={filter === "todas" ? SPANS[i % SPANS.length] : "md:col-span-6"}>
              <button type="button" onClick={() => show(w)} className="group block w-full text-left" data-hot>
                <div className="relative aspect-[16/9] overflow-hidden bg-ink-2">
                  {w.image ? (
                    <div data-colorize className="h-full w-full scale-[1.04] grayscale-[0.55] transition-[transform,filter] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-100 group-hover:grayscale-0 group-focus-visible:grayscale-0 [@media(hover:none)]:[&.is-in]:scale-100 [@media(hover:none)]:[&.is-in]:grayscale-0">
                      <Picture image={w.image} />
                    </div>
                  ) : (
                    <div data-colorize className="flex h-full flex-col justify-between p-5 text-stone/60 transition-colors duration-500 group-hover:text-brass [@media(hover:none)]:[&.is-in]:text-brass">
                      <span className="display num text-2xl text-stone">{w.year}</span>
                      <TechDrawing name={w.drawing ?? ""} className="mx-auto w-[78%]" />
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 bg-brass px-4 py-2 text-sm text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
                    {works.open} →
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-medium text-stone">{w.name}</h3>
                <p className="mt-1 text-stone-2">{w.place}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(64rem,calc(100vw-2rem))] max-h-[calc(100svh-2rem)] overflow-auto bg-ink-2 p-0 text-stone backdrop:bg-ink/85"
        aria-labelledby="obra-dialog-titulo"
      >
        {open ? (
          <div className="grid md:grid-cols-[3fr_2fr]">
            <div className="bg-ink">
              {open.image ? (
                <Picture image={open.image} className="h-full w-full object-contain" />
              ) : (
                <TechDrawing name={open.drawing ?? ""} className="w-full p-8 text-brass" />
              )}
            </div>
            <div className="flex flex-col gap-5 p-6 md:p-8">
              <button type="button" onClick={() => dialog.current?.close()} className="link-draw self-end text-sm text-stone-2">
                {works.close} ✕
              </button>
              <h3 id="obra-dialog-titulo" className="display text-4xl leading-none">{open.name}</h3>
              <p className="text-stone-2">{open.place}{open.year ? ` · ${open.year}` : ""}</p>
              <p>{open.text}</p>
              <ul className="grid gap-1 text-stone-2">
                {open.facts.map((f) => (
                  <li key={f}>— {f}</li>
                ))}
              </ul>
              <a href={buildWhatsAppLink({ kind: "obras", work: open.name })} target="_blank" rel="noopener noreferrer" className="btn btn-brass mt-auto self-start">
                {works.cta}
                <span className="arrow" aria-hidden="true">→</span>
                <span className="sr-only"> {content.ui.newTab}</span>
              </a>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
