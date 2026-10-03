import Link from "next/link";
import { Layout } from "@/components/shared/layout";
import { Service, useReveal, waLink, waMessages } from "@/lib";
import styles from "./service-detail-page.module.css";

interface ServiceDetailPageProps {
  service: Service;
}

/** Separa "A partir de R$ 149,00" em rótulo pequeno + valor grande. */
function splitPrice(price: string): { label?: string; value: string } {
  const match = price.match(/^(A partir de)\s+(.+)$/i);
  if (match) return { label: match[1], value: match[2] };
  return { value: price };
}

function Arrow() {
  return (
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
  );
}

/** Lista de variações de preço (e-CPF / e-CNPJ), com linha pontilhada ligando rótulo e valor. */
function PriceTiers({
  tiers,
  className,
}: {
  tiers: NonNullable<Service["priceTiers"]>;
  className: string;
}) {
  return (
    <ul className={className}>
      {tiers.map((tier) => (
        <li key={tier.label}>
          <span>{tier.label}</span>
          <b>{tier.value}</b>
        </li>
      ))}
    </ul>
  );
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const headerReveal = useReveal();
  const bodyReveal = useReveal();
  const ctaReveal = useReveal();

  const isCalendar = service.ctaType === "calendar";
  const price = splitPrice(service.price);

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

            <div className={styles.offer}>
              <div className={styles.offerTop}>
                <div className={styles.offerPrice}>
                  {price.label && (
                    <span className={styles.offerLabel}>{price.label}</span>
                  )}
                  <span className={styles.offerValue}>{price.value}</span>
                  {service.priceNote && (
                    <span className={styles.offerNote}>{service.priceNote}</span>
                  )}
                </div>
                <a
                  href={service.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.offerCta}
                >
                  {service.ctaLabel}
                  <Arrow />
                </a>
              </div>
              {service.ctaNote && (
                <p className={styles.offerNoteFoot}>{service.ctaNote}</p>
              )}
              {service.priceTiers && (
                <PriceTiers className={styles.tiers} tiers={service.priceTiers} />
              )}
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
                <span className={styles.asideCat}>{service.category}</span>
                <h4 className={styles.asideTitle}>{service.title}</h4>

                <div className={styles.asidePrice}>
                  {price.label && (
                    <span className={styles.offerLabel}>{price.label}</span>
                  )}
                  <span className={styles.asidePriceVal}>{price.value}</span>
                  {service.priceNote && (
                    <span className={styles.offerNote}>{service.priceNote}</span>
                  )}
                </div>

                {service.priceTiers && (
                  <PriceTiers
                    className={styles.asideTiers}
                    tiers={service.priceTiers}
                  />
                )}

                <a
                  href={service.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.asideCta}
                >
                  {service.ctaLabel}
                  <Arrow />
                </a>

                <p className={styles.asideHelp}>
                  {service.ctaNote ??
                    (isCalendar
                      ? "Você escolhe o horário direto no Google Agenda."
                      : "Resposta de um contador, sem chatbot e sem fila.")}
                </p>

                <div className={styles.asideContact}>
                  <p>Prefere tirar uma dúvida antes?</p>
                  <a
                    href={waLink(waMessages.default)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.asideWhatsapp}
                  >
                    Falar no WhatsApp
                    <Arrow />
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
            <div className={styles.finalCtaText}>
              <h3>
                {service.finalCtaTitle ? (
                  service.finalCtaTitle
                ) : (
                  <>
                    Pronto pra <em>começar?</em>
                  </>
                )}
              </h3>
              <p>
                {service.finalCtaText ??
                  (isCalendar
                    ? "Escolha o horário no Google Agenda e a consulta já entra no seu calendário."
                    : "Manda mensagem no WhatsApp que um contador te responde. Sem chatbot e sem fila.")}
              </p>
            </div>
            <div className={styles.finalCtaActions}>
              <a
                href={service.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.finalCtaBtn}
              >
                {service.ctaLabel}
                <Arrow />
              </a>
              <Link href="/servicos" className={styles.backLink}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5M11 19l-7-7 7-7" />
                </svg>
                Ver todos os serviços
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
