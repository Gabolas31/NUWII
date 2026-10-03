import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  FileText,
  Headphones,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";

import { Layout } from "@/components/shared/layout";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Typewriter, type TypewriterSegment } from "@/components/ui/typewriter";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReveal, waLink, waMessages } from "@/lib";
import styles from "./abertura-page.module.css";

/** Frases que se alternam no H1. Tom "b" destaca a palavra-chave. */
const HERO_PHRASES: TypewriterSegment[][] = [
  [{ text: "do jeito " }, { text: "certo", tone: "b" }, { text: "." }],
  [{ text: "no CNAE " }, { text: "correto", tone: "b" }, { text: "." }],
  [{ text: "sem " }, { text: "surpresa fiscal", tone: "b" }, { text: "." }],
];

/** O ciclo de abertura, do primeiro contato ao CNPJ na mão. */
const ETAPAS = [
  {
    id: 1,
    date: "Etapa 1",
    title: "Análise de viabilidade do CNPJ",
    description:
      "Conferimos nome, endereço, CNAE e regime tributário antes de protocolar. É aqui que se evita indeferimento na Junta.",
  },
  {
    id: 2,
    date: "Etapa 2",
    title: "Proposta comercial",
    description:
      "Você recebe o valor fechado da abertura, o plano contábil recomendado e a lista de taxas de órgão — tudo por escrito.",
  },
  {
    id: 3,
    date: "Etapa 3",
    title: "Assinatura de contrato",
    description:
      "Contrato contábil assinado digitalmente, junto com a procuração que nos autoriza a agir por você na Receita.",
  },
  {
    id: 4,
    date: "Etapa 4",
    title: "Coleta de documentação",
    description:
      "Mandamos a lista exata do que precisamos e conferimos tudo antes de protocolar. Você envia pelo WhatsApp.",
  },
  {
    id: 5,
    date: "Etapa 5",
    title: "Processo de abertura",
    description:
      "Junta Comercial, CNPJ na Receita, inscrições, alvará e liberação de nota fiscal. A gente acompanha cada protocolo.",
  },
  {
    id: 6,
    date: "Pronto",
    title: "CNPJ aberto",
    description:
      "Contrato social, cartão CNPJ e acessos organizados — com certificado digital e a primeira nota configurada.",
  },
];

/** O que entra na abertura, independente do caminho escolhido. */
const INCLUSO = [
  {
    t: "Consulta de viabilidade",
    s: "Nome, endereço e atividade checados na Junta Comercial e na prefeitura.",
  },
  {
    t: "Escolha do CNAE",
    s: "A atividade certa muda o imposto que você paga pelo resto da vida da empresa.",
  },
  {
    t: "Enquadramento tributário",
    s: "Simples, Presumido ou Real — comparado com número, não com achismo.",
  },
  {
    t: "Contrato social",
    s: "Elaboração e registro, com cláusulas de sócios revisadas por contador.",
  },
  {
    t: "Inscrições e alvará",
    s: "Municipal, estadual quando a atividade exige, e liberação de nota fiscal.",
  },
  {
    t: "Certificado digital",
    s: "e-CNPJ A1 emitido e instalado, pra você já começar a emitir nota.",
  },
];

