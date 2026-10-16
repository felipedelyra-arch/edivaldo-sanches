import { content } from "@/content/content";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const { contact } = content;

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="on-brass bg-brass py-24 text-ink md:py-36">
      <div className="wrap" data-reveal>
        <h2 id="contato-titulo" data-r className="display text-[clamp(3.6rem,11vw,11.5rem)]">
          {contact.title}
        </h2>
        <p data-r className="mt-6 max-w-[36rem] text-xl">{contact.text}</p>
        <a
          data-r
          href={buildWhatsAppLink({ kind: "contato" })}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-10 w-full justify-between bg-ink px-6 py-6 text-[clamp(1.15rem,2.2vw,1.75rem)] text-paper hover:bg-ink-2 sm:w-auto sm:min-w-[32rem]"
        >
          <span className="flex items-center gap-4">
            <WhatsAppIcon className="size-7" />
            {contact.cta}
          </span>
          <span className="arrow" aria-hidden="true">→</span>
          <span className="sr-only"> {content.ui.newTab}</span>
        </a>
        <dl data-r className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-sm text-ink/75">{contact.labels.address}</dt>
            <dd className="mt-1 text-lg">
              <ExternalLink href={contact.mapsUrl} className="link-draw">{contact.address}</ExternalLink>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ink/75">{contact.labels.phone}</dt>
            <dd className="mt-1 text-lg">
              <a href={contact.phoneHref} className="link-draw num">{contact.phone}</a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ink/75">{contact.labels.email}</dt>
            <dd className="mt-1 break-all text-lg">
              <a href={`mailto:${contact.email}`} className="link-draw">{contact.email}</a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ink/75">{contact.labels.instagram}</dt>
            <dd className="mt-1 text-lg">
              <ExternalLink href={contact.instagramUrl} className="link-draw">{contact.instagram}</ExternalLink>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
