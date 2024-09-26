import Image from "next/image";

export const EDSpinner = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Loading</h3>
      <Image
        id="imgLoading"
        width="300"
        alt="Loading"
        src="https://edassets.org/static/img/svg/EDLoader1.svg"
      />
    </div>
  );
};
