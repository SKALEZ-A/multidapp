import MainPageLayout from "../../components/mainPageLayout/MainPageLayout";
import GovernanceTable from "../../components/GovernanceComponents/GovernanceTable";
import GovernanceDashboard from "../../components/GovernanceComponents/GovernanceDashboard";

export default function Governance() {
  return (
    <div>
      <MainPageLayout
        Dashboard={<GovernanceDashboard></GovernanceDashboard>}
        Table={<GovernanceTable></GovernanceTable>}
      ></MainPageLayout>
    </div>
  );
}
