// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "./ITournamentController.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IMatchMaker.sol";


contract MatchMakerSE is VRFConsumerBaseV2, Ownable,IMatchMaker {
    // vrf settings
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);
    event MatchMade(uint MatchId,uint team1,uint team2,uint tournamentId,uint rountId);
    event BracketUpdated(uint MatchId, uint WinnerId, uint TournamentId,uint roundId);
    event RoundStarted(uint roundId,uint TournamentId);
    VRFCoordinatorV2Interface COORDINATOR;
    uint64 s_subscriptionId;
    bytes32 keyHash =
        0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314;
    uint32 callbackGasLimit = 2000000;
    uint16 requestConfirmations = 3;
    uint32 numWords=2;



    function setNumWords(uint32 _number) public onlyOwner{
        require(_number!=0,"MatchMakerSE: Can not have 0 random numbers!");
        numWords=_number;
    }

    function setKeyHash(bytes32 _keyHash) public onlyOwner{
        keyHash=_keyHash;
    }

    function setRequestConfirmations(uint16 _reqConf) public onlyOwner{
        require(_reqConf !=0,"MatchMakerSE: Can't have 0 request confirmations");
        requestConfirmations=_reqConf;
    }

    function setCallBackGasLimit(uint32 _gas) public onlyOwner{
        require(_gas!=0);
        callbackGasLimit=_gas;
    }

    function setSubscriptionId(uint64 _subID) public onlyOwner{
        require(_subID!=0);
        s_subscriptionId=_subID;
    }


    // addresses
    address public TournamentControllerAddress;
    using Counters for Counters.Counter;
    Counters.Counter mid;

    // instance of Tournament controller
    ITournamentController tournamentController;

    function changeTournamentController(address _tournamentControllerAddress) public onlyOwner {
        require(_tournamentControllerAddress != address(0));
        TournamentControllerAddress=_tournamentControllerAddress;
        tournamentController=ITournamentController(TournamentControllerAddress);
    }

    constructor(
        address _tournmentControllerAddress,
        uint64 _subId
    ) VRFConsumerBaseV2(0x6A2AAd07396B36Fe02a22b33cf443582f682c82f) {
        TournamentControllerAddress = _tournmentControllerAddress;
        tournamentController = ITournamentController(
            TournamentControllerAddress
        );
        s_subscriptionId = _subId;
        COORDINATOR = VRFCoordinatorV2Interface(
            0x6A2AAd07396B36Fe02a22b33cf443582f682c82f
        );
    }

    //structs
    // struct Match {
    //     uint id;
    //     // uint[2] teams;
    //     uint winner;
    //     uint tournamentId;
    //     uint roundId;
    // }

    struct Request {
        uint requestId;
        uint tId;
    }

    // mappings
    mapping(uint => Request) internal Requests;
    // tournament wise round wise winners array
    mapping(uint => mapping(uint => uint[])) public winners;

    // tournament wise round wise playing teams
    mapping(uint => mapping(uint => uint[])) public players;

    // tournament wise round wise matches
    //this one is probably not needed!
    // mapping(uint => mapping(uint => Match[])) internal rMatches;
    mapping(uint256 => uint256[]) public getMatchTeams;

    // tournament wise bye teams
    mapping(uint => uint[]) internal byeTeams;

    // tournament wise normal teams
    mapping(uint => uint[]) internal normalTeams;

    //id wise matches
    mapping(uint => Match) public matches;

    function findIfBye(
        uint _tid,
        uint _participant
    ) internal view returns (bool) {
        bool flag = false;
        for (uint i = 0; i < byeTeams[_tid].length; i++) {
            if (byeTeams[_tid][i] == _participant) {
                flag = true;
            }
        }
        return flag;
    }
    function isMatchMade(uint[] memory matched,uint _participant) internal pure returns(bool){
        bool flag=false;
        for(uint i=0;i<matched.length;i++){
            if(matched[i]==_participant){
                flag=true;
            }
        }
        return flag;
    }


    function makeMatches(uint _round, uint _tid) public onlyOwner{
        if (_round == 1) {
            setByes(_tid);
            setNormal(_tid);
            makeMatchesR1(_tid);
        } else if(_round==2) {makeMatchesR2(_tid);}
        else{
            matchMakerRest(_tid,_round);
        }
    }

    function matchMakerRest(uint _tid,uint  _round) internal {
        uint[] memory contenders=winners[_tid][_round-1];
        require(contenders.length==players[_tid][_round].length/2,"MatchMaker: You must complete the previous round first!");
        for(uint i=0;i<contenders.length;i=i+2){
            Match memory nMatch;
            mid.increment();
            nMatch.id=mid.current();
            nMatch.roundId=_round;
            // nMatch.teams[0]=contenders[i];
            // nMatch.teams[1]=contenders[i+1];
            getMatchTeams[mid.current()].push(contenders[i]);
            getMatchTeams[mid.current()].push(contenders[i+1]);
            matches[mid.current()]=nMatch;
            players[_tid][_round].push(contenders[i]);
            players[_tid][_round].push(contenders[i+1]);
            emit MatchMade(mid.current(),contenders[i],contenders[i+1],_tid,_round);
        }
    }

    function setByes(uint _tid) internal {
        uint[] memory participants = tournamentController.getParticipants(_tid);
        uint n = participants.length;
        uint power;
        uint no_bye;
        while (n > 2 ** power) {
            power++;
        }
        no_bye = (2 ** power) - n;
        uint midInd;
        if (n % 2 == 0) {
            midInd = n / 2;
        } else {
            midInd = (n + 1) / 2;
        }
        uint[4] memory ptrs = [n - 1, 0, midInd, midInd - 1];
        uint j = 0;
        while (no_bye > 0) {
            byeTeams[_tid].push(participants[ptrs[j]]);
            if (j == 0 || j == 3) {
                ptrs[j]--;
            } else {
                ptrs[j]++;
            }
            j = (j + 1) % 4;
            no_bye--;
        }
    }

    function setNormal(uint _tid) internal {
        uint[] memory participants = tournamentController.getParticipants(_tid);
        for (uint i = 0; i < participants.length; i++) {
            if (!findIfBye(_tid, participants[i])) {
                normalTeams[_tid].push(participants[i]);
                players[_tid][1].push(participants[i]);
            }
        }
    }

    function makeMatchesR1(uint _tid) internal {
        uint _requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        Request memory newRequest;
        newRequest.requestId = _requestId;
        newRequest.tId = _tid;
        Requests[_requestId] = newRequest;
        emit RequestSent(_requestId, numWords);
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        uint256 _tid = Requests[_requestId].tId;
        uint256[] memory _normalTeams = normalTeams[_tid];
        uint256[] memory matched= new uint[](_normalTeams.length);
        uint matchedCount;
        // uint offset=_randomWords[0]%_normalTeams.length;
        uint256 no_left = _normalTeams.length;
        uint8 last_ri = 0;
        uint256 offset = _randomWords[last_ri] % no_left;
        if (offset == 0) {
            offset++;
        }
        for (uint256 i = 0; i < _normalTeams.length; i++) {
            if(no_left==0){
                break;
            }
            if(no_left==1){
                if(isMatchMade(matched, _normalTeams[i])){
                    continue;
                }
                else{
                    break;
                }
            }
            if (i + offset >= _normalTeams.length) {
                last_ri = (last_ri + 1) % 2;
                offset = _randomWords[last_ri] % no_left;
                if (offset == 0) {
                    offset++;
                }
            }
            if (isMatchMade(matched, _normalTeams[i + offset])) {
                last_ri = (last_ri + 1) % 2;
                offset = _randomWords[last_ri] % no_left;
                if (offset == 0) {
                    offset++;
                }
            }
            if (isMatchMade(matched, _normalTeams[i])) {
                uint256 j = 1;
                while (
                    isMatchMade(matched, _normalTeams[j]) &&
                    j < _normalTeams.length
                ) {
                    j++;
                }
                if (j == _normalTeams.length) {
                    break;
                } else {
                    i = j;
                    last_ri = (last_ri + 1) % 2;
                    offset = _normalTeams[last_ri] % no_left;
                    if (offset == 0) {
                        offset++;
                    }
                }
            }
            Match memory nMatch;
            mid.increment();
            nMatch.id = mid.current();
            // nMatch.teams[0] = _normalTeams[i];
            // nMatch.teams[1] = _normalTeams[i + offset];
            nMatch.tournamentId = _tid;
            nMatch.roundId = 1;
            matches[mid.current()] = nMatch;
            // matches[mid.current()].teams.push(_normalTeams[i]);
            // matches[mid.current()].teams.push(_normalTeams[i + offset]);
            getMatchTeams[mid.current()].push(_normalTeams[i]);
            getMatchTeams[mid.current()].push(_normalTeams[i+offset]);
            matched[matchedCount]=_normalTeams[i];
            matchedCount++;
            matched[matchedCount]=_normalTeams[i+offset];
            matchedCount++;
            // i think not needed

            // rMatches[_tid][mid.current()].push(nMatch);
            no_left = no_left - 2;
            emit MatchMade(mid.current(),_normalTeams[i],_normalTeams[i+offset],_tid,1);
        }
    }

    function makeMatchesR2(uint _tid) internal{
        uint[] memory _r1winners=winners[_tid][1];
        require(_r1winners.length==players[_tid][1].length/2,"MatchMakerSE: You have to finish Round 1 first!");
        uint[] memory _byeTeams=byeTeams[_tid];
        uint i=0;
        uint j=0;
        while(i<_r1winners.length && j<_byeTeams.length){
            Match memory nMatch;
            mid.increment();
            nMatch.id=mid.current();
            // nMatch.teams[0]=_r1winners[i];
            // nMatch.teams[1]=_byeTeams[j];
            getMatchTeams[mid.current()].push(_r1winners[i]);
            getMatchTeams[mid.current()].push(_byeTeams[j]);
            nMatch.tournamentId=_tid;
            nMatch.roundId=2;
            matches[mid.current()]=nMatch;
            i++;
            j++;
            players[_tid][2].push(_r1winners[i]);
            players[_tid][2].push(_byeTeams[j]);
            emit MatchMade(mid.current(),_r1winners[i],_byeTeams[j],_tid,2);
        }
        if(i==_r1winners.length && j<_byeTeams.length){
            while(j<_byeTeams.length){
                Match memory nMatch1;
                mid.increment();
                nMatch1.id=mid.current();
                // nMatch1.teams[0]=_byeTeams[j];
                // nMatch1.teams[1]=_byeTeams[j+1];
                getMatchTeams[mid.current()].push(_byeTeams[j]);
                getMatchTeams[mid.current()].push(_byeTeams[j+1]);
                nMatch1.tournamentId=_tid;
                nMatch1.roundId=2;
                j=j+2;
                matches[mid.current()]=nMatch1;
                players[_tid][2].push(_byeTeams[j]);
                players[_tid][2].push(_byeTeams[j+1]);
                emit MatchMade(mid.current(),_byeTeams[i],_byeTeams[j+1],_tid,2);
            }
        }
        else if (j==_byeTeams.length && i<_r1winners.length){
            while(i<_r1winners.length){
                Match memory nMatch2;
                mid.increment();
                nMatch2.id=mid.current();
                // nMatch2.teams[0]=_r1winners[i];
                // nMatch2.teams[1]=_r1winners[i+1];
                getMatchTeams[mid.current()].push(_r1winners[i]);
                getMatchTeams[mid.current()].push(_r1winners[i+1]);
                nMatch2.tournamentId=_tid;
                nMatch2.roundId=2;
                i=i+2;
                matches[mid.current()]=nMatch2;
                players[_tid][2].push(_r1winners[i]);
                players[_tid][2].push(_r1winners[i+1]);
                emit MatchMade(mid.current(),_r1winners[i],_r1winners[i+1],_tid,2);
            }
        }

    }

    function _updateWinner(uint _mid,uint _winnerId) public onlyOwner {
        require(_mid<=mid.current(),"MatchMakerSE: Wrong match id!");
        require(matches[_mid].winner==0,"MatchMakerSE: You can not modify the winner");
        // require(matches[_mid].ti)
        bool flag;
        for(uint i=0;i<2;i++){
            // if(matches[_mid].teams[i]==_winnerId){
            //     flag=true;
            // }
            if(getMatchTeams[_mid][i]==_winnerId){
                flag=true;
            }
        }
        if(!flag){
            revert("MatchMakerSE: Can only Pick a winner from participating teams!");
        }
        uint _tid=matches[_mid].tournamentId;
        uint _roundId=matches[_mid].roundId;
        matches[_mid].winner=_winnerId;
        winners[_tid][_roundId].push(_winnerId);
        //i think not needed

        // for(uint i=0;i<rMatches[_tid][_roundId].length;i++){
        //     if(rMatches[_tid][_roundId][i].id==_mid){
        //         rMatches[_tid][_roundId][i].winner=_winnerId;
        //     }
        // }
        emit BracketUpdated(_mid,_winnerId,_tid,_roundId);
    }

    

    function getTournamentRoundMatches(uint _tid,uint _rid) public view returns (Match[] memory){
        Match [] memory trmatches;
        uint count=0;
        for(uint i=0;i<mid.current();i++){
            if(matches[i].tournamentId == _tid && matches[i].roundId== _rid){
                trmatches[count]=matches[i];
                count++;
            }
        }
        return trmatches;
    }

    function getMatches(uint _mid) public view returns (Match memory){
        require(_mid <=mid.current(),"MatchMakerSE : Invalid Match id!");
        return matches[_mid];
    }
}
