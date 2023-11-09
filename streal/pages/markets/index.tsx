import MArketsDashboard from "../../components/MarketsComponents/MarketsDashboard/MarketsDashboard";
import MarketsTable from "../../components/MarketsComponents/MarketsTable/MarketsTable";
import StakeDashboard from "../../components/StakeComponents/StakeDashboard/StakeDashboard";
import MainPageLayout from "../../components/mainPageLayout/MainPageLayout";
import React from "react";

const Stake = () => {
  return (
    <MainPageLayout Dashboard={<MArketsDashboard />} Table={<MarketsTable />} />
  );
};

export default Stake;
