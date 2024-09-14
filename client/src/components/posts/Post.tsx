import { Avatar, Badge, Button, Input } from "@material-tailwind/react";
import { PostType } from "../../types/post.type";
import { usePostStore } from "../../stores/postStore";
import { DefaultSkeleton } from "../skeletons/DefaultSkeleton";
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

interface PostProps {
  posts: PostType[];
}

export const Post = ({ posts }: PostProps) => {
  const { creatingPost, fetchingPosts } = usePostStore();

  if (creatingPost || fetchingPosts) return <DefaultSkeleton />;
  return (
    <>
      {posts?.map((post) => (
        <div key={post._id} className="my-8 md:mx-8">
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
                      {formatDistanceToNow(new Date(post.created_at))}
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
              {post.captions}
            </p>
            <div className="my-4">
              <img
                className="h-64 w-full rounded-lg object-cover object-center"
                src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                alt="nature image"
              />
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
