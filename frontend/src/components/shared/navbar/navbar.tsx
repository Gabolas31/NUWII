import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {
	HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Separator, TabNav } from "@radix-ui/themes";
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
    { label: 'INÍCIO', href: '#home' },
    { label: 'A NUWII', href: '#about' },
    { label: 'SERVIÇOS', href: '#services' },
    { label: 'PLANOS', href: '#plans' },
    { label: 'CONTATO', href: '#contact' },
  ];

  return (
    <Drawer 
      anchor='left' 
      open={isOpen} 
      transitionDuration={200}
      onClose={toggleDrawer(false)}
      sx={{
      '& .MuiDrawer-paper': {
        backgroundColor: 'var(--color-white)',
        color: 'var(--color-text-primary)',
        boxShadow: 'var(--shadow-lg)',
      }
    }}>
      <Box
        sx={{ width: 150 }}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <ListItem key={'logo'} disablePadding>
          <div
            style={{ background: 'var(--color-white)', display: 'flex', width: '100%', paddingLeft: '50px', paddingBlock: '30px' }}
          >
            <Image src="/logo-icon.png" alt="Logo" className={styles.sideBarLogo} />
          </div>
        </ListItem>
        <List>
          {drawerItems.map((item) => (
            <ListItem key={item.label}>
              <ListItemButton component='a' href={item.href}>
                <ListItemText primary={item.label} />
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

  const getLoginButton = () => {
    return (
      <Button className={styles.loginButton} variant="surface" onClick={onClickLogin}>
        ÁREA DO CLIENTE
      </Button>
    )
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleButtonClick = () => {
    setSidebarOpen((prev) => !prev);
  };


  return <>
    <Flex className={styles.root}>
      <div className={styles.mobileContainer}>
        <div className={styles.logo}>
          <WebsiteLogo/>
        </div>
        {getLoginButton()}
        <Button variant="outline" color="sky" onClick={handleButtonClick}>
          <HamburgerMenuIcon />
        </Button>
        <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      <div className={styles.desktopContainer}>
        <TabNav.Root className={styles.container}>
          <div className={styles.logo}>
            <WebsiteLogo/>
          </div>
          
          <TabNav.Link className={styles.tabNavLink} href="#home">INÍCIO</TabNav.Link>
          <TabNav.Link className={styles.tabNavLink} href="#about">A NUWII</TabNav.Link>
          <TabNav.Link className={styles.tabNavLink} href="#services">SERVIÇOS</TabNav.Link>
          <TabNav.Link className={styles.tabNavLink} href="#plans">PLANOS</TabNav.Link>
          <TabNav.Link className={styles.tabNavLink} href="#contact">CONTATO</TabNav.Link>
          <TabNav.Link>{getLoginButton()}</TabNav.Link>
        </TabNav.Root>
      </div>
      <Separator size="4" orientation={"horizontal"}/>
    </Flex>
  </>
}
