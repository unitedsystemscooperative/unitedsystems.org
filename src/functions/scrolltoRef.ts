import { MutableRefObject } from 'react';

export const scrolltoRef = (ref: MutableRefObject<HTMLDivElement | null>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
};
