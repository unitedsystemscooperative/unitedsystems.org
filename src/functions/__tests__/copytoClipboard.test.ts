import { copytoClipboard } from '@/functions/copytoClipboard';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: async () => {},
  },
});

describe('copytoClipboard', () => {
  it('should copy', async () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    await copytoClipboard('copy text');

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('should throw', async () => {
    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(async () => {
      throw new Error();
    });
    expect.assertions(1);

    try {
      await copytoClipboard('copy text');
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
