import { cleanup, render, RenderResult } from '@testing-library/react';
import { AboutRules } from 'components/about/aboutRules';

let componentBody: RenderResult;

describe('About Rules', () => {
  beforeEach(() => {
    componentBody = render(<AboutRules />);
  });

  afterEach(cleanup);

  it(`should match the snapshot`, () => {
    const { baseElement } = componentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
