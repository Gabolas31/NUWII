import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/lib/hooks/useReveal";
import styles from "./features.module.css";

const MONTHS_LONG = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const MONTHS_SHORT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const DOWS = ["S", "T", "Q", "Q", "S", "S", "D"];

type WpMessage = {
  from: "them" | "me";
  text: string;
  time: string;
  typing: number;
};

const CONVERSATION: WpMessage[] = [
  { from: "them", text: "Oi Marcelo, é a Ana da NUWII 😊 Vi que você quer trocar de contador. Pode falar comigo!", time: "10:14", typing: 1500 },
  { from: "me", text: "Que rápido kkkk vai dar trabalho de migrar?", time: "10:15", typing: 900 },
  { from: "them", text: "Zero. A migração é regulada por lei e a gente faz tudo. Você só assina 2 documentos digitais.", time: "10:15", typing: 1700 },
  { from: "me", text: "Top, bora!", time: "10:16", typing: 700 },
];

export function Features() {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <SplitObligations />
        <SplitWhatsApp />
        <SplitCalendar />
      </div>
    </section>
  );
}

/* =========================
   SPLIT 01 — Obligations
   ========================= */
function SplitObligations() {
  const text = useReveal<HTMLDivElement>();
  const mock = useReveal<HTMLDivElement>();

  const items = [
    { t: "Guias de impostos", s: "DAS, IRPJ, CSLL, PIS, COFINS", st: "emitido" },
    { t: "Declarações", s: "DCTF, EFD-Contribuições", st: "entregue" },
    { t: "Relatórios contábeis", s: "DRE, Balanço Patrimonial", st: "pronto" },
    { t: "Obrigações acessórias", s: "SPED, DEFIS, ECF", st: "em dia" },
  ];

  return (
    <div className={styles.row}>
      <div ref={text.ref} className={`reveal ${text.inView ? "in" : ""}`}>
        <div className={styles.num}>01.</div>
        <h2 className={styles.h2}>
          A gente cuida de <em>tudo</em> com Receita, Estado e prefeitura.
        </h2>
        <p className={styles.p}>
          Calculamos suas guias, entregamos as declarações e cuidamos das
          obrigações acessórias. Tudo assinado por contador com CRC ativo. Se
          cair multa por erro nosso, a NUWII paga — tá escrito no contrato.
        </p>
        <a href="#plans" className={styles.link}>
          Ver tudo que está incluso <Arr />
        </a>
      </div>

      <div ref={mock.ref} className={`${styles.mock} reveal reveal-d1 ${mock.inView ? "in" : ""}`}>
        <div className={styles.mockHead}>
          <h4>Sua empresa · status do mês</h4>
          <span className={styles.tag}>100% em dia</span>
        </div>
        <ul className={styles.oblList}>
          {items.map((it, i) => (
            <li key={i}>
              <span className={styles.oblCheck}>
                <Check />
              </span>
              <div>
                <div className={styles.oblTitle}>{it.t}</div>
                <div className={styles.oblSub}>{it.s}</div>
              </div>
              <span className={styles.oblStatus}>{it.st}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* =========================
   SPLIT 02 — WhatsApp (Corujão avatar + typing effect)
   ========================= */
function SplitWhatsApp() {
  const text = useReveal<HTMLDivElement>();
  const mock = useReveal<HTMLDivElement>();
  const [messages, setMessages] = useState<WpMessage[]>([]);
  const [typing, setTyping] = useState<"them" | "me" | null>(null);
  const [status, setStatus] = useState("online agora");
  const idxRef = useRef(0);

  // Inicia a animação quando o mockup entra na viewport
  useEffect(() => {
    if (!mock.inView || idxRef.current > 0) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const step = () => {
      if (cancelled) return;
      const i = idxRef.current;
      if (i >= CONVERSATION.length) {
        setTyping(null);
        setStatus("online agora");
        return;
      }
      const msg = CONVERSATION[i];
      setTyping(msg.from);
      setStatus(msg.from === "them" ? "digitando…" : "online agora");

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setTyping(null);
        setMessages((prev) => [...prev, msg]);
        idxRef.current += 1;
        const wait = msg.from === "them" ? 700 : 500;
        timers.push(setTimeout(step, wait));
      }, msg.typing));
    };

    timers.push(setTimeout(step, 400));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [mock.inView]);

  return (
    <div className={styles.row}>
      <div ref={mock.ref} className={`${styles.mock} ${styles.wp} reveal ${mock.inView ? "in" : ""}`}>
        <div className={styles.wpHead}>
          <div className={styles.wpAvImg}>
            <img src="/corujao-avatar.png" alt="Corujão NUWII" />
          </div>
          <div className={styles.wpInfo}>
            <div className={styles.wpName}>
              NUWII Contabilidade · <span>Ana</span>
            </div>
            <div className={styles.wpStatus}>{status}</div>
          </div>
        </div>
        <div className={styles.wpConv}>
          {messages.map((m, i) => (
            <div key={i} className={`${styles.wpMsg} ${m.from === "me" ? styles.wpMe : ""}`}>
              {m.text}
              <div className={styles.wpTime}>{m.time}</div>
            </div>
          ))}
          {typing && (
            <div className={`${styles.wpTyping} ${typing === "me" ? styles.wpMe : ""}`}>
              <span className={styles.wpDots}>
                <span /><span /><span />
              </span>
            </div>
          )}
        </div>
      </div>

      <div ref={text.ref} className={`reveal reveal-d1 ${text.inView ? "in" : ""}`}>
        <div className={styles.num}>02.</div>
        <h2 className={styles.h2}>
          Contador <em>de verdade,</em> direto no WhatsApp.
        </h2>
        <p className={styles.p}>
          Você fala com o mesmo contador desde a abertura da empresa. Pelo
          WhatsApp, na hora. Sem precisar repetir tudo, sem chatbot, sem te
          jogar pra outra pessoa.
        </p>
        <a href="#plans" className={styles.link}>
          Como funciona a migração <Arr />
        </a>
      </div>
    </div>
  );
}

/* =========================
   SPLIT 03 — Calendar (dinâmico, sempre mês atual)
   ========================= */
function SplitCalendar() {
  const text = useReveal<HTMLDivElement>();
  const mock = useReveal<HTMLDivElement>();
  const [cal, setCal] = useState<{ title: string; cells: { d: number; today: boolean; muted: boolean; evt: boolean }[]; evt: string }>({ title: "", cells: [], evt: "" });

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const todayDate = now.getDate();

    const firstDay = new Date(year, month, 1);
    let offset = firstDay.getDay() - 1;
    if (offset < 0) offset = 6;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const cells: { d: number; today: boolean; muted: boolean; evt: boolean }[] = [];
    for (let i = offset - 1; i >= 0; i--) {
      cells.push({ d: daysInPrev - i, today: false, muted: true, evt: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        d,
        today: d === todayDate,
        muted: false,
        evt: d === 20 && d !== todayDate,
      });
    }
    const remaining = (Math.ceil(cells.length / 7) * 7) - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({ d: i, today: false, muted: true, evt: false });
    }

    const evtMonth = todayDate > 20 ? (month + 1) % 12 : month;

    setCal({
      title: `${MONTHS_LONG[month]} ${year}`,
      cells,
      evt: `20 ${MONTHS_SHORT[evtMonth]} · DAS – R$ 612,40`,
    });
  }, []);

  return (
    <div className={styles.row}>
      <div ref={text.ref} className={`reveal ${text.inView ? "in" : ""}`}>
        <div className={styles.num}>03.</div>
        <h2 className={styles.h2}>
          Nunca mais <em>esqueça um prazo.</em>
        </h2>
        <p className={styles.p}>
          Avisamos cada vencimento com antecedência — no app, no WhatsApp e no
          e-mail. E se algo passar batido por culpa nossa, a multa é por nossa
          conta.
        </p>
        <a href="#plans" className={styles.link}>
          Ler garantia em contrato <Arr />
        </a>
      </div>

      <div ref={mock.ref} className={`${styles.mock} reveal reveal-d1 ${mock.inView ? "in" : ""}`}>
        <div className={styles.calHead}>
          <h4>{cal.title}</h4>
          <div className={styles.calNav}>‹ Hoje ›</div>
        </div>
        <div className={styles.calGrid}>
          {DOWS.map((d, i) => (
            <div key={`dow-${i}`} className={styles.dow}>{d}</div>
          ))}
          {cal.cells.map((c, i) => {
            const cls = [styles.day];
            if (c.muted) cls.push(styles.dayMuted);
            if (c.today) cls.push(styles.dayToday);
            if (c.evt) cls.push(styles.dayEvt);
            return <div key={`day-${i}`} className={cls.join(" ")}>{c.d}</div>;
          })}
        </div>
        <div className={styles.calEvt}>
          <div className={styles.calEvtIcon}>!</div>
          <div className={styles.calEvtText}>
            <strong>{cal.evt}</strong>
            <span>Já calculamos. Boleto no app.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Helpers ===== */
function Arr() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
