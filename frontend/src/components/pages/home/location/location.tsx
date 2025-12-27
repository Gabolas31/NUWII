import styles from './location.module.css';

export function Location() {
  return (
    <section className={styles.root}>
      {/* Imagem mobile - aparece primeiro no mobile */}
      <div className={styles.mobileImage}>
        <img
          src="/assets/new-images/mobile/mulher-no-computador-ar-livre.webp"
          alt="Atendemos todos os estados do Brasil"
          className={styles.mobileImageElement}
          draggable="false"
          loading="lazy"
        />
      </div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h1 className={styles.title}>
              Onde você estiver, sua contabilidade também está.
            </h1>
            <p className={styles.description}>
              Atendemos empresas em todo o Brasil, com contabilidade 100% online e atendimento próximo para simplificar a rotina do seu negócio.
            </p>
          </div>
          <div className={styles.imageSection}>
            <img
              src="/assets/new-images/mulher-com-computador-ao-ar-livre.png"
              alt="Atendemos todos os estados do Brasil"
              className={styles.desktopImageElement}
              draggable="false"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

