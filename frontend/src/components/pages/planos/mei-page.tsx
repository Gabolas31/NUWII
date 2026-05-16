import { useState } from "react";
import Link from "next/link";
import { Layout } from "@/components/shared/layout";
import {
  MEI_PLANS,
  MEI_COMPARISON,
  MEI_FAQ,
  useReveal,
  waLink,
} from "@/lib";
import styles from "./mei-page.module.css";

export function MeiPage() {
  const heroReveal = useReveal();
  const plansReveal = useReveal();
  const compareReveal = useReveal();
  const faqReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <Layout>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <div
            ref={heroReveal.ref}
            className={`${styles.heroInner} ${heroReveal.inView ? styles.in : ""}`}
          >
            <span className={styles.eyebrow}>Plano MEI</span>
            <h1 className={styles.title}>
              Cuidamos do seu MEI <em>do DAS ao IRPF.</em>
            </h1>
            <p className={styles.subtitle}>
              Pra MEI que quer ficar 100% regular sem ter que aprender contabilidade no YouTube. A gente cuida da burocracia, você cuida do seu negócio. A partir de <strong>R$ 59/mês</strong>.
            </p>
            <div className={styles.heroBenefits}>
              <div className={styles.benefit}>
                <Check />
                <span>Sem fidelidade</span>
              </div>
              <div className={styles.benefit}>
                <Check />
                <span>Migração grátis</span>
              </div>
              <div className={styles.benefit}>
                <Check />
                <span>Atendimento por WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLAN CARDS */}
      <section className={styles.plansSection}>
        <div className={styles.wrap}>
          <div
            ref={plansReveal.ref}
            className={`${styles.plansHead} ${plansReveal.inView ? styles.in : ""}`}
          >
            <h2 className={styles.h2}>
              Escolha o plano que <em>cabe no seu MEI.</em>
            </h2>
            <p className={styles.h2sub}>
              Tudo incluso na mensalidade. Sem cobrança extra por declaração, alteração ou suporte.
            </p>
          </div>

          <div className={styles.plansGrid}>
            {MEI_PLANS.map((plan) => (
              <MeiPlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className={styles.compareSection}>
        <div className={styles.wrap}>
          <div
            ref={compareReveal.ref}
            className={`${styles.compareHead} ${compareReveal.inView ? styles.in : ""}`}
          >
            <h2 className={styles.h2}>
              Compare os planos <em>lado a lado.</em>
            </h2>
          </div>

          <div className={styles.compareWrap}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th className={styles.featCol}>O que tá incluso</th>
                  <th className={styles.planCol}>Starter</th>
                  <th className={`${styles.planCol} ${styles.featuredCol}`}>
                    <span className={styles.tablePop}>Mais escolhido</span>
                    Unique
                  </th>
                  <th className={styles.planCol}>Advanced</th>
                </tr>
              </thead>
              <tbody>
                {MEI_COMPARISON.map((row, i) => (
                  <tr key={i}>
                    <td className={styles.featCell}>
                      <span>{row.feature}</span>
                      {row.tooltip && (
                        <span className={styles.tip} aria-label={row.tooltip}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                          </svg>
                          <span className={styles.tipText}>{row.tooltip}</span>
                        </span>
                      )}
                    </td>
                    <td className={styles.dataCell}>{renderCell(row.starter)}</td>
                    <td className={`${styles.dataCell} ${styles.featuredCol}`}>
                      {renderCell(row.unique)}
                    </td>
                    <td className={styles.dataCell}>{renderCell(row.advanced)}</td>
                  </tr>
                ))}
                <tr className={styles.priceRow}>
                  <td className={styles.featCell}>
                    <strong>Mensalidade</strong>
                  </td>
                  {MEI_PLANS.map((p) => (
                    <td
                      key={p.name}
                      className={`${styles.dataCell} ${p.featured ? styles.featuredCol : ""}`}
                    >
                      <strong>R$ {p.price}</strong>
                      <span className={styles.priceSmall}>/mês</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.wrap}>
          <div
            ref={faqReveal.ref}
            className={`${styles.faqHead} ${faqReveal.inView ? styles.in : ""}`}
          >
            <h2 className={styles.h2}>Perguntas frequentes sobre o MEI</h2>
          </div>
          <div className={styles.faqList}>
            {MEI_FAQ.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCta}>
        <div className={styles.wrap}>
          <div
            ref={ctaReveal.ref}
            className={`${styles.finalCtaInner} ${ctaReveal.inView ? styles.in : ""}`}
          >
            <h3>
              Bora deixar seu <em>MEI tranquilo?</em>
            </h3>
            <p>
              Manda mensagem que o Corujão te responde. Sem chatbot, sem fila, sem ter que repetir tudo de novo.
            </p>
            <a
              href={waLink(MEI_PLANS[1].whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.finalCtaBtn}
            >
              Falar com Corujão
              <Arrow />
            </a>
            <Link href="/servicos" className={styles.backLink}>
              ← Ver todos os serviços
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// ============================================================
// MEI Plan Card (compact version for landing page)
// ============================================================
function MeiPlanCard({ plan }: { plan: typeof MEI_PLANS[number] }) {
  const reveal = useReveal();

  return (
    <article
      ref={reveal.ref}
      className={`${styles.planCard} ${plan.featured ? styles.planFeat : ""} ${reveal.inView ? styles.in : ""}`}
    >
      {plan.featured && (
        <div className={styles.planBadge}>Mais escolhido</div>
      )}

      <p className={styles.planName}>{plan.name}</p>
      <h3 className={styles.planTitle}>{plan.title}</h3>
      <p className={styles.planDesc}>{plan.description}</p>

      <div className={styles.planPriceLine}>
        <span className={styles.planCurrency}>R$</span>
        <span className={styles.planPrice}>{plan.price}</span>
        <span className={styles.planMonth}>/mês</span>
      </div>
      <p className={styles.planCap}>{plan.capacityNote}</p>
      <p className={styles.planDaily}>
        ≈ <strong>R$ {plan.daily}</strong>/dia, com tudo incluso
      </p>

      <ul className={styles.planFeats}>
        {plan.features.map((f, i) => (
          <li
            key={i}
            className={`${styles.planFeat} ${f.heading ? styles.featHeading : ""}`}
          >
            {!f.heading && (
              <span className={styles.featCheck}>
                <Check />
              </span>
            )}
            <span>{f.text}</span>
          </li>
        ))}
      </ul>

      <a
        href={waLink(plan.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.planCta}
      >
        Falar com Corujão
        <Arrow />
      </a>
    </article>
  );
}

// ============================================================
// FAQ Item with collapse/expand
// ============================================================
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`}>
      <button
        type="button"
        className={styles.faqQ}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className={styles.faqChev}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div className={styles.faqA}>
        <p>{a}</p>
      </div>
    </div>
  );
}

// ============================================================
// Helpers
// ============================================================
function renderCell(value: boolean | string) {
  if (value === true) {
    return (
      <span className={styles.cellYes}>
        <Check />
      </span>
    );
  }
  if (value === false) {
    return <span className={styles.cellNo}>—</span>;
  }
  return <span className={styles.cellText}>{value}</span>;
}

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
