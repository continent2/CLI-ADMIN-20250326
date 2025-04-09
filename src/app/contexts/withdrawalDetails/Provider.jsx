// Import Dependencies
import { useEffect, useReducer } from "react";
import PropTypes from "prop-types";


// Local Imports
import axios from "utils/axios";
import { isTokenValid, setSession } from "utils/jwt";
import { WithdrawalDetailsContext } from "./context";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  list: null,
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

  WITHDRAW_SUCCESS: (state, action) => {
    const { list,count  } = action.payload;
    return {
      ...state,
      isLoading: false,
      list,
      count
    };
  },

  WITHDRAW_ERROR: (state, action) => {
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

export function WithdrawalDetailsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        const init = async () => {
            try {
                const authToken = window.localStorage.getItem("authToken");

                if (authToken && isTokenValid(authToken)) {
                    setSession(authToken);
                    //const response = await axios.get("/user/profile");
                    const response = await axios.post(
                `agencyadmin/myinfo`,
                {
                    headers: {
                        Authorization: authToken,
                    },
                    timeout: 5000, // Timeout after 5 seconds
                }
            );

                     dispatch({
                        type: "INITIALIZE",
                        payload: {
                            isAuthenticated: true,
                            user: response.data.info,
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


  const withdrawas = async ({ offSet, limit }) => {
    // dispatch({
    //   type: "LOGIN_REQUEST",
    // });

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
          `/query/list/custom/withdraw/_/_/id/DESC/${offSet}/${limit}`,
          {
            headers: {
              Authorization: token,
            },
            timeout: 5000, // Timeout after 5 seconds
          }
      );

      const { list,count } = response.data;

      // if (!isString(authToken) && !isObject(user)) {
      //   throw new Error("Response is not vallid");
      // }
      // setSession(authToken);
      dispatch({
        type: "WITHDRAW_SUCCESS",
        payload: {
          list,
          count,
        },
      });
    } catch (err) {
      dispatch({
        type: "WITHDRAW_ERROR",
        payload: {
          errorMessage: err,
        },
      });
    }
  };

  if (!children) {
    return null;
  }

  return (
    <WithdrawalDetailsContext
      value={{
        ...state,
        withdrawas,
      }}
    >
      {children}
    </WithdrawalDetailsContext>
  );
}

WithdrawalDetailsProvider.propTypes = {
  children: PropTypes.node,
};
