import ClientRoot from './client-root';
import { cleanup, render, RenderResult } from '@testing-library/react';

let componentBody: RenderResult;

describe('Home', () => {
  beforeEach(() => {
    componentBody = render(<ClientRoot />);
  });

  afterEach(cleanup);

  it(`should render 'United Systems Cooperative' in an h3 element`, () => {
    const tag = componentBody.getByText('United Systems Cooperative').tagName;
    expect(tag).toBe('H1');
  });

  it(`should render 'Ad Astra per Aspera' in an h4 element`, () => {
    const tag = componentBody.getByText('Ad Astra Per Aspera').tagName;
    expect(tag).toBe('H4');
  });

  it(`should render 'Through Hardships to the Stars' in an h6 element`, () => {
    const tag = componentBody.getByText('Through hardships to the stars').tagName;
    expect(tag).toBe('H6');
  });
});
