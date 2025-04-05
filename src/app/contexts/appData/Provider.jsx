// Import Dependencies
import {useReducer} from "react";
import PropTypes from "prop-types";


// Local Imports
import axios from "utils/axios";

import {AppDataContext} from "./context";

// ----------------------------------------------------------------------

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    isInitialized: false,
    errorMessage: null,
    banks: null,
    agencyBank: null
};

const reducerHandlers = {
    INITIALIZE: (state, action) => {
        const {isAuthenticated, banks} = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            banks,
        };
    },

    BANK_SUCCESS: (state, action) => {
        const {banks,agencyBank} = action.payload;
        return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            banks,
            agencyBank
        };
    },

    BANK_ERROR: (state, action) => {
        const {errorMessage} = action.payload;

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

export function AppDataProvider({children}) {
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
                }
            );

            const banks = response.data.list;
            dispatch({
                type: "BANK_SUCCESS",
                payload: {
                    banks,
                },
            });
        } catch (err) {
            dispatch({
                type: "BANK_ERROR",
                payload: {
                    errorMessage: err,
                },
            });
            console.log(err);
        }
    };

    const agencyAccountInfo = async () => {
        try {
            const authToken = localStorage.getItem("authToken");
            const response = await axios.get(
                `/query/list/plain/agencyaccount/_/_/updatedat/DESC/0/100`,
                {
                    headers: {
                        Authorization: authToken,
                    },
                    timeout: 5000, // Timeout after 5 seconds
                }
            );

            const agencyBank = response.data.list;
            dispatch({
                type: "BANK_SUCCESS",
                payload: {
                    agencyBank,
                },
            });
        } catch (err) {
            dispatch({
                type: "BANK_ERROR",
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
                agencyAccountInfo
            }}
        >
            {children}
        </AppDataContext>
    );
}

AppDataProvider.propTypes = {
    children: PropTypes.node,
};
