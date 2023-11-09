import GovernanceProposalType from "../../Types/GovernanceProposalType";
import {
  DotIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "../../public/Images/Icons";
import { useSelector } from "react-redux";

export default function Proposal(props: GovernanceProposalType) {
  const darkMode = useSelector((state: any) => state.interface.mode);
  const yaePercent = (props.Yae / (props.Nay + props.Yae)) * 100;
  const nayPercent = (props.Nay / (props.Nay + props.Yae)) * 100;
  return (
    <div className={`proposal ${darkMode ? "dark-mode" : ""}`}>
      <div className="title-cont">
        <div className="title">{props.Title}</div>
        <div className={`title-info ${darkMode ? "dark-mode" : ""}`}>
          <span className={`${props.Executed ? "executed" : "failed"}`}>
            {props.Executed
              ? DotIcon("green", "20", "20")
              : DotIcon("red", "20", "20")}{" "}
            {props.Executed ? "Executed" : "Failed"}
          </span>
          <span className="date">Executed on {props.Date}</span>
          <span className={`quorum ${darkMode ? "dark-mode" : ""}`}>
            Quorum{" "}
            {props.Quorum
              ? XCircleIcon("red", "10", "10")
              : CheckCircleIcon("green", "10", "10")}
          </span>
          <span className={`differential ${darkMode ? "dark-mode" : ""}`}>
            Differential{" "}
            {props.Quorum
              ? XCircleIcon("red", "10", "10")
              : CheckCircleIcon("green", "10", "10")}
          </span>
        </div>
      </div>

      <div className="voting-cont">
        <div className="yae-cont">
          <div className="info">
            <div>
              YAE <span className="info-number">{props.Yae}</span>
            </div>
            <div className="percent-info">{Math.round(yaePercent)}%</div>
          </div>
          <div className="yae-percent">
            <div
              className="percentage"
              style={{ width: `${yaePercent}%` }}
            ></div>
          </div>
        </div>
        <div className="nay-cont">
          <div className="info">
            <div>
              NAY <span className="info-number">{props.Nay}</span>
            </div>
            <div className="percent-info">{Math.round(nayPercent)}%</div>
          </div>
          <div className="nay-percent">
            <div
              className="percentage"
              style={{ width: `${nayPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
