import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement } from 'react';

export default function NavLink({ href, children }: { href: string; children: JSX.Element }) {
  const router = useRouter();

  let className = children.props.className || '';
  if (
    href === router.pathname ||
    (router.pathname.length > 1 && router.pathname.startsWith(href))
  ) {
    className = `${className} active`;
  }

  return (
    <NextLink href={href} passHref legacyBehavior>
      {cloneElement(children, { className })}
    </NextLink>
  );
}
