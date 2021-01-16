import { gql } from '@apollo/client';

export const UpdateRelatedShipBuilds = gql`
  mutation UpdateRelatedOneShipBuildsv2(
    $build: ShipBuildsv2QueryInput
    $input: ShipBuildsv2UpdateInput!
  ) {
    updateOneShipBuildsv2(query: $build, set: $input) {
      _id
      related
      variants
    }
  }
`;
