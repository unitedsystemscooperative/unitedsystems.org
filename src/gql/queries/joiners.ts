export const QueryAllJoiners = /* GraphQL */ `
  query AllJoiners {
    joiners(sortBy: TIMESTAMP_DESC) {
      timeStamp
      type
      cmdr
      discord
      platforms {
        pc
        ps
        xbox
      }
      playingLength
      reference
      reference2
      timezone
      group
      needPrivate
    }
  }
`;
