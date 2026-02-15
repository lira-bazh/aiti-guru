import { BrowserRouter, Route, Routes } from "react-router";
import { Auth, Products } from "@/pages";
import { AuthLayout } from "@/components";
import { ROUTES } from "@/constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.auth()} element={<Auth />} />

        <Route element={<AuthLayout />}>
          <Route path={ROUTES.products()} element={<Products />} />
        </Route>

        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
