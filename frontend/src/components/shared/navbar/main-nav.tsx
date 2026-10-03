import {
  DropdownNavigation,
  type NavItem,
} from "@/components/ui/dropdown-navigation";
import { getServiceBySlug, waLink, waMessages } from "@/lib";

/** Título dos serviços vem de src/lib/services-data.ts, para não duplicar texto. */
const service = (slug: string) => ({
  label: getServiceBySlug(slug)?.title ?? slug,
  href: `/servicos/${slug}`,
});

const NAV_ITEMS: NavItem[] = [
  { id: 1, label: "Início", href: "/" },
  {
    id: 2,
    label: "Serviços",
    footer: { label: "Ver todos os serviços", href: "/servicos" },
    subMenus: [
      {
        title: "Serviços de contabilidade:",
        items: [
          { label: "Abrir empresa", href: "/servicos/abrir-empresa" },
          {
            label: "Trocar de contador",
            href: waLink(waMessages.changeAccountant),
            badge: "grátis",
          },
          { label: "Contabilidade completa", href: "/contabilidade-completa" },
          { label: "Sou MEI", href: "/planos/mei" },
        ],
      },
      {
        title: "Para sua empresa:",
        items: [
          service("certificado-digital"),
          service("escritorio-virtual"),
          service("escritorio-virtual-numero"),
          service("servicos-avulsos"),
        ],
      },
      {
        title: "Consultoria:",
        items: [
          { ...service("consultoria-com-contador"), label: "Consultoria com Contador" },
          { ...service("consultoria-checkup"), label: "Check-up Contábil" },
          { ...service("declaracao-irpf"), label: "Declaração de IRPF" },
        ],
      },
    ],
  },
  { id: 3, label: "Planos", href: "/#plans" },
];

export function MainNav() {
  return <DropdownNavigation navItems={NAV_ITEMS} />;
}
