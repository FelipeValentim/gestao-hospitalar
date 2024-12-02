import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RootState from "../interfaces/RootState";

interface RouteProps {
  children: ReactNode;
  roles?: string[];
}

export const ProtectedRoute: FC<RouteProps> = ({ children, roles }) => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const user = useSelector((state: RootState) => state.user);
  React.useEffect(() => {
    if (user !== null) {
      const userRoles = user.roles;
      if (roles) {
        setAuthenticated(roles.some((role) => userRoles.includes(role)));
      } else {
        setAuthenticated(true);
      }
    } else {
      setAuthenticated(false);
    }

    setLoading(false);
  }, [user, roles]);

  if (loading) {
    return <div className="loading"></div>;
  }

  return authenticated ? children : <Navigate to="/user/login" />;
};

export const UnprotectedRoute: FC<RouteProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const user = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    setAuthenticated(user !== null);

    setLoading(false);
  }, [user]);

  if (loading) {
    return <div className="loading" />;
  }
  return !authenticated ? children : <Navigate to="/" />;
};
