import { useEffect, useState } from "react";
import Header from "@/pages/header";
import { Hero } from "./hero";
import { Features } from "./features";
import { Stats } from "./stats";
import { Plans } from "./plans";
import { Partners } from "./partners";
import { Reviews } from "./reviews";
import { Referral } from "./referral";
import { Contact } from "./contact";
import styles from "./home.module.css";

export function HomePage() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main} id="home">
        <Hero />
        <Partners />
        <Features />
        <Stats />
        <section id="plans">
          <Plans />
        </section>
        <Reviews />
        <Referral />
        <Contact />
      </main>

      {showTop && (
        <button
          className={styles.toTop}
          aria-label="Voltar ao topo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </>
  );
}
