import { gql } from '@apollo/client';

export const QueryAllFleetCarriers = gql`
  query AllFleetCarriers {
    fleetCarriers {
      id
      name
      owner
      purpose
    }
  }
`;
