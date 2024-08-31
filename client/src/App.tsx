import { Route, Routes } from "react-router-dom";
import { LogInPage } from "./pages/login/LogInPage";
import { HomePage } from "./pages/home/HomePage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { AuthLayout } from "./layouts/authLayout/AuthLayout";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LogInPage />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          }
        />
      </Routes>
    </>
  );
}
