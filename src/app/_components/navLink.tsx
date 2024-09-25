import NextLink from 'next/link';
import { cloneElement } from 'react';

export default function NavLink({
  href,
  children,
  pathName,
}: {
  href: string;
  children: JSX.Element;
  pathName: string | null;
}) {
  let className = children.props?.className || '';
  if (pathName && (href === pathName || (href.length > 1 && pathName.startsWith(href)))) {
    className = `${className} active`;
  }

  return (
    <NextLink href={href} passHref legacyBehavior>
      {cloneElement(children, { className })}
    </NextLink>
  );
}
