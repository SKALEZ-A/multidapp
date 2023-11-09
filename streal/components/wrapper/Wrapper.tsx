import NavBar from "../NavbarComponents/NavBar/NavBar";
import React from "react";
import { useEffect } from "react";

interface WrapperProps {
  children: React.ReactNode;
}
import { useContext } from "react";
import { StrealContext } from "../../pages/indexData";
import { useAccount } from "wagmi";

export default function Wrapper(props: WrapperProps) {
  const {
    address,
    connector,
    isConnected,
    isConnecting,
    isDisconnected,
    isReconnecting,
  } = useAccount();

  const strealData = useContext(StrealContext);
  const { connectWallet } = strealData;

  useEffect(() => {
    // listening for account change
    if (address && isConnected) {
      connectWallet();
    }
  }, [isConnected]);

  return (
    <div className="wrapper overflow-x-hidden">
      <NavBar />
      {props.children}
    </div>
  );
}
