import { Box, ToggleButton } from '@mui/material';
import { ShipSpecialty } from 'models/builds/shipSpecialty';
import {
  QueryExplanation,
  QuerySection,
  QuerySectionHeader,
} from './sharedComponents';

export const QuerySpecialties = (props: {
  selectedSpecialties: string[];
  setSpecialties: (value: string[]) => void;
}) => {
  const { selectedSpecialties, setSpecialties } = props;

  const handleSpecialties = (special: string) => {
    let newSpecials: string[] = [];
    if (selectedSpecialties.includes(special)) {
      newSpecials = selectedSpecialties.filter((v) => v !== special);
    } else {
      newSpecials = [...selectedSpecialties, special];
    }
    setSpecialties(newSpecials);
  };

  return (
    <QuerySection>
      <QuerySectionHeader>Ship Specializations</QuerySectionHeader>
      <QueryExplanation text="Select specializations that the ship should fulfill." />
      <Box
        sx={{
          display: 'grid',
          gridTemplate: {
            xs: 'repeat(4, 1fr) / repeat(3, 1fr)',
            lg: 'repeat(3, 1fr) / repeat(4, 1fr)',
          },
          '& button': {
            mr: 1,
            mt: 1,
          },
        }}
      >
        {getSpecialties().map((special) => (
          <ToggleButton
            value={special}
            key={special}
            selected={selectedSpecialties.includes(special)}
            onChange={() => handleSpecialties(special)}
          >
            {special}
          </ToggleButton>
        ))}
      </Box>
    </QuerySection>
  );
};

const getSpecialties = (): string[] => {
  let specialties: string[] = [];

  for (const speciality in ShipSpecialty) {
    specialties = [
      ...specialties,
      ShipSpecialty[speciality as keyof typeof ShipSpecialty],
    ];
  }
  return specialties;
};
