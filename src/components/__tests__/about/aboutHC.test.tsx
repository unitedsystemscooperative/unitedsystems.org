import { cleanup, render, RenderResult } from '@testing-library/react';
import { AboutHC } from 'components/about';

let componentBody: RenderResult;

describe('About High Command', () => {
  beforeEach(() => {
    componentBody = render(<AboutHC />);
  });

  afterEach(cleanup);

  it(`should match the snapshot`, () => {
    const { baseElement } = componentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
