import styles from './referral.module.css';

const steps = [
  {
    number: '01',
    text: "Você contrata nossa contabilidade online"
  },
  {
    number: '02',
    text: "Passa pelo processo de onboarding e boas-vindas"
  },
  {
    number: '03',
    text: "Indica a Nuwii a um amigo"
  },
  {
    number: '04',
    text: "Pronto! Você já ganhou descontos e muito mais"
  }
];

export function Referral() {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <p className={styles.subtitle}>BENEFÍCIOS EXCLUSIVOS PARA CLIENTES NUWII!</p>
          <h2 className={styles.title}>
            Cliente <strong>Nuwii</strong> também <strong>ganha.</strong>
          </h2>
          <p className={styles.intro}>
            Faça parte do nosso programa de relacionamento indicando um amigo e ganhe benefícios exclusivos. Veja como é fácil de participar e começar a ganhar desconto na sua mensalidade.
          </p>
        </div>

        {/* Steps Carousel */}
        <div className={styles.stepsSection}>
          <div className={styles.stepsContainer}>
            {steps.map((step, index) => (
              <div key={index} className={styles.stepCard}>
                <div className={styles.stepNumberWrapper}>
                  <div className={styles.stepNumberCircle}>
                    <div className={styles.stepNumber}>{step.number}</div>
                  </div>
                </div>
                <p className={styles.stepText}>
                  {step.text.split(' ').map((word, i, arr) => {
                    if (word === 'online' || word === 'online.') {
                      return <span key={i} className={styles.highlight}>{word}{i < arr.length - 1 ? ' ' : ''}</span>;
                    }
                    return <span key={i}>{word}{i < arr.length - 1 ? ' ' : ''}</span>;
                  })}
                </p>
                {index < steps.length - 1 && (
                  <div className={styles.stepArrow}>
                    <svg
                      width="119"
                      height="47"
                      viewBox="0 0 119 47"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M 0 23.5 Q 60 42, 119 23.5"
                        stroke="#a1e7e5"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rules Section */}
        <div className={styles.rulesSection}>
          <p className={styles.rulesTitle}>Regras e controles do programa de indicação:</p>
          <p className={styles.rulesText}>
            Para você ganhar seus benefícios exclusivos, seu amigo precisa inserir o CNPJ da sua empresa e fechar a contabilidade dele com a gente. Seguindo esses dois passos, nosso sistema já identificará que você já ganhou o beneficio.
          </p>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>
            <strong>Nuwii</strong>, sempre a frente do mercado e trazendo as <strong>melhores soluções</strong> e <strong>benefícios</strong> pra <strong>você.</strong>
          </h3>
          <div className={styles.ctaButtons}>
            <a href="#indique-amigo" className={styles.ctaButtonPrimary}>
              Sou cliente e quero indicar um amigo
            </a>
            <a href="#programa-indicacao" className={styles.ctaButtonSecondary}>
              Quero saber mais do programa de indicação
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

