import { calculateExpansion } from 'functions/expansion';
import { IEDDBFaction } from 'models/eddb/faction';
import { IEDDBPopulatedSystem } from 'models/eddb/populatedSystem';
import { useEffect } from 'react';

export const ExpansionComponent = ({
  systems,
  factions,
}: {
  systems: IEDDBPopulatedSystem[];
  factions: IEDDBFaction[];
}) => {
  useEffect(() => {
    const fn = async () => {
      const expansionOptions = await calculateExpansion(
        {
          sourceSystem: 'Bibaridji',
          factionExpanding: 'United Systems Cooperative',
        },
        systems,
        factions
      );
      console.log({ expansionOptions });
    };
    fn();
  });

  return <div>Hello</div>;
};
