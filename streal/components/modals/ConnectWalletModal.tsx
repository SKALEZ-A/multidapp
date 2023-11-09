import browserWalletSvg from "../../public/Images/browserWallet.svg";
import coinbaseSvg from "../../public/Images/coinbase.svg";
import frameSvg from "../../public/Images/frame.svg";
import torusSvg from "../../public/Images/torus.svg";
import walletConnect from "../../public/Images/walletConnect.svg";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { BsX } from "react-icons/bs";

interface ConnectWalletModalProps {
  isOpen: boolean;
  //Pass in a function from the Parent component that changes the isOpen (Name is not important) or open state (boolean), that is also passed from the main component to false.
  closeFunction: () => void;
}

export default function ConnectWalletModal(props: ConnectWalletModalProps) {
  const buttons = [
    { name: "Browser Wallet", svg: browserWalletSvg },
    { name: "Coinbase Wallet", svg: coinbaseSvg },
    { name: "Frame", svg: frameSvg },
    { name: "Torus", svg: torusSvg },
    { name: "Wallet Connect", svg: walletConnect },
  ];
return (
    <>
      <AnimatePresence>
        <motion.div
          key={props.isOpen.toString()}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {props.isOpen && (
            <div className="connect-wallet-modal-cont">
              <div className="main-cont">
                <div className="connect-wallet-title">
                  Connect a wallet
                  <button
                    onClick={() => {
                      props.closeFunction();
                    }}
                  >
                    <BsX size={32}></BsX>
                  </button>
                </div>
                <div className="button-cont">
                  {buttons.map((item, index) => {
                    return (
                      <button key={index}>
                        {item.name} <img src={item.svg.src}></img>
                      </button>
                    );
                  })}
                </div>

                <div className="track-wallet-cont">
                  <input placeholder="Enter Ethereum Address or Username"></input>
                  <PrimaryButton text="Track Wallet"></PrimaryButton>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
