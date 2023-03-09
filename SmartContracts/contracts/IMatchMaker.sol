// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMatchMaker {
    function makeMatches(uint _round, uint _tid) external;
    // event RequestSent(uint256 requestId, uint32 numWords);
    // event RequestFulfilled(uint256 requestId, uint256[] randomWords);
    // event MatchMade(uint MatchId, uint team1, uint team2);
    // event BracketUpdated(uint MatchId, uint WinnerId, uint TournamentId, uint roundId);
    // event RoundStarted(uint roundId, uint TournamentId);
    struct Match {
        uint id;
        uint winner;
        uint tournamentId;
        uint roundId;
    }
    // struct Request{
    //     uint requestId;
    //     uint tId;
    // }
    function getMatches(uint id) external view returns(Match memory);
    // function players(uint _tid,uint _roundId) external view returns(uint[] memory);
    // function winners(uint _tid,uint _roundId) external view returns(uint [] memory);
    function _updateWinner(uint _mid,uint _winnerId) external; 
    // function getTournamentRoundMatches(uint _tid,uint _rid) external view returns(Match[] memory);
}