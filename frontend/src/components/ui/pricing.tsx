import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import dynamic from "next/dynamic";
import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/** O NumberFlow monta um custom element, que não existe no HTML gerado
 *  pelo `output: export`. Carrega só no cliente. */
const NumberFlow = dynamic(() => import("@number-flow/react"), { ssr: false });

const brl = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export interface PricingPlan {
  name: string;
  /** Preço da primeira opção do seletor (Serviço). */
  price: number;
  /** Preço da segunda opção do seletor (Comércio). */
  altPrice: number;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
  /** Linha pequena abaixo do preço, tipo "Faturamento ideal até R$ 20.000". */
  capacityNote?: string;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
  primaryLabel?: string;
  altLabel?: string;
  hint?: string;
}

export function Pricing({
  plans,
  title = "Planos",
  description,
  primaryLabel = "Serviço",
  altLabel = "Comércio",
  hint,
}: PricingProps) {
  const [isPrimary, setIsPrimary] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  React.useEffect(() => setMounted(true), []);

  return (
    <div className="mx-auto w-full max-w-[1140px] px-5">
      {(title || description) && (
        <div className="mb-10 space-y-4 text-center">
          {title && (
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mx-auto max-w-2xl whitespace-pre-line text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="mb-3 flex justify-center">
        <div
          aria-label={`Escolha entre ${primaryLabel} e ${altLabel}`}
          className="inline-flex rounded-full border border-border bg-background p-1 shadow-sm"
          role="group"
        >
          {[
            { label: primaryLabel, active: isPrimary, on: true },
            { label: altLabel, active: !isPrimary, on: false },
          ].map((opt) => (
            <button
              aria-pressed={opt.active}
              className={cn(
                "rounded-full px-6 py-2.5 text-[0.9375rem] font-semibold transition-colors duration-200",
                opt.active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
              key={opt.label}
              onClick={() => setIsPrimary(opt.on)}
              type="button"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {hint && (
        <p className="mb-8 text-center text-[0.8125rem] text-muted-foreground">
          {hint}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {plans.map((plan, index) => {
          const value = isPrimary ? plan.price : plan.altPrice;

          return (
            <motion.div
              className={cn(
                "relative flex flex-col rounded-2xl border bg-background p-7 text-center",
                plan.isPopular
                  ? "z-10 border-2 border-primary shadow-[0_28px_60px_-30px_rgba(14,155,145,.75)]"
                  : "mt-5 border-border",
                index === 0 && "origin-right",
                index === 2 && "origin-left"
              )}
              initial={{ y: 40, opacity: 0 }}
              key={plan.name}
              transition={{
                duration: 1.2,
                type: "spring",
                stiffness: 100,
                damping: 26,
                delay: 0.15 + index * 0.08,
                opacity: { duration: 0.4 },
              }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      x: index === 2 ? -14 : index === 0 ? 14 : 0,
                      scale: plan.isPopular ? 1 : 0.97,
                    }
                  : { y: 0, opacity: 1 }
              }
            >
              {plan.isPopular && (
                <div className="absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-[0.9rem] bg-primary px-3 py-1">
                  <Star className="h-3.5 w-3.5 fill-current text-primary-foreground" />
                  <span className="ml-1.5 text-xs font-semibold text-primary-foreground">
                    Mais contratado
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col">
                <p className="text-base font-semibold text-muted-foreground">
                  {plan.name}
                </p>

                <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  A partir de
                </p>

                <div className="mt-1 flex items-baseline justify-center gap-x-1.5">
                  <span className="text-5xl font-bold tracking-tight text-foreground [font-variant-numeric:tabular-nums]">
                    {mounted ? (
                      <NumberFlow
                        format={{
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }}
                        locales="pt-BR"
                        transformTiming={{ duration: 500, easing: "ease-out" }}
                        value={value}
                        willChange
                      />
                    ) : (
                      brl(value)
                    )}
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                    / {plan.period}
                  </span>
                </div>

                {plan.capacityNote && (
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {plan.capacityNote}
                  </p>
                )}

                <ul className="mt-6 flex flex-1 flex-col gap-2.5 text-[0.9375rem]">
                  {plan.features.map((feature) => (
                    <li className="flex items-start gap-2.5" key={feature}>
                      <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-left text-foreground/85">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <hr className="my-6 w-full border-border" />

                <a
                  className={cn(
                    "inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-base font-semibold no-underline transition-all duration-300",
                    plan.isPopular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border bg-background text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  )}
                  href={plan.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {plan.buttonText}
                </a>

                <p className="mt-5 text-xs leading-5 text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
