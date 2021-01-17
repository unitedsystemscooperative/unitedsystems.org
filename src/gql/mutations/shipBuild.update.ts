export const UpdateRelatedShipBuilds = /* GraphQL */ `
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
