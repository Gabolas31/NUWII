import { useEffect, useRef, useState } from "react";

/**
 * useReveal — observa o elemento e retorna true quando entra na viewport.
 * Usado pra disparar animações on-scroll estilo Apple.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; once?: boolean } = {},
) {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

/**
 * Conta de 0 até target com easing quando inView é true.
 */
export function useCounter(target: number, inView: boolean, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let rafId: number;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.floor(target * eased));
      if (p < 1) rafId = requestAnimationFrame(step);
      else setValue(target);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, inView, duration]);

  return value;
}