/** Os dois caminhos de preço. */
const CAMINHOS = [
  {
    id: "avulso",
    tag: "Sem plano NUWII",
    title: "Abra sua empresa sozinho",
    who: "Para quem já tem contador ou vai cuidar da contabilidade por conta própria.",
    priceLabel: "",
    price: "1.200,00",
    priceNote: "Pagamento único · Taxas de órgão à parte",
    features: [
      "Abertura completa da empresa",
      "Contrato social elaborado e registrado",
      "CNPJ, inscrições e alvará",
      "Certificado digital e-CNPJ A1 incluso",
      "Documentação organizada e pronta para uso",
    ],
    message: waMessages.openCompanyAvulso,
    featured: false,
  },
  {
    id: "plano",
    tag: "Plano completo para o seu negócio",
    title: "Abra sua empresa",
    titleHighlight: "+ já tenha contador",
    who: "Comece com tudo resolvido e conte com um contador responsável desde o primeiro dia.",
    priceLabel: "Taxa de abertura a partir de",
    price: "350,00",
    priceNote: "+ mensalidade do plano escolhido",
    features: [
      "Tudo da abertura avulsa",
      "Contador responsável desde o primeiro dia",
      "Obrigações fiscais e contábeis em dia",
      "Revisão anual do regime tributário",
      "Acompanhamento mensal do seu negócio",
      "Atendimento direto pelo WhatsApp",
      "Sua empresa já começa com a contabilidade organizada",
    ],
    cta: "Quero abrir com a NUWII",
    message: waMessages.openCompanyPlano,
    featured: true,
  },
];

/** Os quatro ganhos listados no rodapé da seção de valores. */
const GANHOS = [
  {
    Icon: ShieldCheck,
    t: "Segurança jurídica",
    s: "Tudo dentro da lei e com suporte especializado.",
  },
  {
    Icon: Clock,
    t: "Economia de tempo",
    s: "Evite retrabalho e burocracias desnecessárias.",
  },
  {
    Icon: Headphones,
    t: "Suporte contínuo",
    s: "Atendimento direto pelo WhatsApp, sempre que precisar.",
  },
  {
    Icon: TrendingUp,
    t: "Seu negócio no caminho certo",
    s: "Com a contabilidade em dia, você foca no que realmente importa: o crescimento.",
  },
];

const FAQ = [
  {
    q: "Por que a NUWII não faz abertura grátis?",
    a: "Porque abertura grátis é abertura cobrada na mensalidade — e normalmente vem com fidelidade, multa de cancelamento ou um plano mais caro. Aqui o valor da abertura é separado e o da mensalidade também, então você compara o que está pagando por cada coisa.",
  },
  {
    q: "Quanto tempo leva pra abrir a empresa?",
    a: "Depende da Junta Comercial do estado, da prefeitura do município e da atividade: algumas liberam em poucos dias, outras exigem vistoria ou licença específica. Na etapa de viabilidade a gente te dá o prazo estimado do seu caso antes de você decidir.",
  },
  {
    q: "As taxas dos órgãos estão incluídas no valor?",
    a: "Não. DARE da Junta Comercial, taxas municipais e eventuais licenças são pagas aos órgãos e variam por estado e atividade. Elas entram discriminadas na proposta comercial, pra você saber o custo total antes de assinar.",
  },
  {
    q: "Já tenho CNPJ. Dá pra migrar em vez de abrir?",
    a: "Dá, e a migração de contabilidade não tem custo de abertura. A gente pede a procuração, levanta pendências do CNPJ e assume as obrigações a partir do mês acordado.",
  },
  {
    q: "E se a viabilidade der negativa?",
    a: "A gente volta pra você com o motivo e as alternativas — outro endereço, outro CNAE, outra natureza jurídica — antes de qualquer cobrança de abertura. Você só segue se fizer sentido.",
  },
];

