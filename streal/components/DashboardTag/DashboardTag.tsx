import Image from "next/image";
import React from "react";

interface Props {
  icon?: string;
  title: string;
  figure?: string;
  logo?: boolean;
}

const DashboardTag = ({ icon, title, figure, logo }: Props) => {
  return (
    <div className="tag--container">
      {icon !== undefined && <Image src={icon} alt="settings" />}

      <div className="inner--text">
        <p>{title}</p>
        <h2>
          {!logo && <span>$</span>} {figure} {logo && <span>STREAL</span>}
        </h2>
      </div>
    </div>
  );
};

export default DashboardTag;
