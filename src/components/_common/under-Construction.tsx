import Image from 'next/image';
import img from './construction.png';

export const UnderConstruction = (props: { title?: string }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 data-testid="title">{props?.title}</h2>
      <h3>This page is currently under construction.</h3>
      <Image width={300} alt="Under Construction" src={img} />
    </div>
  );
};
