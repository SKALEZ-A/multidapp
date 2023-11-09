import { useState } from "react";
import MockData from "../../MockData/GovernancePageData.json";
import Proposal from "./Proposal";
import InputInfo from "./InputInfo";
import ConnectWalletModal from "../modals/ConnectWalletModal";

export default function GovernanceTable() {
  const [isInfoVisible, setISInfoVisible] = useState(false);
  const [isConnectModalOpen, setConnectModalIsOpen] = useState(false);
  const handleConnectModal = () => {
    setConnectModalIsOpen((prev) => !prev);
  };

  return (
    <div className="governance-table">
      <ConnectWalletModal
        closeFunction={handleConnectModal}
        isOpen={isConnectModalOpen}
      ></ConnectWalletModal>
      <div className="select-view">
        <button
          onClick={() => {
            setISInfoVisible(false);
          }}
          className={`${isInfoVisible ? "unselect-btn" : "select-btn"}`}
        >
          <span className={`${isInfoVisible ? "unselected" : "selected"}`}>
            Proposals
          </span>
        </button>
        <button
          onClick={() => {
            setISInfoVisible(true);
          }}
          className={`${isInfoVisible ? "select-btn" : "unselect-btn"}`}
        >
          <span className={`${isInfoVisible ? "selected" : "unselected"}`}>
            {" "}
            Your Info
          </span>
        </button>
      </div>
      <div className="tab-mobile-cont">
        {" "}
        {!isInfoVisible ? (
          <div className="info-proposal">
            <div className="main-cont">
              {MockData.map((item, index) => {
                return (
                  <Proposal
                    Differential={item.Differential}
                    key={index}
                    Nay={item.Nay}
                    Title={item.Title}
                    Yae={item.Yae}
                    Quorum={item.Quorum}
                    Date={item.Date}
                    Executed={item.Executed}
                  ></Proposal>
                );
              })}
            </div>
          </div>
        ) : (
          <InputInfo handleConnectModal={handleConnectModal}></InputInfo>
        )}
      </div>
      <div className="info-proposal laptop-view">
        <div className="main-cont">
          {MockData.map((item, index) => {
            return (
              <Proposal
                Differential={item.Differential}
                key={index}
                Nay={item.Nay}
                Title={item.Title}
                Yae={item.Yae}
                Quorum={item.Quorum}
                Date={item.Date}
                Executed={item.Executed}
              ></Proposal>
            );
          })}
        </div>
      </div>
      <InputInfo
        additionalClasses="laptop-view"
        handleConnectModal={handleConnectModal}
      ></InputInfo>
    </div>
  );
}
