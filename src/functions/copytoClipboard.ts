export const copytoClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  // const tempInput = document.createElement('input');
  // tempInput.value = text;
  // document.body.appendChild(tempInput);
  // tempInput.select();
  // document.execCommand('copy');
  // document.body.removeChild(tempInput);
};
