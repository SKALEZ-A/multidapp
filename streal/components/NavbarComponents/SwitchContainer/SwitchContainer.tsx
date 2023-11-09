"use client";

import { _TOGGLE_MODE } from "@/redux/interface/interface-action";
import React from "react";
import { useSelector } from "react-redux";

interface Props {
  mode: boolean;
  toggle: () => void;
}

const SwitchContainer = ({ mode, toggle }: Props) => {
  return (
    <div className="switch--container">
      <p>{mode ? "On" : "Off"}</p>
      <div
        onClick={toggle}
        className={`switch ${mode && "active--switch"}`}
        style={!mode ? { background: "#c1c1c1" } : { background: "green" }}
      >
        <div className="inner"></div>
      </div>
    </div>
  );
};

export default SwitchContainer;
