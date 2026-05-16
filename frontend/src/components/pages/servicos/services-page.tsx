import Link from "next/link";
import { Layout } from "@/components/shared/layout";
import { SERVICES, useReveal } from "@/lib";
import styles from "./services-page.module.css";

export function ServicesPage() {
  const headerReveal = useReveal();

  return (
    <Layout>
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <div
            ref={headerReveal.ref}
            className={`${styles.heroInner} ${headerReveal.inView ? styles.in : ""}`}
          >
            <span className={styles.eyebrow}>Serviços</span>
            <h1 className={styles.title}>
              Soluções <em>sob medida</em> pra cada momento da sua empresa.
            </h1>
            <p className={styles.subtitle}>
              Da abertura do CNPJ ao diagnóstico contábil completo, passando por consultoria avulsa e escritório virtual. Escolha o serviço que faz sentido pro seu momento.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.wrap}>
          <div className={styles.grid}>
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.wrap}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>
              Não achou o que <em>precisa?</em>
            </h2>
            <p className={styles.ctaText}>
              Fala com a gente direto no WhatsApp. Tem caso que não cabe num plano padrão — e tá tudo bem, monta a gente um orçamento sob medida.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const reveal = useReveal();

  return (
    <article
      ref={reveal.ref}
      className={`${styles.card} ${reveal.inView ? styles.in : ""}`}
      style={{ transitionDelay: `${Math.min(index * 80, 400)}ms` }}
    >
      <div className={styles.cardTop}>
        <span className={styles.cat}>{service.category}</span>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.cardDesc}>{service.shortDescription}</p>
      </div>

      <div className={styles.cardBot}>
        <div className={styles.price}>
          <span className={styles.priceVal}>{service.price}</span>
          {service.priceNote && (
            <span className={styles.priceNote}>{service.priceNote}</span>
          )}
        </div>
        <Link
          href={`/servicos/${service.slug}`}
          className={styles.cardCta}
        >
          Ver detalhes
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
        </Link>
      </div>
    </article>
  );
}
