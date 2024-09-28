import * as fcApi from '#/fc/fc-api-utils';
import { cleanup, render } from '@testing-library/react';
import fleetCarrierData from '../_data/fleetCarriers.json';

import CarriersPage from './page';

jest.mock('#/fc/fc-api-utils');

describe('Carriers', () => {
  afterEach(cleanup);

  // it.todo('renders Fleet Carriers');
  it('renders Fleet Carriers', async () => {
    const fcSpy = jest.spyOn(fcApi, 'getFCs').mockResolvedValue(fleetCarrierData);
    const Page = await CarriersPage();
    const { getByText } = render(Page);

    expect(getByText('Almagest')).toBeDefined();
    expect(getByText('Zocalo')).toBeDefined();
    expect(getByText('UltraNeros')).toBeDefined();
    expect(getByText('Ellen Jameson')).toBeDefined();
    expect(fcSpy).toHaveBeenCalledTimes(1);
  });
});
