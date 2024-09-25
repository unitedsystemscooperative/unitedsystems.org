import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement } from 'react';

export default function NavLink({ href, children }: { href: string; children: JSX.Element }) {
  const pathName = useRouter().pathname;

  let className = children.props.className || '';
  if (pathName && (href === pathName || (href.length > 1 && pathName.startsWith(href)))) {
    className = `${className} active`;
  }

  return (
    <NextLink href={href} passHref legacyBehavior>
      {cloneElement(children, { className })}
    </NextLink>
  );
}
