import React from "react";
import MobileNavTitle from "../MobileNavTitle/MobileNavTitle";
import NavLinks from "../NavLinks/NavLinks";
import GlobalSettings from "../GlobalSettings/GlobalSettings";
import NavInfoLinkContainer from "../NavInfoLinkContainer/NavInfoLinkContainer";

interface Props {
  modal: boolean;
  toggleModal: () => void;
}

const MobileNavList = ({ modal, toggleModal }: Props) => {
  return (
    <div className={`mobile--nav--list ${!modal && "hide--mobile--nav"}`}>
      <div className="menu--container">
        <MobileNavTitle text="Menu" />
        <NavLinks toggleModal={toggleModal} />
      </div>
      <GlobalSettings />
      <NavInfoLinkContainer />
    </div>
  );
};

export default MobileNavList;
