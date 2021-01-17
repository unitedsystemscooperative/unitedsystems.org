import { cleanup, render, RenderResult } from '@testing-library/react';
import { USCRules } from 'components/about/rules';

let componentBody: RenderResult;

describe('About Rules', () => {
  beforeEach(() => {
    componentBody = render(<USCRules />);
  });

  afterEach(cleanup);

  it(`should match the snapshot`, () => {
    const { baseElement } = componentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
