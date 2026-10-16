import { content } from "@/content/content";
import { Picture } from "@/components/ui/Picture";

const { city } = content;

export function City() {
  return (
    <section aria-labelledby="cidade" className="on-paper bg-stone py-24 text-ink md:py-36">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 md:col-span-7" data-reveal>
          <h2 id="cidade" data-r className="display max-w-[12ch] text-[clamp(3.2rem,7vw,7rem)]">
            {city.title}
          </h2>
          <p data-r className="mt-6 text-xl">{city.lead}</p>
          <ul className="mt-14 grid gap-10">
            {city.items.map((it) => (
              <li key={it.title} data-r className="grid gap-2 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <h3 className="display text-3xl leading-none">{it.title}</h3>
                <p className="text-lg">{it.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <figure className="relative col-span-10 col-start-2 aspect-[542/802] overflow-hidden sm:col-span-6 sm:col-start-4 md:col-span-4 md:col-start-9">
          <div data-parallax className="h-full w-full">
            <Picture image={city.image} />
          </div>
        </figure>
      </div>
    </section>
  );
}
