import { gql } from '@apollo/client';

export const ReplaceShipBuild = gql`
  mutation ReplaceBuild($build: ShipBuildsv2InsertInput!) {
    replaceOneShipBuildsv2(query: { _id: $buildID }, data: $build) {
      _id
      shipId
      specializations
      title
      buildLink
      engLevel
      hasGuardian
      hasPowerplay
      isBeginner
      author
      isVariant
      variants
      related
      description
      jsonBuild
    }
  }
`;
