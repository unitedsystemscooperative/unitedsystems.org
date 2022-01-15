import { allies } from '@/modules/about/data/allies';
import { server } from '@/__mocks__/server/server';
import { SWRConfigReset } from '@/__mocks__/swr-reset';
import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { AllyDashboard } from '../../../components/allies/allyDashboard';

describe('Admin Cmdr Dashboard', () => {
  xit('should render with loading', () => {
    const { queryByTestId } = render(
      <SWRConfigReset>
        <AllyDashboard />
      </SWRConfigReset>
    );
    expect(queryByTestId('allies-list')).toBeNull();
  });

  xit('should render with data', async () => {
    server.use(rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json(allies))));

    const { queryByTestId, getByText } = render(
      <SWRConfigReset>
        <AllyDashboard init={null} />
      </SWRConfigReset>
    );

    await waitFor(() => {
      expect(queryByTestId('allies-list')).toBeTruthy();
      expect(getByText('ROOKS')).toBeTruthy();
    });
  });

  it.todo('should add an cmdr');

  it.todo('should edit an cmdr');

  it.todo('should delete an cmdr');
});
