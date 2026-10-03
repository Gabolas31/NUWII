import { useState } from "react";
import Link from "next/link";
import { waLink, waMessages, MEI_PLANS, BUSINESS_PLANS } from "@/lib";
import type { MeiPlan } from "@/lib";
import { Pricing, type PricingPlan } from "@/components/ui/pricing";
import { useReveal } from "@/lib/hooks/useReveal";
import styles from "./plans.module.css";

type PlanType = "business" | "mei";

/** BUSINESS_PLANS no formato do bloco de pricing (src/components/ui/pricing.tsx). */
const PRICING_PLANS: PricingPlan[] = BUSINESS_PLANS.map((plan) => ({
  name: plan.title,
  price: plan.priceServico,
  altPrice: plan.priceComercio,
  period: "mês",
  capacityNote: plan.capacityNote,
  features: plan.features.filter((f) => !f.heading).map((f) => f.text),
  description: plan.description,
  buttonText: "Quero este plano",
  href: waLink(plan.whatsappMessage),
  isPopular: Boolean(plan.featured),
}));

export function Plans() {
  const [type, setType] = useState<PlanType>("business");
  const [starterOpen, setStarterOpen] = useState(false);
  const head = useReveal<HTMLDivElement>();
  const included = useReveal<HTMLDivElement>();

  const isMei = type === "mei";
  const isBusiness = !isMei;

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div ref={head.ref} className={styles.head}>
          <div className={`reveal in`}>
            <span className={styles.eyebrow}>Planos</span>
          </div>
          <h2 className={`${styles.h2} reveal ${head.inView ? "in" : ""} reveal-d1`}>
            Mensalidade fixa. <em>Cancele quando quiser.</em>
          </h2>
          <p className={`${styles.p} reveal ${head.inView ? "in" : ""} reveal-d2`}>
            Sem taxa de adesão. Sem cobrar extra por NF, declaração ou
            consultoria. Migração de outra contabilidade sem custo.
          </p>
          <div className={`reveal ${head.inView ? "in" : ""} reveal-d3`}>
            <div className={styles.toggle}>
              <button
                className={isBusiness ? styles.toggleOn : ""}
                onClick={() => setType("business")}
              >
                Tenho empresa
              </button>
              <button
                className={isMei ? styles.toggleOn : ""}
                onClick={() => setType("mei")}
              >
                Sou MEI
              </button>
            </div>
          </div>
        </div>

        {isBusiness && (
          <Pricing
            altLabel="Comércio"
            hint="Vende hora de trabalho, consultoria ou projeto? É Serviço. Vende produto, revende ou tem estoque? É Comércio."
            plans={PRICING_PLANS}
            primaryLabel="Serviço"
            title=""
          />
        )}

        {isMei && (
          <>
            <div className={styles.grid}>
              {MEI_PLANS.map((plan, i) => (
                <MeiPlanCard key={plan.name} plan={plan} index={i} />
              ))}
            </div>
            <div className={styles.meiMoreWrap}>
              <Link href="/planos/mei" className={styles.meiMore}>
                Ver detalhes completos sobre o MEI
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}

        {/* Tudo incluso callout */}
        <div ref={included.ref} className={`${styles.included} reveal ${included.inView ? "in" : ""}`}>
          {(isMei
            ? [
                "Sem fidelidade",
                "Sem taxa de adesão",
                "Atendimento por WhatsApp",
                "Cancele a qualquer momento",
              ]
            : [
                "Abertura de empresa por R$ 350",
                "Migração de contador grátis",
                "Sem taxa de adesão",
                "Cancele a qualquer momento",
              ]
          ).map((t) => (
            <span key={t} className={styles.includedItem}>
              <span className={styles.includedIcon}>
                <CheckSm />
              </span>
              {t}
            </span>
          ))}
        </div>

        {/* Starter accordion — só aparece em modo Business (não MEI) */}
        {isBusiness && (
          <div className={styles.starterWrap}>
            <div className={`${styles.starterCard} ${starterOpen ? styles.starterOpen : ""}`}>
              <button
                type="button"
                className={styles.starterHead}
                onClick={() => setStarterOpen((v) => !v)}
                aria-expanded={starterOpen}
              >
                <h3>
                  Procurando um plano mais simples <em>pra dar o primeiro passo?</em>
                </h3>
                <div className={styles.starterToggle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>
              <div className={styles.starterBody}>
                <div className={styles.starterInner}>
                  <div>
                    <p className={styles.starterName}>Starter</p>
                    <h4 className={styles.starterTitle}>Business Starter</h4>
                    <div className={styles.starterPrice}>
                      <span className={styles.starterCur}>R$</span>
                      <span className={styles.starterAmt}>298</span>
                      <span className={styles.starterPm}>/mês</span>
                    </div>
                    <p className={styles.starterDaily}>≈ <strong>R$ 10</strong>/dia</p>
                  </div>
                  <ul className={styles.starterFx}>
                    {["Contabilidade completa", "Conta PJ", "Aplicativo de gestão", "Atendimento WhatsApp"].map((t) => (
                      <li key={t}>
                        <CheckSm />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(waMessages.planStarter)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.starterBtn}
                  >
                    Fale com o Especialista
                    <Arr />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <p className={styles.foot}>
          {isMei
            ? "Limite anual do MEI: R$ 81.000 · Sem fidelidade · Migração grátis"
            : "Sem fidelidade · Sem multa · Migração gratuita"}
        </p>
      </div>
    </section>
  );
}

function MeiPlanCard({ plan, index }: { plan: MeiPlan; index: number }) {
  const r = useReveal<HTMLDivElement>();
  const delay = index === 1 ? "reveal-d1" : index === 2 ? "reveal-d2" : "";

  return (
    <div
      ref={r.ref}
      className={`${styles.plan} ${plan.featured ? styles.planFeat : ""} reveal ${delay} ${r.inView ? "in" : ""}`}
    >
      <p className={styles.planNm}>{plan.name}</p>
      <h3 className={styles.planT}>{plan.title}</h3>
      <p className={styles.planD}>{plan.description}</p>

      <div className={styles.priceWrap}>
        <div className={styles.price}>
          <span className={styles.currency}>R$</span>
          <span className={styles.amount}>{plan.price}</span>
          <span className={styles.month}>/mês</span>
        </div>
        <span className={styles.capFat}>{plan.capacityNote}</span>
        {plan.uniqueCopy ? (
          <p className={styles.daily}>
            Menos de <strong>R$ {plan.daily}</strong>/dia · só <strong>+R$ 0,67/dia</strong> vs Starter
          </p>
        ) : (
          <p className={styles.daily}>
            ≈ <strong>R$ {plan.daily}</strong>/dia, com tudo incluso
          </p>
        )}
      </div>

      <div className={styles.divider} />

      <ul className={styles.fx}>
        {plan.features.map((f, i) => (
          <li key={i} className={f.heading ? styles.fxHeading : ""}>
            <span className={styles.check}>
              <CheckSm />
            </span>
            <div className={styles.fxText}>
              {f.text}
              {f.tooltip && (
                <span className={styles.tooltip}>
                  <span className={styles.tooltipQ}>?</span>
                  <span className={styles.tooltipTip}>{f.tooltip}</span>
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <a
        href={waLink(plan.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
      >
        Fale com o Especialista
        <Arr />
      </a>
    </div>
  );
}

function CheckSm() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function Arr() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
