import { config } from "./config";
import { waLink, waMessages } from "./config";

export type ServiceCategory = "Espaço" | "Consultoria" | "Avulso";
export type ServiceCtaType = "whatsapp" | "calendar";

export interface Service {
  slug: string;
  category: ServiceCategory;
  title: string;
  shortDescription: string;
  longDescription: string;
  details?: string;
  bullets: string[];
  importante?: string;
  price: string;
  priceNote?: string;
  ctaType: ServiceCtaType;
  ctaLabel: string;
  ctaHref: string;
}

export const SERVICES: Service[] = [
  {
    slug: "escritorio-virtual",
    category: "Espaço",
    title: "Escritório Virtual",
    shortDescription:
      "Endereço comercial estratégico em Salvador pra sua empresa. Use no CNPJ, no cartão e nos sistemas — sem expor sua casa.",
    longDescription:
      "Tenha um endereço comercial profissional no coração de Salvador pra registrar sua empresa, receber correspondências e passar mais credibilidade pros seus clientes. Sua privacidade fica preservada, já que sua casa não vai pra cadastro público nenhum.",
    bullets: [
      "Endereço fiscal e comercial pra registro do CNPJ",
      "Recepção de correspondências com aviso por WhatsApp",
      "Privacidade total: sua casa fora dos cadastros públicos",
      "Mais profissionalismo no contato com clientes e fornecedores",
    ],
    price: "Sob consulta",
    ctaType: "whatsapp",
    ctaLabel: "Falar com Corujão",
    ctaHref: waLink(waMessages.virtualOffice),
  },
  {
    slug: "escritorio-virtual-numero",
    category: "Espaço",
    title: "Escritório Virtual + Número Virtual",
    shortDescription:
      "Endereço comercial + número de telefone exclusivo da empresa. Atendimento profissional separado do celular pessoal.",
    longDescription:
      "Combo completo: o mesmo endereço comercial profissional, mais um número de telefone virtual dedicado pra sua empresa. Garante mais privacidade, organização e profissionalismo no contato com clientes — você não precisa misturar com o seu número pessoal.",
    bullets: [
      "Endereço comercial em Salvador no seu CNPJ",
      "Número de telefone virtual dedicado pra empresa",
      "Atendimento separado do celular pessoal",
      "Recepção de correspondências com aviso por WhatsApp",
      "Mais privacidade, mais credibilidade",
    ],
    price: "Sob consulta",
    ctaType: "whatsapp",
    ctaLabel: "Falar com Corujão",
    ctaHref: waLink(waMessages.virtualOfficeNumber),
  },
  {
    slug: "consultoria-com-contador",
    category: "Consultoria",
    title: "Consultoria com Contador Especializado",
    shortDescription:
      "Consulta online + relatório personalizado pra tirar dúvidas e receber direcionamento estratégico.",
    longDescription:
      "Atendimento acolhedor e inclusivo com especialista em contabilidade pra esclarecer dúvidas e orientar você em questões que não exigem acompanhamento mensal. É um momento exclusivo pra tirar suas dúvidas e receber direcionamentos sobre abertura de empresa, regularização de CNPJ, regime tributário, enquadramento de CNAE, organização tributária, impostos, emissão de notas fiscais e mais.",
    bullets: [
      "Questionário pré-consulta pra otimizar o seu tempo",
      "Consulta online com contador especializado",
      "Orientações sobre regime tributário e obrigações fiscais",
      "Sugestões de economia tributária e boas práticas financeiras",
      "Resumo com plano de ação personalizado após a consulta",
    ],
    importante:
      "Durante a consulta não realizamos acessos a órgãos do governo nem execução de serviços práticos. Nosso objetivo é oferecer clareza, direcionamento e estratégias que você pode aplicar no seu negócio. Se precisar de um levantamento completo, recomendamos contratar o Check-up Contábil.",
    price: "R$ 300",
    priceNote: "Consulta online + relatório personalizado",
    ctaType: "calendar",
    ctaLabel: "Agendar",
    ctaHref: config.calendarUrl,
  },
  {
    slug: "consultoria-checkup",
    category: "Consultoria",
    title: "Consultoria + Check-up Contábil",
    shortDescription:
      "Diagnóstico completo da sua empresa: análise contábil, fiscal e financeira com plano de ação prático.",
    longDescription:
      "Uma consultoria completa e personalizada pra quem deseja entender a fundo a situação do seu negócio. Vamos analisar todos os aspectos contábeis, fiscais e financeiros pra construir um diagnóstico detalhado e entregar um plano de ação prático pra que sua empresa cresça de forma segura e organizada.",
    details:
      "Após o agendamento, em até 1 dia útil, nossa equipe entra em contato pra uma chamada de 15 minutos com orientações sobre como emitir a procuração no e-CAC. Essa procuração deve ser gerada por você e terá validade da data do pedido até o dia da consulta. Somente com ela conseguimos acessar a Receita Federal, levantar as informações fiscais e elaborar os relatórios.",
    bullets: [
      "Levantamento de débitos e pendências fiscais",
      "Planejamento tributário com simulações de regimes",
      "Planilha personalizada de precificação",
      "Análise de CNAEs e enquadramento correto da atividade",
      "Revisão de obrigações acessórias e impostos",
      "Sugestões de economia tributária e boas práticas",
      "Relatório detalhado com plano de ação passo a passo",
    ],
    importante:
      "O check-up é uma consultoria pontual, sem acompanhamento mensal. Se você precisa de execução contínua, contrate nossa assessoria contábil mensal. Pra serviços específicos não listados, orientamos contratar uma consultoria comum com orçamento avulso.",
    price: "R$ 780",
    priceNote: "Diagnóstico completo + relatório exclusivo",
    ctaType: "calendar",
    ctaLabel: "Agendar",
    ctaHref: config.calendarUrl,
  },
  {
    slug: "declaracao-irpf",
    category: "Avulso",
    title: "Declaração de Imposto de Renda (IRPF)",
    shortDescription:
      "Sua declaração anual de IR feita por contador. Você só manda os documentos, a gente cuida do resto.",
    longDescription:
      "Cuidamos da sua declaração de Imposto de Renda Pessoa Física do começo ao fim: coleta orientada dos documentos, conferência de comprovantes, análise das deduções disponíveis e envio pra Receita Federal. Você não precisa baixar programa, juntar canhotos antigos nem ficar com medo de errar.",
    details:
      "Como funciona: depois de fechar o pedido, mandamos uma lista de documentos que precisamos (informe de rendimentos, comprovantes de despesas dedutíveis, dados de bens, etc). Você envia tudo por WhatsApp ou e-mail. A gente prepara, te manda pra revisão, e só envia pra Receita depois da sua aprovação.",
    bullets: [
      "Coleta orientada dos documentos por WhatsApp",
      "Análise das deduções: educação, saúde, dependentes, previdência",
      "Cálculo da modalidade mais vantajosa (simples vs completa)",
      "Preenchimento e envio na Receita Federal",
      "Recibo de entrega arquivado em pasta digital",
      "Acompanhamento até liberação da restituição ou processamento",
    ],
    importante:
      "O valor base de R$ 200 cobre declarações simples (até 2 fontes de renda, sem bens complexos, sem aluguéis e sem aplicações em bolsa). Casos com múltiplas rendas, bens, aluguéis, ações ou outras especificidades têm orçamento exato após análise dos documentos.",
    price: "A partir de R$ 200",
    priceNote: "Orçamento exato após análise dos documentos",
    ctaType: "whatsapp",
    ctaLabel: "Falar com Corujão",
    ctaHref: waLink(waMessages.irpf),
  },
  {
    slug: "servicos-avulsos",
    category: "Avulso",
    title: "Serviços Avulsos",
    shortDescription:
      "Regularização fiscal, previdenciária, societária, contábil e tributária. Cada caso é planejado conforme sua necessidade.",
    longDescription:
      "Envio de declarações avulsas, parcelamento de débitos, emissão de guias, legalização de empresas, rotinas de departamento pessoal e muito mais. Tudo com atendimento individualizado, planejado de acordo com as suas necessidades.",
    bullets: [
      "Regularização fiscal, previdenciária e societária",
      "Parcelamento de débitos e emissão de guias",
      "Envio de declarações avulsas",
      "Rotinas pontuais de departamento pessoal",
      "Legalização de empresas",
      "Orçamento individualizado por demanda",
    ],
    price: "A partir de R$ 94",
    priceNote: "Orçamento por demanda",
    ctaType: "whatsapp",
    ctaLabel: "Falar com Corujão",
    ctaHref: waLink(waMessages.oneOffServices),
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);
