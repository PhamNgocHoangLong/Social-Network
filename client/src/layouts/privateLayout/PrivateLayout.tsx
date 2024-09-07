import { useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
  }, []);

  return children;
};
