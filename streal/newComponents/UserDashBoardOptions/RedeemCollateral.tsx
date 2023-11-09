import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { useState } from "react";

export default function RedeemCollateral() {
  const [collateral, setCollateral] = useState(0);
  const [streal, setStreal] = useState(0);
  return (
    <div className="w-full flex flex-col gap-y-[51px]">
      <div className="flex justify-between w-full  text-[16px] lg:text-[48px] border-b border-black pb-[10px] ">
        <div className="lg:w-[350px] leading-none w-[95px]">
          AMOUNT TO REDEEM
        </div>
        <div className=" lg:w-[20%] w-[40%] overflow-hidden relative">
          {" "}
          <input
            className="bg-[#F0F0F0] border-l border-black outline-none  placeholder:text-[12px] placeholder:lg:opacity-0 pl-[10px] placeholder:font-italic flex items-center justify-center"
            type={"number"}
            onChange={(e: any) => {
              setStreal((prev) => {
                setCollateral(e.target.value * 2);
                return e.target.value;
              });
            }}
            value={streal}
            placeholder={"Please enter your value"}
          ></input>
          <div className="text-[12px] lg:block hidden absolute">
            Please enter your value
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full text-[16px] lg:text-[48px] border-b border-black pb-[10px] ">
        <div className="lg:w-[350px] w-[95px] leading-none">
          EQUIVALENT IN STREAL
        </div>
        <div className=" lg:w-[20%] w-[40%] overflow-hidden relative">
          {" "}
          <input
            className="bg-[#F0F0F0] border-l border-black outline-none  placeholder:text-[12px] placeholder:lg:opacity-0 pl-[10px] placeholder:font-italic flex items-center justify-center"
            type={"number"}
            value={collateral}
            onChange={(e: any) => {
              setCollateral((prev) => {
                setStreal(e.target.value / 2);
                return e.target.value;
              });
            }}
            placeholder={" Please enter your value"}
          ></input>
          <div className="text-[12px] absolute lg:block hidden">
            Please enter your value
          </div>
        </div>
      </div>
      <button className="group bg-black text-white w-fit flex items-center gap-x-[10px] p-2 px-10 rounded-[10px] text-[13px]">
        REDEEM COLLATERAL
        <BsArrowUpRightSquareFill
          color="white"
          className="fill-white group-hover:fill-spiceOrange duration-300"
          size={18}
        ></BsArrowUpRightSquareFill>
      </button>
    </div>
  );
}
