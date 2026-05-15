import { useReveal, useCounter } from "@/lib/hooks/useReveal";
import styles from "./stats.module.css";

export function Stats() {
  const reveal = useReveal<HTMLDivElement>();
  const c1 = useCounter(400, reveal.inView);
  const c2 = useCounter(5, reveal.inView);
  const c3 = useCounter(24, reveal.inView);

  return (
    <section ref={reveal.ref} className={styles.root}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={`${styles.stat} reveal ${reveal.inView ? "in" : ""}`}>
            <div className={styles.num}>
              <span className={styles.plus}>+</span>
              <span>{c1}</span>
            </div>
            <p className={styles.desc}>empresas que cuidamos hoje</p>
          </div>
          <div className={`${styles.stat} reveal reveal-d1 ${reveal.inView ? "in" : ""}`}>
            <div className={styles.num}>
              <span className={styles.plus}>+</span>
              <span>{c2}</span>
              <span> anos</span>
            </div>
            <p className={styles.desc}>de mercado, abertos desde 2021</p>
          </div>
          <div className={`${styles.stat} reveal reveal-d2 ${reveal.inView ? "in" : ""}`}>
            <div className={styles.num}>
              <span>{c3}</span>
              <span>h</span>
            </div>
            <p className={styles.desc}>é o tempo médio pra emitir um CNPJ</p>
          </div>
        </div>
      </div>
    </section>
  );
}
