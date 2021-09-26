import { Link, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

export const USCMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      plugins={[gfm]}
      renderers={{ paragraph: Typography, link: Link }}
    >
      {children}
    </ReactMarkdown>
  );
};
