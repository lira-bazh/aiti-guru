import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthPage, ProductsPage } from "@/pages";
import { AuthLayout } from "@/components";
import { ROUTES } from "@/constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.auth()} element={<AuthPage />} />

        <Route element={<AuthLayout />}>
          <Route index element={<Navigate to={ROUTES.products()} replace />} />
          <Route path={ROUTES.products()} element={<ProductsPage />} />
        </Route>

        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
