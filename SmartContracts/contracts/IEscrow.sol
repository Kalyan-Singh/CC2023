// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IEscrow {
    event EscrowCreated(uint, address, address);
    event MoneyRecieved(uint, bytes32);
    event MoneyPaid(address payable[], bytes32);

    function createEscrow(
        uint _id,
        address payable _organizer,
        uint _wamount,
        uint _viewerPool,
        uint _organizerFee,
        address _token
    ) payable external;

    function releasePayment(
        uint id,
        address payable[] memory winners,
        uint[] memory distributions
    ) external;

    function refundPayment(uint id) external;

    function recieve() external payable;

    struct Escrow {
        address payable organizer;
        uint wamount;
        uint id;
        uint organizerFee;
        uint viewerPool;
        address token;
    }
}
