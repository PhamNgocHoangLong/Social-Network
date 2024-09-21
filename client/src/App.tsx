import { Navigate, Route, Routes } from "react-router-dom";
import { LogInPage } from "./pages/login/LogInPage";
import { HomePage } from "./pages/home/HomePage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { AuthLayout } from "./layouts/authLayout/AuthLayout";
import { Toaster } from "react-hot-toast";
import { PrivateLayout } from "./layouts/privateLayout/PrivateLayout";
import { useAuthStore } from "./stores/authStore";
import { Profiler } from "react";
import { ProfilePage } from "./pages/profile/ProfilePage";

export default function App() {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateLayout>
              <HomePage />
            </PrivateLayout>
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <AuthLayout>
                <LogInPage />
              </AuthLayout>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <AuthLayout>
                <RegisterPage />
              </AuthLayout>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route path="/profile-page" element={
          <PrivateLayout>
          <ProfilePage />
        </PrivateLayout>
        }/>
      </Routes>
      <Toaster />
    </>
  );
}
