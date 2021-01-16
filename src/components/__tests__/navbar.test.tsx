import { cleanup, render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavbarComponent } from 'components/navbar';
import { SnackbarProvider } from 'notistack';
import * as snackbarhooks from 'notistack';
import * as anonhooks from 'hooks/useLoginAnon';

jest.mock('hooks/useLoginAnon', () => ({
  useLoginAnon: jest.fn(),
}));

let componentBody: RenderResult;

describe('Navbar', () => {
  afterEach(cleanup);

  it(`should match the snapshot`, () => {
    componentBody = render(
      <SnackbarProvider maxSnack={3}>
        <MemoryRouter>
          <NavbarComponent />
        </MemoryRouter>
      </SnackbarProvider>
    );
    const { baseElement } = componentBody;
    expect(baseElement).toMatchSnapshot();
  });

  it('should show a snackbar if loginAnon failed', async () => {
    const enqueueSnackbarMock = jest.fn();
    jest.spyOn(snackbarhooks, 'useSnackbar').mockImplementation(() => ({
      enqueueSnackbar: enqueueSnackbarMock,
      closeSnackbar: jest.fn(),
    }));
    jest.spyOn(anonhooks, 'useLoginAnon').mockImplementation(() => {
      throw new Error('oops');
    });

    componentBody = render(
      <SnackbarProvider maxSnack={3}>
        <MemoryRouter>
          <NavbarComponent />
        </MemoryRouter>
      </SnackbarProvider>
    );

    expect(enqueueSnackbarMock).toHaveBeenCalled();
  });
});
