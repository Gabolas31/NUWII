import { BusinessColors } from "@/lib";
import styles from "./services-minimal.module.css";

const services = [
  {
    title: "Abertura de Empresa",
    description: "Grátis e rápido",
    icon: "🏢",
  },
  {
    title: "Migração de Contabilidade",
    description: "Sem dor de cabeça",
    icon: "🔄",
  },
  {
    title: "Gestão Contábil",
    description: "Tudo em dia",
    icon: "📊",
  },
];

export function ServicesMinimal() {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>Como podemos te ajudar hoje?</h2>
        <div className={styles.cards}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


