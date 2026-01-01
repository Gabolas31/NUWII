import { useEffect, useState } from "react";
import { Image } from "@/components";
import { BusinessColors, config } from "@/lib";
import { LoadingScreen } from "./LoadingScreen";
import heroImg from "./assets/hero.jpg";
import styles from "./hero.module.css";
import { 
  CheckCircleOutline,
  SpeedOutlined,
  SecurityOutlined
} from "@mui/icons-material";

interface HeroProps {
  onLoaded?: () => void;
}

export function Hero({ onLoaded }: HeroProps) {
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "Contabilidade moderna para empresas em crescimento";
  const typewriterSpeed = 50; // milissegundos por caractere
  
  const benefits = [
    {
      icon: CheckCircleOutline,
      text: "Sua empresa regularizada e sem multas indesejadas"
    },
    {
      icon: SpeedOutlined,
      text: "Economia no pagamento de impostos"
    },
    {
      icon: SecurityOutlined,
      text: "Suporte com contadores especialistas"
    }
  ];
  // Checa se fontes estão carregadas
  function checkFontsLoaded() {
    if (document.fonts) {
      return Promise.all([
        document.fonts.load('1em LinearGrotesk-Black'),
        document.fonts.load('1em LinearGrotesk-Bold'),
        document.fonts.load('1em LinearGrotesk-Medium'),
        document.fonts.load('1em LinearGrotesk-Light'),
      ]);
    }
    return Promise.resolve();
  }

  // Efeito de máquina de escrever
  useEffect(() => {
    let currentIndex = 0;
    let interval: NodeJS.Timeout | null = null;
    
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypewriterText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (interval) clearInterval(interval);
        }
      }, typewriterSpeed);
    }, 500); // Delay inicial de 500ms

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [fullText, typewriterSpeed]);

  useEffect(() => {
    let imagesLoaded = false;
    let fontsLoaded = false;
    let cssLoaded = false;

    // Imagens
    const img = new window.Image();
    img.src = typeof heroImg === 'string' ? heroImg : heroImg.src;
    img.onload = () => {
      if (!imagesLoaded && img.complete) {
        imagesLoaded = true;
        checkReady();
      }
    };

    // Fontes
    checkFontsLoaded().then(() => {
      fontsLoaded = true;
      checkReady();
    });

    // CSS
    const cssCheck = () => {
      if (document.querySelector(`.${styles.root}`)) {
        cssLoaded = true;
        checkReady();
      } else {
        setTimeout(cssCheck, 50);
      }
    };
    cssCheck();

    function checkReady() {
      if (imagesLoaded && fontsLoaded && cssLoaded) {
        if (onLoaded) onLoaded();
      }
    }
  }, []);

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              <span className={styles.typewriter}>
                {typewriterText}
                {typewriterText.length < fullText.length && (
                  <span className={styles.cursor}>|</span>
                )}
              </span>
            </h1>
            <ul className={styles.highlights}>
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <li key={index} className={styles.highlight}>
                    <Icon className={styles.highlightIcon} />
                    <span>{benefit.text}</span>
                  </li>
                );
              })}
            </ul>
            <div className={styles.ctaContainer}>
              <a
                href={`https://wa.me/${config.phoneNumber}?text=Olá! Venho pelo site da NUWII, e possuo interesse em abrir minha empresa :)`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryCta}
              >
                Abrir minha empresa
              </a>
              <a
                href={`https://wa.me/${config.phoneNumber}?text=Olá! Venho pelo site da NUWII, e possuo interesse em trocar de contador :)`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryCta}
              >
                Trocar de contador
              </a>
            </div>
          </div>
          <div className={styles.imageContent}>
            <img
              src="/assets/new-images/guardia--tablet-label.43a91a9.png"
              alt="Consultora de Negócios NUWII"
              className={styles.heroImage}
              draggable="false"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}