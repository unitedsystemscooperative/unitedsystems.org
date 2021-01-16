import { gql } from '@apollo/client';

export const InsertShipBuild = gql`
  mutation AddBuild($build: ShipBuildsv2InsertInput!) {
    insertOneShipBuildsv2(data: $build) {
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
