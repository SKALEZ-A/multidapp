import { TOGGLE_MODE, TOGGLE_TESTNET } from "./interface-types";

export const _TOGGLE_MODE = () => {
  return {
    type: TOGGLE_MODE,
  };
};

export const _TOGGLE_TESTNET = () => {
  return {
    type: TOGGLE_TESTNET,
  };
};
