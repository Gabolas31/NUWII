import { useState, useEffect, useRef } from "react";
import { Button, Box, Container, Grid, Typography } from "@mui/material";
import { Flex, Heading } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { 
  Speed as SpeedIcon,
  PersonOutline as PersonIcon,
  VisibilityOutlined as VisibilityIcon,
  ShieldOutlined as SecurityIcon,
  BusinessCenterOutlined as BusinessIcon,
  SwapHorizOutlined as SwapIcon,
  TrendingUpOutlined as TrendingIcon,
  AssessmentOutlined as AssessmentIcon,
  AccountBalanceOutlined as AccountIcon,
  ReceiptOutlined as ReceiptIcon,
  AddBusinessOutlined as AddBusinessIcon,
  CompareArrowsOutlined as CompareIcon,
  TransformOutlined as TransformIcon,
  DescriptionOutlined as DocumentIcon,
  CheckCircleOutlined as CheckIcon
} from "@mui/icons-material";

import { Image } from "@/components/shared";
import { BusinessColors } from "@/lib";

import styles from "./about.module.css";
import brazilImage from "./assets/brazil.png";
import heroImage from "./assets/hero2.jpg";
import teamImage from "./assets/team.svg";

// Hook para animações baseado no webdecoded
function useIntersectionObserver() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isIntersecting] as const;
}

