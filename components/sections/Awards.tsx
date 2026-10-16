import { content } from "@/content/content";

const { awards } = content;

export function Awards() {
  return (
    <section aria-labelledby="reconhecimento" className="on-paper bg-paper py-24 text-ink md:py-36">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12">
        <h2 id="reconhecimento" className="display col-span-12 text-[clamp(3.2rem,7vw,7rem)] md:col-span-4">
          {awards.title}
        </h2>
        <ol className="col-span-12 md:col-span-8" data-reveal>
          {awards.items.map((a, i) => (
            <li key={a.title} data-r className={`grid grid-cols-[5.5rem_1fr] gap-x-6 px-4 py-6 sm:grid-cols-[8rem_1fr_14rem] ${i % 2 ? "" : "bg-paper-2"}`}>
              <span className="display num text-4xl leading-none sm:text-5xl">{a.year}</span>
              <span className="text-lg font-medium">{a.title}</span>
              <span className="col-start-2 text-ink/70 sm:col-start-3 sm:text-right">{a.by}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
