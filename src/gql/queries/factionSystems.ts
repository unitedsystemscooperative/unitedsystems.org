export const AllFactionSystems = /* GraphQL */ `
  query AllSystems {
    factionSystems(sortBy: TEXT_ASC) {
      text
      link
    }
  }
`;
