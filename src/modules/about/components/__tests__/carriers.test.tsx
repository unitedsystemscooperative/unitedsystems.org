import { render } from '@testing-library/react';
import { cleanup } from '@testing-library/react-hooks';
import { Carriers } from '~/about/components/carriers/carriers';
import fleetCarrierData from '~/about/data/fleetCarriers.json';
import * as hooks from '~/about/hooks/useFleetCarriers';

const useFleetCarriersSpy = jest.spyOn(hooks, 'useFleetCarriers');
describe('Carriers', () => {
  afterEach(cleanup);

  it('renders when loading', (cb) => {
    useFleetCarriersSpy.mockReturnValue({
      fleetCarriers: null,
      personalCarriers: null,
      squadCarriers: null,
      isLoading: true,
      error: null,
      addCarrier: jest.fn(),
      updateCarrier: jest.fn(),
      deleteCarrier: jest.fn(),
    });
    const { getByText } = render(<Carriers />);

    expect(getByText('Loading')).toBeDefined();
    cb();
  });

  it('renders Fleet Carriers', () => {
    useFleetCarriersSpy.mockReturnValue({
      fleetCarriers: fleetCarrierData,
      personalCarriers: fleetCarrierData.filter((carrier) => !carrier.purpose),
      squadCarriers: fleetCarrierData.filter((carrier) => carrier.purpose),
      isLoading: false,
      error: null,
      addCarrier: jest.fn(),
      updateCarrier: jest.fn(),
      deleteCarrier: jest.fn(),
    });
    const { getByText } = render(<Carriers />);

    expect(getByText('Almagest')).toBeDefined();
    expect(getByText('Zocalo')).toBeDefined();
    expect(getByText('UltraNeros')).toBeDefined();
    expect(getByText('Ellen Jameson')).toBeDefined();
  });
});
