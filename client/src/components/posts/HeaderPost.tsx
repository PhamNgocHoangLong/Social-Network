import { Avatar, Button } from "@material-tailwind/react";
import { useState } from "react";
import { CreatePost } from "./CreatePost";

export const HeaderPost = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mt-8 md:mx-8">
        <div className="py-3 px-6 border-2 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <Avatar
              src="/avatar.png"
              alt="avatar"
              size="sm"
              className="p-0.5 border"
            />
            <div
              className="flex flex-1 items-center"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <p className="flex-1">Bắt đầu nào...</p>
              <Button variant="outlined" size="sm">
                Đăng
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && <CreatePost isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};
