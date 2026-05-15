import { config, waLink, waMessages } from "@/lib";
import styles from "./contact.module.css";

export function Contact() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <img src="/logo.png" alt="NUWII" className={styles.logo} />
            <p className={styles.tag}>
              Contabilidade digital. Atendimento humano direto pelo WhatsApp.
              CRC ativo, atuação em todo o Brasil.
            </p>
          </div>

          <div className={styles.col}>
            <h5>Serviços</h5>
            <a href={waLink(waMessages.openCompany)} target="_blank" rel="noopener noreferrer">Abrir empresa</a>
            <a href={waLink(waMessages.changeAccountant)} target="_blank" rel="noopener noreferrer">Trocar de contador</a>
            <a href={waLink("Olá! Sou MEI e quero migrar para ME. Pode me ajudar?")} target="_blank" rel="noopener noreferrer">Migrar MEI → ME</a>
            <a href={waLink("Olá! Quero saber sobre endereço fiscal pra minha empresa.")} target="_blank" rel="noopener noreferrer">Endereço fiscal</a>
          </div>

          <div className={styles.col}>
            <h5>NUWII</h5>
            <a href="#plans">Planos</a>
            <a href="#home">Como funciona</a>
            <a href={waLink(waMessages.default)} target="_blank" rel="noopener noreferrer">Indique e ganhe</a>
          </div>

          <div className={styles.col}>
            <h5>Contato</h5>
            <a href={waLink(waMessages.default)} target="_blank" rel="noopener noreferrer">
              WhatsApp {config.displayPhoneNumber}
            </a>
            <a href={`mailto:${config.email}`}>{config.email}</a>
            <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer">
              @{config.instagram}
            </a>
            <address className={styles.address}>
              {config.address.street}<br />
              {config.address.complement}<br />
              {config.address.neighborhood} · {config.address.city}/{config.address.state} · {config.address.zip}
            </address>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} NUWII Soluções Empresariais · CNPJ {config.cnpj}</span>
          <span className={styles.legal}>
            <a href="#">Privacidade</a> · <a href="#">Termos</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
