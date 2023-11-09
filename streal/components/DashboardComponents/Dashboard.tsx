import MainPageLayout from "../mainPageLayout/MainPageLayout";
import DashboardDashboard from "./DashboardDashboard";
import DashboardTable from "./DashboardTable";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const darkMode = useSelector((state: any) => state.interface.mode);
  return (
    <div className="dashboard">
      <MainPageLayout
        Table={<DashboardTable darkMode={darkMode}></DashboardTable>}
        Dashboard={
          <DashboardDashboard darkMode={darkMode}></DashboardDashboard>
        }
      ></MainPageLayout>
    </div>
  );
}
