import { useState } from "react";
import Link from "next/link";

import { Layout } from "@/components/shared/layout";
import { Pricing, type PricingPlan } from "@/components/ui/pricing";
import { Typewriter, type TypewriterSegment } from "@/components/ui/typewriter";
import { BUSINESS_PLANS, useReveal, waLink, waMessages } from "@/lib";
import styles from "./contabilidade-page.module.css";

/** Frases que se alternam no H1. Tom "b" destaca a palavra-chave. */
const HERO_PHRASES: TypewriterSegment[][] = [
  [{ text: "com contador " }, { text: "de verdade", tone: "b" }, { text: "." }],
  [{ text: "com imposto " }, { text: "no lugar certo", tone: "b" }, { text: "." }],
  [{ text: "sem " }, { text: "susto no fim do ano", tone: "b" }, { text: "." }],
];

/** BUSINESS_PLANS no formato do bloco de pricing. */
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

/** A rotina mensal que a mensalidade cobre. */
const ROTINA = [
  {
    t: "Escrituração contábil",
    s: "Lançamentos, livros e demonstrações em dia, do jeito que o Fisco e o banco pedem.",
  },
  {
    t: "Apuração de impostos",
    s: "Cálculo e guias de DAS, ISS, ICMS, PIS, COFINS e IRPJ — com prazo avisado antes de vencer.",
  },
  {
    t: "Obrigações acessórias",
    s: "DCTF, EFD, DEFIS, SPED e o resto da sopa de letrinhas enviada no prazo.",
  },
  {
    t: "Folha e pró-labore",
    s: "Pró-labore, folha de funcionários, férias, 13º e eSocial conforme o plano.",
  },
  {
    t: "Nota fiscal",
    s: "Liberação, configuração e apoio na emissão — e conferência do que foi emitido.",
  },
  {
    t: "Certidões e regularidade",
    s: "Acompanhamento de pendências pra sua empresa não travar numa licitação ou num crédito.",
  },
];

/** Por que a contabilidade completa não é só "entregar guia". */
const DIFERENCIAIS = [
  {
    t: "Revisão de regime todo ano",
    s: "Simples, Presumido ou Real: a gente simula e mostra o número antes de você decidir. Empresa que cresce costuma pagar imposto demais por inércia.",
  },
  {
    t: "Contador com nome e telefone",
    s: "Você fala com a mesma pessoa, no WhatsApp, sem chatbot e sem fila de ticket. Quem responde entende o seu CNAE.",
  },
  {
    t: "Painel com a empresa inteira",
    s: "Faturamento, impostos, documentos e certidões num lugar só — sem precisar pedir arquivo por e-mail.",
  },
  {
    t: "Sem cobrança por fora",
    s: "Nota fiscal, declaração e consultoria entram na mensalidade. Sem taxa de adesão e sem fidelidade.",
  },
];

const FAQ = [
  {
    q: "Já tenho contador. Como funciona a migração?",
    a: "A migração não tem custo. A gente pede uma procuração eletrônica, levanta a situação do CNPJ na Receita e nos órgãos, identifica pendências e combina o mês de virada com o seu contador atual. Você não precisa ter conversa difícil com ninguém.",
  },
  {
    q: "Qual plano é o meu?",
    a: "O corte principal é faturamento e estrutura: Start até cerca de R$ 20 mil/mês, Unique até cerca de R$ 60 mil/mês, Plus para quem tem sócios, funcionários e movimento alto. Na conversa a gente confere o seu caso antes de fechar.",
  },
  {
    q: "Por que Serviço e Comércio têm preços diferentes?",
    a: "Comércio tem mais obrigação acessória: controle de estoque, ICMS, substituição tributária e um volume maior de notas de entrada. Dá mais trabalho mensal, por isso o valor é diferente.",
  },
  {
    q: "Tem fidelidade ou multa pra cancelar?",
    a: "Não. Você cancela quando quiser e a gente devolve seus documentos e a procuração. Sem multa e sem taxa de saída.",
  },
  {
    q: "Abertura de empresa está inclusa?",
    a: "A abertura é cobrada à parte, com valor reduzido para quem contrata um plano. O passo a passo e os dois valores estão na página de abertura de empresa.",
  },
];

