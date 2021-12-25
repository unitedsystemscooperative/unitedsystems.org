import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { EngToggleGroup } from '../engToggleGroup';
import { QueryExplanation, QuerySection, QuerySectionHeader } from './sharedComponents';

export const QueryEngineering = (props: {
  engLevel: number | null;
  setEngLevel: Dispatch<SetStateAction<number | null>>;
}) => {
  const { engLevel, setEngLevel } = props;

  const handleEngLevelChange = (_: MouseEvent<HTMLElement>, newValue: number) => {
    setEngLevel(newValue);
  };

  return (
    <QuerySection sx={{ gridArea: 'engineering' }}>
      <QuerySectionHeader>Ship Engineering Level</QuerySectionHeader>
      <QueryExplanation>
        Select Engineering level ranging from None to Max Engineering.
      </QueryExplanation>
      <EngToggleGroup engLevel={engLevel} handleEngLevelChange={handleEngLevelChange} />
    </QuerySection>
  );
};
