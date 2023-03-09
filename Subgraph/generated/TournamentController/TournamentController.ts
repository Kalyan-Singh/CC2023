// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class DistributionSet extends ethereum.Event {
  get params(): DistributionSet__Params {
    return new DistributionSet__Params(this);
  }
}

export class DistributionSet__Params {
  _event: DistributionSet;

  constructor(event: DistributionSet) {
    this._event = event;
  }

  get tid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get distributions(): Array<BigInt> {
    return this._event.parameters[1].value.toBigIntArray();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Registered extends ethereum.Event {
  get params(): Registered__Params {
    return new Registered__Params(this);
  }
}

export class Registered__Params {
  _event: Registered;

  constructor(event: Registered) {
    this._event = event;
  }

  get teamId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get tournamentId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class TeamCreated extends ethereum.Event {
  get params(): TeamCreated__Params {
    return new TeamCreated__Params(this);
  }
}

export class TeamCreated__Params {
  _event: TeamCreated;

  constructor(event: TeamCreated) {
    this._event = event;
  }

  get teamId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get leader(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get members(): Array<Address> {
    return this._event.parameters[2].value.toAddressArray();
  }
}

export class TournamentCreated extends ethereum.Event {
  get params(): TournamentCreated__Params {
    return new TournamentCreated__Params(this);
  }
}

export class TournamentCreated__Params {
  _event: TournamentCreated;

  constructor(event: TournamentCreated) {
    this._event = event;
  }

  get tournmenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get prizepool(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get organizer(): string {
    return this._event.parameters[2].value.toString();
  }

  get orgAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get matchMaker(): Address {
    return this._event.parameters[4].value.toAddress();
  }
}

export class TournamentEnded extends ethereum.Event {
  get params(): TournamentEnded__Params {
    return new TournamentEnded__Params(this);
  }
}

export class TournamentEnded__Params {
  _event: TournamentEnded;

  constructor(event: TournamentEnded) {
    this._event = event;
  }

  get tid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get round(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get distributions(): Array<BigInt> {
    return this._event.parameters[2].value.toBigIntArray();
  }

  get winners(): Array<BigInt> {
    return this._event.parameters[3].value.toBigIntArray();
  }
}

export class TournamentUpdated extends ethereum.Event {
  get params(): TournamentUpdated__Params {
    return new TournamentUpdated__Params(this);
  }
}

export class TournamentUpdated__Params {
  _event: TournamentUpdated;

  constructor(event: TournamentUpdated) {
    this._event = event;
  }

  get tid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newroundId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class TournamentController__getTeamDetailsResultValue0Struct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get members(): Array<Address> {
    return this[1].toAddressArray();
  }

  get leader(): Address {
    return this[2].toAddress();
  }
}

export class TournamentController__teamsResult {
  value0: string;
  value1: Address;

  constructor(value0: string, value1: Address) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    return map;
  }

  getName(): string {
    return this.value0;
  }

  getLeader(): Address {
    return this.value1;
  }
}

export class TournamentController__tournamentsResultOrgStruct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get Add_org(): Address {
    return this[1].toAddress();
  }
}

export class TournamentController__tournamentsResultTokenStruct extends ethereum.Tuple {
  get tokenAddress(): Address {
    return this[0].toAddress();
  }

  get chain(): string {
    return this[1].toString();
  }
}

export class TournamentController__tournamentsResultPrizeStruct extends ethereum.Tuple {
  get participantPool(): BigInt {
    return this[0].toBigInt();
  }

  get viewerPool(): BigInt {
    return this[1].toBigInt();
  }

  get organizerFee(): BigInt {
    return this[2].toBigInt();
  }

  get totalPool(): BigInt {
    return this[3].toBigInt();
  }
}

export class TournamentController__tournamentsResult {
  value0: i32;
  value1: i32;
  value2: BigInt;
  value3: Bytes;
  value4: Address;
  value5: i32;
  value6: TournamentController__tournamentsResultOrgStruct;
  value7: TournamentController__tournamentsResultTokenStruct;
  value8: TournamentController__tournamentsResultPrizeStruct;

  constructor(
    value0: i32,
    value1: i32,
    value2: BigInt,
    value3: Bytes,
    value4: Address,
    value5: i32,
    value6: TournamentController__tournamentsResultOrgStruct,
    value7: TournamentController__tournamentsResultTokenStruct,
    value8: TournamentController__tournamentsResultPrizeStruct
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set(
      "value0",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value0))
    );
    map.set(
      "value1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value1))
    );
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromFixedBytes(this.value3));
    map.set("value4", ethereum.Value.fromAddress(this.value4));
    map.set(
      "value5",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value5))
    );
    map.set("value6", ethereum.Value.fromTuple(this.value6));
    map.set("value7", ethereum.Value.fromTuple(this.value7));
    map.set("value8", ethereum.Value.fromTuple(this.value8));
    return map;
  }

  getRound(): i32 {
    return this.value0;
  }

  getSizeLimit(): i32 {
    return this.value1;
  }

  getMaxParticipants(): BigInt {
    return this.value2;
  }

  getBracketType(): Bytes {
    return this.value3;
  }

  getMatchMaker(): Address {
    return this.value4;
  }

  getState(): i32 {
    return this.value5;
  }

  getOrg(): TournamentController__tournamentsResultOrgStruct {
    return this.value6;
  }

  getToken(): TournamentController__tournamentsResultTokenStruct {
    return this.value7;
  }

  getPrize(): TournamentController__tournamentsResultPrizeStruct {
    return this.value8;
  }
}

