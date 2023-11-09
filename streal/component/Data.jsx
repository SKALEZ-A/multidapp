import React, { useContext } from "react";
import { StrealContext } from "../pages/indexData";

const Data = () => {
  const {
    //-----> data returned from helper functions
    TokensDeposited,
    userData,
    userDataUSDValue,
    Tokens,
    allowance,
    userBalance,
    collateralAddress,
    collateralInUSD,
    mintedStreal,
    USDvalue,
    airdroppedAddresses,

    // snapshot function return data
    snappedBalance,

    // airdrop function returnData
    airdropDataAmount,
    airdropDataUser,

    // approve function return data
    txHash,
    ApprovedAmount,
    ApprovedAddress,

    // returned data for depositCollateralAndMintStreal function
    txHashForCollateralDeposit,
    ApprovedAmountCollateral,

    // return data for transfer function
    transferRecipient,
    transferedAmount,
    transferTxHash,

    // vote data
    votedCandidate,
    voteTxHash,

    // redeemCollateralForStreal return data
    customerAddress,
    amountRedeemed,
    txnHashRedeemedAmount,

    // transfer ownership return data
    newOwner,
    OldOwner,
    txnHashForOwnerShip,

    // mintReward returnData
    recipientAddresses,
    mintRewardTxHash,

    // depositStrealAndGetToken Functio return data
    depositor,
    amountToreceive,
    depositTxHash,

    //-----> smart contract details
    title,
    data,
    name,
    balances,
    symbol,
    airdrop,
    totalSupply,
    collateralBalance,
    USDC,
    USDT,
    DAI,
  } = useContext(StrealContext);

  return (
    <div>
      <h3>Owner address: {data}</h3>
      <h3>Name: {name}</h3>
      <h3>Token symbol: {symbol}</h3>
      <h3>Total supply: {totalSupply}</h3>
      <h3>Airdrop balance: {airdrop}</h3>
      <div>Owner balnce: {balances}</div>
      <div>token balances: {collateralBalance}</div>
      <div>USDC balance: {USDC}</div>
      <div>USDT balance: {USDT}</div>
      <div>DAI balance: {DAI}</div>
      <div>{Tokens}</div>
      <div>Minted streal: {mintedStreal}</div>
      <div>user Data: {userData}</div>
      <div>fiat: ${userDataUSDValue}</div>
      <div>Snapshot: {snappedBalance} streal</div>
      <div>Snapshot: ${collateralInUSD}</div>
    </div>
  );
};

export default Data;
