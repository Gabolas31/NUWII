import { CenterFocusStrong as CenterFocusStrongIcon, InfoOutline as InfoOutlineIcon } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button,Card, CardContent, List, ListItem, ListItemIcon, ListItemText,
Typography  } from '@mui/material';
import { green } from '@mui/material/colors';
import { Flex } from "@radix-ui/themes";
// import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { BusinessColors, config } from "@/lib";

// import person1Image from "./assets/juliana.png"
// import person2Image from "./assets/nadja.png"
import styles from "./plans.module.css";

// Lista de planos por categoria
const servicoPlans = [
  {
    title: "Business Standard",
    features: [
      'Abertura de empresa grátis',
      'Atendimento via WhatsApp',
      'Contabilidade completa',
      'Relatórios contábeis',
      'Conta PJ gratuita',
      'Aplicativo e portal do cliente (web)',
    ],
    info: "Ideal para quem está começando ou quer uma contabilidade simples e eficiente.",
    description: "Para quem quer resolver a contabilidade com agilidade e autonomia."
  },
  {
    title: "Business Unique",
    features: [
      'Tudo do plano Standard, mais:',
      'Certificado digital grátis',
      'Emissão de notas fiscais: até 5 NFs/mês',
      'Pró-labore: 1 sócio',
      'Endereço fiscal',
    ],
    info: "Perfeito para quem já tem operação rodando e quer mais estrutura sem ir para um plano avançado.",
    description: "Para empresas em crescimento que precisam de mais apoio no dia a dia.",
    isHighlighted: true
  },
  {
    title: "Business Plus",
    features: [
      'Tudo do plano Unique, mais:',
      'Atendimento telefônico',
      'Reunião mensal via Meet ou Zoom',
      'Consultoria contábil com especialistas',
      'Emissão de notas fiscais: até 20 NFs/mês',
      'Pró-labore: 2 sócios',
      'Folha de pagamento: até 2 funcionários grátis',
      'Endereço fiscal',
      'Gerente de conta exclusivo',
    ],
    info: "Indicado para quem precisa de acompanhamento constante e visão financeira mais estratégica.",
    description: "Para empresas com operação maior e demandas financeiras mais frequentes."
  },
];

const comercioPlans = [
  {
    title: "Commerce Standard",
    features: [
      'Abertura de empresa grátis',
      'Atendimento via WhatsApp',
      'Contabilidade completa',
      'Relatórios contábeis',
      'Conta PJ gratuita',
      'Aplicativo e portal do cliente (web)',
    ],
    info: "Ideal para quem está começando ou quer uma contabilidade simples e eficiente.",
    description: "Para quem quer resolver a contabilidade com agilidade e autonomia."
  },
  {
    title: "Commerce Unique",
    features: [
      'Tudo do plano Standard, mais:',
      'Certificado digital grátis',
      'Emissão de notas fiscais: até 5 NFs/mês',
      'Pró-labore: 1 sócio',
      'Endereço fiscal',
    ],
    info: "Perfeito para quem já tem operação rodando e quer mais estrutura sem ir para um plano avançado.",
    description: "Para empresas em crescimento que precisam de mais apoio no dia a dia.",
    isHighlighted: true
  },
  {
    title: "Commerce Plus",
    features: [
      'Tudo do plano Unique, mais:',
      'Atendimento telefônico',
      'Reunião mensal via Meet ou Zoom',
      'Consultoria contábil com especialistas',
      'Emissão de notas fiscais: até 20 NFs/mês',
      'Pró-labore: 2 sócios',
      'Folha de pagamento: até 2 funcionários grátis',
      'Endereço fiscal',
      'Gerente de conta exclusivo',
    ],
    info: "Indicado para quem precisa de acompanhamento constante e visão financeira mais estratégica.",
    description: "Para empresas com operação maior e demandas financeiras mais frequentes."
  },
];

const otherPlans = [
  {
    title: "CARNÊ LEÃO",
    features: [
      'INSS do profissional',
      'Contabilidade completa',
      'Abertura ou migração grátis',
      'Baixa do MEI grátis (pra quem está com atividade irregular no MEI e quer mudar pra modelo autônomo)',
      'Apuração de impostos e calendário',
      'Aplicativo e portal do cliente web',
    ],
    info: "Plano ideal para Autônomo PF com rendimentos até R$81 mil/ano."
  },
  {
    title: "PERSONALIZADO",
    features: [
      'Lucro Presumido ou Lucro Real',
      'Analista dedicado por departamento',
      'Contabilidade completa',
      'Abertura ou migração grátis',
      'Planejamento tributário grátis',
      'Apuração de impostos e calendário',
      'Aplicativo e portal do cliente web',
    ],
    info: "Para empresas com faturamento acima do limite dos planos. Suporte personalizado."
  }
];

