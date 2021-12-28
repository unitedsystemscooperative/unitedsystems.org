import { USCMarkdown } from '@/components/uscmarkdown';
import { render } from '@testing-library/react';

const markdown = `
test

[link](https://admiralfeb.dev)

\`this is code\`
`;

describe('Dev Component', () => {
  jest.mock('react-markdown');
  jest.mock('remark-gfm');

  it('should render', () => {
    const { getByText } = render(<USCMarkdown>{markdown}</USCMarkdown>);

    expect(getByText(/test/i)).toBeTruthy();
  });
});
