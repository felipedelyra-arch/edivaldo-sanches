import { content } from "@/content/content";
import { Picture } from "@/components/ui/Picture";

const { timeline } = content;

export function Timeline() {
  const photoAfter = 2; // the renders photo sits between 2003 and 2009
  return (
    <section data-hscroll aria-labelledby="linha-do-tempo" className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-ink py-20">
      <div className="wrap flex flex-wrap items-end justify-between gap-4">
        <h2 id="linha-do-tempo" className="display text-[clamp(2.8rem,6vw,6rem)]">
          {timeline.title}
        </h2>
        <p className="text-sm text-stone-2">{timeline.hint}</p>
      </div>

      <div data-viewport className="no-bar mt-12 scroll-px-[clamp(1rem,3vw,2.5rem)] snap-x snap-mandatory overflow-x-auto overscroll-x-contain">
        <ol data-track className="flex w-max items-stretch gap-[clamp(2.5rem,6vw,7rem)] px-[clamp(1rem,3vw,2.5rem)]">
          {timeline.events.map((e, i) => (
            <li key={e.year} className="contents">
              <article className="flex w-[78vw] max-w-[30rem] shrink-0 snap-start flex-col sm:w-[24rem]">
                <span className="display num text-[clamp(5.5rem,11vw,10rem)] leading-[0.85] text-stone">{e.year}</span>
                {/* Ground line with a tick: each event is a mark on the same scale. */}
                <span className="relative my-6 block h-px w-full bg-stone/25" aria-hidden="true">
                  <span className="absolute -top-2 left-0 h-4 w-px bg-brass" />
                </span>
                <h3 className="text-xl font-medium text-stone">{e.title}</h3>
                <p className="mt-2 max-w-[26rem] text-stone-2">{e.text}</p>
              </article>
              {i === photoAfter ? (
                <figure className="w-[60vw] max-w-[22rem] shrink-0 snap-start self-center sm:w-[20rem]">
                  <div className="aspect-[608/839] overflow-hidden">
                    <Picture image={timeline.image} />
                  </div>
                </figure>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      {/* Graphic scale doubling as the progress bar. */}
      <div className="wrap mt-12" aria-hidden="true">
        <div className="relative h-2">
          <div className="absolute inset-x-0 top-1/2 h-px bg-stone/20" />
          <div data-progress className="absolute inset-x-0 top-1/2 h-px origin-left scale-x-0 bg-brass" />
          <div className="absolute inset-0 flex justify-between">
            {timeline.events.map((e) => (
              <span key={e.year} className="h-2 w-px bg-stone/40" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
