import { A, Code, P } from '@/_components/markdown';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: P,
    a: A,
    code: Code,
    ...components,
  };
}
