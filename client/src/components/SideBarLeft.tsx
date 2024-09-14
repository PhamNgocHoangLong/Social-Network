import { Link, NavLink } from "react-router-dom";
import {
  House,
  LogOut,
  MessageCircle,
  Settings,
  UserRoundPen,
  Users,
} from "lucide-react";
import { Button } from "@material-tailwind/react";
import { useAuthStore } from "../stores/authStore";

export const SideBarLeft = () => {
  const { accessToken, refreshToken, logout } = useAuthStore();
  const handleLogout = async () => {
    await logout(refreshToken, accessToken);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm md:hidden block py-1 px-4 z-10">
        <div className="flex justify-between items-center">
          <div></div>
          <Link to={"/"}>
            <img src="/logo.png" alt="" className="cursor-pointer w-16" />
          </Link>
          <Button variant="text" className="px-2 py-1" onClick={handleLogout}>
            <LogOut className="size-8" />
          </Button>
        </div>
      </div>
      <div className="fixed md:top-0 right-0 left-0 bottom-0 md:w-16 border-t md:border-r md:py-4 shadow-sm bg-white z-10">
        <div className="flex md:flex-col md:justify-between md:h-full items-center">
          <Link to={"/"} className="md:block hidden">
            <img src="/logo.png" alt="" className="cursor-pointer" />
          </Link>
          <div className="flex flex-1 justify-between md:justify-center md:flex-col items-center md:gap-8">
            <NavLink to="/">
              {({ isActive }) =>
                isActive ? (
                  <div className="px-8 py-4 md:px-2 md:py-1 rounded-xl transition-all ease-in-out hover:bg-gray-300">
                    <House className="size-8" />
                  </div>
                ) : (
                  <div className="px-8 py-4 md:px-2 md:py-1 rounded-xl transition-all ease-in-out hover:bg-gray-300">
                    <House className="text-gray-500 size-8" />
                  </div>
                )
              }
            </NavLink>
            <NavLink to="/">
              {({ isActive }) =>
                isActive ? (
                  <div className="px-8 py-4 md:px-2 md:py-1 rounded-xl transition-all ease-in-out hover:bg-gray-300">
                    <MessageCircle className="size-8" />
                  </div>
                ) : (
                  <div className="px-8 py-4 md:px-2 md:py-1 rounded-xl transition-all ease-in-out hover:bg-gray-300">
                    <MessageCircle className="text-gray-500 size-8" />
                  </div>
                )
              }
            </NavLink>
            <NavLink to="/">
              {({ isActive }) =>
                isActive ? (
                  <div className="px-8 py-4 md:px-2 md:py-1 rounded-xl transition-all ease-in-out hover:bg-gray-300">
                    <Users className="size-8" />
                  </div>
                ) : (
                  <div className="px-8 py-4 md:px-2 md:py-1 rounded-xl transition-all ease-in-out hover:bg-gray-300">
                    <Users className="size-8 text-gray-500 " />
                  </div>
                )
              }
            </NavLink>
            <NavLink to="/">
              {({ isActive }) =>
                isActive ? (
                  <div className="px-8 py-4 md:px-2 md:py-1 rounded-xl transition-all ease-in-out hover:bg-gray-300">
                    <Settings className="size-8" />
                  </div>
                ) : (
                  <div className="px-8 py-4 md:px-2 md:py-1 rounded-xl transition-all ease-in-out hover:bg-gray-300">
                    <Settings className="size-8 text-gray-500" />
                  </div>
                )
              }
            </NavLink>
            <NavLink to="/">
              {({ isActive }) =>
                isActive ? (
                  <div className="px-8 py-4 md:px-2 md:py-1 rounded-xl transition-all ease-in-out hover:bg-gray-300">
                    <UserRoundPen className="size-8 " />
                  </div>
                ) : (
                  <div className="px-8 py-4 md:px-2 md:py-1 rounded-xl transition-all ease-in-out hover:bg-gray-300">
                    <UserRoundPen className="size-8 text-gray-500" />
                  </div>
                )
              }
            </NavLink>
          </div>
          <Button
            variant="text"
            className="px-2 py-1 md:block hidden"
            onClick={handleLogout}
          >
            <LogOut className="size-8 " />
          </Button>
        </div>
      </div>
    </>
  );
};
