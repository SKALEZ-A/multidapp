import SupplyBorrowItemType from "../../../Types/SupplyBorrowItemType";
import { BsCheck2, BsExclamationCircle, BsDashLg } from "react-icons/bs";
import { useRouter } from "next/router";
export default function DashboardTablePostConnectItem(
  props: SupplyBorrowItemType
) {
  const router = useRouter();
  const handleDetailsClick = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    router.push("/market-details", { query: id });
  };
  const buttonsSupplyArray = [
    { name: "Supply" },
    { name: "Details", onClick: handleDetailsClick },
  ];
  const buttonsBorrowArray = [
    { name: "Borrow" },
    { name: "Details", onClick: handleDetailsClick },
  ];

  const collateralIcon = () => {
    if (props.isolated) {
      return (
        <div>
          {<BsExclamationCircle size={18}></BsExclamationCircle>}
          <div>Isolated</div>
        </div>
      );
    } else if (props.canBeCollateral) {
      return <BsCheck2 size={18}></BsCheck2>;
    } else if (!props.canBeCollateral) {
      return <BsDashLg size={18}></BsDashLg>;
    }
  };

  return (
    <div className="dashboard-table-post-connection-item">
      <div className="title-cont">
        <img src={props.tokenImage}></img>
        <span>{props.tokenName}</span>
      </div>
      <div className="center">{props.walletBalance}</div>
      <div className="apy-data center">
        {Math.round(parseFloat(props.apySupply) * 100) / 100}
      </div>
      <div className="center">{collateralIcon()}</div>
      <div className="button-cont">
        {" "}
        {!props.isBorrowItem
          ? buttonsSupplyArray.map((item, index) => {
              return (
                <div key={index}>
                  <button
                    disabled={index ? false : true}
                    className="primary-buttons "
                    key={index}
                    onClick={(e) => {
                      item.onClick && item.onClick(props.id, e);
                    }}
                  >
                    {item.name}
                  </button>
                </div>
              );
            })
          : buttonsBorrowArray.map((item, index) => {
              return (
                <div key={index}>
                  <button
                    disabled={index ? false : true}
                    onClick={(e) => {
                      item.onClick && item.onClick(props.id, e);
                    }}
                    className="primary-buttons "
                    key={index}
                  >
                    {item.name}
                  </button>
                </div>
              );
            })}
      </div>
    </div>
  );
}
