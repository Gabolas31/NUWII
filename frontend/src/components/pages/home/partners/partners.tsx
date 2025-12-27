import styles from './partners.module.css';

export function Partners() {
  const partners = [
    { name: 'Company Hero', logo: '/assets/new-images/company_hero_logo.jpeg' },
    { name: 'Cora', logo: '/assets/new-images/cora_logo.webp' },
    { name: 'Tecnosign', logo: '/assets/new-images/tecnosign_logo.png' },
    { name: 'ZapSign', logo: '/assets/new-images/zap_logo.png' },
    { name: 'Conta Azul', logo: '/assets/new-images/conta_logo.png' },
    { name: 'Thomson Reuters', logo: '/assets/new-images/thomson_logo.png' },
    { name: 'Nibo', logo: '/assets/new-images/nibo_contador.png' },
    { name: 'Stone', logo: '/assets/new-images/cropped-logo-ton.webp' },
  ];

  // Duplicar os parceiros para criar loop infinito
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nossos parceiros</h2>
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselTrack}>
            {duplicatedPartners.map((partner, index) => (
              <div key={index} className={styles.logoWrapper}>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={styles.logo}
                  draggable="false"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

