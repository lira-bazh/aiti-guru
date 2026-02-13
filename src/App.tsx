import { BrowserRouter, Route, Routes } from "react-router";
import { Auth } from "@/pages";
import { AuthLayout } from "@/components";
import { ROUTES } from "@/constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.auth()} element={<Auth />} />

        <Route element={<AuthLayout />}>
          <Route path="/" />
          <Route path={ROUTES.products()} element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
