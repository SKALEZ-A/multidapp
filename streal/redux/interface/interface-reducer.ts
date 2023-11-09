import { TOGGLE_MODE, TOGGLE_TESTNET } from "./interface-types";

const INITIAL_STATE = {
  mode: false,
  testNet: false,
};

export const InterfaceReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_MODE:
      return {
        ...state,
        mode: !state.mode,
      };

    case TOGGLE_TESTNET:
      return {
        ...state,
        testNet: !state.testNet,
      };

    default:
      return state;
  }
};

export default InterfaceReducer;
