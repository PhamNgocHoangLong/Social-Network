import { useAuthStore } from "../../stores/authStore";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (accessToken && refreshToken) {
    useAuthStore.setState({ isAuthenticated: true, accessToken, refreshToken });
  }
  return children;
};