export class TournamentController extends ethereum.SmartContract {
  static bind(address: Address): TournamentController {
    return new TournamentController("TournamentController", address);
  }

  distributions(param0: BigInt, param1: BigInt): BigInt {
    let result = super.call(
      "distributions",
      "distributions(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_distributions(
    param0: BigInt,
    param1: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "distributions",
      "distributions(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  escrow(): Address {
    let result = super.call("escrow", "escrow():(address)", []);

    return result[0].toAddress();
  }

  try_escrow(): ethereum.CallResult<Address> {
    let result = super.tryCall("escrow", "escrow():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getParticipants(_tid: BigInt): Array<BigInt> {
    let result = super.call(
      "getParticipants",
      "getParticipants(uint256):(uint256[])",
      [ethereum.Value.fromUnsignedBigInt(_tid)]
    );

    return result[0].toBigIntArray();
  }

  try_getParticipants(_tid: BigInt): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "getParticipants",
      "getParticipants(uint256):(uint256[])",
      [ethereum.Value.fromUnsignedBigInt(_tid)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  getTeamDetails(
    _id: BigInt
  ): TournamentController__getTeamDetailsResultValue0Struct {
    let result = super.call(
      "getTeamDetails",
      "getTeamDetails(uint256):((string,address[],address))",
      [ethereum.Value.fromUnsignedBigInt(_id)]
    );

    return changetype<TournamentController__getTeamDetailsResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getTeamDetails(
    _id: BigInt
  ): ethereum.CallResult<
    TournamentController__getTeamDetailsResultValue0Struct
  > {
    let result = super.tryCall(
      "getTeamDetails",
      "getTeamDetails(uint256):((string,address[],address))",
      [ethereum.Value.fromUnsignedBigInt(_id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<TournamentController__getTeamDetailsResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  participants(param0: BigInt, param1: BigInt): BigInt {
    let result = super.call(
      "participants",
      "participants(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_participants(
    param0: BigInt,
    param1: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "participants",
      "participants(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  teams(param0: BigInt): TournamentController__teamsResult {
    let result = super.call("teams", "teams(uint256):(string,address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return new TournamentController__teamsResult(
      result[0].toString(),
      result[1].toAddress()
    );
  }

  try_teams(
    param0: BigInt
  ): ethereum.CallResult<TournamentController__teamsResult> {
    let result = super.tryCall("teams", "teams(uint256):(string,address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new TournamentController__teamsResult(
        value[0].toString(),
        value[1].toAddress()
      )
    );
  }

  tournaments(param0: BigInt): TournamentController__tournamentsResult {
    let result = super.call(
      "tournaments",
      "tournaments(uint256):(uint16,uint16,uint32,bytes32,address,uint8,(string,address),(address,string),(uint256,uint256,uint256,uint256))",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new TournamentController__tournamentsResult(
      result[0].toI32(),
      result[1].toI32(),
      result[2].toBigInt(),
      result[3].toBytes(),
      result[4].toAddress(),
      result[5].toI32(),
      changetype<TournamentController__tournamentsResultOrgStruct>(
        result[6].toTuple()
      ),
      changetype<TournamentController__tournamentsResultTokenStruct>(
        result[7].toTuple()
      ),
      changetype<TournamentController__tournamentsResultPrizeStruct>(
        result[8].toTuple()
      )
    );
  }

  try_tournaments(
    param0: BigInt
  ): ethereum.CallResult<TournamentController__tournamentsResult> {
    let result = super.tryCall(
      "tournaments",
      "tournaments(uint256):(uint16,uint16,uint32,bytes32,address,uint8,(string,address),(address,string),(uint256,uint256,uint256,uint256))",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new TournamentController__tournamentsResult(
        value[0].toI32(),
        value[1].toI32(),
        value[2].toBigInt(),
        value[3].toBytes(),
        value[4].toAddress(),
        value[5].toI32(),
        changetype<TournamentController__tournamentsResultOrgStruct>(
          value[6].toTuple()
        ),
        changetype<TournamentController__tournamentsResultTokenStruct>(
          value[7].toTuple()
        ),
        changetype<TournamentController__tournamentsResultPrizeStruct>(
          value[8].toTuple()
        )
      )
    );
  }

  winners(param0: BigInt, param1: BigInt, param2: BigInt): BigInt {
    let result = super.call(
      "winners",
      "winners(uint256,uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1),
        ethereum.Value.fromUnsignedBigInt(param2)
      ]
    );

    return result[0].toBigInt();
  }

  try_winners(
    param0: BigInt,
    param1: BigInt,
    param2: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "winners",
      "winners(uint256,uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1),
        ethereum.Value.fromUnsignedBigInt(param2)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _escrow(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CancelTournamentCall extends ethereum.Call {
  get inputs(): CancelTournamentCall__Inputs {
    return new CancelTournamentCall__Inputs(this);
  }

  get outputs(): CancelTournamentCall__Outputs {
    return new CancelTournamentCall__Outputs(this);
  }
}

export class CancelTournamentCall__Inputs {
  _call: CancelTournamentCall;

  constructor(call: CancelTournamentCall) {
    this._call = call;
  }

  get _tid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CancelTournamentCall__Outputs {
  _call: CancelTournamentCall;

  constructor(call: CancelTournamentCall) {
    this._call = call;
  }
}

export class CreateTeamCall extends ethereum.Call {
  get inputs(): CreateTeamCall__Inputs {
    return new CreateTeamCall__Inputs(this);
  }

  get outputs(): CreateTeamCall__Outputs {
    return new CreateTeamCall__Outputs(this);
  }
}

export class CreateTeamCall__Inputs {
  _call: CreateTeamCall;

  constructor(call: CreateTeamCall) {
    this._call = call;
  }

  get _team(): CreateTeamCall_teamStruct {
    return changetype<CreateTeamCall_teamStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class CreateTeamCall__Outputs {
  _call: CreateTeamCall;

  constructor(call: CreateTeamCall) {
    this._call = call;
  }
}

export class CreateTeamCall_teamStruct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get members(): Array<Address> {
    return this[1].toAddressArray();
  }

  get leader(): Address {
    return this[2].toAddress();
  }
}

export class CreateTournamentCall extends ethereum.Call {
  get inputs(): CreateTournamentCall__Inputs {
    return new CreateTournamentCall__Inputs(this);
  }

  get outputs(): CreateTournamentCall__Outputs {
    return new CreateTournamentCall__Outputs(this);
  }
}

export class CreateTournamentCall__Inputs {
  _call: CreateTournamentCall;

  constructor(call: CreateTournamentCall) {
    this._call = call;
  }

  get _t(): CreateTournamentCall_tStruct {
    return changetype<CreateTournamentCall_tStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class CreateTournamentCall__Outputs {
  _call: CreateTournamentCall;

  constructor(call: CreateTournamentCall) {
    this._call = call;
  }
}

export class CreateTournamentCall_tStruct extends ethereum.Tuple {
  get round(): i32 {
    return this[0].toI32();
  }

  get sizeLimit(): i32 {
    return this[1].toI32();
  }

  get maxParticipants(): BigInt {
    return this[2].toBigInt();
  }

  get bracketType(): Bytes {
    return this[3].toBytes();
  }

  get matchMaker(): Address {
    return this[4].toAddress();
  }

  get state(): i32 {
    return this[5].toI32();
  }

  get org(): CreateTournamentCall_tOrgStruct {
    return changetype<CreateTournamentCall_tOrgStruct>(this[6].toTuple());
  }

  get token(): CreateTournamentCall_tTokenStruct {
    return changetype<CreateTournamentCall_tTokenStruct>(this[7].toTuple());
  }

  get prize(): CreateTournamentCall_tPrizeStruct {
    return changetype<CreateTournamentCall_tPrizeStruct>(this[8].toTuple());
  }
}

export class CreateTournamentCall_tOrgStruct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get Add_org(): Address {
    return this[1].toAddress();
  }
}

export class CreateTournamentCall_tTokenStruct extends ethereum.Tuple {
  get tokenAddress(): Address {
    return this[0].toAddress();
  }

  get chain(): string {
    return this[1].toString();
  }
}

export class CreateTournamentCall_tPrizeStruct extends ethereum.Tuple {
  get participantPool(): BigInt {
    return this[0].toBigInt();
  }

  get viewerPool(): BigInt {
    return this[1].toBigInt();
  }

  get organizerFee(): BigInt {
    return this[2].toBigInt();
  }

  get totalPool(): BigInt {
    return this[3].toBigInt();
  }
}

export class EndTournamentCall extends ethereum.Call {
  get inputs(): EndTournamentCall__Inputs {
    return new EndTournamentCall__Inputs(this);
  }

  get outputs(): EndTournamentCall__Outputs {
    return new EndTournamentCall__Outputs(this);
  }
}

export class EndTournamentCall__Inputs {
  _call: EndTournamentCall;

  constructor(call: EndTournamentCall) {
    this._call = call;
  }

  get _tid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get winnersAddress(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }

  get winnerIds(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }
}

export class EndTournamentCall__Outputs {
  _call: EndTournamentCall;

  constructor(call: EndTournamentCall) {
    this._call = call;
  }
}

export class RegisterCall extends ethereum.Call {
  get inputs(): RegisterCall__Inputs {
    return new RegisterCall__Inputs(this);
  }

  get outputs(): RegisterCall__Outputs {
    return new RegisterCall__Outputs(this);
  }
}

export class RegisterCall__Inputs {
  _call: RegisterCall;

  constructor(call: RegisterCall) {
    this._call = call;
  }

  get _tournamentId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _teamId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RegisterCall__Outputs {
  _call: RegisterCall;

  constructor(call: RegisterCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetDistributionCall extends ethereum.Call {
  get inputs(): SetDistributionCall__Inputs {
    return new SetDistributionCall__Inputs(this);
  }

  get outputs(): SetDistributionCall__Outputs {
    return new SetDistributionCall__Outputs(this);
  }
}

export class SetDistributionCall__Inputs {
  _call: SetDistributionCall;

  constructor(call: SetDistributionCall) {
    this._call = call;
  }

  get _dist(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get id(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetDistributionCall__Outputs {
  _call: SetDistributionCall;

  constructor(call: SetDistributionCall) {
    this._call = call;
  }
}

export class SetEscrowAddressCall extends ethereum.Call {
  get inputs(): SetEscrowAddressCall__Inputs {
    return new SetEscrowAddressCall__Inputs(this);
  }

  get outputs(): SetEscrowAddressCall__Outputs {
    return new SetEscrowAddressCall__Outputs(this);
  }
}

export class SetEscrowAddressCall__Inputs {
  _call: SetEscrowAddressCall;

  constructor(call: SetEscrowAddressCall) {
    this._call = call;
  }

  get _escrow(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetEscrowAddressCall__Outputs {
  _call: SetEscrowAddressCall;

  constructor(call: SetEscrowAddressCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateMatchWinnerCall extends ethereum.Call {
  get inputs(): UpdateMatchWinnerCall__Inputs {
    return new UpdateMatchWinnerCall__Inputs(this);
  }

  get outputs(): UpdateMatchWinnerCall__Outputs {
    return new UpdateMatchWinnerCall__Outputs(this);
  }
}

export class UpdateMatchWinnerCall__Inputs {
  _call: UpdateMatchWinnerCall;

  constructor(call: UpdateMatchWinnerCall) {
    this._call = call;
  }

  get _tid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _mid(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _winnerId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class UpdateMatchWinnerCall__Outputs {
  _call: UpdateMatchWinnerCall;

  constructor(call: UpdateMatchWinnerCall) {
    this._call = call;
  }
}

export class UpdateTournamentStateCall extends ethereum.Call {
  get inputs(): UpdateTournamentStateCall__Inputs {
    return new UpdateTournamentStateCall__Inputs(this);
  }

  get outputs(): UpdateTournamentStateCall__Outputs {
    return new UpdateTournamentStateCall__Outputs(this);
  }
}

export class UpdateTournamentStateCall__Inputs {
  _call: UpdateTournamentStateCall;

  constructor(call: UpdateTournamentStateCall) {
    this._call = call;
  }

  get _tid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _nextRound(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateTournamentStateCall__Outputs {
  _call: UpdateTournamentStateCall;

  constructor(call: UpdateTournamentStateCall) {
    this._call = call;
  }
}
