import { content } from "@/content/content";

const fmt = new Intl.NumberFormat("pt-BR");
const { numbers } = content;

export function Numbers() {
  const [lead, ...rest] = numbers.items;
  return (
    <section aria-labelledby="numeros" className="on-paper bg-stone py-24 text-ink md:py-36">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-14" data-reveal>
        <h2 id="numeros" data-r className="col-span-12 max-w-[22ch] text-xl font-medium md:col-span-4">
          {numbers.title}
        </h2>
        <p data-r className="col-span-12 md:col-span-8">
          <span className="display num block text-[clamp(8rem,30vw,26rem)] leading-[0.78]">
            <span data-count={lead.value}>{fmt.format(lead.value)}</span>
          </span>
          <span className="mt-4 block text-xl">{lead.label}</span>
        </p>
        <ul className="col-span-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((n) => (
            <li key={n.label} data-r>
              <span className="display num block text-[clamp(3.5rem,7vw,6.5rem)] leading-none">
                {n.prefix}
                <span data-count={n.value}>{fmt.format(n.value)}</span>
                {n.suffix}
              </span>
              <span className="mt-3 block text-lg">{n.label}</span>
              {n.note ? <span className="block text-sm text-ink/70">{n.note}</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
