import { testBuilds } from '@/modules/builds/data/shipBuildsv2';
import { server } from '@/__mocks__/server/server';
import { SWRConfigReset } from '@/__mocks__/swr-reset';
import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { BuildDashboard } from '~/admin/components/builds/buildDashboard';

describe('Admin Build Dashboard', () => {
  it('should render with loading', () => {
    const { queryByTestId } = render(
      <SWRConfigReset>
        <BuildDashboard />
      </SWRConfigReset>
    );
    expect(queryByTestId('allies-list')).toBeNull();
  });

  it('should render with data', async () => {
    server.use(rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json(testBuilds))));

    const { getByText } = render(
      <SWRConfigReset>
        <BuildDashboard init={null} />
      </SWRConfigReset>
    );

    await waitFor(() => {
      expect(getByText('Author')).toBeTruthy();
    });
  });

  it.todo('should add an build');

  it.todo('should edit an build');

  it.todo('should delete an build');
});
