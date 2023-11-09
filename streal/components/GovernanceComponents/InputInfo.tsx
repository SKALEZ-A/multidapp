import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { useSelector } from "react-redux";

interface InputInfoProps {
  handleConnectModal: () => void;
  additionalClasses?: string;
}

export default function InputInfo(props: InputInfoProps) {
  const darkMode = useSelector((state: any) => state.interface.mode);
  return (
    <div
      className={` governance-input-info ${props.additionalClasses} ${
        darkMode ? "dark-mode" : ""
      }`}
    >
      <div className="title">Your Info</div>
      <p className="title-prompt">
        Please connect a wallet to view your personal information here.
      </p>
      <PrimaryButton
        onClick={props.handleConnectModal}
        text="Connect Wallet"
      ></PrimaryButton>
    </div>
  );
}
