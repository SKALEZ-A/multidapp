import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import React from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon];
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

interface Web3ModalNewProps {
  children: React.ReactNode;
}

export default function Web3ModalNew(props: Web3ModalNewProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{props.children}</WagmiConfig>

      <div className="absolute z-50 w-[80%] top-[40vh]">
        {" "}
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </div>
      {/*       <Web3Button></Web3Button> */}
    </>
  );
}
