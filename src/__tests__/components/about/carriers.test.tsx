import { render } from '@testing-library/react';
import { Carriers } from 'components/about';
import * as hooks from 'hooks/about/useFleetCarriers';
import fleetCarrierData from 'data/about/fleetCarriers.json';
import { cleanup } from '@testing-library/react-hooks';

describe('Carriers', () => {
  afterEach(cleanup);

  it('renders when loading', (cb) => {
    const spy = jest.spyOn(hooks, 'useFleetCarriers');
    spy.mockReturnValue({
      isLoading: true,
      fleetCarriers: [],
    });
    const { getByText } = render(<Carriers />);

    expect(getByText('Loading')).toBeDefined();
    cb();
  });

  it('renders Fleet Carriers', () => {
    const spy = jest.spyOn(hooks, 'useFleetCarriers');
    spy.mockReturnValue({
      isLoading: false,
      fleetCarriers: fleetCarrierData,
    });
    const { getByText } = render(<Carriers />);

    expect(getByText('USC Fleet Carriers')).toBeDefined();
    expect(getByText('Personal Fleet Carriers of USC')).toBeDefined();
    expect(getByText('Almagest')).toBeDefined();
    expect(getByText('Zocalo')).toBeDefined();
    expect(getByText('UltraNeros')).toBeDefined();
    expect(getByText('Ellen Jameson')).toBeDefined();
  });
});