// function highlightText(text: string, substrings: string[]) {
//   if (!substrings || substrings.length === 0) return text;

//   const pattern = substrings
//     .map(str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
//     .join('|');
//   const regex = new RegExp(`(${pattern})`, 'gi');

//   return text.split(regex).map((part, i) =>
//     substrings.some(sub =>
//       part.toLowerCase() === sub.toLowerCase()
//     ) ? (
//       <strong key={i} style={{color: BusinessColors.Blue}}>{part}</strong>
//     ) : (
//       part
//     )
//   );
// }

function highlightTextBold(text: string, substrings: string[]) {
  if (!substrings || substrings.length === 0) return text;

  const pattern = substrings
    .map(str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');

  return text.split(regex).map((part, i) =>
    substrings.some(sub =>
      part.toLowerCase() === sub.toLowerCase()
    ) ? (
      <strong key={i} style={{fontWeight: "bold"}}>{part}</strong>
    ) : (
      part
    )
  );
}

interface CardPlanProps {
  title: string;
  items: string[];
  info: string;
  description?: string;
  isHighlighted?: boolean;
}

const CardPlan: React.FC<CardPlanProps> = ({ title, items, info, description, isHighlighted }) => {
  const message = `Olá! Venho pelo site da NUWII e estou interessado(a) no plano ${title}.`;
  const whatsappLink = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Card
      className={`${styles.planCard} ${isHighlighted ? styles.planCardHighlighted : ''}`}
      sx={{
        position: 'relative',
        borderRadius: 3,
        border: isHighlighted ? `2px solid ${BusinessColors.Primary}` : '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: isHighlighted 
          ? `0 4px 16px rgba(68, 203, 198, 0.15)` 
          : '0 2px 8px rgba(0, 0, 0, 0.08)',
        overflow: 'visible',
      }}
    >
      {isHighlighted && (
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: BusinessColors.Primary,
            color: 'white',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            zIndex: 2,
            letterSpacing: '0.05em',
          }}
        >
          DESTAQUE
        </Box>
      )}
      
      <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
        {/* Title */}
        <Typography 
          variant="h5" 
          align="center" 
          color={BusinessColors.Primary} 
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          {title}
        </Typography>

        {/* Description */}
        {description && (
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              color: 'var(--color-gray-600)', 
              mb: 2,
              fontSize: '0.9rem',
              lineHeight: 1.5
            }}
          >
            {description}
          </Typography>
        )}

        {/* Info */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            mb: 3,
            p: 1.5,
            bgcolor: 'var(--color-gray-50)',
            borderRadius: 1,
          }}
        >
          <InfoOutlineIcon sx={{ fontSize: "16px", color: BusinessColors.Primary, mr: 1, mt: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'var(--color-gray-700)', fontSize: '0.85rem', lineHeight: 1.5 }}>
            {info}
          </Typography>
        </Box>

        {/* Features List */}
        <List sx={{ flexGrow: 1, py: 0 }}>
          {items.map((item, index) => {
            const isHeader = item.startsWith('Tudo do plano');
            return (
              <ListItem 
                key={index} 
                disableGutters
                sx={{ 
                  py: 0.5,
                  alignItems: isHeader ? 'flex-start' : 'flex-start'
                }}
              >
                {!isHeader && (
                  <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}>
                    <CheckCircleIcon sx={{ color: green[500], fontSize: '20px' }} />
                  </ListItemIcon>
                )}
                <ListItemText 
                  primary={item}
                  sx={{
                    fontWeight: isHeader ? 600 : 400,
                    color: isHeader ? BusinessColors.Primary : 'var(--color-gray-700)',
                    fontSize: isHeader ? '0.9rem' : '0.875rem',
                    '& .MuiListItemText-primary': {
                      fontSize: isHeader ? '0.9rem' : '0.875rem',
                      lineHeight: 1.5,
                    }
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>

      {/* Footer with Button */}
      <Box 
        sx={{ 
          bgcolor: BusinessColors.Primary,
          p: 2,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          href={whatsappLink}
          target="_blank"
          endIcon={<CenterFocusStrongIcon/>}
          sx={{ 
            backgroundColor: "#fff", 
            color: "#000", 
            border: '1px solid #000',
            borderRadius: "30px",
            textTransform: 'uppercase',
            fontWeight: 600,
            fontSize: '0.875rem',
            '&:hover': {
              backgroundColor: 'var(--color-gray-50)',
            }
          }}
        >
          Saiba mais
        </Button>
      </Box>
    </Card>
  );
};

// interface RecommendationCardProps {
//   photo: StaticImageData;
//   name: string;
//   title: string;
//   text: string;
// }

// const RecommendationCard: React.FC<RecommendationCardProps> = ({ photo, title, name, text }) => {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         backgroundColor: '#1c1c1e',
//         color: '#fff',
//         borderRadius: '12px',
//         padding: '32px 24px 48px',
//         border: '1px solid #444',
//         position: 'relative',
//         maxWidth: 400,
//         boxShadow: '0 0 10px 0 #1976d2',
//         animation: 'shadow-move 2s ease-in-out infinite alternate',
//         '@keyframes shadow-move': {
//           '0%': {
//             boxShadow: '0 0 15px 0 #1976d2',
//           },
//           '100%': {
//             boxShadow: '0 0 15px 3px #1976d2',
//           },
//         },
//       }}
//     >
//       {/* Aspas */}
//       <Box sx={{ fontSize: 120, color: '#fff', position: 'absolute', top: -20, left: 16 }}>
//         “
//       </Box>

//       {/* Título */}
//       <Typography variant="h6" fontWeight="bold" sx={{ mt: 4 }}>
//         {title}
//       </Typography>

//       {/* Texto */}
//       <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
//         {text}
//       </Typography>

//       {/* Rodapé com imagem e nome */}
//       <Box
//         sx={{
//           position: 'absolute',
//           bottom: -24,
//           left: '50%',
//           transform: 'translateX(-50%)',
//           backgroundColor: '#1c1c1e',
//           border: '1px solid #444',
//           borderRadius: '999px',
//           padding: '4px 12px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: 1,
//         }}
//       >
//         <Image
//           src={photo}
//           alt={name}
//           width={24}
//           height={24}
//           style={{ borderRadius: '50%' }}
//         />
//         <Typography variant="caption" color="#b19cd9">@{name}</Typography>
//       </Box>
//     </Paper>
//   );
// };

const GradientBar: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '8px',
        borderRadius: '8px',
        background: 'linear-gradient(90deg, #00CFE8, #5F6DF8, #C636F8)',
      }}
    />
  );
};


export function Plans() {
  const [selectedType, setSelectedType] = React.useState<'servico' | 'comercio'>('servico');

  return (
    <Flex className={styles.root}>
      <Flex className={styles.container}>
        <div className={styles.headerSection}>
          <h2 className={styles.mainTitle}>
            Escolha o plano que melhor se adequa à sua necessidade!
          </h2>
          <p className={styles.mainDescription}>
            Planos completos, com suporte humano e tecnologia para simplificar sua rotina. Escolha o que mais faz sentido para você:
          </p>
          
          {/* Toggle Selector */}
          <div className={styles.toggleContainer}>
            <button
              className={`${styles.toggleButton} ${selectedType === 'servico' ? styles.toggleActive : ''}`}
              onClick={() => setSelectedType('servico')}
            >
              Serviço
            </button>
            <button
              className={`${styles.toggleButton} ${selectedType === 'comercio' ? styles.toggleActive : ''}`}
              onClick={() => setSelectedType('comercio')}
            >
              Comércio
            </button>
          </div>
        </div>
        <Flex className={styles.plansContainer}>
          {(selectedType === 'servico' ? servicoPlans : comercioPlans).map((plan, index) => (
            <CardPlan 
              key={index} 
              title={plan.title} 
              items={plan.features} 
              info={plan.info}
              description={plan.description}
              isHighlighted={plan.isHighlighted}
            />
          ))}
        </Flex>
        <Flex style={{marginTop: "70px", width: "100%", alignItems: "center", justifyContent: "center"}}>
          <div style={{width: "60%"}}>
            <GradientBar/>
          </div>
        </Flex>
        {/* <Flex className={styles.recommendationComponent}>
          <RecommendationCard
            photo={person1Image}
            name="Ju.fraccaroli"
            title="Atendimento Ágil e de Confiança"
            text={`Ter uma equipe dedicada para atender e cuidando da minha empresa, sem precisar enfrentar filas ou passar por várias pessoas até encontrar ajuda de verdade.\nEssa é a diferença da contabilidade que tenho hoje, fazem toda a diferença. Recomendo de olhos fechados!`}
          />
          <RecommendationCard
            photo={person2Image}
            name="profanadjaarruda"
            title="Contabilidade Organizada e Humanizada"
            text={`Meu nome é Nadja, sou cliente da NUWII A há 2 anos e foi o Gabriel junto com sua equipe que organizou tooooda a contabilidade da minha empresa. Começamos na modalidade MEI e hoje já somos uma ME, com tudo perfeitamente organizado. Se pudesse recomendar algo a qualquer empresário seria, sem dúvidas, um suporte de contabilidade como eu tenho. Nunca, nesses 2 anos, precisei resolver nenhuma burocracia com relação a impostos ou taxas. O pessoal da NUWII organiza todos os processos e me deixa super tranquila com relação a essa parte tão chata que é a contabilidade de qualquer empresa. Obrigada, de coração, pelo excelente serviço prestado.`}
          />
        </Flex> */}
      </Flex>
    </Flex>
  );
}
