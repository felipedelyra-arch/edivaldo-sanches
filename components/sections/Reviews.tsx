import { content } from "@/content/content";

const { reviews } = content;

export function Reviews() {
  return (
    <section aria-labelledby="depoimentos" className="bg-ink py-24 md:py-36">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-14" data-reveal>
        <div data-r className="col-span-12 md:col-span-4">
          <h2 id="depoimentos" className="text-xl font-medium">{reviews.title}</h2>
          <p className="display num mt-6 text-[clamp(7rem,16vw,14rem)] leading-[0.8] text-brass">{reviews.rating}</p>
          <p className="mt-4 flex items-center gap-3 text-stone-2">
            <span className="tracking-[0.2em] text-brass" aria-hidden="true">★★★★★</span>
            {reviews.count}
          </p>
        </div>
        <figure data-r className="col-span-12 md:col-span-8">
          <blockquote className="display text-[clamp(2.2rem,4.5vw,4.25rem)] leading-[1.02] tracking-[-0.02em]">
            “{reviews.main.text}”
          </blockquote>
          <figcaption className="mt-6 text-stone-2">
            {reviews.main.author}, {reviews.main.origin}
          </figcaption>
        </figure>
        {reviews.others.map((q) => (
          <figure key={q.author} data-r className="col-span-12 bg-ink-2 p-7 md:col-span-6">
            <blockquote className="display text-2xl leading-snug md:text-3xl">“{q.text}”</blockquote>
            <figcaption className="mt-5 text-stone-2">
              {q.author}, {q.origin}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
