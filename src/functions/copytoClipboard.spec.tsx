import { copytoClipboard } from './copytoClipboard';
import userEvent from '@testing-library/user-event';

describe('copytoClipboard', () => {
  it('should copy', () => {
    const user = userEvent.setup();

    navigator.clipboard.writeText = jest.fn();
    copytoClipboard('copy text');

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('copy text');
  });
});
