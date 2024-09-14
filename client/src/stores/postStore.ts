import { create } from "zustand";
import axios from "axios";
import { CreatePostBodyReq, PostType } from "../types/post.type";

interface PostStore {
  posts: PostType[];
  fetchingPosts: boolean;
  creatingPost: boolean;
  fetchPosts: (access_token: string) => Promise<void>;
  createPost: (access_token: string, post: CreatePostBodyReq) => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  fetchingPosts: false,
  creatingPost: false,
  fetchPosts: async (access_token: string) => {
    try {
      set({ fetchingPosts: true });
      const res = await axios.get("http://localhost:4000/posts/new-feeds", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          page: 1,
          limit: 10,
        },
      });

      set({ posts: res.data.result, fetchingPosts: false });
    } catch (error) {
      console.log(error);
      set({ posts: [], fetchingPosts: false });
    }
  },
  createPost: async (access_token: string, post: CreatePostBodyReq) => {
    try {
      set({ creatingPost: true });
      const res = await axios.post("http://localhost:4000/posts", post, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      set((state) => ({ posts: [res.data.result, ...state.posts] }));
      set({ creatingPost: false });
    } catch (error) {
      console.log(error);
      set({ creatingPost: false });
    }
  },
}));
