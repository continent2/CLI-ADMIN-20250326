// Import Dependencies
import {useEffect, useReducer} from "react";
import isObject from "lodash/isObject";
import PropTypes from "prop-types";
import isString from "lodash/isString";

// Local Imports
import axios from "utils/axios";
import {isTokenValid, setSession} from "utils/jwt";
import {AuthContext} from "./context";

// ----------------------------------------------------------------------

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    isInitialized: false,
    errorMessage: null,
    user: null,
};

const reducerHandlers = {
    INITIALIZE: (state, action) => {
        const {isAuthenticated, user} = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },

    LOGIN_REQUEST: (state) => {
        return {
            ...state,
            isLoading: true,
        };
    },

    LOGIN_SUCCESS: (state, action) => {
        const {user} = action.payload;
        return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user,
        };
    },

    LOGIN_ERROR: (state, action) => {
        const {errorMessage} = action.payload;

        return {
            ...state,
            errorMessage,
            isLoading: false,
        };
    },

    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
    }),
};

const reducer = (state, action) => {
    const handler = reducerHandlers[action.type];
    if (handler) {
        return handler(state, action);
    }
    return state;
};

export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        const init = async () => {
            try {
                const authToken = window.localStorage.getItem("authToken");

                if (authToken && isTokenValid(authToken)) {
                    setSession(authToken);
                    //const response = await axios.get("/user/profile");
                    const {user} = {
                        "user": {
                            "id": "7",
                            "username": "elegantBanana",
                            "firstName": "elegantBanana",
                            "lastName": ""
                        },
                        "auth": true
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

    const login = async ({username, password}) => {
        dispatch({
            type: "LOGIN_REQUEST",
        });

        try {
            const response = await axios.post("/agency/login", {
                "username": username,
                "pw": password
            });
            const {token: authToken, userinfo: user} = response.data;

            if (!isString(authToken) && !isObject(user)) {
                throw new Error("Response is not vallid");
            }
            setSession(authToken);
            localStorage.setItem("username", user.username);
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    user,
                },
            });
        } catch (err) {
            dispatch({
                type: "LOGIN_ERROR",
                payload: {
                    errorMessage: err,
                },
            });
        }
    };

    const logout = async () => {
        try {
            const authToken = localStorage.getItem("authToken");
            const response = await axios.post(
                `/agency/logout`,
                {
                    headers: {
                        Authorization: authToken,
                    },
                    timeout: 5000, // Timeout after 5 seconds
                }
            );
            if (response.status == "200") {
                dispatch({type: "LOGOUT"});
                localStorage.clear(); // Clears all stored data
                setSession(null);
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (!children) {
        return null;
    }

    return (
        <AuthContext
            value={{
                ...state,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};
