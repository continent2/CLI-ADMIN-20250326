// Import Dependencies
import { useEffect, useReducer } from "react";
import PropTypes from "prop-types";

// Local Imports
import axios from "utils/axios";
import { isTokenValid, setSession } from "utils/jwt";
import { DepositContext } from "./context";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  list: null,
  siteList: null,
  count: null,
};

const reducerHandlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  DEPOSIT_REQUEST: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },

  DEPOSIT_SUCCESS: (state, action) => {
    const { list, siteList, count } = action.payload;
    return {
      ...state,
      isLoading: false,
      list,
      siteList,
      count,
    };
  },

  DEPOSIT_ERROR: (state, action) => {
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

export function DepositProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const authToken = window.localStorage.getItem("authToken");

        if (authToken && isTokenValid(authToken)) {
          setSession(authToken);
          //const response = await axios.get("/user/profile");
          const { user } = {
            user: {
              id: "7",
              username: "elegantBanana",
              firstName: "elegantBanana",
              lastName: "",
            },
            auth: true,
          };
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    init();
  }, []);

  // Update your deposits function to properly handle loading state
const deposits = async ({
  offSet,
  limit,
  searchKey,
  timeStartIso,
  timeEndIso,
  siteId,
}) => {
  dispatch({ type: "DEPOSIT_REQUEST" }); // Set loading state

  try {
    const token = localStorage.getItem("authToken");
    const params = {};

    if (searchKey) params.searchkey = searchKey;
    if (timeStartIso) params.timestartiso = timeStartIso;
    if (timeEndIso) params.timeendiso = timeEndIso;
    if (siteId) params.siteid = siteId;

    // Use Promise.all for parallel requests
    const [depositResponse, siteResponse] = await Promise.all([
      axios.get(
        `/query/list/custom/deposit/_/_/id/DESC/${offSet}/${limit}`,
        {
          headers: { Authorization: token },
          params,
        }
      ),
      axios.get(
        "/query/list/plain/site/_/_/name/ASC/0/100",
        {
          headers: { Authorization: token },
        }
      ),
    ]);

    dispatch({
      type: "DEPOSIT_SUCCESS",
      payload: {
        list: depositResponse.data.list,
        count: depositResponse.data.count,
        siteList: siteResponse.data.list,
      },
    });
  } catch (err) {
    dispatch({
      type: "DEPOSIT_ERROR",
      payload: {
        errorMessage: err.response?.data?.message || err.message,
      },
    });
    // Optionally re-throw if you need to handle errors in components
    throw err;
  }
};
  if (!children) {
    return null;
  }

  return (
    <DepositContext
      value={{
        ...state,
        deposits,
      }}
    >
      {children}
    </DepositContext>
  );
}

DepositProvider.propTypes = {
  children: PropTypes.node,
};
