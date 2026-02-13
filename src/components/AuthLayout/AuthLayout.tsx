import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { Spin } from "antd";
import { checkAuth } from "@/api";
import { ROUTES } from "@/constants";

export function AuthLayout() {
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

  return isAuthenticated ? (
    <Navigate to={ROUTES.products()} />
  ) : (
    <Navigate to={ROUTES.auth()} />
  );
}
