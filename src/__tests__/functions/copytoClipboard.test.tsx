import { copytoClipboard } from 'functions/copytoClipboard';

describe('copytoClipboard', () => {
  it('should copy', () => {
    document.execCommand = jest.fn();
    copytoClipboard('copy text');

    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });
});
