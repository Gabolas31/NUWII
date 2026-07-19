import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";
import { useReveal } from "@/lib/hooks/useReveal";

import styles from "./reviews.module.css";

const TESTIMONIALS: Testimonial[] = [
  {
    text: "Meu e-commerce cresceu rápido e a equipe do Gabriel acompanhou cada passo. Nota, imposto, obrigação — tudo no automático e sempre com atendimento de gente de verdade.",
    image: "/assets/reviews/marcelo.jpg",
    name: "Marcelo P.",
    role: "Dono de e-commerce",
  },
  {
    text: "Trocar de contador me dava medo, mas o Gabriel e o time cuidaram de toda a transição. Eu literalmente não precisei fazer nada — só acompanhar de longe.",
    image: "/assets/reviews/thiago.jpg",
    name: "Thiago N.",
    role: "Designer · Freelancer",
  },
  {
    text: "O que eu mais valorizo é falar com gente de verdade. O Gabriel e a equipe respondem na hora, com atenção, como se a minha empresa fosse deles também.",
    image: "/assets/reviews/rosana.jpg",
    name: "Rosana L.",
    role: "Consultora · ME",
  },
  {
    text: "Eu tinha pavor de imposto e nota fiscal. Hoje a equipe me avisa dos prazos e o Gabriel tira minhas dúvidas com toda a paciência do mundo. Vale cada centavo.",
    image: "/assets/reviews/camila.jpg",
    name: "Camila R.",
    role: "Fotógrafa · MEI",
  },
];

const firstColumn = TESTIMONIALS.slice(0, 2);
const secondColumn = TESTIMONIALS.slice(2, 4);

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

        <div className={styles.columns}>
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className={styles.colMd} duration={22} />
        </div>
      </div>
    </section>
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
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.2 5.2c-.4.4 6.7-4.9 6.7-14.8 0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
