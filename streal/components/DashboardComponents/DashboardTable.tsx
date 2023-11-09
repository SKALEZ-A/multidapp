import DashboardMarketModal from "./DashboardMarketModal";
import ConnectWalletModal from "../modals/ConnectWalletModal";
import { useState } from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import dynamic from "next/dynamic";

const DashboardTablePostConnection = dynamic(
  () => import("./PostConnection/DashboardTablePostConnection")
);

interface DashboardTableProps {
  darkMode?: boolean;
}

export default function DashboardTable(props: DashboardTableProps) {
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };
  return (
    <>
      <DashboardTablePostConnection></DashboardTablePostConnection>
      <div className="dashboard-table">
        <ConnectWalletModal
          isOpen={openModal}
          closeFunction={handleModal}
        ></ConnectWalletModal>
        <div className="prompt-cont">
          <div className={`main-prompt ${props.darkMode ? "dark-mode" : ""}`}>
            Please, connect your wallet
          </div>
          <div className={`sec-prompt ${props.darkMode ? "dark-mode" : ""}`}>
            Please connect your wallet to see your supplies, borrowings, and
            open positions.
          </div>

          <PrimaryButton
            text="Connect Wallet"
            onClick={handleModal}
          ></PrimaryButton>
        </div>
      </div>
    </>
  );
}
