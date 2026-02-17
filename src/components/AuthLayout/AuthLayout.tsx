import { Navigate, Outlet } from "react-router";
import { Spin } from "antd";
import { ROUTES } from "@/constants";
import { useCheckAuthQuery } from "@/api/authApi";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { data, isLoading } = useCheckAuthQuery();

  if (isLoading) {
    return <Spin size="large" fullscreen />;
  }

  if (!data) {
    return <Navigate to={ROUTES.auth()} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
