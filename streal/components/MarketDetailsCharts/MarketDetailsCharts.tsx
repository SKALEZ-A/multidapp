import { useState } from "react";
import type { FC } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import dynamic from "next/dynamic";

const SupplyChart = dynamic(() => import("../Charts/SupplyChart/SupplyChart"), {
  ssr: false,
});

const BorrowChart = dynamic(() => import("../Charts/BorrowChart/BorrowChart"), {
  ssr: false,
});

const MarketDetailsCharts: FC = () => {
  const [active, setActive] = useState<number>(1);

  const handleActive = (value: number) => setActive(value);

  return (
    <div className="chart-page">
      <h5 className="chart-title ">Reserve status & configuration</h5>

      <div className="chart-container">
        <p className="chart-container-title">Supply Info</p>
        <div className="inner-chart-wrapper">
          <div className="flex--chart--details">
            <div className="flex flex-col">
              <p className="title">Total Supplied</p>
              <div className="supplied-prices">
                <p className="supplied">409.01K</p>
                <p className="total--supplied">$446.00K</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="title">APY</p>
              <div className="supplied-prices">
                <p className="supplied">1.00%</p>
              </div>
            </div>
          </div>

          <div className="chart--header">
            <div className="title">
              <div className="dot"></div>
              <p>Supply APR</p>
            </div>

            <div className="btn--container">
              <div
                onClick={() => handleActive(1)}
                className={`chart--btn ${active === 1 && "active"}`}
              >
                <span>1m</span>
              </div>
              <div
                onClick={() => handleActive(2)}
                className={`chart--btn ${active === 2 && "active"}`}
              >
                <span>6m</span>
              </div>
              <div
                onClick={() => handleActive(3)}
                className={`chart--btn ${active === 3 && "active"}`}
              >
                <span>1y</span>
              </div>
            </div>
          </div>

          <div className="chart">
            <SupplyChart color="#2ebac6" />
          </div>

          <div className="info--container">
            <p>Collateral usage</p>
            <div className="info">
              <BsExclamationCircle className="icn" />{" "}
              <p>Asset cannot be used as collateral</p>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <p className="chart-container-title">Borrow Info</p>

        <div className="inner-chart-wrapper">
          <div className="info--container padding--btm ">
            <div className="info" style={{ background: "#f9ebeb" }}>
              <BiError
                style={{ color: "rgba(188, 0, 0, 0.72)" }}
                className="icn"
              />{" "}
              <p style={{ color: "rgb(79, 25, 25)" }}>
                Borrowing is disabled due to an Aave community decision. More
                details
              </p>
            </div>
          </div>

          <div className="flex--chart--details">
            <div className="flex flex-col">
              <p className="title">Total Supplied</p>
              <div className="supplied-prices">
                <p className="supplied">409.01K</p>
                <p className="total--supplied">$446.00K</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="title">APY</p>
              <div className="supplied-prices">
                <p className="supplied">1.00%</p>
              </div>
            </div>
          </div>

          <div className="chart--header">
            <div className="title">
              <div style={{ background: "#b6509e" }} className="dot"></div>
              <p>Borrow APR, variable</p>
            </div>

            <div className="btn--container">
              <div
                onClick={() => handleActive(1)}
                className={`chart--btn ${active === 1 && "active"}`}
              >
                <span>1m</span>
              </div>
              <div
                onClick={() => handleActive(2)}
                className={`chart--btn ${active === 2 && "active"}`}
              >
                <span>6m</span>
              </div>
              <div
                onClick={() => handleActive(3)}
                className={`chart--btn ${active === 3 && "active"}`}
              >
                <span>1y</span>
              </div>
            </div>
          </div>

          <div className="chart">
            <SupplyChart color="#b6509e" />
          </div>

          <div className="collector--wrapper">
            <p className="chart-container-title ">Collector Info</p>

            <div className="box--container">
              <div className="collector--container">
                <p className="title">
                  Reserve factor
                  <span>
                    <BsExclamationCircle className="c-icon" />
                  </span>
                </p>
                <p className="figure">20.00%</p>
              </div>

              <div className="collector--container">
                <p className="title">Collector Contract</p>
                <p className="title">
                  View contract{" "}
                  <span>
                    <BsExclamationCircle className="c-icon" />
                  </span>
                </p>
              </div>

              <div className="collector--container gap-box-flex">
                <p className="title">
                  Reserve factor
                  <span>
                    <BsExclamationCircle className="c-icon" />
                  </span>
                </p>
                <p className="figure">20.00%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <p className="chart-container-title">E-Mode Info</p>

        <div className="inner-chart-wrapper">
          <div className="collector--wrapper">
            <p className="chart-container-title ">
              <span>E-Mode Category</span> Collector Info
            </p>

            <div className="box--container">
              <div className="collector--container adjust-height">
                <p className="title">
                  Max LTV
                  <span>
                    <BsExclamationCircle className="c-icon" />
                  </span>
                </p>
                <p className="figure">20.00%</p>
              </div>

              <div className="collector--container adjust-height">
                <p className="title">Liquidation threshold</p>
                <p className="figure">20.00%</p>
              </div>

              <div className="collector--container adjust-height">
                <p className="title">
                  Liquidation penalty
                  <span>
                    <BsExclamationCircle className="c-icon" />
                  </span>
                </p>
                <p className="figure">20.00%</p>
              </div>
            </div>

            <p className="box--info">
              E-Mode increases your LTV for a selected category of assets,
              meaning that when E-mode is enabled, you will have higher
              borrowing power over assets of the same E-mode category which are
              defined by Aave Governance. You can enter E-Mode from your
              Dashboard. To learn more about E-Mode and applied restrictions in
              FAQ or Aave V3 Technical Paper.
            </p>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <p className="chart-container-title">Interest rate model</p>
        <div className="inner-chart-wrapper">
          <div className="flex--chart--details">
            <div className="flex flex-col">
              <p className="title">Utilization Rate</p>
              <div className="supplied-prices">
                <p className="supplied">49.95 %</p>
              </div>
            </div>
          </div>

          <div className=" gap--flex">
            <div className="title">
              <div style={{ background: "#b6509e" }} className="dot"></div>
              <p>Borrow APR, variable</p>
            </div>

            <div className="title">
              <div style={{ background: "#0062d2" }} className="dot"></div>
              <p>Utilization Rate</p>
            </div>
          </div>

          <div className="chart">
            <BorrowChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDetailsCharts;
