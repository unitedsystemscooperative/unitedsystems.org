import { useAdmin } from '@/hooks/useAdmin';
import Link from '@/layouts/components/navLink';
import { INavItem } from '@/models/navItem';
import { AppBar, Button, Toolbar, useTheme } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { signout, useSession } from 'next-auth/client';

export const NavbarFull = (props: { navItems: INavItem[] }) => {
  const [session] = useSession();
  const isCommand = useAdmin();
  const theme = useTheme();
  const { navItems } = props;

  const sxNavLink: SxProps = {
    backgroundColor: 'transparent',
    height: 'auto',
    color: '#f2f2f2',
    textAlign: 'center',
    textDecoration: 'none',
    marginRight: theme.spacing(1),
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
    width: theme.spacing(15),
    '&.active': {
      backgroundColor: 'secondary.main',
    },
  };

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        {navItems.map((x) => (
          <Link key={x.to} href={x.to}>
            <Button key={x.to} href={x.to} sx={sxNavLink}>
              {x.text}
            </Button>
          </Link>
        ))}
        <Box sx={{ flex: '1 0' }} />
        {isCommand && (
          <Link href="/admin">
            <Button href="/admin" sx={sxNavLink}>
              Admin
            </Button>
          </Link>
        )}
        {session ? (
          <Button onClick={() => signout()} color="secondary" sx={sxJoinLink} variant="contained">
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
