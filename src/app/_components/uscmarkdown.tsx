import { A, Code, P } from '@/app/_components/markdown';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

export const USCMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown remarkPlugins={[gfm]} components={{ p: P, a: A, code: Code }}>
      {children}
    </ReactMarkdown>
  );
};
