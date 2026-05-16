import { waMessages } from "./config";

export interface MeiFeature {
  text: string;
  tooltip?: string;
  heading?: boolean;
}

export interface MeiPlan {
  name: string;
  title: string;
  description: string;
  price: number;
  daily: number;
  capacityNote: string;
  features: MeiFeature[];
  featured?: boolean;
  uniqueCopy?: boolean;
  whatsappMessage: string;
}

export const MEI_PLANS: MeiPlan[] = [
  {
    name: "Starter",
    title: "MEI Starter",
    description: "Pra MEI que quer pagar o DAS no automático e ter conta PJ sem complicação.",
    price: 59,
    daily: 2,
    capacityNote: "MEI · faturamento até R$ 81.000/ano",
    features: [
      { text: "O básico do MEI:", heading: true },
      {
        text: "Emissão mensal do DAS",
        tooltip:
          "Documento de Arrecadação do Simples Nacional — a guia mensal que o MEI paga (INSS + ICMS/ISS).",
      },
      { text: "Aplicativo de gestão de pagamentos" },
      { text: "Conta PJ digital inclusa" },
      { text: "Atendimento por WhatsApp em horário comercial" },
    ],
    whatsappMessage: waMessages.planMeiStarter,
  },
  {
    name: "Unique",
    title: "MEI Unique",
    description: "Pra MEI que quer ficar 100% regular sem se preocupar com prazos.",
    price: 79,
    daily: 3,
    capacityNote: "Mais escolhido por MEIs ativos",
    featured: true,
    uniqueCopy: true,
    features: [
      { text: "Tudo do Starter, mais:", heading: true },
      {
        text: "Declaração anual do MEI (DASN-SIMEI)",
        tooltip:
          "Declaração anual obrigatória entregue até 31/05 de cada ano, informando o faturamento do MEI no ano anterior.",
      },
      {
        text: "Regularização de débitos",
        tooltip:
          "Se você tem DAS atrasado ou pendências, a gente regulariza pra você ficar em dia com a Receita.",
      },
      {
        text: "1 alteração no MEI por ano",
        tooltip:
          "Mudança de atividade (CNAE), endereço, nome fantasia ou outros dados cadastrais. Sem cobrança extra.",
      },
      { text: "Lembrete de prazos no WhatsApp" },
    ],
    whatsappMessage: waMessages.planMeiUnique,
  },
  {
    name: "Advanced",
    title: "MEI Advanced",
    description: "Pra MEI que precisa de mais — emite NF, declara IRPF e fatura mais alto.",
    price: 129,
    daily: 4,
    capacityNote: "MEI próximo do teto · com IRPF",
    features: [
      { text: "Tudo do Unique, mais:", heading: true },
      {
        text: "Certificado Digital E-CNPJ A1",
        tooltip:
          "Identidade eletrônica do seu CNPJ — exigida pra emitir NFe, acessar e-CAC e operar em alguns sistemas governamentais.",
      },
      {
        text: "Declaração de Imposto de Renda (IRPF)",
        tooltip:
          "Sua declaração de IR pessoa física feita por contador. Cobre rendimentos do MEI e até 2 fontes adicionais.",
      },
      {
        text: "Conciliação bancária: 1 extrato",
        tooltip:
          "Cruzamento dos seus lançamentos com o extrato da conta PJ pra identificar divergências.",
      },
      { text: "Suporte prioritário no WhatsApp" },
    ],
    whatsappMessage: waMessages.planMeiAdvanced,
  },
];

/**
 * Feature matrix pra tabela de comparação na página dedicada do MEI.
 * Cada linha mostra uma feature e qual plano tem ela.
 */