// Componente de estatísticas animadas (sem delay)
function AnimatedCounter({ end, duration = 1500, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [ref, isIntersecting] = useIntersectionObserver();

  useEffect(() => {
    if (!isIntersecting) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Inicia imediatamente sem delay
    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isIntersecting]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Componente de card de benefício com animação
function BenefitCard({ icon: Icon, title, description, delay = 0 }: { icon: React.ElementType; title: string; description: string; delay?: number }) {
  const [ref, isIntersecting] = useIntersectionObserver();
  
  return (
    <div 
      ref={ref}
      className={`${styles.benefitCard} ${styles.animateOnScroll} ${isIntersecting ? styles.animated : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={styles.benefitIcon}>
        <Icon sx={{ fontSize: 24, color: BusinessColors.Primary }} />
      </div>
      <h3 className={styles.benefitTitle}>{title}</h3>
      <p className={styles.benefitDescription}>{description}</p>
    </div>
  );
}

export function About() {
  const [titleRef, titleIntersecting] = useIntersectionObserver();
  const [subtitleRef, subtitleIntersecting] = useIntersectionObserver();
  const [imageRef, imageIntersecting] = useIntersectionObserver();
  const [statsRef, statsIntersecting] = useIntersectionObserver();
  
  // Estado para controlar qual processo está ativo
  const [activeProcess, setActiveProcess] = useState<'abrir' | 'trocar' | 'migrar'>('abrir');

  // Dados dos processos
  const processData = {
    abrir: {
      title: "Uma contabilidade que te acompanha em cada momento",
      description: "Desde a escolha do melhor regime tributário para sua empresa até a rotina contábil do dia a dia, vamos cuidar de tudo para que você possa empreender com segurança e sem preocupações. Veja como é simples abrir sua empresa com a NUWII.",
      steps: [
        {
          title: "Consultoria especializada",
          description: "Nosso time de contadores ajudará você a escolher as melhores atividades, regime tributário e toda a estrutura para otimizar a contabilidade da sua empresa.",
          icon: AssessmentIcon
        },
        {
          title: "Registro da sua empresa",
          description: "Assumimos toda a parte burocrática e iniciamos o processo de registro da sua empresa, atualizando sobre todas as etapas do processo.",
          icon: BusinessIcon
        },
        {
          title: "Seu CNPJ está pronto!",
          description: "Após a validação com você e a prefeitura da sua cidade, sua empresa está registrada! Agora, nós assumimos a sua contabilidade e você pode focar no que importa: fazer a sua empresa crescer.",
          icon: ReceiptIcon
        }
      ]
    },
    trocar: {
      title: "Troque de contador com facilidade e segurança",
      description: "Migre sua contabilidade para a NUWII sem complicações. Nossa equipe especializada cuida de toda a transição, garantindo que sua empresa continue regularizada durante todo o processo.",
      steps: [
        {
          title: "Análise de informações",
          description: "Nossos contadores vão analisar as informações da sua empresa e, em até 24 horas, enviaremos um relatório completo, para que sua empresa esteja regularizada.",
          icon: AssessmentIcon
        },
        {
          title: "Envio de documentações",
          description: "Agora você só precisa enviar para nossos especialistas todas as documentações necessárias para assumirmos a sua contabilidade.",
          icon: SwapIcon
        },
        {
          title: "Tudo pronto!",
          description: "Agora sua contabilidade faz parte da NUWII! A partir de agora assumimos toda a parte burocrática e você pode focar no que importa: fazer a sua empresa crescer.",
          icon: TrendingIcon
        }
      ]
    },
    migrar: {
      title: "Migre de MEI para ME com tranquilidade",
      description: "Transforme seu MEI em Microempresa de forma segura e sem burocracias. Nossa equipe especializada cuida de todo o processo, garantindo que sua empresa cresça de forma regularizada.",
      steps: [
        {
          title: "Análise do seu MEI",
          description: "Você envia as informações da sua empresa, documentos e extrato de faturamento que nosso time de contadores vai avaliar a necessidade de migração do seu MEI.",
          icon: AssessmentIcon
        },
        {
          title: "Migração de MEI para ME",
          description: "Vamos definir qual melhor opção de enquadramento do seu CNPJ e realizar todo o processo de transformação do MEI para o ME. Você não precisa se preocupar com nada!",
          icon: SwapIcon
        },
        {
          title: "Seu novo CNPJ está pronto!",
          description: "Sua empresa já estará regularizada, sem chances de multas e surpresas. E, a partir de agora, você tem uma nova parceira para cuidar da sua contabilidade: a NUWII.",
          icon: AccountIcon
        }
      ]
    }
  };

  return (
    <>
      {/* Seção Principal - Layout com variações de fundo estilo Apple */}
      <Flex className={styles.root} direction={"column"} style={{ 
        background: 'linear-gradient(180deg, rgba(248, 249, 250, 1) 0%, rgba(255, 255, 255, 1) 20%, rgba(68, 203, 198, 0.02) 40%, rgba(68, 203, 198, 0.04) 60%, rgba(68, 203, 198, 0.02) 80%, rgba(255, 255, 255, 1) 100%)'
      }}>
        <Flex className={styles.container}>
          <div className={styles.mainLayout}>
            {/* Lado Esquerdo - Imagem da NUWII */}
            <div 
              ref={imageRef}
              className={`${styles.leftSection} ${styles.animateOnScroll} ${imageIntersecting ? styles.animated : ''}`}
            >
              <Image 
                className={styles.teamImage} 
                src="https://dunavit.com/public/product_development-600h.png" 
                alt="Equipe NUWII - Especialistas em contabilidade digital" 
              />
            </div>

          </div>
        </Flex>
      </Flex>

      {/* Quebra de Tom NUWII - Variações estilo Apple */}
      <Box
        sx={{
          position: 'relative',
          height: '120px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(248, 249, 250, 1) 25%, rgba(68, 203, 198, 0.03) 50%, rgba(248, 249, 250, 1) 75%, rgba(255, 255, 255, 1) 100%)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 30% 50%, rgba(68, 203, 198, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(161, 231, 229, 0.06) 0%, transparent 60%)',
            pointerEvents: 'none'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '20%',
            right: '20%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(68, 203, 198, 0.1) 25%, rgba(68, 203, 198, 0.3) 50%, rgba(68, 203, 198, 0.1) 75%, transparent 100%)'
          }
        }}
      >
        {/* Elemento central elegante */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Box
            sx={{
              width: '3px',
              height: '3px',
              background: BusinessColors.Primary,
              borderRadius: '50%',
              opacity: 0.6
            }}
          />
          <Box
            sx={{
              width: '40px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(68, 203, 198, 0.3) 50%, transparent 100%)'
            }}
          />
          <Box
            sx={{
              width: '6px',
              height: '6px',
              background: BusinessColors.Primary,
              borderRadius: '50%',
              opacity: 0.8,
              boxShadow: '0 0 0 2px rgba(68, 203, 198, 0.2)'
            }}
          />
          <Box
            sx={{
              width: '40px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(68, 203, 198, 0.3) 50%, transparent 100%)'
            }}
          />
          <Box
            sx={{
              width: '3px',
              height: '3px',
              background: BusinessColors.Primary,
              borderRadius: '50%',
              opacity: 0.6
            }}
          />
        </motion.div>
        
        {/* Elementos laterais sutis */}
        <motion.div
          animate={{
            y: [0, -3, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            left: '15%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '2px',
            height: '20px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(68, 203, 198, 0.3) 50%, transparent 100%)',
            borderRadius: '1px'
          }}
        />
        
        <motion.div
          animate={{
            y: [0, 3, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{
            position: 'absolute',
            right: '15%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '2px',
            height: '20px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(68, 203, 198, 0.3) 50%, transparent 100%)',
            borderRadius: '1px'
          }}
        />
      </Box>

      {/* Seção de Processo - Layout Exato da Agilize */}
      <Box 
        sx={{ 
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(248, 249, 250, 1) 15%, rgba(243, 244, 246, 1) 30%, rgba(248, 249, 250, 1) 50%, rgba(68, 203, 198, 0.02) 70%, rgba(248, 249, 250, 1) 85%, rgba(255, 255, 255, 1) 100%)',
          py: { xs: 6, md: 12 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 20% 20%, rgba(68, 203, 198, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(161, 231, 229, 0.03) 0%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Título e Descrição */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '1.5rem', md: '2.5rem' },
                  mb: 3,
                  color: '#111',
                  lineHeight: 1.2
                }}
              >
                Uma contabilidade que te acompanha em cada momento
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { xs: '0.9rem', md: '1.1rem' },
                  lineHeight: 1.7,
                  color: '#666',
                  mb: 4,
                  maxWidth: '800px',
                  mx: 'auto'
                }}
              >
                Desde a escolha do melhor regime tributário para sua empresa até a rotina contábil do dia a dia, vamos cuidar de tudo para que você possa empreender com segurança e sem preocupações. Veja como é simples ter uma contabilidade digital inteligente com a NUWII.
              </Typography>
            </Box>

            {/* Container Principal com Blur Effect e Fundo Vibrante */}
            <Box
              sx={{
                p: { xs: 3, md: 6 },
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(68, 203, 198, 0.05) 0%, rgba(161, 231, 229, 0.1) 50%, rgba(255, 255, 255, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(68, 203, 198, 0.2)',
                boxShadow: '0px 8px 32px rgba(68, 203, 198, 0.15), 0px 0px 4px 0px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
                maxWidth: '1200px',
                mx: 'auto',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 20% 20%, rgba(68, 203, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(161, 231, 229, 0.1) 0%, transparent 50%)',
                  pointerEvents: 'none',
                  zIndex: 0
                }
              }}
            >
              {/* Botões de Navegação - Layout Agilize */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 2,
                  mb: 4
                }}>
                  <Box sx={{ 
                    flex: 1,
                    p: { xs: 2, md: 6 },
                    borderRadius: { xs: '20px', md: '20px 20px 0 0' },
                    backgroundColor: activeProcess === 'abrir' ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: activeProcess === 'abrir' ? '0 8px 32px rgba(68, 203, 198, 0.15)' : '0 2px 8px rgba(0,0,0,0.05)',
                    border: activeProcess === 'abrir' ? '1px solid rgba(68, 203, 198, 0.2)' : '1px solid rgba(68, 203, 198, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: activeProcess === 'abrir' ? 'linear-gradient(135deg, rgba(68, 203, 198, 0.02) 0%, rgba(161, 231, 229, 0.05) 100%)' : 'transparent',
                      pointerEvents: 'none',
                      transition: 'all 0.4s ease'
                    }
                  }}>
                    <Button
                      onClick={() => setActiveProcess('abrir')}
                      sx={{
                        width: '100%',
                        borderRadius: '28px',
                        px: 4,
                        py: 2.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: { xs: '0.8rem', md: '1rem' },
                        backgroundColor: activeProcess === 'abrir' ? BusinessColors.Primary : '#ffffff',
                        color: activeProcess === 'abrir' ? '#ffffff' : '#2c3e50',
                        border: activeProcess === 'abrir' ? 'none' : '1px solid rgba(68, 203, 198, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2.5,
                        boxShadow: activeProcess === 'abrir' ? '0 6px 20px rgba(68, 203, 198, 0.25)' : '0 3px 12px rgba(0,0,0,0.08)',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          backgroundColor: activeProcess === 'abrir' ? BusinessColors.PrimaryDark : 'rgba(68, 203, 198, 0.08)',
                          transform: 'translateY(-3px)',
                          boxShadow: activeProcess === 'abrir' ? '0 8px 25px rgba(68, 203, 198, 0.35)' : '0 6px 20px rgba(68, 203, 198, 0.15)',
                          borderColor: activeProcess === 'abrir' ? 'transparent' : 'rgba(68, 203, 198, 0.3)'
                        }
                      }}
                    >
                      <Box sx={{
                        width: 28,
                        height: 28,
                        backgroundColor: activeProcess === 'abrir' ? '#ffffff' : BusinessColors.Primary,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: activeProcess === 'abrir' ? '0 3px 12px rgba(68, 203, 198, 0.2)' : '0 2px 6px rgba(68, 203, 198, 0.15)',
                        transition: 'all 0.3s ease'
                      }}>
                        <AddBusinessIcon sx={{ 
                          color: activeProcess === 'abrir' ? BusinessColors.Primary : '#ffffff', 
                          fontSize: '18px' 
                        }} />
                      </Box>
                      Abrir empresa
                    </Button>
                  </Box>
                  
                  <Box sx={{ 
                    flex: 1,
                    p: { xs: 2, md: 6 },
                    borderRadius: { xs: '20px', md: '20px 20px 0 0' },
                    backgroundColor: activeProcess === 'trocar' ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: activeProcess === 'trocar' ? '0 8px 32px rgba(68, 203, 198, 0.15)' : '0 2px 8px rgba(0,0,0,0.05)',
                    border: activeProcess === 'trocar' ? '1px solid rgba(68, 203, 198, 0.2)' : '1px solid rgba(68, 203, 198, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: activeProcess === 'trocar' ? 'linear-gradient(135deg, rgba(68, 203, 198, 0.02) 0%, rgba(161, 231, 229, 0.05) 100%)' : 'transparent',
                      pointerEvents: 'none',
                      transition: 'all 0.4s ease'
                    }
                  }}>
                    <Button
                      onClick={() => setActiveProcess('trocar')}
                      sx={{
                        width: '100%',
                        borderRadius: '28px',
                        px: 4,
                        py: 2.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: { xs: '0.8rem', md: '1rem' },
                        backgroundColor: activeProcess === 'trocar' ? BusinessColors.Primary : '#ffffff',
                        color: activeProcess === 'trocar' ? '#ffffff' : '#2c3e50',
                        border: activeProcess === 'trocar' ? 'none' : '1px solid rgba(68, 203, 198, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2.5,
                        boxShadow: activeProcess === 'trocar' ? '0 6px 20px rgba(68, 203, 198, 0.25)' : '0 3px 12px rgba(0,0,0,0.08)',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          backgroundColor: activeProcess === 'trocar' ? BusinessColors.PrimaryDark : 'rgba(68, 203, 198, 0.08)',
                          transform: 'translateY(-3px)',
                          boxShadow: activeProcess === 'trocar' ? '0 8px 25px rgba(68, 203, 198, 0.35)' : '0 6px 20px rgba(68, 203, 198, 0.15)',
                          borderColor: activeProcess === 'trocar' ? 'transparent' : 'rgba(68, 203, 198, 0.3)'
                        }
                      }}
                    >
                      <Box sx={{
                        width: 28,
                        height: 28,
                        backgroundColor: activeProcess === 'trocar' ? '#ffffff' : BusinessColors.Primary,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: activeProcess === 'trocar' ? '0 3px 12px rgba(68, 203, 198, 0.2)' : '0 2px 6px rgba(68, 203, 198, 0.15)',
                        transition: 'all 0.3s ease'
                      }}>
                        <CompareIcon sx={{ 
                          color: activeProcess === 'trocar' ? BusinessColors.Primary : '#ffffff', 
                          fontSize: '18px' 
                        }} />
                      </Box>
                      Trocar de contador
                    </Button>
                  </Box>
                  
                  <Box sx={{ 
                    flex: 1,
                    p: { xs: 2, md: 6 },
                    borderRadius: { xs: '20px', md: '20px 20px 0 0' },
                    backgroundColor: activeProcess === 'migrar' ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: activeProcess === 'migrar' ? '0 8px 32px rgba(68, 203, 198, 0.15)' : '0 2px 8px rgba(0,0,0,0.05)',
                    border: activeProcess === 'migrar' ? '1px solid rgba(68, 203, 198, 0.2)' : '1px solid rgba(68, 203, 198, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: activeProcess === 'migrar' ? 'linear-gradient(135deg, rgba(68, 203, 198, 0.02) 0%, rgba(161, 231, 229, 0.05) 100%)' : 'transparent',
                      pointerEvents: 'none',
                      transition: 'all 0.4s ease'
                    }
                  }}>
                    <Button
                      onClick={() => setActiveProcess('migrar')}
                      sx={{
                        width: '100%',
                        borderRadius: '28px',
                        px: 4,
                        py: 2.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: { xs: '0.8rem', md: '1rem' },
                        backgroundColor: activeProcess === 'migrar' ? BusinessColors.Primary : '#ffffff',
                        color: activeProcess === 'migrar' ? '#ffffff' : '#2c3e50',
                        border: activeProcess === 'migrar' ? 'none' : '1px solid rgba(68, 203, 198, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2.5,
                        boxShadow: activeProcess === 'migrar' ? '0 6px 20px rgba(68, 203, 198, 0.25)' : '0 3px 12px rgba(0,0,0,0.08)',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          backgroundColor: activeProcess === 'migrar' ? BusinessColors.PrimaryDark : 'rgba(68, 203, 198, 0.08)',
                          transform: 'translateY(-3px)',
                          boxShadow: activeProcess === 'migrar' ? '0 8px 25px rgba(68, 203, 198, 0.35)' : '0 6px 20px rgba(68, 203, 198, 0.15)',
                          borderColor: activeProcess === 'migrar' ? 'transparent' : 'rgba(68, 203, 198, 0.3)'
                        }
                      }}
                    >
                      <Box sx={{
                        width: 28,
                        height: 28,
                        backgroundColor: activeProcess === 'migrar' ? '#ffffff' : BusinessColors.Primary,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: activeProcess === 'migrar' ? '0 3px 12px rgba(68, 203, 198, 0.2)' : '0 2px 6px rgba(68, 203, 198, 0.15)',
                        transition: 'all 0.3s ease'
                      }}>
                        <TransformIcon sx={{ 
                          color: activeProcess === 'migrar' ? BusinessColors.Primary : '#ffffff', 
                          fontSize: '18px' 
                        }} />
                      </Box>
                      Migrar de MEI para ME
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* Conteúdo Dinâmico - Layout Horizontal Agilize */}
              <Box
                sx={{
                  p: { xs: 3, md: 6 },
                  borderRadius: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(68, 203, 198, 0.1)',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <motion.div
                  key={activeProcess}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Processo Horizontal - Estilo Agilize */}
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', lg: 'row' },
                    gap: { xs: 3, lg: 4 },
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    pt: 2
                  }}>
                    {processData[activeProcess].steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: { xs: 'row', lg: 'column' },
                          alignItems: { xs: 'flex-start', lg: 'center' },
                          width: { xs: '100%', lg: '300px' },
                          gap: { xs: 2, lg: 0 }
                        }}>
                          {/* Círculo com ícone */}
                          <Box sx={{ 
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Box
                              sx={{
                                width: { xs: 48, lg: 80 },
                                height: { xs: 48, lg: 80 },
                                backgroundColor: BusinessColors.Primary,
                                border: '4px solid #e0e0e0',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                zIndex: 20
                              }}
                            >
                              <step.icon
                                sx={{
                                  color: '#fff',
                                  fontSize: { xs: '1.5rem', lg: '2rem' }
                                }}
                              />
                            </Box>
                            
                            {/* Número lateral (desktop) */}
                            <Box sx={{
                              display: { xs: 'none', lg: 'flex' },
                              position: 'absolute',
                              right: '-40px',
                              height: '32px',
                              width: '48px',
                              borderRadius: '0 16px 16px 0',
                              backgroundColor: '#f0f0f0',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              pr: 1.5,
                              zIndex: 5
                            }}>
                              <Typography sx={{ 
                                fontWeight: 700, 
                                fontSize: '1rem',
                                color: '#333'
                              }}>
                                {index + 1}
                              </Typography>
                            </Box>
                            
                            {/* Linha conectora (desktop) */}
                            {index < processData[activeProcess].steps.length - 1 && (
                              <Box sx={{
                                display: { xs: 'none', lg: 'block' },
                                position: 'absolute',
                                top: '40px',
                                left: '80px',
                                width: '220px',
                                height: '2px',
                                backgroundColor: '#e0e0e0',
                                zIndex: 0
                              }} />
                            )}
                          </Box>

                          {/* Conteúdo da etapa */}
                          <Box sx={{ 
                            ml: { xs: 2, lg: 0 },
                            mt: { xs: 0, lg: 2 },
                            textAlign: { xs: 'left', lg: 'center' }
                          }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 700, 
                                mb: 1, 
                                color: '#111',
                                fontSize: { xs: '0.9rem', lg: '1.1rem' }
                              }}
                            >
                              {step.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: '#666',
                                lineHeight: 1.6,
                                fontSize: { xs: '0.8rem', lg: '1rem' }
                              }}
                            >
                              {step.description}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Seção Final - NUWII em Números - Estilo Judit Simples */}
      <Box 
        sx={{ 
          backgroundColor: '#111',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 6,
            alignItems: 'center'
          }}>
            {/* Conteúdo Textual */}
            <Box sx={{ flex: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    mb: 3,
                    color: '#fff',
                    lineHeight: 1.2
                  }}
                >
                  Transformamos{' '}
                  <span style={{ color: BusinessColors.Primary }}>
                    contabilidade em crescimento
                  </span>
                  {' '}para o seu negócio.
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    color: '#ccc',
                    mb: 4,
                    maxWidth: '500px'
                  }}
                >
                  Nossa coruja especialista cuida de toda a burocracia, números e estratégias contábeis,{' '}
                  <span style={{ color: BusinessColors.Primary }}>
                    liberando você para focar no que realmente importa: fazer sua empresa voar alto
                  </span>.
                </Typography>
              </motion.div>
            </Box>

            {/* Imagem */}
            <Box sx={{ flex: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: { xs: '300px', md: '400px' },
                    position: 'relative',
                    overflow: 'visible'
                  }}
                >
                  <img 
                    src="/corujua.png" 
                    alt="Mascote Coruja NUWII" 
                    style={{
                      maxWidth: '280px',
                      width: '100%',
                      height: 'auto',
                      filter: 'drop-shadow(0 8px 24px rgba(68, 203, 198, 0.3))'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div style="
                            width: 280px;
                            height: 280px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            color: #44cbc6;
                            font-size: 3rem;
                            font-weight: bold;
                            border-radius: 50%;
                            background: linear-gradient(135deg, rgba(68, 203, 198, 0.1) 0%, rgba(161, 231, 229, 0.05) 100%);
                            box-shadow: 0 8px 24px rgba(68, 203, 198, 0.3);
                          ">
                            <div style="font-size: 5rem; margin-bottom: 1rem;">🦉</div>
                            <div style="font-size: 1.5rem; text-align: center; background: linear-gradient(135deg, #44cbc6, #a1e7e5); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">NUWII</div>
                          </div>
                        `;
                      }
                    }}
                  />
                </Box>
              </motion.div>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}