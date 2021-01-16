import { cleanup, render, RenderResult } from '@testing-library/react';
import { AboutAllies } from 'components/about';

let componentBody: RenderResult;

describe('About Allies', () => {
  beforeEach(() => {
    componentBody = render(<AboutAllies />);
  });

  afterEach(cleanup);

  it(`should match the snapshot`, () => {
    const { baseElement } = componentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
