import MarketDetailDashboard from "../../components/MarketDetailComponents/MarketDetailDashboard/MarketDetailDashboard";
import MarketDetailsCharts from "../../components/MarketDetailsCharts/MarketDetailsCharts";
import MainPageLayout from "../../components/mainPageLayout/MainPageLayout";
import type { FC } from "react";

interface indexProps {}

const index: FC<indexProps> = ({}) => {
  return (
    <MainPageLayout
      Dashboard={<MarketDetailDashboard />}
      Table={<MarketDetailsCharts />}
      transparentBgPage={true}
    />
  );
};

export default index;
