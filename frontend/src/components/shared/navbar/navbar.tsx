import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {
	HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";

import { Image } from "@/components";
import { BusinessColors } from "@/lib";

import styles from "./navbar.module.css"
import { WebsiteLogo } from "./website-logo";

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function SideBar({ isOpen, setIsOpen }: SideBarProps) {
  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const drawerItems = [
    { label: 'Serviços', href: '#services' },
    { label: 'Planos', href: '#plans' },
    { label: 'Sobre', href: '#about' },
  ];

  return (
    <Drawer 
      anchor='left' 
      open={isOpen} 
      transitionDuration={200}
      onClose={toggleDrawer(false)}
      sx={{
      '& .MuiDrawer-paper': {
        backgroundColor: BusinessColors.White,
        color: BusinessColors.TextPrimary,
        boxShadow: `0 1px 3px ${BusinessColors.ShadowLight}`,
      }
    }}>
      <Box
        sx={{ width: 250 }}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <ListItem key={'logo'} disablePadding>
          <div
            style={{ 
              background: BusinessColors.White, 
              display: 'flex', 
              width: '100%', 
              paddingLeft: '24px', 
              paddingBlock: '24px',
              borderBottom: `1px solid ${BusinessColors.BorderLight}`
            }}
          >
            <Image src="/logo-icon.png" alt="Logo" className={styles.sideBarLogo} />
          </div>
        </ListItem>
        <List>
          {drawerItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton 
                component='a' 
                href={item.href}
                sx={{
                  color: BusinessColors.TextPrimary,
                  '&:hover': {
                    backgroundColor: BusinessColors.Gray50,
                    color: BusinessColors.Primary,
                  }
                }}
              >
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    style: {
                      fontFamily: 'var(--font-family-sans)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 500,
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export function NavBar() {
  const onClickLogin = () => {
    window.location.href = "https://passport.nibo.com.br/Account/Login?ReturnUrl=%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3DD2CBFE38-9803-4DA0-8E2C-4E67F26BA9F5%26redirect_uri%3Dhttps%253a%252f%252fempresa.nibo.com.br%252fAuth%252fCallback%253forigin%253d%2526returnUrl%253d%25252fOrganization%2526redirectEmail%253d";
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleButtonClick = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <nav className={styles.root}>
      <div className={styles.mobileContainer}>
        <div className={styles.logo}>
          <WebsiteLogo/>
        </div>
        <div className={styles.mobileActions}>
          <button 
            className={styles.ghostButton}
            onClick={onClickLogin}
          >
            Área do Cliente
          </button>
          <Button 
            variant="outline" 
            onClick={handleButtonClick}
            className={styles.menuButton}
          >
            <HamburgerMenuIcon />
          </Button>
        </div>
        <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      <div className={styles.desktopContainer}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <WebsiteLogo/>
          </div>
          
          <div className={styles.navLinks}>
            <a href="#services" className={styles.navLink}>Serviços</a>
            <a href="#plans" className={styles.navLink}>Planos</a>
            <a href="#about" className={styles.navLink}>Sobre</a>
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.ghostButton}
              onClick={onClickLogin}
            >
              Área do Cliente
            </button>
            <button 
              className={styles.primaryButton}
              onClick={() => window.location.href = '#contact'}
            >
              Abra sua empresa
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
