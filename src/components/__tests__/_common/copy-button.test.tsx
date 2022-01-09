import { CopyButton } from '@/components/_common/copy-button';
import * as copyFn from '@/functions/copytoClipboard';
import { fireEvent, render, waitFor } from '@testing-library/react';

const copySpy = jest.spyOn(copyFn, 'copytoClipboard');
const mockenqueueSnackbar = jest.fn();
jest.mock('notistack', () => ({
  useSnackbar() {
    return {
      enqueueSnackbar: mockenqueueSnackbar ?? jest.fn(),
    };
  },
}));

describe('Copy Button', () => {
  it('should call copy and enqueueSnackbar', async () => {
    const { getByTestId } = render(
      <div data-testid="test">
        <CopyButton value="copyValue" />
      </div>
    );
    const button = getByTestId('test').children[0];

    fireEvent.click(button);

    expect(copySpy).toHaveBeenCalledWith('copyValue');

    await waitFor(() => {
      expect(mockenqueueSnackbar).toHaveBeenCalledWith('Copied', { variant: 'success' });
    });
  });

  it('should call enqueuesnackbar on failure', () => {
    copySpy.mockImplementation((_) => {
      throw new Error();
    });
    const { getByTestId } = render(
      <div data-testid="test">
        <CopyButton value="copyValue" />
      </div>
    );
    const button = getByTestId('test').children[0];

    fireEvent.click(button);

    expect(mockenqueueSnackbar).toHaveBeenCalledWith('Failed to copy', { variant: 'error' });
  });
});
