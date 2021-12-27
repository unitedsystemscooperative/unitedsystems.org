import { copytoClipboard } from '@/functions/copytoClipboard';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: async () => {},
  },
});

describe('copytoClipboard', () => {
  jest.spyOn(navigator.clipboard, 'writeText');
  it('should copy', async () => {
    await copytoClipboard('copy text');

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
