import useAuth from "hooks/useAuth";
import Login from "pages/authentication/Login";
import React, { Fragment, useState } from "react";
import { Navigate, useLocation } from "react-router-dom"; // component props interface
import { verifyPermission, routes } from 'lib/backofficeRoutes'
import jwtDecode from "jwt-decode";
import * as usersRequests from 'lib/requests/usersRequests'

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <Login />;
  }

  const checkURLPermission = (url, permission) => {
    let permissionValid = false

    routes.filter(u => u.path === url)
      .map((value) => {
        if (verifyPermission(permission, value.permissions)) {
          permissionValid = true
        }
      })

    return permissionValid
  }

  usersRequests.tokenPermission()
    .then(response => {
      console.log(response.data.data)
      if (!checkURLPermission(pathname, response.data.data)) {
        return <Navigate to={'/'} />;
      }
    })
    .catch(error => {
      console.error(error)
      return <Navigate to={'/'} />;
    })




  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;