export function AberturaPage() {
  const heroReveal = useReveal();
  const cicloReveal = useReveal();
  const inclusoReveal = useReveal();
  const precoReveal = useReveal();
  const faqReveal = useReveal();
  const ctaReveal = useReveal();

  const isWide = useMediaQuery("(min-width: 1080px)");

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
            <Link className={styles.crumb} href="/servicos">
              Serviços
            </Link>
            <span aria-hidden="true">/</span>
            <span className={styles.crumbCurrent}>Abertura de Empresa</span>
          </nav>

          <div
            className={`${styles.heroInner} ${heroReveal.inView ? styles.in : ""}`}
            ref={heroReveal.ref}
          >
            <div>
              <span className={styles.eyebrow}>Abertura de empresa</span>
              <h1 className={styles.title}>
                Abra sua empresa{" "}
                <Typewriter className={styles.typed} phrases={HERO_PHRASES} />
              </h1>
              <p className={styles.subtitle}>
                Abertura de CNPJ conduzida por contador, da análise de
                viabilidade à primeira nota fiscal emitida. Você acompanha cada
                etapa e sabe o custo total antes de assinar qualquer coisa.
              </p>

              <div className={styles.priceLine}>
                <span className={styles.priceLabel}>A partir de</span>
                <span className={styles.priceValue}>R$ 350,00</span>
                <span className={styles.priceHint}>com plano NUWII</span>
              </div>

              <div className={styles.heroCtas}>
                <a className={styles.btnPrimary} href="#valores">
                  Ver os valores
                  <ArrowDown />
                </a>
                <a className={styles.btnGhost} href="#ciclo">
                  Como funciona o processo
                </a>
              </div>

              <ul className={styles.trust}>
                {[
                  "Viabilidade antes da proposta",
                  "Custo fechado por escrito",
                  "Certificado digital incluso",
                ].map((t) => (
                  <li key={t}>
                    <Check />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <aside aria-label="Resumo dos valores" className={styles.heroCard}>
              <div className={styles.heroCardHead}>
                <span>Taxa de abertura</span>
                <span className={styles.heroCardTag}>Pagamento único</span>
              </div>
              <ul className={styles.heroCardList}>
                {CAMINHOS.map((c) => (
                  <li key={c.id}>
                    <span className={styles.heroCardName}>
                      <strong>{c.tag}</strong>
                      <small>{c.title}</small>
                    </span>
                    <span className={styles.heroCardPrice}>R$ {c.price}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.heroCardFoot}>
                As taxas dos órgãos (Junta Comercial, prefeitura) são pagas à
                parte e entram discriminadas na proposta.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* CICLO / TIMELINE */}
      <section className={styles.ciclo} id="ciclo">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              Da viabilidade ao <em>CNPJ aberto.</em>
            </h2>
            <p className={styles.h2sub}>
              Seis etapas, nessa ordem. Você sabe sempre em qual delas o seu
              processo está.
            </p>
          </div>

          <div
            className={`${styles.cicloBox} ${cicloReveal.inView ? styles.in : ""}`}
            ref={cicloReveal.ref}
          >
            <Timeline
              className={styles.timeline}
              defaultValue={ETAPAS.length}
              orientation={isWide ? "horizontal" : "vertical"}
            >
              {ETAPAS.map((etapa) => (
                <TimelineItem key={etapa.id} step={etapa.id}>
                  <TimelineHeader>
                    <TimelineSeparator />
                    <TimelineIndicator />
                    <TimelineDate>{etapa.date}</TimelineDate>
                    <TimelineTitle>{etapa.title}</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>{etapa.description}</TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </div>
      </section>

      {/* O QUE ESTÁ INCLUSO */}
      <section className={styles.incluso}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              O que entra <em>na abertura.</em>
            </h2>
          </div>
          <div
            className={`${styles.inclusoGrid} ${inclusoReveal.inView ? styles.in : ""}`}
            ref={inclusoReveal.ref}
          >
            {INCLUSO.map((item) => (
              <div className={styles.inclusoItem} key={item.t}>
                <span className={styles.inclusoIcon}>
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

      {/* VALORES */}
      <section className={styles.preco} id="valores">
        <div className={styles.wrap}>
          <div className={styles.precoHead}>
            <span className={styles.precoEyebrow}>Abertura de empresa</span>
            <h2 className={styles.precoH2}>
              Você pode abrir sua empresa de dois jeitos.{" "}
              <em>
                Mas só em um deles você já começa com a contabilidade resolvida.
              </em>
            </h2>
            <p className={styles.precoSub}>
              A abertura <strong>avulsa</strong> resolve o nascimento da sua
              empresa.
              <br />O Plano NUWII cuida do que acontece <strong>depois</strong>.
            </p>
          </div>

          <div
            className={`${styles.precoGrid} ${precoReveal.inView ? styles.in : ""}`}
            ref={precoReveal.ref}
          >
            {CAMINHOS.map((c) => (
              <article
                className={`${styles.precoCard} ${c.featured ? styles.precoCardFeat : ""}`}
                key={c.id}
              >
                <div className={styles.precoCardHead}>
                  {c.featured ? (
                    <>
                      <span className={styles.precoBadge}>
                        <Star aria-hidden="true" />
                        Mais escolhido
                      </span>
                      <span className={styles.precoBrand}>
                        <b>NUWII</b>
                        <i>
                          Plano completo
                          <br />
                          para o seu negócio
                        </i>
                      </span>
                    </>
                  ) : (
                    <span className={styles.precoTag}>{c.tag}</span>
                  )}
                </div>

                <h3 className={styles.precoTitle}>
                  {c.title}
                  {c.titleHighlight && (
                    <>
                      {" "}
                      <em>{c.titleHighlight}</em>
                    </>
                  )}
                </h3>
                <p className={styles.precoWho}>{c.who}</p>

                {c.priceLabel && (
                  <span className={styles.precoValueLabel}>{c.priceLabel}</span>
                )}
                <div className={styles.precoValue}>
                  <span>R$</span>
                  <strong>{c.price}</strong>
                </div>
                <p className={styles.precoNote}>{c.priceNote}</p>

                <ul className={styles.precoFeats}>
                  {c.features.map((f) => (
                    <li key={f}>
                      <span className={styles.precoCheck}>
                        <Check />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {c.featured ? (
                  <a
                    className={`${styles.precoCta} ${styles.precoCtaFeat}`}
                    href={waLink(c.message)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Whatsapp />
                    {c.cta}
                    <Arrow />
                  </a>
                ) : (
                  <a
                    className={styles.precoAside}
                    href={waLink(c.message)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FileText aria-hidden="true" />
                    <span>
                      <strong>Você resolve a abertura.</strong>
                      <small>Depois precisa contratar a contabilidade.</small>
                    </span>
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className={styles.whyBand}>
            <div className={styles.whyLeft}>
              <Target aria-hidden="true" />
              <p>
                Por que pagar a abertura e depois contratar um contador,{" "}
                <em>se você pode começar com tudo junto?</em>
              </p>
            </div>
            <p className={styles.whyRight}>
              Mais praticidade, menos burocracia, mais economia e segurança para
              o seu negócio.
            </p>
          </div>

          <div className={styles.ganhos}>
            {GANHOS.map(({ Icon, t, s }) => (
              <div className={styles.ganho} key={t}>
                <span className={styles.ganhoIcon}>
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <strong>{t}</strong>
                  <p>{s}</p>
                </div>
              </div>
            ))}
          </div>

          <p className={styles.precoFoot}>
            Já tem CNPJ e quer só trocar de contador?{" "}
            <Link href="/contabilidade-completa">
              A migração é sem custo de abertura.
            </Link>
          </p>
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
                Antes de abrir, <em>as dúvidas de sempre.</em>
              </h2>
              <p className={styles.h2sub}>
                Se a sua não estiver aqui, pergunta no WhatsApp — responde
                contador, não robô.
              </p>
              <a
                className={styles.btnGhost}
                href={waLink(waMessages.openCompanyDoubt)}
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
                Vamos começar pela <em>viabilidade?</em>
              </h3>
              <p>
                Conta o que você pretende fazer e onde. A gente checa se o CNPJ
                sai nesse endereço e volta com a proposta fechada.
              </p>
            </div>
            <div className={styles.finalCtaActions}>
              <a
                className={styles.finalCtaBtn}
                href={waLink(waMessages.openCompanyPlano)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Falar com um contador
                <Whatsapp />
              </a>
              <a className={styles.finalCtaGhost} href="#valores">
                <ArrowUp />
                Rever os valores
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

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
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
