"use client";

import React, { useState } from "react";
import PrimaryNav from "../PrimaryNav/PrimaryNav";
import SecondaryNav from "../SecondaryNav/SecondaryNav";
import { useSelector } from "react-redux";

const NavBar = () => {
  const darkMode = useSelector((state: any) => state.interface.mode);

  const [moreModal, setMoreModal] = useState<boolean>(false);
  const [mobileNavModal, setMobileNavModal] = useState<boolean>(false);
  const [webSettingsModal, setWebSettingsModal] = useState<boolean>(false);
  const [connectWalletModal, setConnectWalletModal] = useState<boolean>(false);

  const toggleMoreModal = () => setMoreModal(!moreModal);
  const toggleMobileNavModal = () => setMobileNavModal(!mobileNavModal);
  const toggleWebSettingsModal = () => setWebSettingsModal(!webSettingsModal);
  const toggleConnectWalletModal = () => {
    setConnectWalletModal((prev) => !prev);
  };

  return (
    <div className={`nav--bar ${darkMode && 'dark--mode--bg'}`}>
      <PrimaryNav
        moreModal={moreModal}
        setMoreModal={setMoreModal}
        webSettingsModal={webSettingsModal}
        toggleMoreModal={toggleMoreModal}
        setWebSettingsModal={setWebSettingsModal}
      />
      <SecondaryNav
        connectWalletModal={connectWalletModal}
        toggleConnectWalletModal={toggleConnectWalletModal}
        mobileNavModal={mobileNavModal}
        toggleMobileNavModal={toggleMobileNavModal}
        toggleWebSettingsModal={toggleWebSettingsModal}
      />
    </div>
  );
};

export default NavBar;
