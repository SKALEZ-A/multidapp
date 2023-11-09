import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

interface Props {
  icon: string;
  figure: string;
  title: string;
}

export interface StateReduxProps {
  interface: {
    mode: boolean;
    testNet: boolean;
  };
}

const StakeTab = ({ icon, figure, title }: Props) => {
  const darkMode = useSelector(
    (state: StateReduxProps) => state.interface.mode
  );

  return (
    <div
      style={
        darkMode
          ? { borderColor: " rgba(235, 235, 239, 0.08)" }
          : { borderColor: "#eaebef" }
      }
      className="table--tab"
    >
      <div className="tab--logo--container">
        <Image src={icon} alt="aave-icon" />
        <h5
          style={darkMode ? { color: "white" } : { color: "#303549" }}
          className="tab--text"
        >
          {title}
        </h5>
      </div>

      <div className="tab--aprox--container">
        <p>Staking APR</p>
        <p
          style={darkMode ? { color: "white" } : { color: "#303549" }}
          className="tab--text"
        >
          {figure}{" "}
          <span>%</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default StakeTab;
