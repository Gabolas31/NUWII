import { useEffect, useState, ReactNode } from "react";
import Header from "@/pages/header";
import { Contact } from "@/components/pages/home/contact";
import { CorujaoGreeting } from "@/components/shared/corujao-greeting";
import styles from "./layout.module.css";

interface LayoutProps {
  children: ReactNode;
  /**
   * Quando true, esconde o Contact (footer) — útil pra páginas que querem
   * controlar o próprio rodapé. Default: false.
   */
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter = false }: LayoutProps) {
  const [showTop, setShowTop] = useState(false);
  const [corujaoVisible, setCorujaoVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esconde o botão "voltar ao topo" quando o Corujão tá visível pra não sobrepor
  const shouldShowToTop = showTop && !corujaoVisible;

  return (
    <>
      <Header />
      <main className={styles.main} id="home">
        {children}
      </main>
      {!hideFooter && <Contact />}

      {shouldShowToTop && (
        <button
          className={styles.toTop}
          aria-label="Voltar ao topo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}

      <CorujaoGreeting onVisibleChange={setCorujaoVisible} />
    </>
  );
}
