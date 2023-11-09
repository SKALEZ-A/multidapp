import { ReactNode } from "react";
import { useSelector } from "react-redux";

interface MainPagesLayoutProps {
  Dashboard: ReactNode;
  Table: ReactNode;
  transparentBgPage?: boolean;
  centerPage?: boolean;
}

export default function MainPageLayout(props: MainPagesLayoutProps) {
  const darkMode = useSelector((state: any) => state.interface.mode);

  return (
    <div className={`main-pages-layout ${darkMode && "dark--mode--bg"}`}>
      <div className="dashboard-cont">
        <div className="dashboard">{props.Dashboard}</div>
      </div>
      <div
        className={`${
          props.transparentBgPage ? "transparent-bg-page" : "transparent-bg "
        } table-cont ${darkMode && "dark--mode--bg"}`}
      >
        <div
          /*  style={
            props.transparentBgPage && typeof window !== "undefined"
              ? { marginTop: 20 }
              : { background: "" }
          } */
          className={`table ${
            props.transparentBgPage ? "transparent-bg-page" : "transparent-bg "
          } ${darkMode && "dark--mode--bg"}`}
        >
          <div
            /*    style={
              props.transparentBgPage && typeof window !== "undefined"
                ? { marginTop: 0 }
                : { background: "" }
            } */
            className={`table-main ${darkMode && "inner--page--bg"} ${
              props.centerPage ? "center-page" : ""
            }`}
          >
            {props.Table}
          </div>
        </div>
      </div>
    </div>
  );
}
