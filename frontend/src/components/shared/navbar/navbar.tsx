import { useEffect, useState } from "react";
import { waLink, waMessages } from "@/lib";
import { WebsiteLogo } from "./website-logo";
import styles from "./navbar.module.css";

const LINKS = [
  { label: "Serviços", href: "#features" },
  { label: "Planos", href: "#plans" },
  { label: "Avaliações", href: "#reviews" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava scroll do body quando o menu mobile tá aberto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className={`${styles.root} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <a href="#home" className={styles.logo} onClick={closeMobile}>
          <WebsiteLogo />
        </a>

        <div className={styles.links}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <a
            href={waLink(waMessages.default)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Falar com Corujão
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={mobileOpen ? styles.burgerOpen : ""} />
          <span className={mobileOpen ? styles.burgerOpen : ""} />
          <span className={mobileOpen ? styles.burgerOpen : ""} />
        </button>
      </div>

      {/* Overlay mobile menu */}
      <div className={`${styles.mobile} ${mobileOpen ? styles.mobileOpen : ""}`}>
        <div className={styles.mobileLinks}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={closeMobile} className={styles.mobileLink}>
              {l.label}
            </a>
          ))}
        </div>
        <a
          href={waLink(waMessages.default)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileCta}
          onClick={closeMobile}
        >
          Falar com Corujão
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
