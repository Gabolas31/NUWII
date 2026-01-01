import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Container, Divider,Grid, IconButton, Paper, Typography } from '@mui/material';

import { Image } from "@/components"
import { BusinessColors, config } from "@/lib";

import supportImage from "./assets/support.png"
import styles from "./contact.module.css";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: BusinessColors.Gray50,
        py: 5,
        mt: 6,
        borderTop: `1px solid ${BusinessColors.BorderLight}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Coluna 1: Empresa */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{
                color: BusinessColors.TextPrimary,
                fontFamily: 'var(--font-family-bold)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                mb: 2,
              }}
            >
              {config.website.title}
            </Typography>
            <Typography
              sx={{
                color: BusinessColors.TextSecondary,
                fontFamily: 'var(--font-family-sans)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.6,
              }}
            >
              {config.website.subtitle}
            </Typography>
          </Grid>

          {/* Coluna 2: Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{
                color: BusinessColors.TextPrimary,
                fontFamily: 'var(--font-family-bold)',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                { label: 'Serviços', href: '#services' },
                { label: 'Planos', href: '#plans' },
                { label: 'Sobre', href: '#about' },
                { label: 'Contato', href: '#contact' },
              ].map((link) => (
                <Typography
                  key={link.label}
                  component="a"
                  href={link.href}
                  sx={{
                    color: BusinessColors.TextSecondary,
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: 'var(--text-sm)',
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)',
                    '&:hover': {
                      color: BusinessColors.Primary,
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Coluna 3: Contato */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{
                color: BusinessColors.TextPrimary,
                fontFamily: 'var(--font-family-bold)',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Contato
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: 16, color: BusinessColors.TextSecondary }} />
                <Typography
                  component="a"
                  href={`mailto:${config.email}`}
                  sx={{
                    color: BusinessColors.TextSecondary,
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: 'var(--text-sm)',
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)',
                    '&:hover': {
                      color: BusinessColors.Primary,
                    },
                  }}
                >
                  {config.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 16, color: BusinessColors.TextSecondary }} />
                <Typography
                  component="a"
                  href={`https://wa.me/${config.phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: BusinessColors.TextSecondary,
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: 'var(--text-sm)',
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)',
                    '&:hover': {
                      color: BusinessColors.Primary,
                    },
                  }}
                >
                  {config.formattedPhoneNumber}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InstagramIcon sx={{ fontSize: 16, color: BusinessColors.TextSecondary }} />
                <Typography
                  component="a"
                  href={`https://instagram.com/${config.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: BusinessColors.TextSecondary,
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: 'var(--text-sm)',
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)',
                    '&:hover': {
                      color: BusinessColors.Primary,
                    },
                  }}
                >
                  @{config.instagram}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Coluna 4: Endereço */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{
                color: BusinessColors.TextPrimary,
                fontFamily: 'var(--font-family-bold)',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Endereço
            </Typography>
            <Typography
              sx={{
                color: BusinessColors.TextSecondary,
                fontFamily: 'var(--font-family-sans)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.6,
              }}
            >
              {config.address}
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${BusinessColors.BorderLight}`,
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              color: BusinessColors.TextSecondary,
              fontFamily: 'var(--font-family-sans)',
              fontSize: 'var(--text-xs)',
            }}
          >
            © {new Date().getFullYear()} <strong>{config.website.title}</strong>. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const contactInfo = [
  {
    label: 'WhatsApp',
    value: config.formattedPhoneNumber,
    href: `https://wa.me/${config.phoneNumber}?text=Olá! Venho pelo site da NUWII e preciso de mais informações :)`,
    icon: <PhoneIcon />,
    color: '#48BB78',
    description: 'Atendimento comercial via WhatsApp'
  },
  {
    label: 'E-mail',
    value: config.email,
    href: 'mailto:' + config.email,
    icon: <EmailIcon />,
    color: '#48BB78',
    description: 'Contato profissional direto'
  },
  {
    label: 'Telefone',
    value: config.formattedPhoneNumber,
    href: `tel:${config.phoneNumber}`,
    icon: <PhoneIcon />,
    color: '#48BB78',
    description: 'Ligação direta'
  },
];

