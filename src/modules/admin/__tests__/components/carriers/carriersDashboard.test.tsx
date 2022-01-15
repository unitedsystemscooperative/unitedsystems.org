import { testFleetCarriers } from '@/modules/about/data/fleetCarriers';
import { CarriersDashboard } from '@/modules/admin/components/carriers/carriersDashboard';
import { server } from '@/__mocks__/server/server';
import { SWRConfigReset } from '@/__mocks__/swr-reset';
import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw';

describe('Admin Carrier Dashboard', () => {
  it('should render with loading', () => {
    const { queryByText } = render(
      <SWRConfigReset>
        <CarriersDashboard />
      </SWRConfigReset>
    );
    expect(queryByText('Zocalo')).toBeNull();
  });

  it('should render with data', async () => {
    server.use(rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json(testFleetCarriers))));

    const { getByText } = render(
      <SWRConfigReset>
        <CarriersDashboard />
      </SWRConfigReset>
    );

    await waitFor(() => {
      expect(getByText('Zocalo')).toBeDefined();
      expect(getByText('UltraNeros')).toBeDefined();
      expect(getByText('Ellen Jameson')).toBeDefined();
    });
  });

  it.todo('should add an carrier');

  it.todo('should edit an carrier');

  it.todo('should delete an carrier');
});
