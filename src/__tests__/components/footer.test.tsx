import { cleanup, render, RenderResult } from '@testing-library/react';
import { Footer } from 'components';

let componentBody: RenderResult;

describe('Home', () => {
  beforeEach(() => {
    componentBody = render(<Footer />);
  });

  afterEach(cleanup);

  it(`should render 'United Systems Cooperative' in a link`, () => {
    const tag = componentBody.getByText('United Systems Cooperative').tagName;
    expect(tag).toBe('A');
  });
});
