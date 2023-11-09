import React, {useContext, useState} from 'react'
import { StrealContext } from '../pages';

const functions = () => {
    const {
        title,
        // this function should be called in a button first
      //-----> hover your mouse above each function to understand how to pass parameters to these functions in your components
      // helper functions
      getVotes,
      airdroppedAddress,
      getTokenType,
      getToken,
      getUserData,
      returnAllowance,
      returnBalance,
      returnAountToMint,
      returnCollateralUSDvalue,
      returnMintedStreal,
      getUSDvalue,
      balanceOfAtSnapshot,

      // main functions 
      airdropUsers,
      burnForCommerce,
      burnFrom,
      increaseAllowance,
      redeemCollateralForStreal,
      decreaseAllowance,
      depositCollateralAndMintStreal,
      depositStrealAndGetToken,
      mintReward,
      transfer,
      vote,
      transferOwnership,
      withdraw,
      snapshot,
      approval,
      setAirdropTime,
      setStrealValue,
      setCDS,
      setSupportedTokensAndFeed,
      ModifyTokenAndFeed,

      // vault contract
      MintForOthers,
      setStreal,
      WithdrawFromVault,
      totalDeposited,
      getBalance,

      // ICO contract
      deposit,
      Balance,
      modifyToken,
      removeToken,
      removeVault,
      setPricePeg,
      setSupportedToken,
      setVault,
      // wallet connect button
      connectWallet,

    } = useContext(StrealContext);

    

    /*
        this is how you'll call the airdropUsers and mintReward functions, otherwise you'll get an error, it only accept an array of addresses and corresponding values.

        these recipients and values will be passed dynamically by a logic, if users do some particular task, we can save their rewards and addresses respectively in an array and then pass it as params to these functions marked with (//<>)


        const recipients = ["0xRecipient1", "0xRecipient2"]; 
        const values = ["value1", "value2"];


        // Call the airdropUsers function
        airdropUsers(recipients, values)
        .then(receipt => console.log(receipt))
        .catch(error => console.error(error));

            
    */

    // returnMintedStreal("0xB5E45bC8E119Fb3Ab8cfBC4F182Cc0150dE58C75")
  return (
    <div>
       <h4>
            {title}
        </h4> 
        <p>
            this part will demonstrate how the functions will be used along side their params
        </p>

       <div>
            <button onClick={() => setSupportedTokensAndFeed("0xe9DcE89B076BA6107Bb64EF30678efec11939234", "0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0")}>set Supported tokens</button>
            <button onClick={() => 
            setStrealValue(5)}
            >
            set streal value
            </button>
            <button onClick={() => 
             setCDS("0xc249ebeb861bEF9C2A63856375f66E97c45a07ba")}
            >
                set vault contract
            </button>
            <button onClick={() => 
            setStreal("0x27DC5CC08b87B7f2A03692DC310f75a7C99cbccB")}
            >
             Set Streal address
            </button>
            <button onClick={() => 
            depositCollateralAndMintStreal("0xe9DcE89B076BA6107Bb64EF30678efec11939234",'0x27DC5CC08b87B7f2A03692DC310f75a7C99cbccB', 300)}
            >
             mint Streal
            </button>
            <button onClick={() =>depositStrealAndGetToken(20, "0xe9DcE89B076BA6107Bb64EF30678efec11939234" )}>deposit streal</button>
            <button onClick={() =>totalDeposited("0xe9DcE89B076BA6107Bb64EF30678efec11939234" )}>collateral value in vault</button>
            <button onClick={() =>getBalance("0xe9DcE89B076BA6107Bb64EF30678efec11939234")}>Get total stock balance</button>
            <button onClick={()=> ModifyTokenAndFeed(1)}>pop supported tokens</button>
            <button onClick={()=> deposit("0xe9DcE89B076BA6107Bb64EF30678efec11939234","0x6716EBc5B2270f0D8409459e36c091901d903F69", 100)}>deposit for ICO</button>
            <button onClick={()=> Balance("0xe9DcE89B076BA6107Bb64EF30678efec11939234")}>ICO balance</button>
            <button onClick={()=> setPricePeg(5)}>setPricePeg</button>
            <button onClick={()=> setSupportedToken("0xe9DcE89B076BA6107Bb64EF30678efec11939234")}>setSupportedToken for ICO</button>
            <button onClick={()=> setVault("0x27DC5CC08b87B7f2A03692DC310f75a7C99cbccB")}>set ICO Vault</button>
            <button onClick={()=> approval("0x6716EBc5B2270f0D8409459e36c091901d903F69", 100000000)}>approve ICO Address</button>
            <button onClick={()=> returnMintedStreal("0x39b165389b3a0A810843376867Cced4564fA9F69")}>minted Streal</button>
            <button onClick={()=> removeVault(0)}>removeVault</button>
           
        </div>

       <div>

       
    
       <button onClick={() => 
             snapshot()}
            >
            Snap shot
        </button>
       <button onClick={() => 
             setAirdropTime("180", "20")}
            >
            set airdrop time
        </button>
       
       <button onClick={() => 
             WithdrawFromVault("0xe9DcE89B076BA6107Bb64EF30678efec11939234", 300)}
            >
            withdraw collateral from vault
        </button>
       <button onClick={() => 
             MintForOthers("0x27DC5CC08b87B7f2A03692DC310f75a7C99cbccB", "0xB5E45bC8E119Fb3Ab8cfBC4F182Cc0150dE58C75", "0xe9DcE89B076BA6107Bb64EF30678efec11939234", 300)}
            >
            Buy Stock from profile
        </button>
       <button onClick={() => 
             getUserData("0x39b165389b3a0A810843376867Cced4564fA9F69")}
            >
            user data
        </button>
       </div>

    </div>
  )
}

export default functions