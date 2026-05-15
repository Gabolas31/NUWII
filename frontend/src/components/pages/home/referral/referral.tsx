import { waLink, waMessages } from "@/lib";
import { useReveal } from "@/lib/hooks/useReveal";
import styles from "./referral.module.css";

export function Referral() {
  const r = useReveal<HTMLDivElement>();

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div ref={r.ref} className={`${styles.box} reveal ${r.inView ? "in" : ""}`}>
          <div className={styles.atmosphere} />
          <div className={styles.content}>
            <div>
              <h3 className={styles.h3}>
                Não sabe qual plano <em>serve pra você?</em>
              </h3>
              <p className={styles.p}>
                Conta seu cenário pra gente. Em até 1h útil, um contador analisa
                sua situação e te diz qual a melhor opção. Sem custo e sem
                compromisso de contratar.
              </p>
            </div>
            <a
              href={waLink(waMessages.default)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              Falar com Corujão
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