export function Contact() {
  return (
    <Box className={styles.root}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{
              fontWeight: 700,
              color: '#FFFFFF',
              mt: 5,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              fontFamily: 'var(--font-family-bold)'
            }}
          >
            Entre em contato
          </Typography>
        </Box>
        {/* Main Content Grid */}
        <Grid className={styles.gridContainer} container spacing={6} alignItems="stretch">
          {/* Left Side - Form */}
          <Grid item xs={12} md={6}>
            <Box 
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                p: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: '#1A202C', fontSize: '0.875rem', fontWeight: 500, mb: 0.5 }}>
                  Nome
                </Typography>
                <Box
                  component="input"
                  type="text"
                  placeholder="Seu nome"
                  sx={{
                    height: '48px',
                    padding: '0 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-family-sans)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      border: '1px solid #0A3D62',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(10, 61, 98, 0.1)',
                    },
                    '&:focus': {
                      outline: 'none',
                      border: '2px solid #0A3D62',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(10, 61, 98, 0.15)',
                    }
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: '#1A202C', fontSize: '0.875rem', fontWeight: 500, mb: 0.5 }}>
                  E-mail
                </Typography>
                <Box
                  component="input"
                  type="email"
                  placeholder="seu@email.com"
                  sx={{
                    height: '48px',
                    padding: '0 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-family-sans)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      border: '1px solid #0A3D62',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(10, 61, 98, 0.1)',
                    },
                    '&:focus': {
                      outline: 'none',
                      border: '2px solid #0A3D62',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(10, 61, 98, 0.15)',
                    }
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: '#1A202C', fontSize: '0.875rem', fontWeight: 500, mb: 0.5 }}>
                  Telefone
                </Typography>
                <Box
                  component="input"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  sx={{
                    height: '48px',
                    padding: '0 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-family-sans)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      border: '1px solid #0A3D62',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(10, 61, 98, 0.1)',
                    },
                    '&:focus': {
                      outline: 'none',
                      border: '2px solid #0A3D62',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(10, 61, 98, 0.15)',
                    }
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: '#1A202C', fontSize: '0.875rem', fontWeight: 500, mb: 0.5 }}>
                  Mensagem
                </Typography>
                <Box
                  component="textarea"
                  placeholder="Sua mensagem..."
                  rows={5}
                  sx={{
                    padding: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-family-sans)',
                    resize: 'vertical',
                    minHeight: '120px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      border: '1px solid #0A3D62',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(10, 61, 98, 0.1)',
                    },
                    '&:focus': {
                      outline: 'none',
                      border: '2px solid #0A3D62',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(10, 61, 98, 0.15)',
                    }
                  }}
                />
              </Box>
              <Box
                component="a"
                href={`https://wa.me/${config.phoneNumber}?text=Olá! Venho pelo site da NUWII e preciso de mais informações :)`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: '#FFFFFF',
                  color: '#0A3D62',
                  fontFamily: 'var(--font-family-bold)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  padding: '14px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'inline-block',
                  '&:hover': {
                    backgroundColor: '#0A3D62',
                    color: '#FFFFFF',
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 8px 24px rgba(10, 61, 98, 0.4)',
                  }
                }}
              >
                Enviar mensagem
              </Box>
            </Box>
          </Grid>
          {/* Right Side - Contact Info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
              {contactInfo.map((item, index) => (
                <Paper
                  key={index}
                  component="a"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  elevation={0}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '12px',
                      backgroundColor: 'rgba(72, 187, 120, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(72, 187, 120, 0.2)',
                    }}
                  >
                    <Box sx={{ color: '#48BB78', fontSize: 32 }}>
                      {item.icon}
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#FFFFFF', 
                        fontWeight: 600,
                        mb: 0.5 
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: '#FFFFFF',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        mb: 0.5
                      }}
                    >
                      {item.value}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.9rem'
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Right Side - Image */}
          <Grid item xs={12} md={5}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                position: 'relative'
              }}
            >
              <div className={styles.supportImageContainer}>
                <Image className={styles.supportImage} src={supportImage} alt="Support" />
              </div>
            </Box>
          </Grid>
        </Grid>

        {/* Address Section */}
        <Box
          sx={{
            mt: 8,
            background: 'linear-gradient(135deg, #a1e7e5 0%, rgba(161, 231, 229, 0.4) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(68, 203, 198, 0.2)',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
              pointerEvents: 'none',
            }
          }}
        >
          <Box sx={{ p: { xs: 4, md: 6 }, textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(68, 203, 198, 0.2)',
                  mb: 1,
                }}
              >
                <LocationOnIcon sx={{ color: '#44cbc6', fontSize: 32 }} />
              </Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#1c1c1e',
                  fontFamily: 'var(--font-family-bold)',
                  fontWeight: 700,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                Nosso Escritório
              </Typography>
            </Box>
            <Box
              sx={{
                width: 60,
                height: 2,
                background: 'linear-gradient(90deg, transparent, #44cbc6, transparent)',
                mx: 'auto',
                mb: 4,
              }}
            />
            <Typography 
              variant="body1"
              sx={{ 
                color: '#343a40',
                fontFamily: 'var(--font-family-sans)',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.7,
                maxWidth: 700,
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              {config.address}
            </Typography>
          </Box>
        </Box>
      </Container>
      <Footer/>
    </Box>
  );
}