export const MEI_COMPARISON: {
  feature: string;
  starter: boolean | string;
  unique: boolean | string;
  advanced: boolean | string;
  tooltip?: string;
}[] = [
  {
    feature: "Emissão mensal do DAS",
    starter: true,
    unique: true,
    advanced: true,
    tooltip: "Guia mensal do Simples Nacional (INSS + ICMS/ISS)",
  },
  {
    feature: "Aplicativo de gestão",
    starter: true,
    unique: true,
    advanced: true,
  },
  {
    feature: "Conta PJ digital",
    starter: true,
    unique: true,
    advanced: true,
  },
  {
    feature: "Atendimento por WhatsApp",
    starter: "Horário comercial",
    unique: "Horário comercial",
    advanced: "Prioritário",
  },
  {
    feature: "Lembretes de prazos",
    starter: false,
    unique: true,
    advanced: true,
  },
  {
    feature: "Declaração anual do MEI (DASN-SIMEI)",
    starter: false,
    unique: true,
    advanced: true,
    tooltip: "Declaração anual obrigatória, entregue até 31/05 de cada ano",
  },
  {
    feature: "Regularização de débitos",
    starter: false,
    unique: true,
    advanced: true,
    tooltip: "Acertar DAS atrasado, dívidas e pendências com a Receita",
  },
  {
    feature: "Alteração cadastral no MEI",
    starter: false,
    unique: "1 por ano",
    advanced: "Ilimitado",
    tooltip: "Mudança de atividade (CNAE), endereço, nome fantasia, etc",
  },
  {
    feature: "Certificado Digital E-CNPJ A1",
    starter: false,
    unique: false,
    advanced: true,
    tooltip: "Identidade eletrônica do CNPJ — exigida pra emitir NFe e acessar e-CAC",
  },
  {
    feature: "Declaração de IRPF",
    starter: false,
    unique: false,
    advanced: true,
    tooltip: "Sua declaração de Imposto de Renda Pessoa Física feita por contador",
  },
  {
    feature: "Conciliação bancária",
    starter: false,
    unique: false,
    advanced: "1 extrato",
    tooltip: "Cruzamento dos lançamentos com o extrato bancário pra achar divergências",
  },
];

/**
 * Perguntas frequentes sobre o MEI — pra seção FAQ da página dedicada.
 */
export const MEI_FAQ: { q: string; a: string }[] = [
  {
    q: "Quem pode ser MEI?",
    a: "Empreendedor que fatura até R$ 81.000 por ano, exerce uma das atividades permitidas pela lei, não tem participação em outra empresa como sócio ou titular, e tem no máximo 1 funcionário recebendo o salário mínimo ou o piso da categoria.",
  },
  {
    q: "Preciso de contador pra ser MEI?",
    a: "Pela lei, MEI não é obrigado a ter contador. Mas se você quer ficar tranquilo com prazos, declarações e regularizações sem ter que aprender contabilidade no YouTube, contratar um plano da NUWII tira essa carga das suas costas por menos de R$ 3/dia.",
  },
  {
    q: "O que acontece se eu não fizer a declaração anual (DASN-SIMEI)?",
    a: "A entrega da DASN-SIMEI é obrigatória até 31/05 de cada ano. Atrasar gera multa mínima de R$ 50. Não declarar por anos consecutivos pode levar ao cancelamento do CNPJ MEI pela Receita Federal.",
  },
  {
    q: "Meu DAS tá atrasado, vocês resolvem?",
    a: "Sim. Nos planos Unique e Advanced a gente faz a regularização de débitos: levanta o que tá em aberto, calcula juros, emite as guias atualizadas e te orienta sobre parcelamento se for o caso.",
  },
  {
    q: "Como funciona a alteração no MEI?",
    a: "Você pode mudar CNAE (atividade), endereço, nome fantasia e outros dados cadastrais. No plano Unique tá incluso 1 alteração por ano. No Advanced é ilimitado. Cada alteração leva entre 1 e 5 dias úteis pra ser processada no portal do MEI.",
  },
  {
    q: "Tem multa pra cancelar?",
    a: "Não. Você pode cancelar quando quiser, sem multa nem taxa de rescisão. O atendimento e os serviços continuam até o fim do mês já pago.",
  },
  {
    q: "Vou faturar mais de R$ 81.000, e agora?",
    a: "Quando você ultrapassa o teto do MEI, precisa virar Microempresa (ME) no Simples Nacional. A NUWII faz essa transição: orienta o desenquadramento, escolhe o melhor regime tributário, e migra você pra um dos planos Business (Start, Unique ou Plus).",
  },
];
