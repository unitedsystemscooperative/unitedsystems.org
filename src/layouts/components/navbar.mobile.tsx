import { useAdmin } from '@/hooks/useAdmin';
import { INavItem } from '@/models/navItem';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { KeyboardEvent, MouseEvent, useState } from 'react';
import Link from './navLink';

export const NavbarMobile = (props: { title: string | undefined; navItems: INavItem[] }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { title, navItems } = props;
  const { data: session } = useSession();
  const isCommand = useAdmin();
  const theme = useTheme();

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
    <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {navItems.map((x) => (
          <Link key={x.to} href={x.to}>
            <ListItemButton component="a">
              <ListItemText primary={x.text} />
            </ListItemButton>
          </Link>
        ))}
        {isCommand && (
          <Link href="/admin">
            <ListItemButton component="a">
              <ListItemText primary="Admin" />
            </ListItemButton>
          </Link>
        )}
        {session ? (
          <ListItemButton component="button" onClick={() => signOut()}>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        ) : (
          <Link href="/join">
            <ListItemButton component="a">
              <ListItemText primary="Join" />
            </ListItemButton>
          </Link>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ marginRight: theme.spacing(2) }}
            color="inherit"
            onClick={toggleDrawer(true)}
            size="large">
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
