
import { useEffect, useState } from "react";
import { Button, styled } from "@mui/material";
import { Flex } from "@radix-ui/themes";
import { Image } from "@/components";
import { BusinessColors, config } from "@/lib";
import { LoadingScreen } from "./LoadingScreen";
import benefitsImg from "./assets/benefits.png";
import heroImg from "./assets/hero.jpg";
import styles from "./hero.module.css";

const ModernButton = styled(Button)({
  background: 'linear-gradient(135deg, #44cbc6, #2a9d98)',
  color: '#ffffff',
  border: 'none',
  padding: '16px 32px',
  borderRadius: '50px',
  fontFamily: 'LinearGrotesk-Bold, sans-serif',
  fontSize: '18px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(68, 203, 198, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(68, 203, 198, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover::before': {
    left: '100%',
  },
});

function highlightText(text: string, substrings: string[]) {
  if (!substrings || substrings.length === 0) return text;

  const pattern = substrings
    .map(str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');

  return text.split(regex).map((part, i) =>
    substrings.some(sub =>
      part.toLowerCase() === sub.toLowerCase()
    ) ? (
      <strong key={i} style={{color: BusinessColors.Blue}}>{part}</strong>
    ) : (
      part
    )
  );
}

interface HeroProps {
  onLoaded?: () => void;
}

export function Hero({ onLoaded }: HeroProps) {
  // Não renderiza loading internamente, só chama onLoaded

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

  useEffect(() => {
    let imagesLoaded = false;
    let fontsLoaded = false;
    let cssLoaded = false;

    // Imagens
    const img1 = new window.Image();
    const img2 = new window.Image();
    img1.src = typeof benefitsImg === 'string' ? benefitsImg : benefitsImg.src;
    img2.src = typeof heroImg === 'string' ? heroImg : heroImg.src;
    img1.onload = img2.onload = () => {
      if (!imagesLoaded && img1.complete && img2.complete) {
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
      // Verifica se alguma classe do hero.module.css está aplicada
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

  const description1 = `Transformamos números em crescimento com propósito.`;
  const description2 = `Acreditamos que cada empresa carrega uma história única. Com responsabilidade, conhecimento e tecnologia, ajudamos você a escrever os próximos capítulos.`;
  const description3 = `Oferecemos soluções empresariais alinhadas aos seus propósitos, com menos burocracia e mais eficiência, para que você possa focar no que realmente importa: o crescimento da sua empresa.`;

  const getMotivationText = () => {
    return (
      <span className={styles.lightingText}>
        <span className={styles.glowingText}>
          Você cuida da sua empresa.<br />
          A gente cuida da sua <span style={{color: BusinessColors.Primary}}>contabilidade</span>.
        </span>
      </span>
    );
  };

  return (
    <Flex className={ styles.root }>
      <Flex className={ styles.container }>
        <div className={ styles.motivationText }>
          {getMotivationText()}
        </div>
        <Flex className={ styles.rowContainer }>
          <div className={ styles.leftComponent }>
            <div className={styles.description}>
              <div>{highlightText(description1, ["crescimento"])}</div>
              <div>{highlightText(description2, ["história única", "responsabilidade, conhecimento e tecnologia"])}</div>
              <div>{highlightText(description3, ["soluções empresariais alinhadas aos seus propósitos", "O crescimento da sua empresa"])}</div>
            </div>
            <div className={styles.benefitsContainer}>
              <div className={styles.mobileButton}>
                <a
                  href={`https://wa.me/${config.phoneNumber}?text=Olá! Venho pelo site da NUWII, e possuo interesse em saber mais sobre os serviços :)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <ModernButton>
                    Quero descomplicar minha contabilidade
                  </ModernButton>
                </a>
              </div>
              <Image className={styles.benefitsImage} src={benefitsImg} alt="Benefícios da NUWII"/>
            </div>
          </div>
          <div className={ styles.rightComponent }>
            <div className={ styles.mobileMotivationText }>
              {getMotivationText()}
            </div>
            <Image className={styles.heroImage} src={heroImg} alt="Contabilidade NUWII"/>
            <div className={styles.desktopButton}>
              <a
                href={`https://wa.me/${config.phoneNumber}?text=Olá! Venho pelo site da NUWII, e possuo interesse em saber mais sobre os serviços :)`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <ModernButton>
                  Quero descomplicar minha contabilidade
                </ModernButton>
              </a>
            </div>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}