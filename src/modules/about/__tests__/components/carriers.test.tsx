import { server } from '@/__mocks__/server/server';
import { SWRConfigReset } from '@/__mocks__/swr-reset';
import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { Carriers } from '~/about/components/carriers/carriers';
import { testFleetCarriers } from '../../data/fleetCarriers';

describe('Carriers', () => {
  it('renders when loading', () => {
    const { getByText } = render(
      <SWRConfigReset>
        <Carriers />
      </SWRConfigReset>
    );

    expect(getByText('Loading')).toBeDefined();
  });

  it('renders Fleet Carriers', async () => {
    server.use(rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json(testFleetCarriers))));
    const { getByText } = render(
      <SWRConfigReset>
        <Carriers />
      </SWRConfigReset>
    );

    await waitFor(() => {
      expect(getByText('Zocalo')).toBeDefined();
      expect(getByText('UltraNeros')).toBeDefined();
      expect(getByText('Ellen Jameson')).toBeDefined();
    });
  });
});
