/**
 * `mockenqueueSnackbar` can be imported to watch in tests.
 */
export const mockenqueueSnackbar = jest.fn();
export const useSnackbar = () => {
  return {
    enqueueSnackbar: mockenqueueSnackbar ?? jest.fn(),
  };
};
