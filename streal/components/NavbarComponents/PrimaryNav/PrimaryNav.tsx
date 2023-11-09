import Link from "next/link";
import React from "react";
import NavLinks from "../NavLinks/NavLinks";
import Image from "next/image";
import NavInfoLinkContainer from "../NavInfoLinkContainer/NavInfoLinkContainer";
import GlobalSettings from "../GlobalSettings/GlobalSettings";
import DOTS from "../../../public/Images/dots.svg";
import strealLogoWhite from "../../../public/newImages/globals/streal-logo-white.svg";


interface Props {
  moreModal: boolean;
  setMoreModal: any;
  webSettingsModal: boolean;
  setWebSettingsModal: any;
  toggleMoreModal: () => void;
}

const PrimaryNav = ({
  moreModal,
  setMoreModal,
  toggleMoreModal,
  webSettingsModal,
  setWebSettingsModal,
}: Props) => {
  return (
    <div className="primary--nav">
      <div className="">
        <Link href="/">
          <Image
            src={strealLogoWhite.src}
            width={20}
            height={20}
            alt={"streal logo"}
          ></Image>
        </Link>
      </div>

      <div className="inner--list">
        <NavLinks />
        <div onClick={toggleMoreModal} className="more">
          <p>More</p> <Image src={DOTS} alt="dots" />
        </div>

        <NavInfoLinkContainer
          position="web"
          modal={moreModal}
          setMoreModal={setMoreModal}
        />

        <GlobalSettings
          position="web"
          modal={webSettingsModal}
          setWebSettingsModal={setWebSettingsModal}
        />
      </div>
    </div>
  );
};

export default PrimaryNav;
