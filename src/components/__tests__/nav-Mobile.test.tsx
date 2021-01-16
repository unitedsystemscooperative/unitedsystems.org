import { cleanup, render } from '@testing-library/react';
import { NavMobile } from 'components/nav-Mobile';
import { navItems } from 'data/navItems';
import { MemoryRouter } from 'react-router-dom';

describe('Nav Mobile', () => {
  afterEach(cleanup);

  it('should match snapshot', () => {
    const screen = render(
      <MemoryRouter>
        <NavMobile title="Title" navItems={navItems} />
      </MemoryRouter>
    );

    expect(screen.baseElement).toMatchSnapshot();
  });
});
