import { useReveal } from "@/lib/hooks/useReveal";
import styles from "./reviews.module.css";

const REVIEWS = [
  { name: "Juliana M.", time: "há 2 semanas", text: "Ter uma equipe dedicada cuidando da minha empresa, sem precisar enfrentar filas. Recomendo de olhos fechados." },
  { name: "Nadja S.", time: "há 1 mês", text: "Sou cliente há 2 anos, comecei como MEI e hoje sou ME, com tudo perfeitamente organizado. Em 2 anos, zero burocracia pra mim." },
  { name: "André F.", time: "há 3 semanas", text: "Trabalho remoto pra startup no exterior e invoice sempre foi um caos. Migrei pra NUWII e nunca mais me estressei." },
  { name: "Rafael C.", time: "há 2 meses", text: "Abri minha empresa direto pelo WhatsApp, sem precisar ir em lugar nenhum. O atendimento é rápido, ninguém te deixa esperando." },
  { name: "Carolina P.", time: "há 5 meses", text: "Saí de um escritório tradicional pra cá. Diferença absurda — economizei R$ 8k em impostos só no primeiro semestre." },
  { name: "Lucas D.", time: "há 3 meses", text: "Tinha pavor de imposto e NF. Hoje o app me avisa dos prazos e fica tudo organizado. Vale cada centavo." },
];

export function Reviews() {
  const head = useReveal<HTMLDivElement>();

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div ref={head.ref} className={styles.head}>
          <div className={styles.left}>
            <h2 className={`${styles.h2} reveal ${head.inView ? "in" : ""}`}>
              O que dizem <em>nossos clientes.</em>
            </h2>
            <p className={`${styles.p} reveal reveal-d1 ${head.inView ? "in" : ""}`}>
              Mais de 400 empresas já trocaram o contador tradicional pela NUWII.
            </p>
          </div>
          <div className={`${styles.googleCard} reveal reveal-d2 ${head.inView ? "in" : ""}`}>
            <div className={styles.gIcon}>
              <GoogleG />
            </div>
            <div className={styles.gInfo}>
              <div className={styles.gRating}>
                <strong>4.9</strong>
                <span className={styles.gStars}>
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
                </span>
              </div>
              <div className={styles.gMeta}>Baseado em +400 avaliações no Google</div>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {REVIEWS.map((r, i) => <ReviewCard key={i} review={r} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, index }: { review: typeof REVIEWS[0]; index: number }) {
  const r = useReveal<HTMLDivElement>();
  const delay = index % 3 === 1 ? "reveal-d1" : index % 3 === 2 ? "reveal-d2" : "";
  const initial = review.name.charAt(0);

  return (
    <div ref={r.ref} className={`${styles.card} reveal ${delay} ${r.inView ? "in" : ""}`}>
      <div className={styles.stars}>
        {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
      </div>
      <p className={styles.text}>{review.text}</p>
      <div className={styles.author}>
        <div className={styles.avatar}>{initial}</div>
        <div>
          <div className={styles.name}>{review.name}</div>
          <div className={styles.time}>{review.time}</div>
        </div>
      </div>
    </div>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6.1L10 14.8 4.6 18l1.3-6.1L1.3 7.7l6.1-.6z" />
    </svg>
  );
}
function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.7 4.7-6.2 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2.1 1.4-4.6 2.4-7.2 2.4-5.1 0-9.5-3.2-11.3-8L6.2 33C9.6 39.6 16.3 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l.0 0 6.2 5.2c-.4.4 6.7-4.9 6.7-14.8 0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
