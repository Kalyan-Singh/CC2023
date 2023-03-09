// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITournamentController {

    event TeamCreated();
    event TournamentCreated();
    event TournamentStarted();

    function createTournament(Tournament memory _t) external payable;
    function setDistribution(uint [] memory _dist,uint id) external;
    function createTeam(Team memory _team) external;
    function register(uint _tournamentId,uint _teamId) external;
    // function getParticipants(uint _tid) external view returns(uint[] memory);
    // function getRound(uint _tid) external view returns(uint16);
    // function getTournamentDetails(uint _tid) external view returns(Tournament memory);
    // function getTeamDetails(uint _id) external view returns (Team memory);
    function participants(uint _tid) external view returns(uint[] memory);
    function distributions(uint _tid) external returns(uint[] memory);
    function tournaments(uint _tid) external returns (Tournament memory);
    function teams(uint _id) external returns (Team memory);
    function getParticipants(uint _tid) external view returns(uint[] memory);

    struct Team {
        string name;
        address[] members;
        address leader;
    }

    struct Organizer{
        string name;
        address Add_org;
    }
    struct RewardToken{
        address tokenAddress;
        string chain;
    }
    struct Prizes{
        uint participantPool;
        uint viewerPool;
        uint organizerFee;
        uint totalPool;
    }

    struct Tournament{
        uint16 round;
        uint16 sizeLimit;
        uint32 maxParticipants;
        bytes32 bracketType;
        uint state;
        Organizer org;
        RewardToken token;
        Prizes prize;
    }
}
