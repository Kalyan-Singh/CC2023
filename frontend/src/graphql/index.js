import { gql } from "@apollo/client"


export const GET_MY_DATA=gql`
query($input:ID!){
  players(where: {id:$input}) {
    team{
      
      team{
        name
        members{
          player{
            id
          }
        }
        tournaments{
          tournament{
            id
            organizer
            totalPrize
          }
        }
      }
    }
  }
}
`



export const LOGIN_GET_MESSAGE = gql`
    mutation LoginGetMessage($input: LoginGetMessageInput!) {
        loginGetMessage(input: $input) {
            message
        }
    }
`;

export const PRIMARY_PROFILE = gql`
  query PrimaryProfile($address: AddressEVM!) {
    address(address: $address) {
      wallet {
        primaryProfile {
          id
          profileID
          handle
          metadata
          avatar
          isPrimary
        }
      }
    }
  }
`;

export const PRIMARY_PROFILE_ESSENCES = gql`
  query PrimaryProfileEssences($address: AddressEVM!) {
    address(address: $address) {
      wallet {
        primaryProfile {
          essences {
            totalCount
            edges {
              node {
                essenceID
                tokenURI
                createdBy {
                  handle
                  metadata
                  avatar
                  profileID
                }
                isCollectedByMe(me: $address)
              }
            }
          }
        }
      }
    }
  }
`;

export const ACCOUNTS = gql`
  query Accounts($address: AddressEVM!) {
    address(address: $address) {
      wallet {
        profiles {
          totalCount
          edges {
            node {
              id
              profileID
              handle
              metadata
              avatar
              isPrimary
            }
          }
        }
      }
    }
  }
`;
export const LOGIN_VERIFY = gql`
    mutation LoginVerify($input: LoginVerifyInput!) {
        loginVerify(input: $input) {
            accessToken
        }
    }
`;

export const CREATE_PROFILE_TYPED_DATA= gql`
mutation createProfileTypedData($input : CreateCreateProfileTypedDataInput!){
  createCreateProfileTypedData(input:$input){
    typedDataID
}
}
`
export const RELAY = gql`
  mutation Relay($input: RelayInput!) {
    relay(input: $input) {
      relayActionId
    }
  }
`;

export const RELAY_ACTION_STATUS = gql`
  query RelayActionStatus($relayActionId: ID!) {
    relayActionStatus(relayActionId: $relayActionId) {
      ... on RelayActionStatusResult {
        txHash
        txStatus
      }
      ... on RelayActionError {
        reason
        lastKnownTxHash
      }
      ... on RelayActionQueued {
        queuedAt
      }
    }
  }
`;

export const EXPLORE_QUERY=gql`query{
  profiles(first:100){
    edges{
      node{
        profileID
        handle
        avatar
        owner {
          address
        }
      }
    }
  }
}`

export const getTournamentDetail=gql`
query($input:BigInt!){
  matches(where: {tournamentId: $input}){
    id
    tournamentId
    round
    n_team1
    n_team2
    winner
  }
}
`