import Link from "next/link";
import { Layout } from "@/components/shared/layout";
import { Service, useReveal, waLink, waMessages } from "@/lib";
import styles from "./service-detail-page.module.css";

interface ServiceDetailPageProps {
  service: Service;
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const headerReveal = useReveal();
  const bodyReveal = useReveal();
  const ctaReveal = useReveal();

  const isCalendar = service.ctaType === "calendar";

  return (
    <Layout>
      {/* Breadcrumb + hero */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/" className={styles.crumb}>
              Home
            </Link>
            <span className={styles.sep} aria-hidden="true">/</span>
            <Link href="/servicos" className={styles.crumb}>
              Serviços
            </Link>
            <span className={styles.sep} aria-hidden="true">/</span>
            <span className={styles.crumbCurrent}>{service.title}</span>
          </nav>

          <div
            ref={headerReveal.ref}
            className={`${styles.heroInner} ${headerReveal.inView ? styles.in : ""}`}
          >
            <span className={styles.cat}>{service.category}</span>
            <h1 className={styles.title}>{service.title}</h1>
            <p className={styles.subtitle}>{service.shortDescription}</p>

            <div className={styles.priceCard}>
              <div className={styles.priceLine}>
                <span className={styles.priceVal}>{service.price}</span>
                {service.priceNote && (
                  <span className={styles.priceNote}>{service.priceNote}</span>
                )}
              </div>
              <a
                href={service.ctaHref}
                target={isCalendar ? "_blank" : "_blank"}
                rel="noopener noreferrer"
                className={styles.ctaBtn}
              >
                {service.ctaLabel}
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
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className={styles.body}>
        <div className={styles.wrap}>
          <div
            ref={bodyReveal.ref}
            className={`${styles.bodyGrid} ${bodyReveal.inView ? styles.in : ""}`}
          >
            <div className={styles.bodyMain}>
              <h2 className={styles.h2}>Descrição do serviço</h2>
              <p className={styles.bodyText}>{service.longDescription}</p>

              {service.details && (
                <p className={styles.bodyDetails}>{service.details}</p>
              )}

              <h3 className={styles.h3}>O que está incluso?</h3>
              <ul className={styles.bullets}>
                {service.bullets.map((bullet, i) => (
                  <li key={i} className={styles.bullet}>
                    <span className={styles.check}>
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
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {service.importante && (
                <div className={styles.importante}>
                  <div className={styles.importanteHead}>
                    <span className={styles.importanteIcon} aria-hidden="true">!</span>
                    <strong>Importante</strong>
                  </div>
                  <p>{service.importante}</p>
                </div>
              )}
            </div>

            <aside className={styles.bodyAside}>
              <div className={styles.asideCard}>
                <h4 className={styles.asideTitle}>{service.title}</h4>
                <div className={styles.asidePrice}>
                  <span className={styles.priceVal}>{service.price}</span>
                  {service.priceNote && (
                    <span className={styles.priceNote}>{service.priceNote}</span>
                  )}
                </div>
                <a
                  href={service.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.asideCta}
                >
                  {service.ctaLabel}
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
                </a>
                {isCalendar && (
                  <p className={styles.asideHelp}>
                    Você é redirecionado pro Google Agenda pra escolher o horário que funciona pra você.
                  </p>
                )}
                <div className={styles.asideContact}>
                  <p>Tem dúvidas antes de agendar?</p>
                  <a
                    href={waLink(waMessages.default)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.asideWhatsapp}
                  >
                    Falar com Corujão no WhatsApp →
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <div className={styles.wrap}>
          <div
            ref={ctaReveal.ref}
            className={`${styles.finalCtaInner} ${ctaReveal.inView ? styles.in : ""}`}
          >
            <h3>
              Pronto pra <em>começar?</em>
            </h3>
            <p>
              {isCalendar
                ? "Agende seu horário no Google Agenda. Em poucos passos você reserva a consulta direto na sua agenda."
                : "Manda mensagem no WhatsApp que o Corujão te responde. Sem chatbot, sem fila."}
            </p>
            <a
              href={service.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.finalCtaBtn}
            >
              {service.ctaLabel}
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
            </a>
            <Link href="/servicos" className={styles.backLink}>
              ← Ver todos os serviços
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
