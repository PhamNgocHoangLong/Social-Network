import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

export const HomePage = () => {
  const { logout, accessToken, refreshToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(refreshToken, accessToken);
    navigate("/login");
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
