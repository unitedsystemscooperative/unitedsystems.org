import { render, waitFor } from '@testing-library/react';
import systems from '~/about/data/systems.json';
import * as hook from '~/about/hooks/useSystems';
import { AboutSystems } from '~/about/components/systems';
import * as useSnackbar from 'notistack';

const useSystemsSpy = jest.spyOn(hook, 'useSystems');
const enqueueSnackbarSpy = jest.fn();
const useSnackbarSpy = jest.spyOn(useSnackbar, 'useSnackbar').mockImplementation(() => ({
  enqueueSnackbar: enqueueSnackbarSpy,
  closeSnackbar: jest.fn(),
}));
const mockenqueueSnackbar = jest.fn();
jest.mock('notistack', () => ({
  useSnackbar() {
    return {
      enqueueSnackbar: mockenqueueSnackbar ?? jest.fn(),
    };
  },
}));

describe('Allies Component', () => {
  it('should render with loading', () => {
    useSystemsSpy.mockImplementation(() => ({
      factionSystems: null,
      loading: true,
      error: null,
      addSystem: jest.fn(),
      updateSystem: jest.fn(),
      deleteSystem: jest.fn(),
    }));

    const { queryByTestId } = render(<AboutSystems init={null} />);

    expect(queryByTestId('system-loader')).toBeTruthy();
    expect(queryByTestId('system-list')).toBeNull();
  });

  it('should render with data', () => {
    useSystemsSpy.mockImplementation(() => ({
      factionSystems: systems,
      loading: false,
      error: null,
      addSystem: jest.fn(),
      updateSystem: jest.fn(),
      deleteSystem: jest.fn(),
    }));

    const { queryByTestId, getByText } = render(<AboutSystems init={null} />);

    expect(queryByTestId('system-list')).toBeTruthy();
    expect(getByText('HIP 4120')).toBeTruthy();
  });

  it('should call snackbar if an error occurs', async () => {
    useSystemsSpy.mockImplementation(() => ({
      factionSystems: null,
      loading: true,
      error: 'error is here',
      addSystem: jest.fn(),
      updateSystem: jest.fn(),
      deleteSystem: jest.fn(),
    }));

    render(<AboutSystems init={null} />);

    expect(mockenqueueSnackbar).toHaveBeenCalled();
  });
});
