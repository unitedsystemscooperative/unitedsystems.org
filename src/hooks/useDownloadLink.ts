export const useDownloadLink = () => {
  const getDownloadLink = (fileID: string) =>
    `https://drive.google.com/uc?export=view&id=${fileID}`;

  return { getDownloadLink };
};
