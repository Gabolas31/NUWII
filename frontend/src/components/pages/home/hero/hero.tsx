import { useEffect, useRef } from "react";
import { waLink, waMessages } from "@/lib";
import { useReveal } from "@/lib/hooks/useReveal";
import styles from "./hero.module.css";

export function Hero() {
  const visual = useReveal<HTMLDivElement>();
  const shapeRef = useRef<HTMLDivElement>(null);

  // Parallax suave no shape de fundo (Apple-style)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (shapeRef.current) {
            shapeRef.current.style.transform = `translateY(${y * -0.05}px) rotate(-3deg) translate(-14px, 14px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div className={`reveal in`}>
            <span className={styles.eyebrow}>Contabilidade digital · CRC ativo</span>
          </div>
          <h1 className={`${styles.h1} reveal in reveal-d1`}>
            Sua empresa, <em>sem a parte chata.</em>
          </h1>
          <p className={`${styles.sub} reveal in reveal-d2`}>
            Cuidamos da contabilidade, das declarações e dos impostos da sua PJ.
            Você fala com um contador no WhatsApp, sem chatbot e sem trocar de
            atendente toda hora.
          </p>

          <div className={`${styles.ctas} reveal in reveal-d3`}>
            <a
              href={waLink(waMessages.default)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Falar com Corujão
              <Arrow />
            </a>
            <a
              href={waLink(waMessages.changeAccountant)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              Trocar de contador
            </a>
          </div>

          <div className={`${styles.trust} reveal in reveal-d4`}>
            <div className={styles.trustItem}>
              <span className={styles.trustNum}>+400</span>
              <span className={styles.trustLabel}>empresas com a NUWII</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <span className={styles.trustNum}>2021</span>
              <span className={styles.trustLabel}>abertos desde</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <div className={styles.trustStarsCol}>
                <span className={styles.stars}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} />
                  ))}
                </span>
                <span className={styles.starsCaption}>
                  <strong>4.9</strong> no Google · +400 avaliações
                </span>
              </div>
            </div>
          </div>
        </div>

        <div ref={visual.ref} className={`${styles.visual} ${visual.inView ? "in" : ""}`}>
          <div ref={shapeRef} className={styles.shape} />
          <div className={`${styles.imgWrap} scale-in ${visual.inView ? "in" : ""}`}>
            <img src="/assets/new-images/guardia--tablet-label.43a91a9.png" alt="Consultora de Negócios NUWII" draggable={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6.1L10 14.8 4.6 18l1.3-6.1L1.3 7.7l6.1-.6z" />
    </svg>
  );
}
