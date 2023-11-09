import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  toggleModal?: () => void;
}

const NavLinks = ({ toggleModal }: Props) => {
  const location = useRouter();

  return (
    <ul className="nav--links">
      <li
        onClick={toggleModal}
        className={location.pathname === "/" ? "active" : ""}
      >
        <Link href="/">Dashboard</Link>
      </li>
      <li
        onClick={toggleModal}
        className={location.pathname === "/markets" ? "active" : ""}
      >
        <Link href="markets">Markets</Link>
      </li>
      <li
        onClick={toggleModal}
        className={location.pathname === "/stake" ? "active" : ""}
      >
        <Link href="stake">Stake</Link>
      </li>
      <li
        onClick={toggleModal}
        className={location.pathname === "/governance" ? "active" : ""}
      >
        <Link href="governance">Governance</Link>
      </li>
      <li
        onClick={toggleModal}
        className={location.pathname === "/airdrop" ? "active" : ""}
      >
        <Link href="governance">Airdrop</Link>
      </li>
      <li
        onClick={toggleModal}
        className={location.pathname === "/arbitrage" ? "active" : ""}
      >
        <Link href="governance">Arbitrage</Link>
      </li>
    </ul>
  );
};

export default NavLinks;
