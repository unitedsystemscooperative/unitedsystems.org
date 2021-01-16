import { Navbar } from 'components/navbar';
import { ReactNode } from 'react';

export const PrimaryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
