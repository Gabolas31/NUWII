import { useCallback, useEffect, useState } from "react";
import { waLink, waMessages } from "@/lib";
import styles from "./corujao-greeting.module.css";

const STORAGE_KEY = "nuwii-corujao-dismissed";
/** Após esse tempo de permanência na página, o Corujão aparece. */
const APPEAR_AFTER_MS = 30_000;

type Phase = "hidden" | "appearing" | "settled" | "dismissed";

interface CorujaoGreetingProps {
  /**
   * Callback que avisa o Layout pai quando o mascote tá visível, pra evitar
   * sobreposição com outros widgets (ex: botão "voltar ao topo").
   */
  onVisibleChange?: (visible: boolean) => void;
}

export function CorujaoGreeting({ onVisibleChange }: CorujaoGreetingProps) {
  const [phase, setPhase] = useState<Phase>("hidden");

  // Sessão persistente: se o usuário já dispensou nessa sessão, nem mostra
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") {
        setPhase("dismissed");
      }
    } catch {
      // sessionStorage pode falhar em modo privado — sem stress
    }
  }, []);

  // Avisar o pai sempre que o mascote ficar visível ou não
  useEffect(() => {
    const visible = phase === "appearing" || phase === "settled";
    onVisibleChange?.(visible);
  }, [phase, onVisibleChange]);

  // Timer de 30s — só dispara se ainda estiver hidden
  useEffect(() => {
    if (phase !== "hidden") return;

    const t = setTimeout(() => {
      setPhase("appearing");
      // Pequeno delay pra animação CSS de entrada renderizar antes do "settled"
      // (settled habilita o balão e o pointer events do CTA)
      requestAnimationFrame(() => {
        setTimeout(() => setPhase("settled"), 400);
      });
    }, APPEAR_AFTER_MS);

    return () => clearTimeout(t);
  }, [phase]);

  const dismiss = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPhase("dismissed");
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  if (phase === "hidden" || phase === "dismissed") {
    return null;
  }

  const isSettled = phase === "settled";

  return (
    <div
      className={`${styles.root} ${styles[phase]}`}
      role="complementary"
      aria-label="Corujão pergunta se você quer trocar um papo"
    >
      <div className={`${styles.bubble} ${isSettled ? styles.bubbleIn : ""}`}>
        <button
          type="button"
          onClick={dismiss}
          className={styles.bubbleClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <p className={styles.bubbleText}>
          Bora <em>trocar um papo?</em>
        </p>
        <a
          href={waLink(waMessages.default)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bubbleCta}
        >
          Sim, vamos!
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <a
        href={waLink(waMessages.default)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.owl}
        aria-label="Falar com Corujão no WhatsApp"
        tabIndex={isSettled ? 0 : -1}
      >
        <img src="/corujao-avatar.png" alt="" />
        <span className={styles.dot} aria-hidden="true" />
      </a>
    </div>
  );
}
