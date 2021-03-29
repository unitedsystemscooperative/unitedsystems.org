import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useUser } from 'hooks/useUser';
import { INavItem } from 'models/navItem';
import { signout, useSession } from 'next-auth/client';
import { KeyboardEvent, MouseEvent, useState } from 'react';
import Link from './navLink';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export const NavbarMobile = (props: {
  title: string | undefined;
  navItems: INavItem[];
}) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { title, navItems } = props;
  const [session] = useSession();
  const { user } = useUser();

  const toggleDrawer = (open: boolean) => (
    event: KeyboardEvent | MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
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
            <ListItem button component="a">
              <ListItemText primary={x.text} />
            </ListItem>
          </Link>
        ))}
        {user?.role === 'high command' && (
          <Link href="/admin">
            <ListItem button component="a">
              <ListItemText primary="Admin" />
            </ListItem>
          </Link>
        )}
        {session ? (
          <ListItem button component="button" onClick={() => signout()}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        ) : (
          <Link href="/join">
            <ListItem button component="a">
              <ListItemText primary="Admin" />
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
        <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
          {navList()}
        </Drawer>
      </AppBar>
    </div>
  );
};
