import { waMessages } from "./config";

export type BusinessPlan = {
  name: string;
  title: string;
  description: string;
  priceServico: number;
  priceComercio: number;
  dailyServico: number;
  dailyComercio: number;
  capacityNote: string;
  features: { text: string; tooltip?: string; heading?: boolean }[];
  featured?: boolean;
  uniqueCopy?: boolean;
  whatsappMessage: string;
};

export const BUSINESS_PLANS: BusinessPlan[] = [
  {
    name: "Start",
    title: "Business Start",
    description: "Pra empresa que fatura até R$ 20 mil/mês e quer o essencial bem feito.",
    priceServico: 397,
    priceComercio: 497,
    dailyServico: 13,
    dailyComercio: 17,
    capacityNote: "Faturamento ideal até R$ 20.000",
    features: [
      { text: "Contabilidade completa" },
      { text: "Conta Digital PJ + Maquininha de cartão" },
      {
        text: "Certificado digital A1 incluso",
        tooltip:
          "Certificado digital (e-CNPJ A1) é sua identidade eletrônica — usada para assinar documentos e acessar sistemas com validade jurídica.",
      },
      { text: "Painel contábil completo" },
      { text: "Atendimento WhatsApp, telefone, e-mail e chat" },
    ],
    whatsappMessage: waMessages.planStart,
  },
  {
    name: "Unique",
    title: "Business Unique",
    description: "Pra empresa crescendo: consultoria, conciliação e gestão de certidões.",
    priceServico: 497,
    priceComercio: 597,
    dailyServico: 17,
    dailyComercio: 20,
    capacityNote: "Faturamento ideal até R$ 60.000",
    featured: true,
    uniqueCopy: true,
    features: [
      { text: "Tudo do Start, mais:", heading: true },
      { text: "Consultoria contábil com Contador" },
      {
        text: "Conciliação financeira automática",
        tooltip:
          "Cruzamento automático entre seus lançamentos e o extrato bancário, identificando divergências.",
      },
      { text: "Importação de extrato: até 2 contas" },
      { text: "Pró-labore: 1 folha" },
      { text: "Gestão de certidões" },
    ],
    whatsappMessage: waMessages.planUnique,
  },
  {
    name: "Plus",
    title: "Business Plus",
    description: "Pra empresa com sócios, funcionários e movimento mensal alto.",
    priceServico: 856,
    priceComercio: 997,
    dailyServico: 29,
    dailyComercio: 33,
    capacityNote: "Operação avançada · atendimento prioritário",
    features: [
      { text: "Tudo do Unique, mais:", heading: true },
      { text: "Pró-labore: 2 folhas + até 3 funcionários" },
      { text: "Emissão de até 10 NFs de serviço" },
      { text: "Abertura ou alteração contratual incluída" },
      { text: "Gestão de parcelamentos e acordos" },
      { text: "Apoio contábil pra preenchimento de documentos" },
      {
        text: "Serviços prioritários",
        tooltip:
          "Atendimento WhatsApp até 22h e demandas executadas com prazo reduzido.",
      },
      { text: "Importação de extrato: até 3 contas" },
      { text: "Balanço e DRE" },
    ],
    whatsappMessage: waMessages.planPlus,
  },
];

