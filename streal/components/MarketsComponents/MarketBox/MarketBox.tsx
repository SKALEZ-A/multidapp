import Image from "next/image";
import React from "react";

import DAI from "@/public/images/dai.svg";
import { useSelector } from "react-redux";
import Link from "next/link";

interface Props {
  id: string;
  tokenName: string;
  tokenShortName: string;
  tokenImage: string;
  totalSuppliedFigure: number;
  totalSuppliedPer: number;
  maxSupply: number;
  supplyApy: number;
  totalBorrowedFigure: number;
  totalBorrowedPer: number;
  borrowedApyVariable: number;
  borrowedApyStable: number;
}

const MarketBox = ({
  id,
  tokenName,
  tokenShortName,
  tokenImage,
  totalSuppliedFigure,
  supplyApy,
  maxSupply,
  totalBorrowedFigure,
  totalBorrowedPer,
  borrowedApyVariable,
  borrowedApyStable,
}: Props) => {
  const darkMode = useSelector((state: any) => state.interface.mode);

  return (
    <div
      className={`market--box mobile--table ${
        !darkMode && "light--mode--market--box"
      }`}
    >
      <div className="box--header">
        <img src={tokenImage} alt="" />
        <div className="box--header--text">
          <h5>{tokenName}</h5>
          <p>{tokenShortName}</p>
        </div>
      </div>

      <div className="total--supplied--container border--wrapper">
        <div className="details">
          <p className="title">Total supplied</p>
          <div className="figures">
            <p className="title">
              {(totalSuppliedFigure / 1000000).toFixed(2)}M
            </p>
            <p className="figures--figure">
              ${(maxSupply / 1000000).toFixed(2)}M
            </p>
          </div>
        </div>

        <div className="details">
          <p className="title">Supply APY</p>
          <div className="figures">
            <p className="figures--figure">{supplyApy.toFixed(2)}%</p>
          </div>
        </div>
      </div>

      <div className="total--supplied--container ">
        <div className="details">
          <p className="title">Total borrowed</p>
          <div className="figures">
            <p className="title">{(totalBorrowedFigure / 1000).toFixed(2)}M</p>
            <p className="figures--figure">
              ${(totalBorrowedPer / 1000).toFixed(2)}M
            </p>
          </div>
        </div>

        <div className="details">
          <p className="title">Borrow APY, variable</p>
          <div className="figures">
            <p className="figures--figure">{borrowedApyVariable.toFixed(2)}%</p>
          </div>
        </div>

        <div className="details margin--box ">
          <p className="title">Borrow APY, stable</p>
          <div className="figures">
            <p className="figures--figure">--</p>
          </div>
        </div>

        <Link href={{ pathname: "/market-details", query: { id } }}>
          <button className="market--box--button">View details</button>
        </Link>
      </div>
    </div>
  );
};

export default MarketBox;
