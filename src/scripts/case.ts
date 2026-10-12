// Case study: the window zooms out of the current folder in the rail,
// the way detail views open in the design system (scale .08 to 1 over 460ms).
import { gsap, $, reduced } from "./site";

requestAnimationFrame(() => {
  const win = $("[data-cs-win]");
  const from = $("[data-cs-rail] .is-current .fold");
  if (!win || reduced()) return;

  // Grow from the current rail folder's centre (460ms in, the design system's spec).
  if (from && window.matchMedia("(min-width: 861px)").matches) {
    const a = from.getBoundingClientRect();
    const b = win.getBoundingClientRect();
    gsap.set(win, { transformOrigin: `${a.left + a.width / 2 - b.left}px ${a.top + a.height / 2 - b.top}px` });
  }
  gsap.from(win, { scale: 0.08, opacity: 0, duration: 0.46, ease: "back.out(1.2)", clearProps: "transform,transformOrigin,opacity" });

  // Rail folders settle in one after another.
  gsap.from("[data-cs-rail] .folder", { x: -24, opacity: 0, duration: 0.6, ease: "expo.out", stagger: 0.05, delay: 0.1 });
});
