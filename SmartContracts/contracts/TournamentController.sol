// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IMatchMaker.sol";
import "./IEscrow.sol";
contract TournamentController is Ownable{
    // counters openzeppelin
    using Counters for Counters.Counter;

    // all the events
    event TeamCreated(uint teamId,address leader,address[] members);
    event TournamentCreated(uint tournmenId,uint prizepool,string organizer,address orgAddress,address matchMaker);
    event Registered(uint teamId,uint tournamentId);
    event TournamentUpdated(uint tid,uint newroundId);
    event TournamentEnded(uint tid,uint round,uint[] distributions, uint[] winners);
    event DistributionSet(uint tid,uint[] distributions);
    // event TournamentStarted();
    // counter for tournament ids
    Counters.Counter internal tournamentCounter;
    Counters.Counter internal teamCounter;
    // escrow contract address
    address payable public escrow;
    // match maker contract address


    //get all participant teams from a tournament id
    mapping(uint => uint[]) public participants;
    // get the prize distribution for tournament id
    mapping (uint => uint[]) public distributions;
    // tournament wise round wise winners
    mapping (uint => mapping(uint=>uint[])) public winners;
    // get Tournament from Tournament id
    mapping(uint => Tournament) public tournaments;
    // mapping for teams
    mapping(uint=>Team) public teams;
    // mapping for tournamentId to ongoing round
    // mapping(uint => uint16 ) public rounds;

    enum State{
        Created,
        Started,
        Finished
    }

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
        address matchMaker;
        State state;
        Organizer org;
        RewardToken token;
        Prizes prize;
    }

    // constructor
    constructor(address payable _escrow) {
        escrow=_escrow;
    }

    function createTournament(Tournament memory _t) external payable {
        require(_t.round==0,"TournamentController: Can only start with round 0!");
        require(_t.org.Add_org== msg.sender,"TournamentController: Only organizer can create a tournament!");
        require(_t.sizeLimit>0,"TournamentController: Can not have a size limit of 0!");
        require(_t.maxParticipants>0,"TournamentController: Can not have max participants as 0!");
        require(_t.state==State.Created,"TournamentController:Can only have the initial state");
        require(_t.round==0,"TournamentController: Can only start from round 0");
        uint allowance=IERC20(_t.token.tokenAddress).allowance(msg.sender,address(this));
        require(allowance>=_t.prize.totalPool,"TournamentController: Not Enough allowance!");
        uint pp=_t.prize.participantPool;
        uint vp=_t.prize.viewerPool;
        uint orf=_t.prize.organizerFee;
        require(_t.prize.totalPool==pp+vp+orf,"TournamentController:Incorrect Total pool!");
        IERC20(_t.token.tokenAddress).transferFrom(msg.sender,escrow,_t.prize.totalPool);
        IEscrow(escrow).createEscrow(tournamentCounter.current(),payable(_t.org.Add_org),_t.prize.participantPool,_t.prize.viewerPool,_t.prize.organizerFee,_t.token.tokenAddress);
        tournamentCounter.increment();
        tournaments[tournamentCounter.current()]=_t;
        // rounds[tournamentCounter.current()]=0;
        emit TournamentCreated(tournamentCounter.current(),_t.prize.totalPool,_t.org.name,_t.org.Add_org,_t.matchMaker);
    }

     /// @param id - tournament's id
     /// @param _dist - the array of prize distribution for the tournament
    function setDistribution(uint [] memory _dist,uint id) external{
        require(id<=tournamentCounter.current(),"TournamentController: Invalid tournament id");
        require(tournaments[id].state==State.Created,"TournamentController: Distribution can not be changed!");
        require(msg.sender == tournaments[id].org.Add_org, "TournamentController: Only the oraganizer can set the distribution");
        uint distTotal;
        for(uint i=0;i<_dist.length;i++){
            distTotal+=_dist[i];
        }
        require(distTotal==tournaments[id].prize.participantPool,"TournamentController: Incorrect distribution!");
        distributions[id]=_dist;
        emit DistributionSet(id, _dist);
    }

    function createTeam(Team memory _team) public {
        require(msg.sender==_team.leader,"TournamentController: Only the leader can create a team!");
        for(uint i=0;i<_team.members.length;i++){
            for(uint j=i+1;j<_team.members.length;j++){
                if(_team.members[j]==_team.members[i]){
                    revert("TournamentController: Duplicate team members not allowed!");
                }
            }
        }
        teamCounter.increment();
        teams[teamCounter.current()]=_team;
        emit TeamCreated(teamCounter.current(),_team.leader,_team.members);
    }
    function register(uint _tournamentId,uint _teamId) public {
        require(_teamId<=teamCounter.current(),"TournamentController: Team id does not exsist!");
        require(_tournamentId<=tournamentCounter.current(),"TournamentController: Tournament id does not exsist!");
        require(tournaments[_tournamentId].state==State.Created,"TournamentController: Registration time for tournament over!");
        require(msg.sender==teams[_teamId].leader,"TournamentController: Only Team Leader can register!");
        require(teams[_teamId].members.length==tournaments[_tournamentId].sizeLimit,"TournamentController: Invalid team size!");
        require(participants[_tournamentId].length<tournaments[_tournamentId].maxParticipants,"TournamentController: Maximum participants limit reached!");
        for(uint i=0;i<participants[_tournamentId].length;i++){
            if(participants[_tournamentId][i]==_teamId){
                revert("TournamentController: Team already registered for the given Tournament!");
            }
        }
        participants[_tournamentId].push(_teamId);
        emit Registered(_teamId,_tournamentId);
    }

    function updateMatchWinner(uint _tid,uint _mid, uint _winnerId) public {
        require(_tid!=0,"TournamentController: Incorrect Match ID!");
        require(_tid<=tournamentCounter.current(),"TournamentController: Invalid Match Id");
        address matchMakerAddress=tournaments[_tid].matchMaker;
        require(msg.sender==tournaments[_tid].org.Add_org,"TournamentController: Only Organizer can update match winner!");
        require(tournaments[_tid].state==State.Started,"TouranmentController: Can only update the state of an ongoing tournament!");
        require(tournaments[_tid].round==IMatchMaker(matchMakerAddress).getMatches(_mid).roundId,"TournamentController: Can only update a match in an ongoing round");
        IMatchMaker(matchMakerAddress)._updateWinner(_mid,_winnerId);
        winners[_tid][tournaments[_tid].round].push(_winnerId);
    }
    

    function cancelTournament(uint _tid) public {
        require(_tid<tournamentCounter.current(),"TournamentController: Invalid Tournament Id");
        require(tournaments[_tid].org.Add_org==msg.sender,"TournamentController: Only the organizer can cancel the tournament");
        require(tournaments[_tid].state==State.Created,"TournamenController: Can only cancel a tournament which is not started!");
        IEscrow(escrow).refundPayment(_tid);
    }

    // function not incrementing round :( 
    function updateTournamentState(uint _tid,uint _nextRound) public{
        require(tournamentCounter.current()<=_tid,"TournamentController: Invailid Tournament Id!");
        require(tournaments[_tid].state!=State.Finished,"TouranmentController: Can only update the state of an ongoing tournament!");
        require(tournaments[_tid].round==_nextRound-1,"TournamentController: Can only start the next round!");
        require(tournaments[_tid].org.Add_org==msg.sender,"TournamentController: Only the organizer can update state");
        require(distributions[_tid].length!=0,"TournamentController: Must set up distribution before starting the tournament");
        if(_nextRound==1){
            tournaments[_tid].state=State.Started;
        }
        tournaments[_tid].round++;
        address matchMakerAddress=tournaments[_tid].matchMaker;
        IMatchMaker(matchMakerAddress).makeMatches(_nextRound,_tid);
        emit TournamentUpdated(_tid, _nextRound);
    }

    // all the getter functions

    function getParticipants(uint _tid) public view returns(uint[] memory){
        require(_tid<=tournamentCounter.current(),"TournamentController: Invalid tournament Id!");
        return participants[_tid];
    }

    function getTeamDetails(uint _id) public view returns(Team memory){
        require(teamCounter.current()>=_id,"TournamentController: Invalid Team Id!");
        return teams[_id];
    }
    function setEscrowAddress(address _escrow) onlyOwner public{
        require(_escrow != address(0),"TournamentController: Escrow Address can not be set to 0");
        escrow=payable(_escrow);
    }

    

    function endTournament(uint _tid,uint[] memory winnerIds) public{
        require(tournaments[_tid].state==State.Started,"TournamentController: Must start the tournament first!");
        require(winnerIds.length==distributions[_tid].length,"TournamentController: Only as many winners as distributions");
        address payable[] memory winnersAddress;
        for(uint i=0;i<winnerIds.length;i++){
            winnersAddress[i]=payable(teams[winnerIds[i]].leader);
        }
        IEscrow(escrow).releasePayment(_tid,winnersAddress,distributions[_tid]);
        tournaments[_tid].state=State.Finished;
        emit TournamentEnded(_tid, tournaments[_tid].round, distributions[_tid], winnerIds);
    }

}