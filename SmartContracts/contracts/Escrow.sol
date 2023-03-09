// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract EscrowContract is Ownable{
    event EscrowCreated(uint,address,address);
    event MoneyRecieved(uint,bytes32);
    event MoneyPaid(address payable[],bytes32);
    function recieve() external payable {}
    struct Escrow{
        address payable organizer;
        uint wamount;
        uint id;
        uint organizerFee;
        uint viewerPool;
        address token;
    }
    

    mapping(uint=>Escrow) public Escrows;

    function createEscrow(uint _id,address payable _organizer,uint _wamount,uint _viewerPool,uint _organizerFee,address _token) payable public onlyOwner {
        // require(msg.value>=_organizerFee+_viewerPool+_wamount,"Escrow:Not enough Funds transferred");
        Escrow memory escrow;
        escrow.id=_id;
        escrow.organizer=_organizer;
        escrow.wamount=_wamount;
        escrow.organizerFee=_organizerFee;
        escrow.viewerPool=_viewerPool;
        escrow.token=_token;
        Escrows[_id]=escrow;
    }

    function releasePayment(uint id,address payable[] memory winners,uint[] memory distributions) external onlyOwner {
        address token=Escrows[id].token;
        for(uint i=0;i<winners.length;i++){
            IERC20(token).transfer(winners[i],distributions[i]);
        }
    }

    function refundPayment(uint id) external onlyOwner{
        // (bool sent,)=Escrows[id].organizer.call{value:Escrows[id].wamount+Escrows[id].viewerPool+Escrows[id].organizerFee}("");
        IERC20(Escrows[id].token).transfer(Escrows[id].organizer,Escrows[id].wamount+Escrows[id].viewerPool+Escrows[id].organizerFee);
    }

}