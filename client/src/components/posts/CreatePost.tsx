import { Avatar, Button } from "@material-tailwind/react";
import { Hash, ImagePlay, Images, Logs } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePostStore } from "../../stores/postStore";
import { useAuthStore } from "../../stores/authStore";
import axios from "axios";

interface CreatePostProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({
  isOpen,
  setIsOpen,
}: CreatePostProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const { createPost, fetchPosts } = usePostStore();
  const { accessToken } = useAuthStore();

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append("image", file as Blob);
    const res = await axios.post(
      "http://localhost:4000/medias/upload-image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    await createPost(accessToken, {
      captions: value,
      medias: res.data.result,
    });

    await fetchPosts(accessToken);
  };

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
    }
  };

  const handleFileUploadClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <>
      <div
        className="fixed top-0 right-0 left-0 bottom-0 bg-black/30 z-40"
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-2xl w-full">
        <h1 className="text-lg text-white font-bold text-center">New Post</h1>
        <div className="bg-white rounded-lg p-6 z-30 mt-4">
          <div className="flex gap-4">
            <div>
              <div className="p-1 rounded-full border cursor-pointer mt-2">
                <Avatar alt="Remy Sharp" src="/avatar.png" />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <h3 className="text-base font-semibold">username</h3>
              <textarea
                rows={1}
                className="flex-1 focus:outline-none resize-none"
                placeholder="Bắt đầu nào..."
                onChange={(e) => setValue(e.target.value)}
                ref={textAreaRef}
              ></textarea>
              {file && (
                <img
                  className="h-48 mx-4 my-2 rounded-lg border border-gray-400 shadow-md object-cover object-center"
                  src={URL.createObjectURL(file)}
                  alt="nature image"
                />
              )}
              <div className="flex items-center gap-4">
                <div
                  className="p-1 rounded-full transition delay-150 ease-in-out hover:bg-gray-300"
                  onClick={handleFileUploadClick}
                >
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Images className="size-5 cursor-pointer text-gray-500" />
                </div>
                <div className="p-1 rounded-full transition delay-150 ease-in-out hover:bg-gray-300">
                  <ImagePlay className="size-5 cursor-pointer text-gray-500" />
                </div>
                <div className="p-1 rounded-full transition delay-150 ease-in-out hover:bg-gray-300">
                  <Hash className="size-5 cursor-pointer text-gray-500" />
                </div>
                <div className="p-1 rounded-full transition delay-150 ease-in-out hover:bg-gray-300">
                  <Logs className="size-5 cursor-pointer text-gray-500" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <p className="flex-1 text-sm text-gray-500 cursor-pointer">
              Bất kỳ ai cũng có thể trả lời và trích dẫn
            </p>
            <Button
              variant="outlined"
              size="sm"
              className={`opacity-50 ${
                value === "" ? "cursor-not-allowed" : ""
              }`}
              disabled={value === "" ? true : false}
              onClick={() => {
                handleCreatePost();
                setIsOpen(!isOpen);
              }}
            >
              Đăng
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
