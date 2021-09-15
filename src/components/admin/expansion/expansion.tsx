import { calculateExpansion } from 'functions/expansion';
import { useEffect } from 'react';

export const ExpansionComponent = () => {
  useEffect(() => {
    const fn = async () => {
      const expansionOptions = await calculateExpansion(
        'Bibaridji',
        'United Systems Cooperative'
      );
      console.log({ expansionOptions });
    };
    fn();
  });

  return <div>Hello</div>;
};
