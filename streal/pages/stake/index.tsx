import StakeDashboard from "../../components/StakeComponents/StakeDashboard/StakeDashboard";
import StakeTable from "../../components/StakeComponents/StakeTable/StakeTable";
import MainPageLayout from "../../components/mainPageLayout/MainPageLayout";
import React from "react";

const Stake = () => {
  return (
    <div>
      <MainPageLayout
        centerPage={true}
        Dashboard={<StakeDashboard />}
        Table={<StakeTable />}
      />
    </div>
  );
};

export default Stake;
