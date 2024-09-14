import { useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { SideBarLeft } from "../../components/SideBarLeft";
import { SideBarRight } from "../../components/SideBarRight";

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
  }, [isAuthenticated]);

  return (
    <>
      <SideBarLeft />
      {children}
      <SideBarRight />
    </>
  );
};
