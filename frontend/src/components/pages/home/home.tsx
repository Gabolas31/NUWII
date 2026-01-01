import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import Header from "@/pages/header";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { LoadingScreen } from "./hero/LoadingScreen";
import styles from "./home.module.css";
import { Plans } from "./plans";
import { Features } from "./features";
import { Process } from "./process";
import { Referral } from "./referral";
import { Partners } from "./partners";

export function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <>
      {!heroLoaded ? (
        <LoadingScreen />
      ) : (
        <>
          <section className={styles.section} id="home">
            <Header />
          </section>
          <main className={styles.homePage}>
            <Flex className={styles.root} direction="column">
              <Hero />
              <Features imageSrc="/assets/new-images/contabilidade-completa.b08d43d.png" />
              <Process />
              <Referral />
              <section className={styles.section} id="plans">
                <Plans />
              </section>
              <div className={styles.colorBreak}>
                <Partners />
              </div>
              <section className={styles.section} id="contact">
                <Contact />
              </section>
            </Flex>
            {/* Botão flutuante para voltar ao topo */}
            <button
              className={styles.floatingTopButton}
              aria-label="Voltar ao topo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {/* Ícone seta para cima, sem texto */}
              <span style={{fontSize: "1.5rem", lineHeight: 1}}>↑</span>
            </button>
          </main>
        </>
      )}
      {/* O Hero será renderizado oculto para disparar o carregamento, mas só mostra as seções após o carregamento */}
      {!heroLoaded && <Hero onLoaded={() => setHeroLoaded(true)} />}
    </>
  );
}