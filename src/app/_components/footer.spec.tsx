import { cleanup, render, RenderResult } from '@testing-library/react';
import { Footer } from './footer';

let componentBody: RenderResult;

describe('Home', () => {
  beforeEach(() => {
    componentBody = render(<Footer version="testVersion" />);
  });

  afterEach(cleanup);

  it(`should render 'United Systems Cooperative' in a link`, () => {
    const tag = componentBody.getByText('United Systems Cooperative').tagName;
    expect(tag).toBe('A');
  });
});
