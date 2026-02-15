import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { Spin } from "antd";
import { checkAuth } from "@/api";
import { ROUTES } from "@/constants";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth()
      .then((user) => {
        setIsAuthenticated(!!user);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Spin size="large" fullscreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.auth()} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
