# Sample Hardhat Project

This is a detailed instruction on how to run this application, basically I know migrating all these pacakages you have built on streal front-end landing page will pose some challeges, I don't know NEXT or React, I just used my little knowledge on javascript to fetch all the data required from the smart contract.

see if there's a way to migrate this folder in to your work space and fetch all the data you need from it.

I used NEXT 12.2.4 folder strucure, then upgraded, cos I wasn't really familiar with the folder sructure of the recent versions of NEXT.

there are some things i'll like us to consider before this application will work.

1. the contract has been deployed to the test network for testing.
2. you'll need your internet connection to fetch your data.
3. you'll need to have your metamask.
4. the contract was deployed to polygon test net "https://mumbai.polygonscan.com/".
5. go to aave faucets to request for DAI, USDC and USDT "https://staging.aave.com/faucet/".
6. go to polygon faucets, paste your address and request for matic on mumbai "https://faucet.polygon.technology/".
    if you don't have test matic you won't be able to call the functions.
7. on your meta mask, click on show test networs.


8. add the the MATIC network like so.{
    1. Network name: MATIC,
    2. New RPC URL: https://rpc-mumbai.maticvigil.com/,
    3. ChainID: 80001,
    4. Currency symbol: Matic, 

    please leave the Block explorer URL blank and click on add network.
}


first right click on the streal subfolder and open integrated terminal on the streal sub folder.
Try running some of the following tasks in your terminal:

```shell
yarn install

yarn run dev
```
once the application starts it will pop up your metaMask and ask you to connect.

once you connect you'll be able to see some examples on how I fetched and managed data in the front end,
then use the instance and fetch your data into Our streal front end application that we've built.

any questions please ask me in the group or call me.
