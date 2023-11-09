import { useState } from "react";

interface HeaderDashboardProps {
  handleSetSelectedHeader: (input: string) => void;
  selectedHeader: string;
}

export default function HeaderDashboard(props: HeaderDashboardProps) {
  const [headerBtn, setHeaderBtn] = useState([
    { name: "MINT STREAL" },
    { name: "DEPOSIT TOKEN" },
    { name: "REDEEM COLLATERAL" },
  ]);
  return (
    <div className="w-full bg-black text-[12px] lg:text-[14px]">
      <div className="flex text-white justify-between px-[12vw] mx-auto  ">
        {headerBtn.map((item, index) => {
          return (
            <button
              onClick={() => {
                props.handleSetSelectedHeader(item.name);
              }}
              key={index}
              className={`${
                item.name === props.selectedHeader
                  ? " border-spiceOrange"
                  : "text-gray-400 border-lightGray"
              } border-b-2  py-2 duration-300`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
