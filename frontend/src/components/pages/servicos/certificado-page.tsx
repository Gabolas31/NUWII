import { useState } from "react";
import Link from "next/link";

import { Layout } from "@/components/shared/layout";
import { Typewriter, type TypewriterSegment } from "@/components/ui/typewriter";
import { useReveal, waLink, waMessages } from "@/lib";
import styles from "./certificado-page.module.css";

/** Frases que se alternam no H1. Tom "b" destaca a palavra-chave. */
const HERO_PHRASES: TypewriterSegment[][] = [
  [{ text: "emitido " }, { text: "hoje", tone: "b" }, { text: "." }],
  [{ text: "sem sair de " }, { text: "casa", tone: "b" }, { text: "." }],
  [{ text: "com " }, { text: "validade jurídica", tone: "b" }, { text: "." }],
];

/** Os dois certificados vendidos, com a mensagem de compra de cada um. */
const CERTIFICADOS = [
  {
    id: "e-CPF",
    title: "e-CPF A1",
    who: "Para você, pessoa física",
    price: "149,00",
    features: [
      "Assinatura de documentos com validade jurídica",
      "Acesso ao e-CAC da Receita Federal",
      "Declaração de Imposto de Renda e retificações",
      "Assinatura de contratos sem cartório",
    ],
    cta: "Comprar e-CPF",
    message: waMessages.certificateCpf,
    featured: false,
  },
  {
    id: "e-CNPJ",
    title: "e-CNPJ A1",
    who: "Para a sua empresa",
    price: "199,00",
    features: [
      "Emissão de nota fiscal eletrônica",
      "Acesso ao e-CAC e ao Conectividade Social",
      "Procuração eletrônica para o seu contador",
      "Assinatura em nome da empresa, com validade jurídica",
    ],
    cta: "Comprar e-CNPJ",
    message: waMessages.certificateCnpj,
    featured: true,
  },
];

const PASSOS = [
  {
    when: "Hoje",
    title: "Você escolhe e fala no WhatsApp",
    text: "Diz se precisa do e-CPF ou do e-CNPJ. A gente confirma o valor, envia o link de pagamento e agenda a videochamada no horário que der pra você.",
  },
  {
    when: "Cerca de 10 minutos",
    title: "Videochamada de validação",
    text: "Um agente de registro credenciado pela ICP-Brasil confere seus documentos ao vivo. É a etapa exigida por lei — e a única em que você precisa estar presente.",
  },
  {
    when: "Mesmo dia útil",
    title: "Certificado liberado",
    text: "Você recebe o arquivo e a senha, e a gente acompanha a instalação no computador ou no celular até o primeiro uso funcionar.",
  },
];

const USOS = [
  { t: "Emitir nota fiscal", s: "Obrigatório em boa parte dos municípios e estados." },
  { t: "Acessar o e-CAC", s: "Consultar pendências, parcelar débitos, emitir certidões." },
  { t: "Assinar contratos", s: "Mesma validade jurídica de assinatura em papel." },
  { t: "Declarar o IR", s: "Acesso a rascunhos e retificações de anos anteriores." },
  { t: "Conectividade Social", s: "Envio de informações trabalhistas à Caixa." },
  { t: "Dar procuração", s: "Autorizar seu contador a agir por você na Receita." },
];

const FAQ = [
  {
    q: "Qual a diferença entre A1 e A3?",
    a: "O A1 é um arquivo instalado no seu computador ou celular e vale 1 ano. O A3 vem em cartão ou token físico e vale de 1 a 3 anos, mas exige leitora e custa mais. Trabalhamos com o A1, que é o que atende a maioria dos casos — emissão de nota, e-CAC, assinatura de documentos.",
  },
  {
    q: "O que preciso ter em mãos na videochamada?",
    a: "Documento oficial com foto (RG, CNH ou passaporte) e o CPF. Para o e-CNPJ, também o contrato social ou o requerimento de empresário, e o representante legal precisa ser quem aparece na chamada.",
  },
  {
    q: "Quanto tempo leva de verdade?",
    a: "A videochamada dura cerca de 10 minutos e o arquivo é liberado no mesmo dia útil, desde que a documentação esteja correta. Se agendar no fim do dia, sai no dia seguinte.",
  },
  {
    q: "Já sou cliente da NUWII. Preciso comprar?",
    a: "Se você tem um plano Business, o e-CNPJ A1 já está incluso na mensalidade — fala com a gente antes de comprar. O e-CPF, por ser pessoal, é contratado à parte.",
  },
  {
    q: "E se eu perder o arquivo do certificado?",
    a: "O A1 não pode ser reemitido: é preciso comprar um novo. Por isso a gente orienta a fazer uma cópia de segurança no momento da instalação e guardar a senha em lugar seguro.",
  },
];

