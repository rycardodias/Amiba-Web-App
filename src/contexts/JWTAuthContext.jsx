import LoadingScreen from "components/LoadingScreen";
import { createContext, useEffect, useReducer } from "react";
import * as usersRequests from 'lib/requests/usersRequests'

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      {
        return {
          isInitialized: true,
          user: action.payload.user,
          isAuthenticated: action.payload.isAuthenticated
        };
      }

    case "LOGIN":
      {
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user
        };
      }

    case "LOGOUT":
      {
        return {
          ...state,
          user: null,
          isAuthenticated: false
        };
      }

    case "REGISTER":
      {
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user
        };
      }

    default:
      {
        return state;
      }
  }
};

const AuthContext = createContext({
  ...initialState, method: "JWT",
  login: (email, password) => Promise.resolve(),
  logout: () => { },
  register: (email, password, name) => Promise.resolve()
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const response = await usersRequests.login(email, password)
    if (response.error || response.data.error) return response

    dispatch({
      type: "LOGIN",
      payload: {
        user: response.data.data.token
      }
    });
    return response
  };

  const register = async (email, password, name) => {

    const response = await usersRequests.createUser(name, email, password)
    if (response.error) return response
    if (response.data.error) return response

    const { token } = response.data.data

    dispatch({
      type: "REGISTER",
      payload: {
        user: token
      }
    });
    return response
  };

  const logout = async () => {
    await usersRequests.logout()
    dispatch({
      type: "LOGOUT"
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const validToken = (await usersRequests.validateToken()).data.data

        if (validToken) {
          const response = await usersRequests.getUserByToken() //@ts-ignore
          dispatch({
            type: "INIT",
            payload: {
              user: response.data.data,
              isAuthenticated: true
            }
          });
        } else {
          dispatch({
            type: "INIT",
            payload: {
              user: null,
              isAuthenticated: false
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            user: null,
            isAuthenticated: false
          }
        });
      }
    })();
  }, []);

  if (!state.isInitialized) {
    return <LoadingScreen />;
  }

  return <AuthContext.Provider value={{ ...state, method: "JWT", login, logout, register }}>
    {children}
  </AuthContext.Provider>;
};
export default AuthContext;