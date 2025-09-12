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
        backgroundColor: BusinessColors.Black,
        py: 3,
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography className={styles.copyright} sx={{ color: '#fff' }}>
            © {new Date().getFullYear()} <strong>NUWII Contabilidade</strong>. Todos os direitos reservados.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {[
              { icon: <InstagramIcon />, href: `https://instagram.com/${config.instagram}` },
              { icon: <EmailIcon />, href: `mailto:${config.email}` },
              { icon: <PhoneIcon />, href: `https://wa.me/${config.phoneNumber}?text=Olá! Venho pelo site da NUWII e preciso de mais informações :)` },
            ].map((item, index) => (
              <IconButton
                key={index}
                component="a"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { 
                    backgroundColor: '#fff',
                    color: '#1565C0',
                    transform: 'scale(1.1)' 
                  }
                }}
              >
                {item.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const contactInfo = [
  {
    label: 'Telefone Comercial',
    value: config.formattedPhoneNumber,
    href: `https://wa.me/${config.phoneNumber}?text=Olá! Venho pelo site da NUWII e preciso de mais informações :)`,
    icon: <PhoneIcon />,
    color: '#1565C0',
    description: 'Atendimento comercial via WhatsApp'
  },
  {
    label: 'E-mail Corporativo',
    value: config.email,
    href: 'mailto:' + config.email,
    icon: <EmailIcon />,
    color: '#D32F2F',
    description: 'Contato profissional direto'
  },
  {
    label: 'Instagram Oficial',
    value: "@" + config.instagram,
    href: 'https://instagram.com/' + config.instagram,
    icon: <InstagramIcon />,
    color: '#7B1FA2',
    description: 'Acompanhe nossas atualizações'
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
              color: BusinessColors.Blue,
              mt: 5,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Entre em Contato 💬
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#455A64',
              maxWidth: 700, 
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
              fontSize: { xs: '1.1rem', md: '1.3rem' }
            }}
          >
            Soluções contábeis personalizadas para o crescimento do seu negócio. 
            <strong style={{color: BusinessColors.DarkGray}}> Nossa equipe está pronta para atendê-lo!</strong>
          </Typography>
        </Box>
        {/* Main Content Grid */}
        <Grid className={styles.gridContainer} container spacing={6} alignItems="stretch">
          {/* Left Side - Contact Cards */}
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
              {contactInfo.map((item, index) => (
                <Paper
                  key={index}
                  component="a"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  elevation={3}
                  sx={{
                    background: '#fff',
                    border: `2px solid ${item.color}20`,
                    borderRadius: '12px',
                    p: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: `0 12px 24px ${item.color}30`,
                      border: `2px solid ${item.color}`,
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '12px',
                      backgroundColor: `${item.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `2px solid ${item.color}30`,
                    }}
                  >
                    <Box sx={{ color: item.color, fontSize: 32 }}>
                      {item.icon}
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#263238', 
                        fontWeight: 600,
                        mb: 0.5 
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: item.color,
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        mb: 0.5
                      }}
                    >
                      {item.value}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: '#607D8B',
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
        <Paper
          elevation={4}
          sx={{
            mt: 8,
            background: 'linear-gradient(135deg, #F5F5F5 0%, #FAFAFA 100%)',
            borderRadius: '16px',
            border: '2px solid #1565C020',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ p: 5, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '12px',
                  backgroundColor: '#1565C015',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #1565C030',
                }}
              >
                <LocationOnIcon sx={{ color: '#1565C0', fontSize: 28 }} />
              </Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#263238',
                  fontWeight: 600
                }}
              >
                Nosso Escritório
              </Typography>
            </Box>
            <Divider sx={{ my: 3, backgroundColor: '#1565C030' }} />
            <Typography 
              variant="h6"
              sx={{ 
                color: '#455A64',
                fontSize: '1rem',
                lineHeight: 1.8,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              {config.address}
            </Typography>
          </Box>
        </Paper>
      </Container>
      <Footer/>
    </Box>
  );
}