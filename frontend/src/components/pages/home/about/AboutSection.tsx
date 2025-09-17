import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Public as PublicIcon,
  CloudDone as CloudDoneIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { BusinessColors, config } from '@/lib';

// Componente de item com ícone
const FeatureItem = ({ icon: Icon, title, description, delay = 0 }: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <Card 
      sx={{ 
        height: '100%',
        border: 'none',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.3s ease'
        }
      }}
    >
      <CardContent sx={{ p: 3, textAlign: 'left' }}>
        <Box sx={{ mb: 2 }}>
          <Icon 
            sx={{ 
              fontSize: 40, 
              color: BusinessColors.Primary,
              mb: 1
            }} 
          />
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            mb: 1,
            color: '#333',
            fontSize: '1.1rem'
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#666',
            lineHeight: 1.6,
            fontSize: '0.95rem'
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
);

// Componente principal
export const AboutSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      {/* Bloco Claro */}
      <Box 
        sx={{ 
          backgroundColor: '#f9f9f9',
          py: { xs: 8, md: 12 },
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Conteúdo Textual */}
            <Grid item xs={12} md={6}>
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
                    color: '#111',
                    lineHeight: 1.2
                  }}
                >
                  Contabilidade que cresce com você
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    color: '#666',
                    mb: 4,
                    maxWidth: '500px'
                  }}
                >
                  Na Nuwii, acreditamos que empreender é ter liberdade. Por isso, atendemos 100% online em todo o Brasil, com mais praticidade, confiança e tranquilidade para o seu dia a dia.
                </Typography>

                {/* Lista de Features */}
                <Box sx={{ mt: 4 }}>
                  <FeatureItem
                    icon={PublicIcon}
                    title="Alcance Nacional"
                    description="Atendemos em todos os estados do Brasil com a mesma qualidade e eficiência."
                    delay={0.1}
                  />
                  <FeatureItem
                    icon={CloudDoneIcon}
                    title="100% Online"
                    description="Toda nossa operação é digital, garantindo agilidade e comodidade para você."
                    delay={0.2}
                  />
                  <FeatureItem
                    icon={SecurityIcon}
                    title="Confiança Total"
                    description="Equipe especializada e processos seguros para proteger seu negócio."
                    delay={0.3}
                  />
                </Box>
              </motion.div>
            </Grid>

            {/* Imagem Ilustrativa */}
            <Grid item xs={12} md={6}>
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
                    background: 'linear-gradient(135deg, rgba(68, 203, 198, 0.1) 0%, rgba(161, 231, 229, 0.1) 100%)',
                    borderRadius: '20px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Placeholder para imagem - você pode substituir por uma imagem real */}
                  <Box
                    sx={{
                      width: '80%',
                      height: '80%',
                      background: 'linear-gradient(45deg, #44cbc6, #a1e7e5)',
                      borderRadius: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 600
                    }}
                  >
                    Ilustração de Contabilidade Digital
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bloco Escuro */}
      <Box 
        sx={{ 
          backgroundColor: '#111',
          py: { xs: 8, md: 12 },
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
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
                Contabilidade sem obstáculos, só evolução.
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: '#ccc',
                  mb: 6,
                  maxWidth: '600px',
                  mx: 'auto'
                }}
              >
                Nós cuidamos da burocracia e dos números, enquanto você foca no que importa: crescer o seu negócio com leveza, segurança e estratégia.
              </Typography>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  href={`https://wa.me/${config.phoneNumber}?text=Olá! Venho pelo site da NUWII, e possuo interesse em saber mais sobre os serviços :)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: BusinessColors.Primary,
                    color: '#fff',
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '50px',
                    textTransform: 'none',
                    boxShadow: '0 4px 20px rgba(68, 203, 198, 0.3)',
                    '&:hover': {
                      backgroundColor: BusinessColors.PrimaryDark,
                      boxShadow: '0 8px 30px rgba(68, 203, 198, 0.4)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Quero simplificar minha contabilidade
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};
