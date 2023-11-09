import "../styles/index.css";
import "../styles/globals.scss";
import { StrealProvider } from "./indexData";
import React, { StrictMode } from "react";
import Data from "../component/Data";
import Function from "../component/functions";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Wrapper from "../components/wrapper/Wrapper";
import "react-toastify/dist/ReactToastify.css";
import store from "../redux/store";
import Web3ModalNew from "../web3ModalNew/Web3ModalNew";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <StrictMode>
    <StrealProvider>
      <Provider store={store}>
        <ToastContainer
          hideProgressBar
          position="bottom-right"
          autoClose={2000}
        />
        <Web3ModalNew>
          <Wrapper>
            {" "}
            <Component {...pageProps} />
          </Wrapper>
        </Web3ModalNew>
      </Provider>
      {/* <Data /> */}
      {/* <Function /> */}
    </StrealProvider>
  </StrictMode>
);
export default MyApp;
