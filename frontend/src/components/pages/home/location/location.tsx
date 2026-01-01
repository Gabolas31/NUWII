import { LocationOnOutlined } from '@mui/icons-material';
import { config } from '@/lib';
import styles from './location.module.css';

export function Location() {
  // Extrair cidade e estado do endereço
  const addressParts = config.address.split(',');
  const cityState = addressParts[addressParts.length - 2]?.trim() || 'Salvador, BA';
  
  // URL do Google Maps para o endereço (CEO Salvador Shopping)
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d-38.4!3d-12.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x716037fa23ca5ed%3A0x8c9b8c9b8c9b8c9b!2sCEO%20Salvador%20Shopping!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr`;

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <LocationOnOutlined className={styles.icon} />
          </div>
          <h2 className={styles.cityState}>{cityState}</h2>
          <div className={styles.mapContainer}>
            <iframe
              src={mapUrl}
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização NUWII"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

