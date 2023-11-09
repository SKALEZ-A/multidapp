import EthereumIcon from "../../public/Images/ethereum.svg";
import ArbitrumIcon from "../../public/Images/arbitrum.svg";
import Avalanche from "../../public/Images/avalanche.svg";
import FantomIcon from "../../public/Images/fantom.svg";
import Harmony from "../../public/Images/harmony.svg";
import Optimism from "../../public/Images/optimism.svg";
import Polygon from "../../public/Images/polygon.svg";
import { AnimatePresence, motion } from "framer-motion";

interface DashboardMarketModal {
  handleSelectedMarket: (name: string, icon: string) => void;
  selectedMarketName: string;
  isOpen: boolean;
  closeModal: () => void;
}

export default function DashboardMarketModal(props: DashboardMarketModal) {
  const dashboardModalItems = [
    { name: "Ethereum", icon: EthereumIcon },
    { name: "Arbitrum", icon: ArbitrumIcon },
    { name: "Alvalanche", icon: Avalanche },
    { name: "Fantom", icon: FantomIcon },
    { name: "Harmony", icon: Harmony },
    { name: "Optimism", icon: Optimism },
    { name: "Polygon", icon: Polygon },
  ];
  return (
    <AnimatePresence>
      <motion.div
        className="dashboard-modal-anim-cont"
        transition={{ duration: 0.3 }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        key={props.isOpen.toString()}
      >
        {props.isOpen && (
          <div className="dashboard-modal">
            <div className="dashboard-modal-title">Select Streal Market</div>
            {dashboardModalItems.map((item, index) => {
              return (
                <button
                  onClick={() => {
                    props.handleSelectedMarket(item.name, item.icon.src);
                    props.closeModal();
                  }}
                  key={index}
                  className={`${
                    props.selectedMarketName.toLowerCase() ===
                    item.name.toLowerCase()
                      ? "selected-btn"
                      : ""
                  }`}
                >
                  <img src={item.icon.src}></img> {item.name}
                </button>
              );
            })}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
