import { Avatar, Badge, Button, Input } from "@material-tailwind/react";
import { PostType } from "../../types/post.type";
import { usePostStore } from "../../stores/postStore";
import { formatDistanceToNow } from "date-fns";
import {
  Bookmark,
  CornerUpRight,
  Ellipsis,
  Heart,
  MessageSquare,
  SendHorizonal,
  Smile,
} from "lucide-react";
import { DefaultSkeleton } from "../skeletons/DefaultSkeleton";

interface PostProps {
  posts: PostType[];
}

export const Post = ({ posts }: PostProps) => {
  const { creatingPost } = usePostStore();

  return (
    <>
      {creatingPost && <DefaultSkeleton />}
      {posts?.map((post, index) => (
        <div key={index} className="my-8 md:mx-8">
          <div className="py-4 px-6 border-2 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Badge
                  placement="bottom-end"
                  overlap="circular"
                  color="green"
                  withBorder
                >
                  <Avatar
                    src="/avatar.png"
                    alt="avatar"
                    size="sm"
                    className="p-0.5 border"
                  />
                </Badge>
                <div className="ml-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base text-black font-bold">
                      {post.user?.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {post.created_at &&
                        formatDistanceToNow(new Date(post?.created_at))}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-600 font-semibold">
                      {post.user?.username}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="p-1 rounded-full hover:bg-gray-400 cursor-pointer transition-all ease-in-out">
                <Ellipsis className="size-8 font-bold" />
              </div>
            </div>
            <p className="text-black font-medium text-sm mt-3">
              {post.captions?.split("\n").map((text, index) => (
                <span key={index}>
                  {text}
                  <br />
                </span>
              ))}
            </p>
            <div className="my-4">
              {post.medias?.length === 1 && (
                <img
                  className="h-64 w-full rounded-lg object-cover object-center"
                  src={post.medias[0]?.url}
                  alt="nature image"
                />
              )}
            </div>
            <div className="py-2 border-y-2 flex justify-between items-center px-4">
              <div className="flex items-center gap-4">
                <Heart className="size-7 cursor-pointer transition-all ease-in-out hover:scale-125 hover:text-red-500" />
                <MessageSquare className="size-7 cursor-pointer transition-all ease-in-out hover:scale-125 hover:text-blue-500" />
                <SendHorizonal className="size-7 cursor-pointer transition-all ease-in-out hover:scale-125 hover:text-green-500" />
              </div>
              <div className="flex items-center gap-4">
                <CornerUpRight className="size-7 cursor-pointer transition-all ease-in-out hover:scale-125 hover:text-yellow-500" />
                <Bookmark className="size-7 cursor-pointer transition-all ease-in-out hover:scale-125 hover:text-blue-500" />
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <h3 className="text-black font-bold text-sm cursor-pointer hover:underline">
                {post.likes?.length} likes
              </h3>
              <h3 className="text-black text-sm cursor-pointer hover:underline">
                {post.comments?.length} comments
              </h3>
            </div>
            <div className="flex-1 mt-4">
              <Input
                label="Add a comment"
                icon={<Smile className="cursor-pointer" />}
                crossOrigin={undefined}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
