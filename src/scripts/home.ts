// Home page extras: hero entrance and tilt, rotating word, skill beams. Folder dragging lives in folders.ts.
import { gsap, $, $$, reduced } from "./site";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

/* ---------- Skill beams ----------
   Lines are measured from the real pill and chip edges, so they always land where they should.
   The diagram cycles on its own while it's on screen; hover or focus pauses it, click pins a skill. */
const beams = $("[data-beams]");
if (beams) {
  try { setupBeams(beams); } catch (err) { console.error("beams", err); }
}

function setupBeams(root: HTMLElement) {
  const NS = "http://www.w3.org/2000/svg";
  const wrap = $(".beam", root)!;
  const svg = $<SVGSVGElement>("[data-beam-svg]", root)!;
  const btns = $$<HTMLButtonElement>("[data-skill-btn]", root);
  const lines = $$<SVGPathElement>(".beam__line", root);
  const projs = $$("[data-proj]", root);
  const note = $("[data-beam-note]", root);
  const calm = reduced();
  let active = 0;
  let hovering = false;
  let pinned = -1;
  let resumeAt = 0;
  let pulses: gsap.core.Tween[] = [];

  // One start dot per skill, one end dot per project, one travelling pulse per line.
  const dot = (cls: string) => { const c = document.createElementNS(NS, "circle"); c.setAttribute("class", cls); c.setAttribute("r", "4"); svg.appendChild(c); return c; };
  const sDots = btns.map(() => dot("beam__dot"));
  const pDots = projs.map(() => dot("beam__dot"));
  const pulseDots = lines.map(() => { const c = dot("beam__pulse"); c.setAttribute("r", "3.5"); return c; });

  // Layout positions relative to .beam (offsets ignore transforms, so hover effects can't skew them).
  const pos = (el: HTMLElement) => {
    let x = 0, y = 0, n: HTMLElement | null = el;
    while (n && n !== wrap) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  };

  const draw = () => {
    if (!wrap.offsetWidth || getComputedStyle(svg).display === "none") return;
    svg.removeAttribute("preserveAspectRatio");
    svg.setAttribute("viewBox", `0 0 ${wrap.offsetWidth} ${wrap.offsetHeight}`);
    const s = btns.map((b) => { const r = pos(b); return { x: r.x + r.w + 6, y: r.y + r.h / 2 }; });
    const t = projs.map((pj) => { const r = pos(pj); return { x: r.x - 6, y: r.y + r.h / 2 }; });
    lines.forEach((l) => {
      const a = s[Number(l.dataset.skill)], z = t[Number(l.dataset.projLink)];
      const mid = (z.x - a.x) * 0.5;
      l.setAttribute("d", `M${a.x} ${a.y} C ${a.x + mid} ${a.y}, ${z.x - mid} ${z.y}, ${z.x} ${z.y}`);
    });
    sDots.forEach((c, i) => { c.setAttribute("cx", String(s[i].x)); c.setAttribute("cy", String(s[i].y)); });
    pDots.forEach((c, i) => { c.setAttribute("cx", String(t[i].x)); c.setAttribute("cy", String(t[i].y)); });
    set(active, false);
  };

  function set(i: number, animate = true) {
    active = i;
    const links = (btns[i].dataset.links ?? "").split(",").map(Number);
    btns.forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-pressed", String(k === pinned)); });
    projs.forEach((pj) => pj.classList.toggle("on", links.includes(Number(pj.dataset.proj))));
    sDots.forEach((c, k) => c.classList.toggle("on", k === i));
    pDots.forEach((c, k) => c.classList.toggle("on", links.includes(k)));
    if (note) note.textContent = btns[i].dataset.note ?? "";

    pulses.forEach((p) => p.kill());
    pulses = [];
    lines.forEach((l, k) => {
      const on = Number(l.dataset.skill) === i;
      l.classList.toggle("on", on);
      gsap.killTweensOf(l);
      gsap.set(pulseDots[k], { opacity: 0 });
      if (!on || calm) { gsap.set(l, { clearProps: "strokeDasharray,strokeDashoffset" }); return; }
      const len = l.getTotalLength();
      if (animate) gsap.fromTo(l, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.7, ease: "power2.out", clearProps: "strokeDasharray,strokeDashoffset" });
      // A little dot of light runs from the skill to each project it feeds.
      const pd = pulseDots[k];
      const o = { p: 0 };
      pulses.push(gsap.to(o, {
        p: 1, duration: 1.4, ease: "sine.inOut", repeat: -1, repeatDelay: 0.35, delay: animate ? 0.6 : 0,
        onUpdate: () => {
          const pt = l.getPointAtLength(o.p * len);
          pd.setAttribute("cx", String(pt.x)); pd.setAttribute("cy", String(pt.y));
          pd.style.opacity = String(Math.sin(o.p * Math.PI));
        },
      }));
    });
  }

  btns.forEach((b, i) => {
    b.addEventListener("pointerenter", () => { hovering = true; if (pinned < 0) set(i); });
    b.addEventListener("focus", () => { hovering = true; if (pinned < 0) set(i); });
    const leave = () => { hovering = false; resumeAt = performance.now() + 3000; };
    b.addEventListener("pointerleave", leave);
    b.addEventListener("blur", leave);
    b.addEventListener("click", () => {
      pinned = pinned === i ? -1 : i;
      resumeAt = performance.now() + 3000;
      set(i);
    });
  });

  // Auto-cycle while the card is on screen (slower when reduced motion is on).
  let timer = 0;
  const tick = () => {
    if (hovering || pinned >= 0 || performance.now() < resumeAt) return;
    set((active + 1) % btns.length);
  };
  new IntersectionObserver(([e]) => {
    window.clearInterval(timer);
    if (e.isIntersecting) timer = window.setInterval(tick, calm ? 4000 : 2600);
  }, { threshold: 0.25 }).observe(root);

  new ResizeObserver(() => draw()).observe(wrap);
  document.fonts?.ready.then(draw);
  wrap.classList.add("is-live");
  draw();
}

