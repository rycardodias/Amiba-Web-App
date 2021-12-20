import React, { Fragment } from "react"; // component props interface

const GuestGuard = ({
  children
}) => {
  //// UNCOMMNET BELOW CODE IF YOU WANT TO HIDE AUTH PAGES TO AUTHENTICATED USERS
  //   const { isAuthenticated } = useAuth();
  //   if (isAuthenticated) {
  //     return <Navigate to="/dashboard" />;
  //   }
  return <Fragment>{children}</Fragment>;
};

export default GuestGuard;