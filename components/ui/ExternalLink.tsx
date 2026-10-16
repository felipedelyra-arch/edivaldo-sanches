import type { ReactNode } from "react";
import { content } from "@/content/content";

export function ExternalLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {content.ui.newTab}</span>
    </a>
  );
}
