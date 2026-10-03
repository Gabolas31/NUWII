import * as React from "react";

import { cn } from "@/lib/utils";

/* ============================================================
   Timeline (shadcn / Origin UI) adaptada para o Tailwind 3.4
   deste projeto — os tokens (primary, border, muted-foreground)
   já apontam para a paleta NUWII em src/pages/global.css.
   ============================================================ */

type TimelineOrientation = "horizontal" | "vertical";

interface TimelineContextValue {
  activeStep: number;
  orientation: TimelineOrientation;
}

const TimelineContext = React.createContext<TimelineContextValue>({
  activeStep: 1,
  orientation: "vertical",
});

const useTimeline = () => React.useContext(TimelineContext);

const TimelineItemContext = React.createContext<{ step: number }>({ step: 1 });

const useTimelineItem = () => React.useContext(TimelineItemContext);

/** Um passo é "concluído" quando já passou pelo passo ativo. */
function useItemState() {
  const { activeStep } = useTimeline();
  const { step } = useTimelineItem();
  return { completed: step <= activeStep, active: step === activeStep };
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Último passo considerado concluído. */
  defaultValue?: number;
  /** Versão controlada de `defaultValue`. */
  value?: number;
  orientation?: TimelineOrientation;
}

export function Timeline({
  defaultValue = 1,
  value,
  orientation = "vertical",
  className,
  children,
  ...props
}: TimelineProps) {
  const activeStep = value ?? defaultValue;

  return (
    <TimelineContext.Provider value={{ activeStep, orientation }}>
      <div
        className={cn(
          "flex",
          orientation === "horizontal"
            ? "w-full flex-row items-stretch"
            : "flex-col",
          className
        )}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </TimelineContext.Provider>
  );
}

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
}

export function TimelineItem({
  step,
  className,
  children,
  ...props
}: TimelineItemProps) {
  const { orientation, activeStep } = useTimeline();
  const completed = step <= activeStep;

  return (
    <TimelineItemContext.Provider value={{ step }}>
      <div
        className={cn(
          "group/timeline-item relative flex flex-col",
          orientation === "horizontal"
            ? "flex-1 pe-6 [&:last-child]:pe-0"
            : "ps-9 [&:not(:last-child)]:pb-7",
          className
        )}
        data-completed={completed ? "" : undefined}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </TimelineItemContext.Provider>
  );
}

export function TimelineHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { orientation } = useTimeline();

  return (
    <div
      className={cn(
        // Horizontal: o trilho fica acima do texto, então o header precisa
        // ser o contexto de posicionamento e reservar essa faixa.
        // Vertical: o trilho corre na lateral do item inteiro, então o header
        // fica estático e o posicionamento cai no item.
        orientation === "horizontal" ? "relative pt-7" : "static",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** A linha que liga um passo ao próximo. Some no último item. */
export function TimelineSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { orientation } = useTimeline();
  const { completed } = useItemState();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute rounded-full transition-colors duration-300",
        "group-last/timeline-item:hidden",
        completed ? "bg-primary/30" : "bg-border",
        orientation === "horizontal"
          ? "-right-6 left-0 top-[7px] h-[2px]"
          : "bottom-0 left-[7px] top-[22px] w-[2px]",
        className
      )}
      {...props}
    />
  );
}

/** O ponto do passo. */
export function TimelineIndicator({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { orientation } = useTimeline();
  const { completed, active } = useItemState();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute flex size-4 items-center justify-center rounded-full border-2 transition-colors duration-300",
        completed
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background",
        active && "ring-4 ring-primary/15",
        orientation === "horizontal" ? "left-0 top-0" : "left-0 top-[3px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TimelineDate({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { completed } = useItemState();

  return (
    <span
      className={cn(
        "mb-1.5 block text-[0.6875rem] font-bold uppercase tracking-[0.12em] transition-colors duration-300",
        completed ? "text-primary" : "text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function TimelineTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-[1.0625rem] font-bold leading-[1.25] tracking-[-0.02em] text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function TimelineContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { orientation } = useTimeline();

  return (
    <p
      className={cn(
        "mt-2 text-[0.9rem] leading-[1.55] text-muted-foreground",
        orientation === "horizontal" ? "pe-2" : "",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
