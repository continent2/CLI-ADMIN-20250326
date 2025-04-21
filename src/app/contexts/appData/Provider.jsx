// Import Dependencies
import { useReducer } from "react";
import PropTypes from "prop-types";

// Local Imports
import axios from "utils/axios";

import { AppDataContext } from "./context";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  banks: null,
  agencyBank: null,
  agencyBankStatus: null,
  withdraw: null,
  dashboardDeposit: null,
};

const reducerHandlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, banks } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      banks,
    };
  },

  APP_DATA_SUCCESS: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      ...action.payload,
    };
  },

  APP_DATA_ERROR: (state, action) => {
    const { errorMessage } = action.payload;

    return {
      ...state,
      errorMessage,
      isLoading: false,
    };
  },
};

const reducer = (state, action) => {
  const handler = reducerHandlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export function AppDataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const bankInfo = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(
        `/query/list/plain/bank/_/_/id/ASC/0/100`,
        {
          headers: {
            Authorization: authToken,
          },
          timeout: 5000, // Timeout after 5 seconds
        },
      );

      const banks = response.data.list;
      dispatch({
        type: "APP_DATA_SUCCESS",
        payload: {
          banks,
        },
      });
    } catch (err) {
      dispatch({
        type: "APP_DATA_ERROR",
        payload: {
          errorMessage: err,
        },
      });
      console.log(err);
    }
  };

  const agencyAccountInfo = async (isCrypto) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(
        `/query/list/plain/agencyaccount/_/_/updatedat/DESC/0/100?iscrypto=${isCrypto}`,
        {
          headers: {
            Authorization: authToken,
          },
          timeout: 5000, // Timeout after 5 seconds
        },
      );
      dispatch({
        type: "APP_DATA_SUCCESS",
        payload: {
          agencyBank: response.data.list,
          agencyBankStatus: response.data.status,
        },
      });
    } catch (err) {
      dispatch({
        type: "APP_DATA_ERROR",
        payload: {
          errorMessage: err,
        },
      });
    }
  };

  const withdrawInfo = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(`/withdraw`, {
        headers: {
          Authorization: authToken,
        },
        timeout: 5000, // Timeout after 5 seconds
      });

      const withdraw = response.data;
      dispatch({
        type: "APP_DATA_SUCCESS",
        payload: {
          withdraw,
        },
      });
    } catch (err) {
      dispatch({
        type: "APP_DATA_ERROR",
        payload: {
          errorMessage: err,
        },
      });
      console.log(err);
    }
  };

  const dashboardDepositInfo = async ({ offSet, limit }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(
        `/query/list/custom/deposit/_/_/id/DESC/${offSet}/${limit}`,
        {
          headers: {
            Authorization: authToken,
          },
          timeout: 5000, // Timeout after 5 seconds
        },
      );

      const dashboardDeposit = response.data.list;
      const dashboardDepositCount = response.data.count;
      dispatch({
        type: "APP_DATA_SUCCESS",
        payload: {
          dashboardDeposit,
          dashboardDepositCount,
        },
      });
    } catch (err) {
      dispatch({
        type: "APP_DATA_ERROR",
        payload: {
          errorMessage: err,
        },
      });
      console.log(err);
    }
  };

  if (!children) {
    return null;
  }

  return (
    <AppDataContext
      value={{
        ...state,
        bankInfo,
        agencyAccountInfo,
        withdrawInfo,
        dashboardDepositInfo,
      }}
    >
      {children}
    </AppDataContext>
  );
}

AppDataProvider.propTypes = {
  children: PropTypes.node,
};
