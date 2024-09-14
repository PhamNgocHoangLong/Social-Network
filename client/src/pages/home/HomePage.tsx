import { useAuthStore } from "../../stores/authStore";
import { Post } from "../../components/posts/Post";
import { HeaderPost } from "../../components/posts/HeaderPost";
import { useEffect, useState } from "react";
import { PostType } from "../../types/post.type";
import { usePostStore } from "../../stores/postStore";
import { DefaultSkeleton } from "../../components/skeletons/DefaultSkeleton";

export const HomePage = () => {
  const { accessToken } = useAuthStore();
  const { fetchPosts, fetchingPosts, posts } = usePostStore();

  const [listPost, setListPost] = useState<PostType[]>([]);

  useEffect(() => {
    fetchPosts(accessToken);
  }, []);

  useEffect(() => {
    setListPost(posts);
  }, [posts]);

  return (
    <div className="max-w-2xl mx-8 md:mx-auto">
      <HeaderPost />
      {fetchingPosts && <DefaultSkeleton />}
      <Post posts={listPost} />
    </div>
  );
};
