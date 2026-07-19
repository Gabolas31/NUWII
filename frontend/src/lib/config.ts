export const config = {
  pagination: {
    maxResultsPerPage: 20,
  },
  graphql: {
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  },
  website: {
    title: "NUWII",
    subtitle: "Contabilidade e Soluções Empresariais",
  },
  email: "contato@nuwii.com.br",
  // Formato internacional pra links wa.me funcionarem corretamente
  phoneNumber: "557131803161",
  formattedPhoneNumber: "+55 (71) 3180-3161",
  displayPhoneNumber: "(71) 3180-3161",
  instagram: "hub.nuwii",
  instagramUrl: "https://www.instagram.com/hub.nuwii/",
  cnpj: "66.785.560/0001-07",
  // Link pública do Google Calendar Appointment Schedule
  calendarUrl: "https://calendar.app.google/FWMKmtkkT4YHYcqX7",
  // Portal de cliente (Hub NUWII)
  clientPortalUrl: "https://portal.hubnuwii.com.br/",
  address: {
    street: "Av. Tancredo Neves, 2539",
    complement: "Sala 2609 · Edif. CEO Salvador Shopping, Torre Londres",
    neighborhood: "Caminho das Árvores",
    city: "Salvador",
    state: "BA",
    zip: "41820-021",
  },
};

// Helpers pra montar links de WhatsApp com mensagens prontas
export const waLink = (message: string) =>
  `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;

export const waMessages = {
  default: "Olá! Venho pelo site da NUWII e quero falar com o Corujão 🦉",
  openCompany: "Olá! Venho pelo site da NUWII e quero abrir minha empresa",
  changeAccountant: "Olá! Venho pelo site da NUWII e quero trocar de contador",
  planStart: "Olá! Tenho interesse no plano Business Start da NUWII",
  planUnique: "Olá! Tenho interesse no plano Business Unique da NUWII",
  planPlus: "Olá! Tenho interesse no plano Business Plus da NUWII",
  planStarter: "Olá! Tenho interesse no plano Business Starter da NUWII",
  virtualOffice: "Olá! Tenho interesse no serviço de Escritório Virtual da NUWII",
  virtualOfficeNumber: "Olá! Tenho interesse no serviço de Escritório Virtual + Número Virtual da NUWII",
  oneOffServices: "Olá! Preciso de um serviço avulso (declaração, parcelamento, regularização, etc)",
  irpf: "Olá! Quero fazer minha declaração de Imposto de Renda (IRPF) com a NUWII",
  planMeiStarter: "Olá! Tenho interesse no plano MEI Starter da NUWII",
  planMeiUnique: "Olá! Tenho interesse no plano MEI Unique da NUWII",
  planMeiAdvanced: "Olá! Tenho interesse no plano MEI Advanced da NUWII",
};
