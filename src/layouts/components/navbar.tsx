import { navItems } from '@/data/navItems';
import { useAdmin } from '@/hooks/useAdmin';
import { INavItem } from '@/models/navItem';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { SxProps } from '@mui/system';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { KeyboardEvent, MouseEvent, useMemo, useState } from 'react';
import Link from './navLink';

interface NavbarProps {
  title?: string;
  navItems: INavItem[];
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const NavbarMobile = ({ title, navItems, isAuthenticated, isAdmin }: NavbarProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  const navList = () => (
    <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} data-testid="drawer-list">
      <List>
        {navItems.map((x) => (
          <Link key={x.to} href={x.to}>
            <ListItem button component="a">
              <ListItemText primary={x.text} />
            </ListItem>
          </Link>
        ))}
        {isAdmin && (
          <Link href="/admin">
            <ListItem button component="a" data-testid="mobile-admin">
              <ListItemText primary="Admin" />
            </ListItem>
          </Link>
        )}
        {isAuthenticated ? (
          <ListItem
            button
            component="button"
            onClick={() => signOut()}
            data-testid="mobile-signout">
            <ListItemText primary="Sign Out" />
          </ListItem>
        ) : (
          <Link href="/join">
            <ListItem button component="a">
              <ListItemText primary="Join" />
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static" color="inherit" data-testid="mobile-nav">
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ mr: 2 }}
            color="inherit"
            onClick={toggleDrawer(true)}
            size="large"
            data-testid="mobile-drawer-button">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="top" open={openDrawer} onClose={toggleDrawer(false)} variant="temporary">
        <Box>{navList()}</Box>
      </Drawer>
    </div>
  );
};

const NavbarFull = ({ navItems, isAuthenticated, isAdmin }: NavbarProps) => {
  const sxNavLink: SxProps = {
    backgroundColor: 'transparent',
    height: 'auto',
    color: '#f2f2f2',
    textAlign: 'center',
    textDecoration: 'none',
    mr: 1,
    fontSize: 16,
    '&.active': {
      backgroundColor: 'primary.main',
      color: 'white',
    },
  };

  const sxJoinLink: SxProps = {
    backgroundColor: 'transparent',
    borderColor: 'secondary.main',
    borderWidth: 1,
    borderStyle: 'solid',
    color: 'white',
    fontSize: 16,
    '&:hover': {
      backgroundColor: 'secondary.main',
    },
    width: 100,
    '&.active': {
      backgroundColor: 'secondary.main',
    },
  };

  return (
    <AppBar position="static" color="inherit" data-testid="full-nav">
      <Toolbar>
        {navItems.map((x) => (
          <Link key={x.to} href={x.to}>
            <Button key={x.to} href={x.to} sx={sxNavLink}>
              {x.text}
            </Button>
          </Link>
        ))}
        <Box sx={{ flex: '1 0' }} />
        {isAdmin && (
          <Link href="/admin">
            <Button href="/admin" sx={sxNavLink} data-testid="full-admin">
              Admin
            </Button>
          </Link>
        )}
        {isAuthenticated ? (
          <Button
            onClick={() => signOut()}
            color="secondary"
            sx={sxJoinLink}
            variant="contained"
            data-testid="full-signout">
            Sign Out
          </Button>
        ) : (
          <Link href="/join">
            <Button href="/join" color="secondary" sx={sxJoinLink} variant="contained">
              Join
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export const Navbar = () => {
  const pathName = useRouter().pathname;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const { status } = useSession();
  const isAdmin = useAdmin();

  const title = useMemo(() => navItems.find((x) => pathName.startsWith(x.to))?.text, [pathName]);
  const isAuthenticated = useMemo(() => status === 'authenticated', [status]);

  return (
    <>
      {isMobile ? (
        <NavbarMobile
          title={title}
          navItems={navItems}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
        />
      ) : (
        <NavbarFull navItems={navItems} isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      )}
    </>
  );
};
