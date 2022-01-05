import LoadingScreen from "components/LoadingScreen";
import jwtDecode from "jwt-decode";
import { createContext, useEffect, useReducer } from "react";
import * as usersRequests from 'lib/requests/usersRequests'
import Cookies from 'js-cookie';


const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  token: null
};

const isValidToken = accessToken => {
  return true
  //TODO verificar token
  if (!accessToken) return false;
  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp > currentTime;
};


const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      {
        return {
          isInitialized: true,
          token: action.payload.token,
          isAuthenticated: action.payload.isAuthenticated
        };
      }

    case "LOGIN":
      {
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.token
        };
      }

    case "LOGOUT":
      {
        return {
          ...state,
          token: null,
          isAuthenticated: false
        };
      }

    case "REGISTER":
      {
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.token
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
}); // props type

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const response = await usersRequests.login(email, password)
    if (response.error) return response
    if (response.data.error) return response

    dispatch({
      type: "LOGIN",
      payload: {
        token: response.data.data.token
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
        token: token
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
        console.log(validToken)
        if (validToken) {

          const response = await usersRequests.getUserByToken() //@ts-ignore

          dispatch({
            type: "INIT",
            payload: {
              token: response.data.data,
              isAuthenticated: true
            }
          });
        } else {
          dispatch({
            type: "INIT",
            payload: {
              token: null,
              isAuthenticated: false
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            token: null,
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