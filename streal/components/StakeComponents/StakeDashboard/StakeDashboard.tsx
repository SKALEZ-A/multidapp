import Image from "next/image";
import React from "react";
import DashboardTag from "../../DashboardTag/DashboardTag";

import ETH from "public/Images/ethereum.svg";
import SAFETY from "public/Images/safety.svg";

const StakeDashboard = () => {
  return (
    <div className="stake--dashboard">
      <h5 className="top--title">
        Available on{" "}
        <span>
          <Image src={ETH} alt="settings" />
        </span>{" "}
        Ethereum Mainnet
      </h5>
      <h1 className="page--title">Staking</h1>
      <p>
        STREAL holders (Ethereum network only) can stake their STREAL in the
        Safety Module to add more security to the protocol and earn Safety
        Incentives. In the case of a shortfall event, up to 30% of your stake
        can be slashed to cover the deficit, providing an additional layer of
        protection for the protocol. Learn more about risks involved.
      </p>

      <div className="flex--tag">
        <DashboardTag
          icon={SAFETY}
          title={"Funds in the Safety Module"}
          figure="371.25M"
        />
        <DashboardTag
          icon={SAFETY}
          title={"Total emission per day"}
          figure="1,100.00"
          logo={true}
        />
      </div>
    </div>
  );
};

export default StakeDashboard;
