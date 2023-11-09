import React from "react";
import SwitchContainer from "../SwitchContainer/SwitchContainer";

interface Props {
  title: string;
  mode: boolean;
  toggle: () => void;
}

const MobileNavSwitch = ({ title, mode, toggle }: Props) => {
  return (
    <div className="mobile--nav--toggle">
      <p>{title}</p>

      <SwitchContainer mode={mode} toggle={toggle} />
    </div>
  );
};

export default MobileNavSwitch;
