import { styled, ToggleButton } from '@mui/material';
import { ShipSpecialty } from 'models/builds/shipSpecialty';
import {
  QueryExplanation,
  QuerySection,
  QuerySectionHeader,
} from './sharedComponents';

const SpecialBox = styled('div')(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  '& button': {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

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
    <QuerySection sx={{ gridArea: 'specializations' }}>
      <QuerySectionHeader>Ship Specializations</QuerySectionHeader>
      <QueryExplanation>
        Select specializations that the ship should fulfill.
      </QueryExplanation>
      <SpecialBox>
        {getSpecialties(false).map((special) => (
          <ToggleButton
            value={special}
            key={special}
            selected={selectedSpecialties.includes(special)}
            onChange={() => handleSpecialties(special)}
          >
            {special}
          </ToggleButton>
        ))}
      </SpecialBox>
      <QueryExplanation sx={{ my: 1 }}>Combat Specialties</QueryExplanation>
      <SpecialBox>
        {getSpecialties(true).map((special) => (
          <ToggleButton
            value={special}
            key={special}
            selected={selectedSpecialties.includes(special)}
            onChange={() => handleSpecialties(special)}
          >
            {special}
          </ToggleButton>
        ))}
      </SpecialBox>
    </QuerySection>
  );
};

const getSpecialties = (isCombat: boolean): string[] => {
  let specialties: string[] = [];

  for (const speciality in ShipSpecialty) {
    specialties = [
      ...specialties,
      ShipSpecialty[speciality as keyof typeof ShipSpecialty],
    ];
  }
  specialties = isCombat
    ? specialties.filter((x) => x.startsWith('Combat'))
    : specialties.filter((x) => !x.startsWith('Combat'));
  return specialties;
};