export function ContabilidadePage() {
  const heroReveal = useReveal();
  const rotinaReveal = useReveal();
  const difReveal = useReveal();
  const faqReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <Layout>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link className={styles.crumb} href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className={styles.crumbCurrent}>Contabilidade Completa</span>
          </nav>

          <div
            className={`${styles.heroInner} ${heroReveal.inView ? styles.in : ""}`}
            ref={heroReveal.ref}
          >
            <div>
              <span className={styles.eyebrow}>Contabilidade completa</span>
              <h1 className={styles.title}>
                Sua empresa em dia{" "}
                <Typewriter className={styles.typed} phrases={HERO_PHRASES} />
              </h1>
              <p className={styles.subtitle}>
                Escrituração, impostos, obrigações, folha e nota fiscal — tudo
                conduzido pelo mesmo contador, com mensalidade fixa e sem
                cobrança por fora.
              </p>

              <div className={styles.priceLine}>
                <span className={styles.priceLabel}>A partir de</span>
                <span className={styles.priceValue}>R$ 397</span>
                <span className={styles.priceHint}>/mês</span>
              </div>

              <div className={styles.heroCtas}>
                <a className={styles.btnPrimary} href="#planos">
                  Ver os planos
                  <ArrowDown />
                </a>
                <a
                  className={styles.btnGhost}
                  href={waLink(waMessages.accountingComplete)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Falar com um contador
                </a>
              </div>

              <ul className={styles.trust}>
                {[
                  "Sem taxa de adesão",
                  "Sem fidelidade",
                  "Migração de contador grátis",
                ].map((t) => (
                  <li key={t}>
                    <Check />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <aside aria-label="O que está incluso" className={styles.heroCard}>
              <div className={styles.heroCardHead}>
                <span>Na mensalidade</span>
                <span className={styles.heroCardTag}>Tudo incluso</span>
              </div>
              <ul className={styles.heroCardList}>
                {[
                  "Escrituração e demonstrações contábeis",
                  "Apuração de impostos e guias",
                  "Obrigações mensais e anuais",
                  "Emissão e conferência de notas",
                  "Atendimento direto com contador",
                ].map((t) => (
                  <li key={t}>
                    <span className={styles.heroCardCheck}>
                      <Check />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className={styles.heroCardFoot}>
                Pró-labore, folha e consultoria variam conforme o plano
                escolhido.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ROTINA MENSAL */}
      <section className={styles.rotina}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              O que acontece <em>todo mês.</em>
            </h2>
            <p className={styles.h2sub}>
              Contabilidade completa não é só entregar guia no fim do mês — é
              manter a empresa regular o mês inteiro.
            </p>
          </div>

          <div
            className={`${styles.rotinaGrid} ${rotinaReveal.inView ? styles.in : ""}`}
            ref={rotinaReveal.ref}
          >
            {ROTINA.map((item) => (
              <div className={styles.rotinaItem} key={item.t}>
                <span className={styles.rotinaIcon}>
                  <Check />
                </span>
                <div>
                  <strong>{item.t}</strong>
                  <p>{item.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className={styles.dif}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              O que muda com a <em>NUWII.</em>
            </h2>
          </div>
          <div
            className={`${styles.difGrid} ${difReveal.inView ? styles.in : ""}`}
            ref={difReveal.ref}
          >
            {DIFERENCIAIS.map((d, i) => (
              <article className={styles.difCard} key={d.t}>
                <span className={styles.difNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{d.t}</h3>
                <p>{d.s}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section className={styles.planos} id="planos">
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>
            Mensalidade fixa. <em>Cancele quando quiser.</em>
          </h2>
          <p className={styles.h2sub}>
            Escolha se a sua empresa vende serviço ou produto — o valor muda
            porque o trabalho mensal muda.
          </p>
        </div>

        <Pricing
          altLabel="Comércio"
          hint="Vende hora de trabalho, consultoria ou projeto? É Serviço. Vende produto, revende ou tem estoque? É Comércio."
          plans={PRICING_PLANS}
          primaryLabel="Serviço"
          title=""
        />

        <div className={styles.wrap}>
          <p className={styles.planosFoot}>
            Precisa de algo mais enxuto pra começar? O <strong>Business
            Starter</strong> sai por R$ 298/mês.{" "}
            <a
              href={waLink(waMessages.planStarter)}
              rel="noopener noreferrer"
              target="_blank"
            >
              Falar sobre o Starter
            </a>{" "}
            · É MEI? <Link href="/planos/mei">Veja os planos de MEI</Link>
          </p>
        </div>
      </section>

      {/* MIGRAÇÃO */}
      <section className={styles.migra}>
        <div className={styles.wrap}>
          <div className={styles.migraBox}>
            <div>
              <span className={styles.migraTag}>Já tem contador?</span>
              <h3 className={styles.migraTitle}>
                A migração é <em>sem custo e sem conversa difícil.</em>
              </h3>
              <p className={styles.migraText}>
                A gente levanta a situação do seu CNPJ, identifica pendências e
                combina o mês de virada. Você não precisa pedir nada ao contador
                atual — a procuração eletrônica resolve.
              </p>
            </div>
            <a
              className={styles.migraCta}
              href={waLink(waMessages.changeAccountant)}
              rel="noopener noreferrer"
              target="_blank"
            >
              Quero migrar pra NUWII
              <Whatsapp />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.wrap}>
          <div
            className={`${styles.faqGrid} ${faqReveal.inView ? styles.in : ""}`}
            ref={faqReveal.ref}
          >
            <div className={styles.faqAside}>
              <h2 className={styles.h2}>
                Antes de contratar, <em>as dúvidas de sempre.</em>
              </h2>
              <p className={styles.h2sub}>
                Se a sua não estiver aqui, pergunta no WhatsApp — responde
                contador, não robô.
              </p>
              <a
                className={styles.btnGhost}
                href={waLink(waMessages.accountingComplete)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Perguntar no WhatsApp
              </a>
            </div>
            <div className={styles.faqList}>
              {FAQ.map((item) => (
                <FaqItem a={item.a} key={item.q} q={item.q} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.finalCta}>
        <div className={styles.wrap}>
          <div
            className={`${styles.finalCtaInner} ${ctaReveal.inView ? styles.in : ""}`}
            ref={ctaReveal.ref}
          >
            <div className={styles.finalCtaText}>
              <h3>
                Quer saber qual plano <em>é o seu?</em>
              </h3>
              <p>
                Conta o faturamento médio e o que a sua empresa faz. A gente
                volta com o plano certo e o valor fechado, sem enrolação.
              </p>
            </div>
            <div className={styles.finalCtaActions}>
              <a
                className={styles.finalCtaBtn}
                href={waLink(waMessages.accountingComplete)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Falar com um contador
                <Whatsapp />
              </a>
              <a className={styles.finalCtaGhost} href="#planos">
                <ArrowUp />
                Rever os planos
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`}>
      <button
        aria-expanded={open}
        className={styles.faqQ}
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {q}
        <span className={styles.faqChev}>
          <svg
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {open && <p className={styles.faqA}>{a}</p>}
    </div>
  );
}

function Check() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      viewBox="0 0 24 24"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function Whatsapp() {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.9-.92 1.09-.15.2-.3.22-.6.07-.3-.15-1.13-.42-2.15-1.33-.8-.71-1.34-1.59-1.49-1.89-.15-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.35 2.47.97 2.97.78 3.51.73.54-.05 1.75-.71 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm5.13-4.87A7.94 7.94 0 0 0 20 12a8 8 0 1 0-8 8 7.9 7.9 0 0 0 4.02-1.1l2.75.75-.74-2.72z" />
    </svg>
  );
}
