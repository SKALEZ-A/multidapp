"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";

import MainPageLayout from "../components/mainPageLayout/MainPageLayout";

import { useState } from "react";
import Dashboard from "../components/DashboardComponents/Dashboard";
import DashboardNew from "../newComponents/DashboardNew/DashboardNew";
import MainPagesWrapper from "../components/mainPageLayout/MainPageLayout";
import { useWeb3 } from "../redux/auth/hooks";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { web3Provider, _CONNECT_WALLET, _DISCONNECT_WALLET, address } =
    useWeb3();
  const [isModalOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="pt-[40px]">
      <DashboardNew></DashboardNew>
    </div>
  );
}
