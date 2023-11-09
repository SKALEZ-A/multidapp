import Link from "next/link";
import React from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

export interface LinkProps {
  url: string;
  title: string;
  Icon: any;
}

const NavInfoLink = ({ url, title, Icon }: LinkProps) => {
  return (
    <div className="each--link">
      <Link href={url}>
        <Icon className="icon" />
        <p>{title}</p>
      </Link>
    </div>
  );
};

export default NavInfoLink;