/* ---------- Rotating word: three words share one slot and take turns ----------
   Runs for everyone; with reduced motion it's a plain crossfade instead of the blur slide. */
const words = $$("[data-rot] > span");
if (words.length > 1) {
  const calm = reduced();
  gsap.set(words.slice(1), { autoAlpha: 0, yPercent: calm ? 0 : 40 });
  const tl = gsap.timeline({ repeat: -1, delay: calm ? 0.6 : 1.4 });
  words.forEach((w, i) => {
    const next = words[(i + 1) % words.length];
    if (calm) {
      tl.to(w, { autoAlpha: 0, duration: 0.35 }, "+=2.4").to(next, { autoAlpha: 1, duration: 0.35 }, "<");
    } else {
      tl.to(w, { autoAlpha: 0, yPercent: -40, filter: "blur(10px)", duration: 0.5, ease: "power2.in" }, "+=2.4")
        .fromTo(next, { autoAlpha: 0, yPercent: 40, filter: "blur(10px)" }, { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 0.6, ease: "expo.out", immediateRender: false }, "<0.15");
    }
  });
}

/* ---------- Hold the photo: it lifts out of the folder pocket and grows ----------
   Animates `top` and `scale`, so it never fights the float (y), the scroll rise (yPercent)
   or the pointer drift (x). Once the photo clears the pocket it moves in front of it. */
const pop = $<HTMLElement>("[data-photo]");
if (pop) {
  const calm = reduced();
  const tl = gsap.timeline({ paused: true })
    .to(pop, { top: -172, duration: 0.42, ease: "back.out(1.5)" })
    .set(pop, { zIndex: 6 }, 0.22)
    .to(pop, { scale: 1.16, duration: 0.4, ease: "back.out(2.2)" }, 0.12);
  if (calm) tl.timeScale(6);
  const up = () => { pop.classList.add("is-popped"); tl.play(); };
  const down = () => { if (!pop.classList.contains("is-popped")) return; pop.classList.remove("is-popped"); tl.reverse(); };
  pop.addEventListener("pointerdown", (e) => { if (e.button === 0) up(); });
  ["pointerup", "pointercancel"].forEach((t) => window.addEventListener(t, down));
  pop.addEventListener("keydown", (e) => { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); up(); } });
  pop.addEventListener("keyup", (e) => { if (e.key === " " || e.key === "Enter") down(); });
  pop.addEventListener("blur", down);
  pop.addEventListener("contextmenu", (e) => e.preventDefault());
}

