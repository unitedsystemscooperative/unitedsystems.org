import { gql } from '@apollo/client';

export const AllFactionSystems = gql`
  query AllSystems {
    factionSystems(sortBy: TEXT_ASC) {
      text
      link
    }
  }
`;