export function CertificadoPage() {
  const heroReveal = useReveal();
  const cardsReveal = useReveal();
  const stepsReveal = useReveal();
  const usosReveal = useReveal();
  const faqReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <Layout>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link className={styles.crumb} href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link className={styles.crumb} href="/servicos">
              Serviços
            </Link>
            <span aria-hidden="true">/</span>
            <span className={styles.crumbCurrent}>Certificado Digital</span>
          </nav>

          <div
            ref={heroReveal.ref}
            className={`${styles.heroInner} ${heroReveal.inView ? styles.in : ""}`}
          >
            <div>
              <span className={styles.eyebrow}>Certificado digital · ICP-Brasil</span>
              <h1 className={styles.title}>
                Seu certificado digital{" "}
                <Typewriter className={styles.typed} phrases={HERO_PHRASES} />
              </h1>
              <p className={styles.subtitle}>
                É o certificado que libera a emissão de nota fiscal, o acesso ao
                e-CAC e a assinatura de contratos com validade jurídica. Sem ir a
                posto de atendimento, sem cartório e sem fila.
              </p>

              <div className={styles.priceLine}>
                <span className={styles.priceLabel}>A partir de</span>
                <span className={styles.priceValue}>R$ 149,00</span>
              </div>

              <div className={styles.heroCtas}>
                <a
                  className={styles.btnPrimary}
                  href="#comprar"
                >
                  Comprar certificado
                  <ArrowDown />
                </a>
                <a
                  className={styles.btnGhost}
                  href={waLink(waMessages.certificateDoubt)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Tirar uma dúvida no WhatsApp
                </a>
              </div>

              <ul className={styles.trust}>
                {[
                  "Emissão no mesmo dia útil",
                  "100% online",
                  "Validade de 1 ano",
                ].map((t) => (
                  <li key={t}>
                    <Check />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <aside className={styles.heroCard} aria-label="Resumo dos valores">
              <div className={styles.heroCardHead}>
                <span>Certificado digital A1</span>
                <span className={styles.heroCardTag}>Pronto hoje</span>
              </div>
              <ul className={styles.heroCardList}>
                {CERTIFICADOS.map((c) => (
                  <li key={c.id}>
                    <span className={styles.heroCardName}>
                      <strong>{c.title}</strong>
                      <small>{c.who}</small>
                    </span>
                    <span className={styles.heroCardPrice}>R$ {c.price}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.heroCardFoot}>
                A emissão começa assim que o pagamento é confirmado.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* CARDS DE COMPRA */}
      <section className={styles.buy} id="comprar">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              Escolha o seu e <em>compre pelo WhatsApp.</em>
            </h2>
            <p className={styles.h2sub}>
              Você fala com uma pessoa, não com um formulário. A gente confirma o
              valor, manda o pagamento e agenda a validação.
            </p>
          </div>

          <div
            ref={cardsReveal.ref}
            className={`${styles.buyGrid} ${cardsReveal.inView ? styles.in : ""}`}
          >
            {CERTIFICADOS.map((c) => (
              <article
                className={`${styles.buyCard} ${c.featured ? styles.buyCardFeat : ""}`}
                key={c.id}
              >
                {c.featured && <span className={styles.buyBadge}>Mais pedido</span>}
                <span className={styles.buyWho}>{c.who}</span>
                <h3 className={styles.buyTitle}>{c.title}</h3>

                <div className={styles.buyPrice}>
                  <span>R$</span>
                  <strong>{c.price}</strong>
                </div>
                <p className={styles.buyPriceNote}>
                  Pagamento único · validade de 1 ano
                </p>

                <ul className={styles.buyFeats}>
                  {c.features.map((f) => (
                    <li key={f}>
                      <span className={styles.buyCheck}>
                        <Check />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  className={`${styles.buyCta} ${c.featured ? styles.buyCtaFeat : ""}`}
                  href={waLink(c.message)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {c.cta}
                  <Whatsapp />
                </a>
              </article>
            ))}
          </div>

          <p className={styles.buyFoot}>
            Cliente dos planos Business? O <strong>e-CNPJ A1 já está incluso</strong>{" "}
            na sua mensalidade — fala com a gente antes de comprar.
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className={styles.steps}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              Do WhatsApp ao arquivo instalado, <em>no mesmo dia.</em>
            </h2>
          </div>
          <div
            ref={stepsReveal.ref}
            className={`${styles.stepsGrid} ${stepsReveal.inView ? styles.in : ""}`}
          >
            {PASSOS.map((s, i) => (
              <div className={styles.step} key={s.title}>
                <span className={styles.stepNum}>{i + 1}</span>
                <span className={styles.stepWhen}>{s.when}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRA QUE SERVE */}
      <section className={styles.usos}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              O que o certificado <em>destrava.</em>
            </h2>
          </div>
          <div
            ref={usosReveal.ref}
            className={`${styles.usosGrid} ${usosReveal.inView ? styles.in : ""}`}
          >
            {USOS.map((u) => (
              <div className={styles.uso} key={u.t}>
                <span className={styles.usoIcon}>
                  <Check />
                </span>
                <div>
                  <strong>{u.t}</strong>
                  <p>{u.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.wrap}>
          <div
            ref={faqReveal.ref}
            className={`${styles.faqGrid} ${faqReveal.inView ? styles.in : ""}`}
          >
            <div className={styles.faqAside}>
              <h2 className={styles.h2}>
                Antes de comprar, <em>as dúvidas de sempre.</em>
              </h2>
              <p className={styles.h2sub}>
                Se a sua não estiver aqui, pergunta no WhatsApp — responde gente,
                não robô.
              </p>
              <a
                className={styles.btnGhost}
                href={waLink(waMessages.certificateDoubt)}
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

      {/* RENOVAÇÃO PARA CLIENTES */}
      <section className={styles.renew}>
        <div className={styles.wrap}>
          <div className={styles.renewBox}>
            <div>
              <span className={styles.renewTag}>Já é cliente NUWII?</span>
              <h3 className={styles.renewTitle}>
                Cliente do plano Business tem <em>desconto na renovação.</em>
              </h3>
              <p className={styles.renewText}>
                Quem tem plano Business com a gente paga menos para renovar o
                certificado a cada ano — e o e-CNPJ A1 do primeiro ano já vem
                incluso na mensalidade. Fala com a gente antes de comprar que a
                gente confere o seu caso.
              </p>
            </div>
            <a
              className={styles.renewCta}
              href={waLink(waMessages.certificateDoubt)}
              rel="noopener noreferrer"
              target="_blank"
            >
              Falar sobre a renovação
              <Whatsapp />
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.finalCta}>
        <div className={styles.wrap}>
          <div
            ref={ctaReveal.ref}
            className={`${styles.finalCtaInner} ${ctaReveal.inView ? styles.in : ""}`}
          >
            <div className={styles.finalCtaText}>
              <h3>
                Precisa do certificado <em>ainda hoje?</em>
              </h3>
              <p>
                Manda mensagem agora. Se a documentação estiver em ordem, a
                videochamada sai no mesmo dia e o arquivo também.
              </p>
            </div>
            <div className={styles.finalCtaActions}>
              <a
                className={styles.finalCtaBtn}
                href={waLink(waMessages.certificateCnpj)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Comprar pelo WhatsApp
                <Whatsapp />
              </a>
              <a className={styles.finalCtaGhost} href="#comprar">
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