/* ---------- Motion that only runs when motion is welcome ---------- */
const mm = gsap.matchMedia();
mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 861px)" }, (ctx) => {
  const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
  if (!motion) return;

  // Hero name blurs in letter by letter, then the rest of the copy follows (data-intro in site.ts).
  const name = $(".hero__name");
  if (name) {
    SplitText.create(name, {
      type: "words,chars", autoSplit: true,
      onSplit: (self) => gsap.from(self.chars, { opacity: 0, filter: "blur(12px)", y: 14, duration: 0.8, ease: "expo.out", stagger: 0.04 }),
    });
  }

  // The big folder keeps its original flat look. It assembles itself (back, pocket, photo
  // sliding up out of the pocket, tags popping on), then the photo floats, follows the
  // pointer a little, and rises further out of the pocket as you scroll.
  const bigf = $("[data-bigf]");
  if (bigf) {
    const back = $(".bigf__back", bigf)!;
    const front = $(".bigf__front", bigf)!;
    const photo = $("[data-photo]", bigf)!;
    const tags = $$(".tag", bigf);
    gsap.set(front, { skewX: -7, transformOrigin: "50% 100%" });

    gsap.timeline({ delay: 0.35, defaults: { ease: "expo.out" } })
      .from(back, { y: 50, scaleY: 0.85, opacity: 0, transformOrigin: "50% 100%", duration: 0.9 })
      .from(front, { y: 70, opacity: 0, duration: 0.9 }, "<0.08")
      .from(photo, { yPercent: 32, opacity: 0, duration: 1.1, ease: "back.out(1.4)" }, "-=0.55")
      .from(tags, { scale: 0, rotation: (i) => (i % 2 ? 24 : -24), opacity: 0, duration: 0.7, ease: "back.out(2.2)", stagger: 0.09 }, "-=0.6")
      .add(() => {
        gsap.to(photo, { y: -10, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.fromTo(photo, { yPercent: 0 }, { yPercent: -16, ease: "none", immediateRender: false, scrollTrigger: { trigger: ".hero", start: "top top", end: "+=480", scrub: 0.6 } });
      });

    // The pocket breathes open a touch while you hover the folder.
    bigf.addEventListener("pointerenter", () => gsap.to(front, { skewX: -10, scaleY: 0.97, duration: 0.5, ease: "back.out(2)" }));
    bigf.addEventListener("pointerleave", () => gsap.to(front, { skewX: -7, scaleY: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }));

    // Pointer parallax: photo and tags drift at different depths.
    const art = $("[data-hero-art]");
    if (art && wide && window.matchMedia("(pointer: fine)").matches) {
      const layers = [{ el: photo, d: 16 }, ...tags.map((el, i) => ({ el, d: 10 + i * 6 }))].map(({ el, d }) => ({
        d, x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
      }));
      art.addEventListener("pointermove", (e) => {
        const b = art.getBoundingClientRect();
        const nx = (e.clientX - b.left) / b.width - 0.5;
        layers.forEach((l) => l.x(nx * l.d));
      });
      art.addEventListener("pointerleave", () => layers.forEach((l) => l.x(0)));
    }
  }
  gsap.to("[data-hero-copy]", { y: -80, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "+=560", scrub: true } });
  $$("[data-twinkle]").forEach((t, i) =>
    gsap.fromTo(t, { opacity: 0.35, scale: 0.85 }, { opacity: 1, scale: 1.15, duration: 2.2 + (i % 3) * 0.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.4 }),
  );

});
