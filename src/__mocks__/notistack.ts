export const useSnackbar = () => {
  return {
    enqueueSnackbar: jest.fn(),
  };
};
