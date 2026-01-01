import styles from './referral.module.css';
import { CardGiftcardOutlined } from '@mui/icons-material';
import { config } from '@/lib';

export function Referral() {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <CardGiftcardOutlined className={styles.icon} />
          </div>
          <h2 className={styles.title}>
            Indique e ganhe
          </h2>
          <p className={styles.description}>
            Faça parte do nosso programa de relacionamento indicando um amigo e ganhe benefícios exclusivos. Veja como é fácil de participar e começar a ganhar desconto na sua mensalidade.
          </p>
          <a
            href={`https://wa.me/${config.phoneNumber}?text=Olá! Venho pelo site da NUWII e quero saber mais sobre o programa de indicação :)`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Indicar agora
          </a>
        </div>
      </div>
    </section>
  );
}

