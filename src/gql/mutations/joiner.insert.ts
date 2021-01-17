export const InsertJoiner = /* GraphQL */ `
  mutation AddJoiner($joiner: JoinerInsertInput!) {
    insertOneJoiner(data: $joiner) {
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
