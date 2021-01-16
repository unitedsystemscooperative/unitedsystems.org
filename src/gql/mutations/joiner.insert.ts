import { gql } from '@apollo/client';

export const InsertJoiner = gql`
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
