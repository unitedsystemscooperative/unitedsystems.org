import { Carriers } from '~/about/components/carriers/carriers';
import fleetCarrierData from '~/about/data/fleetCarriers.json';
import * as hooks from '~/about/hooks/useFleetCarriers';
import { render } from '@testing-library/react';
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

    expect(getByText('Almagest')).toBeDefined();
    expect(getByText('Zocalo')).toBeDefined();
    expect(getByText('UltraNeros')).toBeDefined();
    expect(getByText('Ellen Jameson')).toBeDefined();
  });
});
