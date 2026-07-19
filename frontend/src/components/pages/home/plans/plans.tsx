import { useState } from "react";
import Link from "next/link";
import { waLink, waMessages, MEI_PLANS } from "@/lib";
import type { MeiPlan } from "@/lib";
import { useReveal } from "@/lib/hooks/useReveal";
import styles from "./plans.module.css";

type PlanType = "servico" | "comercio" | "mei";

// ============================================================
// BUSINESS PLANS (Serviço / Comércio)
// ============================================================
type BusinessPlan = {
  name: string;
  title: string;
  description: string;
  priceServico: number;
  priceComercio: number;
  dailyServico: number;
  dailyComercio: number;
  capacityNote: string;
  features: { text: string; tooltip?: string; heading?: boolean }[];
  featured?: boolean;
  uniqueCopy?: boolean;
  whatsappMessage: string;
};

const BUSINESS_PLANS: BusinessPlan[] = [
  {
    name: "Start",
    title: "Business Start",
    description: "Pra empresa que fatura até R$ 20 mil/mês e quer o essencial bem feito.",
    priceServico: 397,
    priceComercio: 497,
    dailyServico: 13,
    dailyComercio: 17,
    capacityNote: "Faturamento ideal até R$ 20.000",
    features: [
      { text: "Contabilidade completa" },
      { text: "Conta Digital PJ + Maquininha de cartão" },
      {
        text: "Certificado digital A1 incluso",
        tooltip:
          "Certificado digital (e-CNPJ A1) é sua identidade eletrônica — usada para assinar documentos e acessar sistemas com validade jurídica.",
      },
      { text: "Painel contábil completo" },
      { text: "Atendimento WhatsApp, telefone, e-mail e chat" },
    ],
    whatsappMessage: waMessages.planStart,
  },
  {
    name: "Unique",
    title: "Business Unique",
    description: "Pra empresa crescendo: consultoria, conciliação e gestão de certidões.",
    priceServico: 497,
    priceComercio: 597,
    dailyServico: 17,
    dailyComercio: 20,
    capacityNote: "Faturamento ideal até R$ 60.000",
    featured: true,
    uniqueCopy: true,
    features: [
      { text: "Tudo do Start, mais:", heading: true },
      { text: "Consultoria contábil com Contador" },
      {
        text: "Conciliação financeira automática",
        tooltip:
          "Cruzamento automático entre seus lançamentos e o extrato bancário, identificando divergências.",
      },
      { text: "Importação de extrato: até 2 contas" },
      { text: "Pró-labore: 1 folha" },
      { text: "Gestão de certidões" },
    ],
    whatsappMessage: waMessages.planUnique,
  },
  {
    name: "Plus",
    title: "Business Plus",
    description: "Pra empresa com sócios, funcionários e movimento mensal alto.",
    priceServico: 856,
    priceComercio: 997,
    dailyServico: 29,
    dailyComercio: 33,
    capacityNote: "Operação avançada · atendimento prioritário",
    features: [
      { text: "Tudo do Unique, mais:", heading: true },
      { text: "Pró-labore: 2 folhas + até 3 funcionários" },
      { text: "Emissão de até 10 NFs de serviço" },
      { text: "Abertura ou alteração contratual incluída" },
      { text: "Gestão de parcelamentos e acordos" },
      { text: "Apoio contábil pra preenchimento de documentos" },
      {
        text: "Serviços prioritários",
        tooltip:
          "Atendimento WhatsApp até 22h e demandas executadas com prazo reduzido.",
      },
      { text: "Importação de extrato: até 3 contas" },
      { text: "Balanço e DRE" },
    ],
    whatsappMessage: waMessages.planPlus,
  },
];


export function Plans() {
  const [type, setType] = useState<PlanType>("servico");
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
                className={type === "servico" ? styles.toggleOn : ""}
                onClick={() => setType("servico")}
              >
                Serviço
              </button>
              <button
                className={type === "comercio" ? styles.toggleOn : ""}
                onClick={() => setType("comercio")}
              >
                Comércio
              </button>
              <button
                className={type === "mei" ? styles.toggleOn : ""}
                onClick={() => setType("mei")}
              >
                MEI
              </button>
            </div>
          </div>
        </div>

        {isBusiness && (
          <div className={styles.grid}>
            {BUSINESS_PLANS.map((plan, i) => (
              <BusinessPlanCard key={plan.name} plan={plan} type={type as "servico" | "comercio"} index={i} />
            ))}
          </div>
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
                "Abertura de empresa grátis",
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
                    Falar com Corujão
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

// ============================================================
// CARDS
// ============================================================
function BusinessPlanCard({
  plan,
  type,
  index,
}: {
  plan: BusinessPlan;
  type: "servico" | "comercio";
  index: number;
}) {
  const r = useReveal<HTMLDivElement>();
  const price = type === "servico" ? plan.priceServico : plan.priceComercio;
  const daily = type === "servico" ? plan.dailyServico : plan.dailyComercio;
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
          <span className={styles.amount}>{price}</span>
          <span className={styles.month}>/mês</span>
        </div>
        <span className={styles.capFat}>{plan.capacityNote}</span>
        {plan.uniqueCopy ? (
          <p className={styles.daily}>
            Menos de <strong>R$ {daily}</strong>/dia · só <strong>+R$ 3,33/dia</strong> vs Start
          </p>
        ) : (
          <p className={styles.daily}>
            ≈ <strong>R$ {daily}</strong>/dia, com tudo incluso
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
        Falar com Corujão
        <Arr />
      </a>
    </div>
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
        Falar com Corujão
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
