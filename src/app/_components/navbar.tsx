'use client';
import { navItems } from '@/data/navItems';
import { Theme, useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { NavbarFull } from './navbar.full';
import { NavbarMobile } from './navbar.mobile';

export const Navbar = () => {
  const pathName = usePathname();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const title = useMemo(() => navItems.find((x) => pathName?.startsWith(x.to))?.text, [pathName]);

  return (
    <>
      {isMobile ? (
        <NavbarMobile title={title} navItems={navItems} pathName={pathName} />
      ) : (
        <NavbarFull navItems={navItems} pathName={pathName} />
      )}
    </>
  );
};
