import { cleanup, render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Join } from 'components/join';

let componentBody: RenderResult;

describe('Join', () => {
  beforeEach(() => {
    componentBody = render(
      <MemoryRouter initialEntries={['/join']}>
        <Join />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it(`should match the snapshot`, () => {
    const { baseElement } = componentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
