export const copytoClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    throw e;
  }
};
