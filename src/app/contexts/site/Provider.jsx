// Import Dependencies
import { useEffect, useReducer } from "react";
import PropTypes from "prop-types";

// Local Imports
import axios from "utils/axios";
import { isTokenValid, setSession } from "utils/jwt";
import { SiteContext } from "./context";

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

  SITE_SUCCESS: (state, action) => {
    const { list, count, siteList } = action.payload;
    return {
      ...state,
      isLoading: false,
      list,
      siteList,
      count,
    };
  },

  SITE_ERROR: (state, action) => {
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

export function SiteProvider({ children }) {
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

  const sites = async ({
    offSet,
    limit,
    searchKey,
    timeStartIso,
    timeEndIso,
    siteId,
  }) => {
    // dispatch({
    //   type: "LOGIN_REQUEST",
    // });

    try {
      const token = localStorage.getItem("authToken");
      // Build query parameters
      const params = {};

      if (searchKey) {
        params.searchkey = searchKey;
      }

      if (timeStartIso) {
        params.timestartiso = timeStartIso;
      }

      if (timeEndIso) {
        params.timeendiso = timeEndIso;
      }

      if (siteId) {
        params.siteid = siteId;
      }

      const response = await axios.get(
        `/query/list/custom/site/_/_/id/DESC/${offSet}/${limit}`,
        {
          headers: {
            Authorization: token,
          },
          timeout: 5000, // Timeout after 5 seconds
          params,
        },
      );

      const site_response = await axios.get(
        "/query/list/plain/site/_/_/name/ASC/0/100",
        {
          headers: {
            Authorization: token,
          },
          timeout: 5000, // Timeout after 5 seconds
        },
      );

      const { list, count } = response.data;
      const { list: siteList } = site_response.data;

      // if (!isString(authToken) && !isObject(user)) {
      //   throw new Error("Response is not vallid");
      // }
      // setSession(authToken);
      dispatch({
        type: "SITE_SUCCESS",
        payload: {
          list,
          count,
          siteList,
        },
      });
    } catch (err) {
      dispatch({
        type: "SITE_ERROR",
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
    <SiteContext
      value={{
        ...state,
        sites,
      }}
    >
      {children}
    </SiteContext>
  );
}

SiteProvider.propTypes = {
  children: PropTypes.node,
};
