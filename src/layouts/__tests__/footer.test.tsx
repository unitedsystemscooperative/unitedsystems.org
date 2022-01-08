import { cleanup, render, RenderResult } from '@testing-library/react';
import { Footer } from '@/layouts/components/footer';

let componentBody: RenderResult;

describe('Footer', () => {
  beforeEach(() => {
    componentBody = render(<Footer version="test version" />);
  });

  afterEach(cleanup);

  it(`should render 'United Systems Cooperative' in a link`, () => {
    const tag = componentBody.getByText('United Systems Cooperative').tagName;
    expect(tag).toBe('A');
  });
});
