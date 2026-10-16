import { content } from "@/content/content";
import { MONOGRAM_PATHS } from "@/components/ui/Monogram";

const { brand, footer } = content;

export function Footer() {
  return (
    <footer className="bg-ink pb-8 pt-20">
      <div className="wrap">
        <svg viewBox="-2 -2 124 104" className="w-full max-h-[70svh] text-stone/80" data-draw aria-hidden="true">
          {MONOGRAM_PATHS.map((d) => (
            <path key={d} d={d} pathLength={1} className="stroke" strokeWidth={0.25} />
          ))}
        </svg>
        <p className="display mt-10 text-[clamp(2.6rem,8vw,8rem)] leading-none">{brand.name}</p>
        <div className="mt-10 flex flex-col gap-2 text-sm text-stone-2 md:flex-row md:justify-between">
          <p>
            {brand.company} · CNPJ <span className="num">{brand.cnpj}</span>
          </p>
          <p>{footer.credits.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
