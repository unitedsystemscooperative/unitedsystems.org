import { testSystems } from '@/modules/about/data/systems';
import { SystemDashboard } from '@/modules/admin/components/systems/systemDashboard';
import { server } from '@/__mocks__/server/server';
import { SWRConfigReset } from '@/__mocks__/swr-reset';
import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw';

describe('Admin System Dashboard', () => {
  it('should render with loading', () => {
    const { queryByTestId } = render(
      <SWRConfigReset>
        <SystemDashboard />
      </SWRConfigReset>
    );
    expect(queryByTestId('systemList-Controlled Systems')).toBeNull();
    expect(queryByTestId('systemList-Present In Systems')).toBeNull();
  });

  it('should render with data', async () => {
    server.use(rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json(testSystems))));

    const { getByTestId, getByText } = render(
      <SWRConfigReset>
        <SystemDashboard init={null} />
      </SWRConfigReset>
    );

    await waitFor(() => {
      expect(getByTestId('systemList-Controlled Systems')).toBeTruthy();
      expect(getByTestId('systemList-Present In Systems')).toBeTruthy();
      expect(getByText('Arugbal')).toBeTruthy();
    });
  });

  it.todo('should add an system');

  it.todo('should edit an system');

  it.todo('should delete an system');
});
