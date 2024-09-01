import { Navigate, Route, Routes } from "react-router-dom";
import { LogInPage } from "./pages/login/LogInPage";
import { HomePage } from "./pages/home/HomePage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { AuthLayout } from "./layouts/authLayout/AuthLayout";
import { useAuthStore } from "./stores/authStore";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { user }: any = useAuthStore();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <AuthLayout>
                <LogInPage />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <AuthLayout>
                <RegisterPage />
              </AuthLayout>
            )
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}
