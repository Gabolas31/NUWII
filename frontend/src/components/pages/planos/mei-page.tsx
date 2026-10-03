import { useState } from "react";
import { Layout } from "@/components/shared/layout";
import {
  MEI_PLANS,
  MEI_COMPARISON,
  MEI_FAQ,
  useReveal,
  waLink,
} from "@/lib";
import { Typewriter, type TypewriterSegment } from "@/components/ui/typewriter";
import styles from "./mei-page.module.css";

/** Frases que se alternam no H1. Tom "b" destaca o termo técnico. */
const HERO_PHRASES: TypewriterSegment[][] = [
  [
    { text: "do " },
    { text: "DAS", tone: "b" },
    { text: " ao " },
    { text: "IRPF", tone: "b" },
    { text: "." },
  ],
  [
    { text: "do " },
    { text: "CNPJ", tone: "b" },
    { text: " à " },
    { text: "certidão", tone: "b" },
    { text: "." },
  ],
  [
    { text: "da " },
    { text: "nota", tone: "b" },
    { text: " ao " },
    { text: "teto", tone: "b" },
    { text: "." },
  ],
];

export function MeiPage() {
  const heroReveal = useReveal();
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
            <div className={styles.heroText}>
              <span className={styles.eyebrow}>Plano MEI</span>
              <h1 className={styles.title}>
                Cuidamos do seu MEI{" "}
                <Typewriter className={styles.typed} phrases={HERO_PHRASES} />
              </h1>
              <p className={styles.subtitle}>
                Pra MEI que quer ficar 100% regular sem ter que aprender
                contabilidade no YouTube. A gente cuida da burocracia, você cuida
                do seu negócio. A partir de <strong>R$ 59/mês</strong>.
              </p>

              <div className={styles.heroCtas}>
                <a
                  className={styles.heroCtaPrimary}
                  href={waLink(MEI_PLANS[1].whatsappMessage)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Fale com o Especialista
                  <Arrow />
                </a>
                <a className={styles.heroCtaGhost} href="#comparativo">
                  Ver o comparativo
                </a>
              </div>

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

            {/* Painel ilustrativo do acompanhamento mensal do MEI */}
            <aside className={styles.heroPanel} aria-label="Exemplo de acompanhamento do MEI">
              <div className={styles.panelHead}>
                <span className={styles.panelTitle}>Seu MEI · este mês</span>
                <span className={styles.panelTag}>100% em dia</span>
              </div>

              <ul className={styles.panelList}>
                {[
                  { t: "DAS do mês", s: "emitido" },
                  { t: "DASN-SIMEI", s: "entregue" },
                  { t: "Certidão negativa", s: "válida" },
                ].map((item) => (
                  <li key={item.t}>
                    <span className={styles.panelCheck}>
                      <Check />
                    </span>
                    <span className={styles.panelItemName}>{item.t}</span>
                    <span className={styles.panelStatus}>{item.s}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.panelMeter}>
                <div className={styles.panelMeterTop}>
                  <span>Faturamento no ano</span>
                  <strong>52% do limite</strong>
                </div>
                <div className={styles.panelBar}>
                  <i style={{ width: "52%" }} />
                </div>
                <p className={styles.panelMeterFoot}>
                  R$ 42.300 de R$ 81.000 · avisamos antes de você estourar o teto
                </p>
              </div>

              <div className={styles.panelFoot}>
                <span className={styles.panelFootIcon} aria-hidden="true">
                  <Check />
                </span>
                Lembrete no WhatsApp 3 dias antes de cada vencimento
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* PLAN CARDS */}
      {/* COMPARISON TABLE */}
      <section className={styles.compareSection} id="comparativo">
        <div className={styles.wrap}>
          <div
            ref={compareReveal.ref}
            className={`${styles.compareHead} ${compareReveal.inView ? styles.in : ""}`}
          >
            <h2 className={styles.h2}>
              Escolha o plano que <em>cabe no seu MEI.</em>
            </h2>
            <p className={styles.h2sub}>
              Tudo incluso na mensalidade. Sem cobrança extra por declaração,
              alteração ou suporte.
            </p>
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
                <tr className={styles.ctaRow}>
                  <td className={styles.featCell} />
                  {MEI_PLANS.map((p) => (
                    <td
                      key={p.name}
                      className={`${styles.dataCell} ${p.featured ? styles.featuredCol : ""}`}
                    >
                      <a
                        className={`${styles.tableCta} ${p.featured ? styles.tableCtaFeat : ""}`}
                        href={waLink(p.whatsappMessage)}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Quero o {p.name}
                      </a>
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
            className={`${styles.faqGrid} ${faqReveal.inView ? styles.in : ""}`}
          >
            <div className={styles.faqAside}>
              <h2 className={styles.faqTitle}>
                Perguntas frequentes <em>sobre o MEI.</em>
              </h2>
              <p className={styles.faqAsideText}>
                As dúvidas que mais chegam no nosso WhatsApp. Se a sua não
                estiver aqui, pergunta — responde um contador, não um robô.
              </p>
              <a
                className={styles.faqAsideCta}
                href={waLink(MEI_PLANS[1].whatsappMessage)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Tirar uma dúvida no WhatsApp
                <Arrow />
              </a>
            </div>

            <div className={styles.faqList}>
              {MEI_FAQ.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
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
            <div className={styles.finalCtaText}>
              <h3>
                Bora deixar seu <em>MEI tranquilo?</em>
              </h3>
              <p>
                Manda mensagem que um contador te responde. Sem chatbot, sem
                fila e sem ter que repetir tudo de novo.
              </p>
            </div>
            <div className={styles.finalCtaActions}>
              <a
                href={waLink(MEI_PLANS[1].whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.finalCtaBtn}
              >
                Fale com o Especialista
                <Arrow />
              </a>
              <a className={styles.backLink} href="#comparativo">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                Rever o comparativo
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// ============================================================
// MEI Plan Card (compact version for landing page)
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
