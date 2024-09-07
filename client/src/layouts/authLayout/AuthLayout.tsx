import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useEffect } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useAuthStore();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     return navigate("/");
  //   }
  // }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
        {children}
      </div>
    </div>
  );
};
