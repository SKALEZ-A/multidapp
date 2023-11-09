import React, { useState } from "react";
import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import ConnectWalletModal from "../../modals/ConnectWalletModal";
import { useSelector } from "react-redux";

import AAVE from "public/Images/aave.svg";
import BPT from "public/Images/bpt.svg";

import StakeTab from "../StakeTab/StakeTab";

const StakeTable = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const darkMode = useSelector((state: any) => state.interface.mode);

  const toggleConnectWalletModal = () => setIsOpen(!isOpen);

  return (
    <div className="table--stake--container">
      <div className="stake--table">
        <h2 style={darkMode ? { color: "white" } : { color: "#303549" }}>
          Please, connect your wallet
        </h2>
        <p className="text">
          We couldn’t detect a wallet. Connect a wallet to stake and view your
          balance.
        </p>
        <PrimaryButton
          text={"Connect wallet"}
          onClick={toggleConnectWalletModal}
        />

        <div className="flex--tab">
          <StakeTab title="SKYLINK" icon={AAVE} figure={"6.07"} />
          <StakeTab title="ABPT" icon={BPT} figure={"12.45"} />
        </div>

        <ConnectWalletModal
          closeFunction={toggleConnectWalletModal}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};

export default StakeTable;
