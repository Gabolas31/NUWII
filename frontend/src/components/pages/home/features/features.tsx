import { useState, useEffect, useRef } from "react";
import { BusinessColors, config } from "@/lib";
import styles from "./features.module.css";
import { 
  Speed as SpeedIcon,
  PersonOutline as PersonIcon,
  VisibilityOutlined as VisibilityIcon,
  ShieldOutlined as SecurityIcon,
} from "@mui/icons-material";

const features = [
  {
    icon: SpeedIcon,
    title: "Contabilidade sem Burocracia",
    description: "Atendimento digital, processos ágeis e suporte onde você estiver.",
  },
  {
    icon: SecurityIcon,
    title: "Confiança e Segurança",
    description: "Sua contabilidade em dia, com processos seguros e responsabilidade.",
  },
  {
    icon: PersonIcon,
    title: "Especialistas ao Seu Lado",
    description: "Cuidamos da sua contabilidade para você focar no crescimento do negócio.",
  },
  {
    icon: VisibilityIcon,
    title: "Processos Simples e Rápidos",
    description: "Menos espera, mais eficiência para resolver suas demandas contábeis.",
  },
];

interface FeaturesProps {
  imageSrc?: string;
  imageAlt?: string;
  testimonial?: {
    name: string;
    company: string;
    since: string;
  };
}

export function Features({ 
  imageSrc, 
  imageAlt = "Contabilidade digital NUWII",
  testimonial 
}: FeaturesProps) {
  const [yearsCount, setYearsCount] = useState(0);
  const [entrepreneursCount, setEntrepreneursCount] = useState(0);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animar anos (0 a 5)
            const animateYears = () => {
              let current = 0;
              const target = 5;
              const duration = 2000; // 2 segundos
              const steps = 60;
              const increment = target / steps;
              const interval = duration / steps;

              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  setYearsCount(target);
                  clearInterval(timer);
                } else {
                  setYearsCount(Math.floor(current));
                }
              }, interval);
            };

            // Animar empreendedores (0 a 300)
            const animateEntrepreneurs = () => {
              let current = 0;
              const target = 300;
              const duration = 2000;
              const steps = 60;
              const increment = target / steps;
              const interval = duration / steps;

              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  setEntrepreneursCount(target);
                  clearInterval(timer);
                } else {
                  setEntrepreneursCount(Math.floor(current));
                }
              }, interval);
            };

            // Animar empresas (0 a 400)
            const animateCompanies = () => {
              let current = 0;
              const target = 400;
              const duration = 2000;
              const steps = 60;
              const increment = target / steps;
              const interval = duration / steps;

              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  setCompaniesCount(target);
                  clearInterval(timer);
                } else {
                  setCompaniesCount(Math.floor(current));
                }
              }, interval);
            };

            animateYears();
            animateEntrepreneurs();
            animateCompanies();
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  // Fallback: se após 3 segundos a animação não disparou, definir valores finais
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated) {
        setYearsCount(5);
        setEntrepreneursCount(300);
        setCompaniesCount(400);
        setHasAnimated(true);
      }
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, [hasAnimated]);

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Título - col-span-12 */}
          <h2 className={styles.title}>
            Tudo o que sua empresa precisa para crescer!
          </h2>

          {/* Subtítulo - col-start-4 col-span-6 */}
          <p className={styles.subtitle}>
            Unimos contabilidade, tecnologia e proximidade para simplificar a gestão da sua empresa.
          </p>

          {/* Imagem - col-span-4, row-span-2, a partir da row 3 */}
          <div className={styles.imageContainer}>
            {imageSrc ? (
              <div className={styles.imageWrapper}>
                <img 
                  src={imageSrc} 
                  alt={imageAlt}
                  className={styles.image}
                  draggable="false"
                  loading="lazy"
                />
                {testimonial && (
                  <div className={styles.testimonialTag}>
                    <div className={styles.testimonialName}>{testimonial.name}</div>
                    <div className={styles.testimonialCompany}>{testimonial.company}</div>
                    <div className={styles.testimonialSince}>Cliente desde {testimonial.since}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.imagePlaceholder}>
                <div className={styles.placeholderContent}>
                  <span className={styles.placeholderIcon}>📊</span>
                  <p className={styles.placeholderText}>Imagem aqui</p>
                </div>
              </div>
            )}
          </div>

          {/* Cards - col-span-8, grid 2x2 */}
          <div className={styles.cardsContainer}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={styles.card}>
                  <div className={styles.cardIcon}>
                    <Icon sx={{ fontSize: 32, color: '#0A3D62' }} />
                  </div>
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  <p className={styles.cardDescription}>{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Estatísticas - col-span-12, card único com 3 colunas */}
          <div className={styles.statsContainer} ref={statsRef}>
            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>
                  <span className={styles.statPlus}>+ </span>
                  <span className={styles.statDigit}>
                    {String(yearsCount).padStart(2, '0')}
                  </span>
                  <span className={styles.statUnit}> anos</span>
                </div>
                <p className={styles.statDescription}>de experiência de mercado</p>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>
                  <span className={styles.statPlus}>+</span>
                  <span className={styles.statDigit}>{entrepreneursCount}</span>
                </div>
                <p className={styles.statDescription}>empreendedores atendidos</p>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>
                  <span className={styles.statPlus}>+</span>
                  <span className={styles.statDigit}>{companiesCount}</span>
                </div>
                <p className={styles.statDescription}>empresas abertas</p>
              </div>
            </div>
          </div>

          {/* Botão CTA - col-span-12 */}
          <div className={styles.ctaContainer}>
            <a
              href={`https://wa.me/${config.phoneNumber}?text=Olá! Venho pelo site da NUWII e gostaria de contratar os serviços :)`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <span>
                Contrate a Nuwii
                <span className={styles.ctaSubtext}>Fale com um especialista</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

