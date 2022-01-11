import { errorHandlers } from '@/__mocks__/server/handlers/errorHandlers';
import { server } from '@/__mocks__/server/server';
import { SWRConfigReset } from '@/__mocks__/swr-reset';
import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { AboutSystems } from '~/about/components/systems';
import { testSystems } from '~/about/data/systems';

const mockenqueueSnackbar = jest.fn();
jest.mock('notistack', () => ({
  useSnackbar() {
    return {
      enqueueSnackbar: mockenqueueSnackbar ?? jest.fn(),
    };
  },
}));

describe('Systems Component', () => {
  it('should render with loading', () => {
    const { queryByTestId } = render(
      <SWRConfigReset>
        <AboutSystems init={null} />
      </SWRConfigReset>
    );

    expect(queryByTestId('system-loader')).toBeTruthy();
    expect(queryByTestId('system-list')).toBeNull();
  });

  it('should render with data', async () => {
    server.use(rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json(testSystems))));

    const { queryByTestId, getByText } = render(
      <SWRConfigReset>
        <AboutSystems init={null} />
      </SWRConfigReset>
    );

    await waitFor(() => {
      expect(queryByTestId('system-list')).toBeTruthy();
      expect(getByText('HIP 4120')).toBeTruthy();
    });
  });

  it('should call snackbar if an error occurs', async () => {
    server.use(...errorHandlers);

    render(
      <SWRConfigReset>
        <AboutSystems init={null} />
      </SWRConfigReset>
    );

    await waitFor(() => {
      expect(mockenqueueSnackbar).toHaveBeenCalled();
    });
  });
});
