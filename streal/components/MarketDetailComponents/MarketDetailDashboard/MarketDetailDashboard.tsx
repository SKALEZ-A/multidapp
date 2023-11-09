import { FC, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import EthereumIcon from "public/Images/ethereum.svg";
import DownArrow from "../../../public/Images/DownArrow";
import DashboardMarketModal from "../../../components/DashboardComponents/DashboardMarketModal";
import Image from "next/image";
import DashboardTag from "../../../components/DashboardTag/DashboardTag";

import SAFETY from "@/public/Images/safety.svg";

interface MarketDetailDashboardProps {}

const MarketDetailDashboard: FC<MarketDetailDashboardProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState([]);
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
    { title: "Reserve Size", figure: "1.18B" },
    { title: "Available liquidity", figure: "742.95M" },
    { title: "Utilization Rate", figure: "436.31M" },
    { title: "Oracle price", figure: "1.18B" },
  ];

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=ngn&names=`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);

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

export default MarketDetailDashboard;
