import fleetCarrierData from '@/modules/about/data/fleetCarriers.json';
import { server } from '@/__mocks__/server/server';
import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { Carriers } from '~/about/components/carriers/carriers';

describe('Carriers', () => {
  it('renders when loading', () => {
    const { getByText } = render(<Carriers />);

    expect(getByText('Loading')).toBeDefined();
  });

  it('renders Fleet Carriers', async () => {
    server.use(rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json(fleetCarrierData))));
    const { getByText } = render(<Carriers />);

    await waitFor(() => {
      expect(getByText('Almagest')).toBeDefined();
      expect(getByText('Zocalo')).toBeDefined();
      expect(getByText('UltraNeros')).toBeDefined();
      expect(getByText('Ellen Jameson')).toBeDefined();
    });
  });
});
