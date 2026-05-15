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
};
