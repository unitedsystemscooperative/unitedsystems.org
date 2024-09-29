import NotFoundPage from './not-found';
import { cleanup, render, RenderResult } from '@testing-library/react';

let componentBody: RenderResult;

describe('Home', () => {
  beforeEach(() => {
    componentBody = render(<NotFoundPage />);
  });

  afterEach(cleanup);

  it(`should render`, () => {
    const tag = componentBody.getByText('Mistakes were made');
    expect(tag).toBeDefined();
  });
});
