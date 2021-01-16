import { Theme, useMediaQuery } from '@material-ui/core';
import { navItems } from 'data/navItems';
import { useRouter } from 'next/dist/client/router';
import { useMemo } from 'react';
import { NavbarMobile } from './navbar.mobile';
import { NavbarFull } from './navbar.full';

export const Navbar = () => {
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  let title = useMemo(
    () => navItems.find((x) => router.pathname.startsWith(x.to))?.text,
    [router.pathname]
  );

  return (
    <>
      {isMobile ? (
        <NavbarMobile title={title} navItems={navItems} />
      ) : (
        <NavbarFull navItems={navItems} />
      )}
    </>
  );
};
