import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

export type NavSubItem = {
  label: string;
  href: string;
  /** Selo curto à direita do rótulo, tipo "grátis". */
  badge?: string;
};

export type NavItem = {
  id: number;
  label: string;
  /** Item simples, sem submenu. */
  href?: string;
  subMenus?: {
    title: string;
    items: NavSubItem[];
  }[];
  /** Link do rodapé do submenu ("Ver todos os serviços"). */
  footer?: { label: string; href: string };
};

type Props = {
  navItems: NavItem[];
  className?: string;
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Usa <a> para link externo (WhatsApp) e <Link> para rota interna. */
function NavAnchor({
  children,
  className,
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  onClick?: () => void;
}) {
  if (isExternal(href)) {
    return (
      <a
        className={className}
        href={href}
        onClick={onClick}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href} onClick={onClick}>
      {children}
    </Link>
  );
}

export function DropdownNavigation({ navItems, className }: Props) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>();

  /** Pequeno atraso ao sair evita o menu piscar ao atravessar o vão entre o botão e o painel. */
  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };
  const close = () => setOpenMenu(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const triggerClass =
    "group relative flex cursor-pointer items-center justify-center gap-1 rounded-full px-4 py-2 text-[0.9375rem] font-medium text-foreground/75 no-underline transition-colors duration-200 hover:text-foreground focus-visible:text-foreground";

  return (
    <nav className={cn("relative", className)}>
      <ul className="relative flex items-center gap-0.5">
        {navItems.map((navItem) => {
          const isOpen = openMenu === navItem.label;

          return (
            <li
              className="relative"
              key={navItem.label}
              onMouseEnter={() => navItem.subMenus && open(navItem.label)}
              onMouseLeave={scheduleClose}
            >
              {navItem.subMenus ? (
                <button
                  aria-expanded={isOpen}
                  className={triggerClass}
                  onFocus={() => open(navItem.label)}
                  onMouseEnter={() => setHovered(navItem.id)}
                  onMouseLeave={() => setHovered(null)}
                  type="button"
                >
                  <span className="relative z-10">{navItem.label}</span>
                  <ChevronDown
                    className={cn(
                      "relative z-10 h-3.5 w-3.5 transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                  {(hovered === navItem.id || isOpen) && (
                    <motion.span
                      className="absolute inset-0 bg-primary/10"
                      layoutId="nav-hover"
                      style={{ borderRadius: 999 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </button>
              ) : (
                <NavAnchor className={triggerClass} href={navItem.href ?? "#"}>
                  <span
                    className="relative z-10"
                    onMouseEnter={() => setHovered(navItem.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {navItem.label}
                  </span>
                  {hovered === navItem.id && (
                    <motion.span
                      className="absolute inset-0 bg-primary/10"
                      layoutId="nav-hover"
                      style={{ borderRadius: 999 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </NavAnchor>
              )}

              <AnimatePresence>
                {isOpen && navItem.subMenus && (
                  <div
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                    onMouseEnter={() => open(navItem.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      className="overflow-hidden border border-border bg-background shadow-[0_24px_60px_-24px_rgba(15,25,41,.32)]"
                      exit={{ opacity: 0, y: -6 }}
                      initial={{ opacity: 0, y: -6 }}
                      style={{ borderRadius: 18 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex max-w-[calc(100vw-2rem)] gap-12 px-8 py-7">
                        {navItem.subMenus.map((sub) => (
                          <div key={sub.title}>
                            <h3 className="mb-4 whitespace-nowrap text-sm font-semibold text-foreground">
                              {sub.title}
                            </h3>
                            <ul className="space-y-3.5">
                              {sub.items.map((item) => (
                                <li key={item.label}>
                                  <NavAnchor
                                    className="group flex items-center gap-2 whitespace-nowrap text-[0.9375rem] text-muted-foreground no-underline transition-colors duration-200 hover:text-primary"
                                    href={item.href}
                                    onClick={close}
                                  >
                                    {item.label}
                                    {item.badge && (
                                      <span className="rounded-full bg-accent px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-accent-foreground">
                                        {item.badge}
                                      </span>
                                    )}
                                  </NavAnchor>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {navItem.footer && (
                        <div className="border-t border-border bg-muted/50 px-8 py-3.5">
                          <NavAnchor
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary no-underline hover:underline"
                            href={navItem.footer.href}
                            onClick={close}
                          >
                            {navItem.footer.label}
                            <span aria-hidden="true">→</span>
                          </NavAnchor>
                        </div>
                      )}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
