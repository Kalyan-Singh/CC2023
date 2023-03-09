export const matchMakerSe = "0x1513bFE8b145bC448056EcF585f2bd99D3436BB1";

export const abi_matchMakerSe = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tournmentControllerAddress",
        type: "address",
      },
      { internalType: "uint64", name: "_subId", type: "uint64" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "have", type: "address" },
      { internalType: "address", name: "want", type: "address" },
    ],
    name: "OnlyCoordinatorCanFulfill",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "MatchId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "WinnerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "TournamentId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
    ],
    name: "BracketUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "MatchId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "team1",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "team2",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tournamentId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rountId",
        type: "uint256",
      },
    ],
    name: "MatchMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
    ],
    name: "RequestFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "numWords",
        type: "uint32",
      },
    ],
    name: "RequestSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "TournamentId",
        type: "uint256",
      },
    ],
    name: "RoundStarted",
    type: "event",
  },
  {
    inputs: [],
    name: "TournamentControllerAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_mid", type: "uint256" },
      { internalType: "uint256", name: "_winnerId", type: "uint256" },
    ],
    name: "_updateWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tournamentControllerAddress",
        type: "address",
      },
    ],
    name: "changeTournamentController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tid", type: "uint256" }],
    name: "getByeTeams",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "getMatchTeams",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_mid", type: "uint256" }],
    name: "getMatches",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "winner", type: "uint256" },
          { internalType: "uint256", name: "tournamentId", type: "uint256" },
          { internalType: "uint256", name: "roundId", type: "uint256" },
        ],
        internalType: "struct IMatchMaker.Match",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tid", type: "uint256" },
      { internalType: "uint256", name: "_rid", type: "uint256" },
    ],
    name: "getTournamentRoundMatches",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "winner", type: "uint256" },
          { internalType: "uint256", name: "tournamentId", type: "uint256" },
          { internalType: "uint256", name: "roundId", type: "uint256" },
        ],
        internalType: "struct IMatchMaker.Match[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_round", type: "uint256" },
      { internalType: "uint256", name: "_tid", type: "uint256" },
    ],
    name: "makeMatches",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "matches",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "winner", type: "uint256" },
      { internalType: "uint256", name: "tournamentId", type: "uint256" },
      { internalType: "uint256", name: "roundId", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "players",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "requestId", type: "uint256" },
      { internalType: "uint256[]", name: "randomWords", type: "uint256[]" },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "_gas", type: "uint32" }],
    name: "setCallBackGasLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_keyHash", type: "bytes32" }],
    name: "setKeyHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "_number", type: "uint32" }],
    name: "setNumWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "_reqConf", type: "uint16" }],
    name: "setRequestConfirmations",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "_subID", type: "uint64" }],
    name: "setSubscriptionId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "winners",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export const tournamentController =
  "0x01f7654afB282C73C71210C132D209D3D6e20f90";

export const abi_tournamentController = [
  {
    inputs: [
      { internalType: "address payable", name: "_escrow", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "tid", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "distributions",
        type: "uint256[]",
      },
    ],
    name: "DistributionSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "teamId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tournamentId",
        type: "uint256",
      },
    ],
    name: "Registered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "teamId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "leader",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "members",
        type: "address[]",
      },
    ],
    name: "TeamCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tournmenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "prizepool",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "organizer",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "orgAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "matchMaker",
        type: "address",
      },
    ],
    name: "TournamentCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "tid", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "round",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "distributions",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "winners",
        type: "uint256[]",
      },
    ],
    name: "TournamentEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "tid", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "newroundId",
        type: "uint256",
      },
    ],
    name: "TournamentUpdated",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tid", type: "uint256" }],
    name: "cancelTournament",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "address[]", name: "members", type: "address[]" },
          { internalType: "address", name: "leader", type: "address" },
        ],
        internalType: "struct TournamentController.Team",
        name: "_team",
        type: "tuple",
      },
    ],
    name: "createTeam",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "round", type: "uint16" },
          { internalType: "uint16", name: "sizeLimit", type: "uint16" },
          { internalType: "uint32", name: "maxParticipants", type: "uint32" },
          { internalType: "bytes32", name: "bracketType", type: "bytes32" },
          { internalType: "address", name: "matchMaker", type: "address" },
          {
            internalType: "enum TournamentController.State",
            name: "state",
            type: "uint8",
          },
          {
            components: [
              { internalType: "string", name: "name", type: "string" },
              { internalType: "address", name: "Add_org", type: "address" },
            ],
            internalType: "struct TournamentController.Organizer",
            name: "org",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
              { internalType: "string", name: "chain", type: "string" },
            ],
            internalType: "struct TournamentController.RewardToken",
            name: "token",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "participantPool",
                type: "uint256",
              },
              { internalType: "uint256", name: "viewerPool", type: "uint256" },
              {
                internalType: "uint256",
                name: "organizerFee",
                type: "uint256",
              },
              { internalType: "uint256", name: "totalPool", type: "uint256" },
            ],
            internalType: "struct TournamentController.Prizes",
            name: "prize",
            type: "tuple",
          },
        ],
        internalType: "struct TournamentController.Tournament",
        name: "_t",
        type: "tuple",
      },
    ],
    name: "createTournament",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "distributions",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tid", type: "uint256" },
      {
        internalType: "address payable[]",
        name: "winnersAddress",
        type: "address[]",
      },
      { internalType: "uint256[]", name: "winnerIds", type: "uint256[]" },
    ],
    name: "endTournament",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "escrow",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tid", type: "uint256" }],
    name: "getParticipants",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "getTeamDetails",
    outputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "address[]", name: "members", type: "address[]" },
          { internalType: "address", name: "leader", type: "address" },
        ],
        internalType: "struct TournamentController.Team",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "participants",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tournamentId", type: "uint256" },
      { internalType: "uint256", name: "_teamId", type: "uint256" },
    ],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "_dist", type: "uint256[]" },
      { internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "setDistribution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_escrow", type: "address" }],
    name: "setEscrowAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "teams",
    outputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "address", name: "leader", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "tournaments",
    outputs: [
      { internalType: "uint16", name: "round", type: "uint16" },
      { internalType: "uint16", name: "sizeLimit", type: "uint16" },
      { internalType: "uint32", name: "maxParticipants", type: "uint32" },
      { internalType: "bytes32", name: "bracketType", type: "bytes32" },
      { internalType: "address", name: "matchMaker", type: "address" },
      {
        internalType: "enum TournamentController.State",
        name: "state",
        type: "uint8",
      },
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "address", name: "Add_org", type: "address" },
        ],
        internalType: "struct TournamentController.Organizer",
        name: "org",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "tokenAddress", type: "address" },
          { internalType: "string", name: "chain", type: "string" },
        ],
        internalType: "struct TournamentController.RewardToken",
        name: "token",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "participantPool", type: "uint256" },
          { internalType: "uint256", name: "viewerPool", type: "uint256" },
          { internalType: "uint256", name: "organizerFee", type: "uint256" },
          { internalType: "uint256", name: "totalPool", type: "uint256" },
        ],
        internalType: "struct TournamentController.Prizes",
        name: "prize",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tid", type: "uint256" },
      { internalType: "uint256", name: "_mid", type: "uint256" },
      { internalType: "uint256", name: "_winnerId", type: "uint256" },
    ],
    name: "updateMatchWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tid", type: "uint256" },
      { internalType: "uint256", name: "_nextRound", type: "uint256" },
    ],
    name: "updateTournamentState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "winners",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
