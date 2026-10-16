import Lenis from "lenis";

// Single instance shared by Motion (owner) and components that need programmatic scroll.
export const smooth: { lenis: Lenis | null } = { lenis: null };

export function scrollToEl(el: HTMLElement, offset = 0) {
  if (smooth.lenis) smooth.lenis.scrollTo(el, { offset });
  else el.scrollIntoView({ block: "start" });
}
