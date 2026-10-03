import * as React from "react";

/** Um trecho da frase. `tone` escolhe a cor — quem estiliza é o CSS da página,
 *  via `[data-tone="a"]` e `[data-tone="b"]`. */
export type TypewriterSegment = { text: string; tone?: "a" | "b" };

interface TypewriterProps {
  /** Frases que se alternam. Cada frase é uma lista de trechos coloridos. */
  phrases: TypewriterSegment[][];
  className?: string;
  /** ms por caractere ao digitar. */
  typingMs?: number;
  /** ms por caractere ao apagar. */
  deletingMs?: number;
  /** ms de pausa com a frase completa na tela. */
  holdMs?: number;
}

type Phase = "typing" | "holding" | "deleting";

export function Typewriter({
  phrases,
  className,
  typingMs = 55,
  deletingMs = 26,
  holdMs = 2200,
}: TypewriterProps) {
  const [animated, setAnimated] = React.useState(false);
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [charCount, setCharCount] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>("typing");

  const phrase = phrases[phraseIndex] ?? [];
  const fullLength = phrase.reduce((total, seg) => total + seg.text.length, 0);

  /** Só anima no cliente, e só se a pessoa não pediu menos movimento.
   *  Assim o HTML estático já sai com a primeira frase escrita — bom pro Google. */
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      setCharCount(fullLength);
      setAnimated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!animated || phrases.length === 0) return;

    if (phase === "typing") {
      if (charCount < fullLength) {
        const t = setTimeout(() => setCharCount((c) => c + 1), typingMs);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("holding"), 0);
      return () => clearTimeout(t);
    }

    if (phase === "holding") {
      if (phrases.length === 1) return;
      const t = setTimeout(() => setPhase("deleting"), holdMs);
      return () => clearTimeout(t);
    }

    // deleting
    if (charCount > 0) {
      const t = setTimeout(() => setCharCount((c) => c - 1), deletingMs);
      return () => clearTimeout(t);
    }
    setPhraseIndex((i) => (i + 1) % phrases.length);
    setPhase("typing");
  }, [
    animated,
    phase,
    charCount,
    fullLength,
    phrases.length,
    typingMs,
    deletingMs,
    holdMs,
  ]);

  /** Corta os trechos no número de caracteres já digitados, preservando as cores. */
  let remaining = animated ? charCount : fullLength;
  const visible = phrase.map((seg) => {
    const text = seg.text.slice(0, Math.max(0, remaining));
    remaining -= seg.text.length;
    return { ...seg, text };
  });

  return (
    <span className={className}>
      <span data-typewriter-live="">
        {visible.map((seg, i) =>
          seg.text ? (
            <span data-tone={seg.tone ?? "a"} key={i}>
              {seg.text}
            </span>
          ) : null
        )}
        {animated && <span aria-hidden="true" data-typewriter-caret="" />}
      </span>
    </span>
  );
}
