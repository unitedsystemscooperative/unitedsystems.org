import { VoteDashboard } from '@/modules/admin/components/vote/voteDashboard';
import { testCmdrs } from '@/modules/admin/data/cmdrs';
import { server } from '@/__mocks__/server/server';
import { SWRConfigReset } from '@/__mocks__/swr-reset';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';

describe('Admin Vote Dashboard', () => {
  it('should render with loading', () => {
    const { queryByText } = render(
      <SWRConfigReset>
        <VoteDashboard />
      </SWRConfigReset>
    );
    expect(queryByText('Vote Assistant')).toBeNull();
  });

  it('should render with data', async () => {
    server.use(rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json(testCmdrs))));

    const { getByText } = render(
      <SWRConfigReset>
        <VoteDashboard />
      </SWRConfigReset>
    );

    await waitFor(() => {
      expect(getByText('Vote Assistant')).toBeTruthy();
      expect(getByText('TESTADMIN0')).toBeTruthy();
      expect(getByText('TESTADMIN1')).toBeTruthy();
    });
  });

  it('should record a vote', async () => {
    server.use(rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json(testCmdrs))));

    const { getByText, getByTestId } = render(
      <SWRConfigReset>
        <VoteDashboard />
      </SWRConfigReset>
    );

    await waitFor(() => {
      getByText('Vote Assistant');
      getByTestId('voter-TESTADMIN0');
    });

    const buttonToClick = getByTestId('voter-TESTADMIN0').querySelector('[value="yay"]');

    expect(buttonToClick).not.toHaveClass('Mui-selected');

    fireEvent.click(buttonToClick);

    expect(buttonToClick).toHaveClass('Mui-selected');
  });
});
