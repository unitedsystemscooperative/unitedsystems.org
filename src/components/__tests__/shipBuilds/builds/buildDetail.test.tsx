import { cleanup, render } from '@testing-library/react';
import { BuildDetail } from 'components/shipBuilds';
import { MemoryRouter } from 'react-router-dom';
import * as hooks from 'hooks/shipBuilds/useShipBuildInfo';

describe('Build Detail Parent', () => {
  afterEach(cleanup);

  it('Renders Not Found if build not found', (cb) => {
    const spy = jest.spyOn(hooks, 'useShipBuildInfo');
    spy.mockReturnValue({
      loading: false,
      shipBuilds: [],
      foundBuild: null,
      shipInfo: undefined,
    });
    const { getByText } = render(
      <MemoryRouter initialEntries={['/information/builds/detail/']}>
        <BuildDetail />
      </MemoryRouter>
    );
    const element = getByText('Mistakes were made');
    expect(element).toBeDefined();
    cb();
  });

  it('renders when loading', (cb) => {
    const spy = jest.spyOn(hooks, 'useShipBuildInfo');
    spy.mockReturnValue({
      loading: true,
      shipBuilds: [],
      foundBuild: null,
      shipInfo: undefined,
    });
    render(
      <MemoryRouter>
        <BuildDetail />
      </MemoryRouter>
    );
    cb();
  });
});
