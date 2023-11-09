import UserDashboardNew from "./UserDashboardNew";
import StrealAccountDisplay from "./StrealAccountDisplay";
import Image from "next/image";
import dashboardArrow from "../../public/newImages/dashboard/dashboard-arrow.svg";
import HeaderDashboard from "../DashboardComponents/HeaderDashboard";
import { useState } from "react";
import MintStreal from "../UserDashBoardOptions/MintStreal";
import DepositStreal from "../UserDashBoardOptions/DepositToken";
import CollateralAccountDisplay from "./CollateralAccountDisplay";
import RedeemCollateral from "../UserDashBoardOptions/RedeemCollateral";

export default function DashboardNew() {
  const [collateralBtns, setCollateralBtns] = useState([
    { name: "USDC", selected: true },
    { name: "DAI", selected: false },
    { name: "USDT", selected: false },
  ]);

  const [selectedHeader, setSelectedHeader] = useState("MINT STREAL");

  const handleSetSelectedHeader = (input: string) => {
    setSelectedHeader(input);
  };

  return (
    <div className="w-full h-fit bg-[#F6F6F6]">
      <UserDashboardNew></UserDashboardNew>
      <div className="  ">
        {" "}
        <HeaderDashboard
          selectedHeader={selectedHeader}
          handleSetSelectedHeader={handleSetSelectedHeader}
        ></HeaderDashboard>
      </div>
      <div>
        <div className=" w-full px-[12vw] mx-auto mt-[40px]">
          <div className="flex gap-x-[24px]">
            {collateralBtns.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setCollateralBtns((prev) => {
                      return prev.map((btns) => {
                        if (btns.name === item.name) {
                          return { ...btns, selected: true };
                        } else {
                          return { ...btns, selected: false };
                        }
                      });
                    });
                  }}
                  className={`flex w-[80px] tracking-tight text-[12px] font-normal items-center  rounded-full  p-1  gap-x-[4px]`}
                >
                  <div
                    className={`w-[15px] h-[15px] bg-black rounded-[4px] flex items-center justify-center`}
                  >
                    <div
                      className={`${
                        item.selected ? "opacity-1" : "opacity-0"
                      } duration-300 w-[7px] h-[7px] rounded-full bg-spiceOrange duration-300`}
                    ></div>
                  </div>{" "}
                  {item.name}
                </button>
              );
            })}
          </div>
          <div className="text-[0.8rem] text-lightGray mt-[9px]">
            Please Select your Preferred Collateral Currency.
          </div>
          <div className="mt-[51px] pb-[60px]">
            <div
              className={`${
                selectedHeader === "MINT STREAL" ? "block" : "hidden"
              }`}
            >
              <MintStreal></MintStreal>
            </div>
            <div
              className={`${
                selectedHeader === "DEPOSIT TOKEN" ? "block" : "hidden"
              }`}
            >
              <DepositStreal></DepositStreal>
            </div>
            <div
              className={`${
                selectedHeader === "REDEEM COLLATERAL" ? "block" : "hidden"
              }`}
            >
              <RedeemCollateral></RedeemCollateral>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
