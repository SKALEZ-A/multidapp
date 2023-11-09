import { useState } from "react";
import EthereumIcon from "public/Images/ethereum.svg";
import DownArrow from "../../..//public/Images/DownArrow";
import DashboardMarketModal from "../../../components/DashboardComponents/DashboardMarketModal";
import Image from "next/image";
import DashboardTag from "../../../components/DashboardTag/DashboardTag";

import SAFETY from "public/Images/safety.svg";

const MArketsDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState({
    name: "Ethereum",
    icon: EthereumIcon,
  });
  const handleSelectedMarket = (name: string, icon: string) => {
    setSelectedMarket((prev) => {
      return { icon: icon, name: name };
    });
  };

  const handleModal = () => {
    setIsModalOpen((prev) => {
      return !prev;
    });
  };

  const apis = [
    { icon: SAFETY, title: "Total market size", figure: "1.18B" },
    { icon: SAFETY, title: "Total available", figure: "742.95M" },
    { icon: SAFETY, title: "Total borrows", figure: "436.31M" },
  ];

  return (
    <div className="dashboard-dashboard">
      <h4 className="mobile--market">Markets</h4>

      <div className="dashboard-heading">
        <div className="dashboard-info">
          <Image
            width={"24"}
            height={"24"}
            src={selectedMarket.icon}
            alt="market-icon"
          />{" "}
          {selectedMarket.name} <span className="web--market"> Market</span>
        </div>
        <button
          onClick={() => {
            handleModal();
          }}
          className="options-btn"
        >
          {DownArrow("")}
        </button>
        <DashboardMarketModal
          closeModal={handleModal}
          isOpen={isModalOpen}
          selectedMarketName={selectedMarket.name}
          handleSelectedMarket={handleSelectedMarket}
        ></DashboardMarketModal>
      </div>
      <div className="flex--dashboard--tags ">
        {apis.map((item, index) => (
          <DashboardTag
            title={item.title}
            figure={item.figure}
            logo={false}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default MArketsDashboard;
