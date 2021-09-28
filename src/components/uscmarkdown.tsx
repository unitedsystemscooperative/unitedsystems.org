import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { A } from './markdown/a';
import { Code } from './markdown/code';
import { P } from './markdown/p';

export const USCMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown plugins={[gfm]} components={{ p: P, a: A, code: Code }}>
      {children}
    </ReactMarkdown>
  );
};
