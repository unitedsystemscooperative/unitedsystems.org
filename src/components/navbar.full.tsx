import { Button, makeStyles } from '@material-ui/core';
import { useAdmin } from 'hooks/useAdmin';
import { INavItem } from 'models/navItem';
import { signout, useSession } from 'next-auth/client';
import Link from './navLink';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    padding: theme.spacing(1),
    backgroundColor: '#424242',
    height: 'auto',
    minHeight: 'auto',
    justifyContent: 'initial',
    zIndex: 1500,
  },
  navLink: {
    backgroundColor: 'transparent',
    height: 'auto',
    color: '#f2f2f2',
    textAlign: 'center',
    textDecoration: 'none',
    // width: theme.spacing(15),
    marginRight: theme.spacing(1),
    fontSize: 16,
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  navLinkJoin: {
    backgroundColor: 'transparent',
    border: `${theme.palette.secondary.main} 0.1em solid`,
    color: 'white',
    fontSize: 16,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    width: theme.spacing(15),
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  filler: {
    flex: '1 0',
  },
}));

export const NavbarFull = (props: { navItems: INavItem[] }) => {
  const classes = useStyles();
  const [session] = useSession();
  const isCommand = useAdmin();
  const { navItems } = props;

  return (
    <nav className={classes.root}>
      {navItems.map((x) => {
        return (
          <Link key={x.to} href={x.to}>
            <Button key={x.to} href={x.to} className={classes.navLink}>
              {x.text}
            </Button>
          </Link>
        );
      })}
      <div className={classes.filler} />
      {isCommand && (
        <Link href="/admin">
          <Button href="/admin" className={classes.navLink}>
            Admin
          </Button>
        </Link>
      )}
      {session ? (
        <Button
          onClick={() => signout()}
          color="secondary"
          className={classes.navLinkJoin}
          variant="contained"
        >
          Sign Out
        </Button>
      ) : (
        <Link href="/join">
          <Button
            href="/join"
            color="secondary"
            className={classes.navLinkJoin}
            variant="contained"
          >
            Join
          </Button>
        </Link>
      )}
    </nav>
  );
};
