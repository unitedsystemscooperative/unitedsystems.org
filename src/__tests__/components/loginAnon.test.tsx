import { cleanup, render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import * as snackbarhooks from 'notistack';
import * as anonhooks from 'hooks/useLoginAnon';
import { LoginAnon } from 'components/loginAnon';

jest.mock('hooks/useLoginAnon', () => ({
  useLoginAnon: jest.fn(),
}));

describe('LoginAnon', () => {
  afterEach(cleanup);

  it('should show a snackbar if loginAnon failed', async () => {
    const enqueueSnackbarMock = jest.fn();
    jest.spyOn(snackbarhooks, 'useSnackbar').mockImplementation(() => ({
      enqueueSnackbar: enqueueSnackbarMock,
      closeSnackbar: jest.fn(),
    }));
    jest.spyOn(anonhooks, 'useLoginAnon').mockImplementation(() => {
      throw new Error('oops');
    });

    render(
      <SnackbarProvider maxSnack={3}>
        <LoginAnon />
      </SnackbarProvider>
    );

    expect(enqueueSnackbarMock).toHaveBeenCalled();
  });
});
