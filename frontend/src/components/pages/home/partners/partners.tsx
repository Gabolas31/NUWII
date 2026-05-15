import styles from "./partners.module.css";

const PARTNERS = [
  { name: "Cora", logo: "/assets/new-images/cora_logo.webp" },
  { name: "Conta", logo: "/assets/new-images/conta_logo.png" },
  { name: "Nibo", logo: "/assets/new-images/nibo_contador.png" },
  { name: "Thomson Reuters", logo: "/assets/new-images/thomson_logo.png" },
  { name: "Tecnosign", logo: "/assets/new-images/tecnosign_logo.png" },
  { name: "Zap", logo: "/assets/new-images/zap_logo.png" },
];

// Duplica a lista pra simular loop infinito sem corte
const TRACK = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export function Partners() {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <p className={styles.label}>Empresas que confiam nos nossos parceiros tecnológicos</p>
        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeFade} aria-hidden="true" />
          <div className={styles.track}>
            {TRACK.map((p, i) => (
              <div key={i} className={styles.item}>
                <img src={p.logo} alt={p.name} draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
