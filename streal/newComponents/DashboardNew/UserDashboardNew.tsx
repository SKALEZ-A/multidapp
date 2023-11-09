import dashboardArrow from "../../public/newImages/dashboard/dashboard-arrow.svg";
import Image from "next/image";
import StrealAccountDisplay from "./StrealAccountDisplay";
import CollateralAccountDisplay from "./CollateralAccountDisplay";
import { useWeb3 } from "../../redux/auth/hooks";
import SwipeableViews from "react-swipeable-views";
import { useState } from "react";
export default function UserDashboardNew() {
  const { web3Provider, _CONNECT_WALLET, _DISCONNECT_WALLET, address } =
    useWeb3();
  const [galleryIndex, setGalleryIndex] = useState(0);
  console.log(galleryIndex === 0, "sads");
  return (
    <div className="h-[380px] bg-[#1B1B1B] w-full relative overflow-hidden font-manropeLight flex items-center justify-center">
      <Image
        alt="arrow"
        src={dashboardArrow.src}
        width={365}
        height={400}
        className={"absolute bottom-0 left-0 lg:block hidden"}
      ></Image>
      <div className="flex lg:hidden items-center justify-between text-[16px]  w-full px-[20px] leading-none absolute top-[33px] text-white">
        <div>
          {" "}
          User's
          <div>Dashboard</div>
        </div>
        <div className="text-[#898989] text-[12px]">
          Swipe left to see <div>collateral dashboard</div>
        </div>
      </div>
      <div className="absolute lg:block hidden text-[50px] z-10 text-white font-thin top-[42px] left-[47px] leading-none">
        User's
        <div>Dashboard</div>
      </div>
      <div className="flex lg:hidden item-center w-full gap-x-[3px] absolute top-[90px] justify-center">
        <div
          key={1}
          className={`${
            galleryIndex === 0 ? "w-[43px] bg-[#313131]" : "w-[7px] bg-white"
          }   w-[7px] h-[7px] rounded bg-white duration-300`}
        ></div>
        <div
          key={2}
          className={`${
            galleryIndex === 1 ? "w-[43px] bg-[#313131]" : "w-[7px] bg-white"
          }  h-[7px] rounded duration-300`}
        ></div>
      </div>
      <div className="lg:hidden flex items-center justify-center">
        <SwipeableViews
          onChangeIndex={(index) => {
            setGalleryIndex(index);
          }}
          index={galleryIndex}
          enableMouseEvents
          className="  px-[24px] w-[360px]  flex gap-x-10"
        >
          <StrealAccountDisplay></StrealAccountDisplay>
          <CollateralAccountDisplay></CollateralAccountDisplay>
        </SwipeableViews>
      </div>
      <div className="absolute right-[50px] hidden lg:block">
        {" "}
        <CollateralAccountDisplay></CollateralAccountDisplay>
      </div>
      <div className="absolute right-[430px] hidden lg:block">
        {" "}
        <StrealAccountDisplay></StrealAccountDisplay>
      </div>
    </div>
  );
}
