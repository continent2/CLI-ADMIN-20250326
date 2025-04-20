// Import Dependencies
import { useEffect, useReducer } from "react";
import PropTypes from "prop-types";

// Local Imports
import axios from "utils/axios";
import { isTokenValid, setSession } from "utils/jwt";
import { MemberContext } from "./context";

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

  MEMBER_REQUEST: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },

  MEMBER_SUCCESS: (state, action) => {
    const { list, siteList, count } = action.payload;
    return {
      ...state,
      isLoading: false,
      list,
      siteList,
      count,
    };
  },

  MEMBER_ERROR: (state, action) => {
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

export function MemberProvider({ children }) {
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

  const members = async ({
    offSet,
    limit,
    searchKey,
    timeStartIso,
    timeEndIso,
    siteId,
  }) => {
    dispatch({
      type: "MEMBER_REQUEST",
    });

    try {
      const token = localStorage.getItem("authToken");

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
        `/query/list/custom/user/_/_/id/DESC/${offSet}/${limit}`,
        {
          headers: {
            Authorization: token,
          },
          timeout: 5000, // Timeout after 5 seconds
          params, // Add the query parameters here
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
        type: "MEMBER_SUCCESS",
        payload: {
          list,
          count,
          siteList,
        },
      });
    } catch (err) {
      dispatch({
        type: "MEMBER_ERROR",
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
    <MemberContext
      value={{
        ...state,
        members,
      }}
    >
      {children}
    </MemberContext>
  );
}

MemberProvider.propTypes = {
  children: PropTypes.node,
};
