import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { config, waLink, waMessages } from "@/lib";
import { WebsiteLogo } from "./website-logo";
import styles from "./navbar.module.css";

interface NavLink {
  label: string;
  href: string;
  /** Se for true, abre como href externo (anchor scroll, novo página, etc) */
  isPage?: boolean;
}

const LINKS: NavLink[] = [
  { label: "Início", href: "/", isPage: true },
  { label: "Serviços", href: "/servicos", isPage: true },
  { label: "Planos", href: "/#plans" },
  { label: "Avaliações", href: "/#reviews" },
];

export function NavBar() {
  const router = useRouter();
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

  // Fecha mobile menu ao trocar de rota
  useEffect(() => {
    const handleRouteChange = () => setMobileOpen(false);
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className={`${styles.root} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMobile}>
          <WebsiteLogo />
        </Link>

        <div className={styles.links}>
          {LINKS.map((l) =>
            l.isPage ? (
              <Link key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </a>
            )
          )}
        </div>

        <div className={styles.actions}>
          <a
            href={config.clientPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.clientArea}
          >
            Área do Cliente
          </a>
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
          {LINKS.map((l) =>
            l.isPage ? (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMobile}
                className={styles.mobileLink}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMobile}
                className={styles.mobileLink}
              >
                {l.label}
              </a>
            )
          )}
          <a
            href={config.clientPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className={styles.mobileLink}
          >
            Área do Cliente
          </a>
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

