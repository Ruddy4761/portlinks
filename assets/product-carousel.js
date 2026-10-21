/* hero carousel: auto-rotates, pauses on hover/focus/hidden/off-screen, arrows, dots, swipe, keyboard */
(() => {
  const root = document.getElementById("hc");
  if (!root) return;
  const slides = [...root.querySelectorAll(".hc-slide")],
    vis = [...root.querySelectorAll(".hc-v")],
    dots = [...root.querySelectorAll(".hc-dot")],
    DUR = 3500,
    reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  let i = 0,
    timer = null,
    userPaused = reduce,
    hover = false,
    hidden = false,
    seen = true;
  const stopped = () => userPaused || hover || hidden || !seen;
  const arm = () => {
    clearTimeout(timer);
    root.classList.toggle("is-paused", stopped());
    if (!stopped()) timer = setTimeout(() => go(i + 1), DUR);
  };
  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => {
      const on = k === i;
      s.classList.toggle("is-active", on);
      s.toggleAttribute("inert", !on);
      s.setAttribute("aria-hidden", on ? "false" : "true");
    });
    vis.forEach((v, k) => v.classList.toggle("is-active", k === i));
    dots.forEach((d, k) => {
      d.setAttribute("aria-current", k === i ? "true" : "false");
      d.classList.remove("run");
      void d.offsetWidth;
      if (k === i) d.classList.add("run");
    });
    arm();
  }
  dots.forEach((d, k) => (d.onclick = () => go(k)));
  root.addEventListener("mouseenter", () => {
    hover = true;
    arm();
  });
  root.addEventListener("mouseleave", () => {
    hover = false;
    go(i);
  });
  root.addEventListener("focusin", () => {
    hover = true;
    arm();
  });
  root.addEventListener("focusout", (e) => {
    if (!root.contains(e.relatedTarget)) {
      hover = false;
      go(i);
    }
  });
  root.addEventListener("keydown", (e) => {
    if (e.target.closest("input")) return;
    if (e.key === "ArrowRight") go(i + 1);
    if (e.key === "ArrowLeft") go(i - 1);
  });
  let x0 = null;
  root.addEventListener(
    "touchstart",
    (e) => {
      x0 = e.touches[0].clientX;
    },
    { passive: true },
  );
  root.addEventListener(
    "touchend",
    (e) => {
      if (x0 === null) return;
      const d = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(d) > 45) go(i + (d < 0 ? 1 : -1));
    },
    { passive: true },
  );
  document.addEventListener("visibilitychange", () => {
    hidden = document.hidden;
    hidden ? arm() : go(i);
  });
  if ("IntersectionObserver" in window)
    new IntersectionObserver(
      (es) => {
        seen = es[0].isIntersecting;
        seen ? go(i) : arm();
      },
      { threshold: 0.2 },
    ).observe(root);
  go(0);
})();
