import LoadingScreen from "components/LoadingScreen";
import jwtDecode from "jwt-decode";
import { createContext, useEffect, useReducer } from "react";
import axios from "utils/axios"; // All types
import * as usersRequests from 'lib/requests/usersRequests'
// =============================================

var Types;

(function (Types) {
  Types["Init"] = "INIT";
  Types["Login"] = "LOGIN";
  Types["Logout"] = "LOGOUT";
  Types["Register"] = "REGISTER";
})(Types || (Types = {}));

// ================================================
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const isValidToken = accessToken => {
  return true
  //TODO verificar token
  if (!accessToken) return false;
  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp > currentTime;
};

const setSession = accessToken => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
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
  ...initialState,
  method: "JWT",
  login: (email, password) => Promise.resolve(),
  logout: () => { },
  register: (email, password, name) => Promise.resolve()
}); // props type

export const AuthProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const response = await usersRequests.login(email, password)
    if (response.error) return response
    if (response.data.error) return response

    const me = await usersRequests.getUserByToken(response.data.data)

    setSession(response.data.data);

    dispatch({
      type: Types.Login,
      payload: {
        user: me.data.data
      }
    });
    return response
  };

  const register = async (email, password, name) => {

    const response = await usersRequests.createUser(name, email, password)
    if (response.error) return response
    if (response.data.error) return response

    const { token, user } = response.data.data

    setSession(token);

    dispatch({
      type: Types.Register,
      payload: {
        user: { id: user.id, name: user.name, email: user.email, permission: user.permission }
      }
    });
    return response
  };

  const logout = () => {
    setSession(null);
    dispatch({
      type: Types.Logout
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {

          const response = await usersRequests.getUserByToken(accessToken) //@ts-ignore
          setSession(accessToken);
          dispatch({
            type: Types.Init,
            payload: {
              user: response.data.data,
              isAuthenticated: true
            }
          });
        } else {
          dispatch({
            type: Types.Init,
            payload: {
              user: null,
              isAuthenticated: false
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Init,
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

  return <AuthContext.Provider value={{
    ...state,
    method: "JWT",
    login,
    logout,
    register
  }}>
    {children}
  </AuthContext.Provider>;
};
export default AuthContext;