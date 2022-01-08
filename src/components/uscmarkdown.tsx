import { A, Code, P } from '@/components/markdown';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

export const USCMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown plugins={[gfm]} components={{ p: P, a: A, code: Code }}>
      {children}
    </ReactMarkdown>
  );
};
