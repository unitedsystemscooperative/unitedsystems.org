export const QueryAllShipBuilds = /* GraphQL */ `
  query AllShipBuildsv2s {
    shipBuildsv2s(sortBy: SHIPID_ASC) {
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
