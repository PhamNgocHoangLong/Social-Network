export type PostType = {
  _id: string;
  user_id: string;
  captions: string;
  hashtags: any[];
  medias: MediaType[];
  mentions: any[];
  comments: any[];
  created_at: string;
  updated_at: string;
  user: {
    _id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
  };
  bookmarks: any[];
  likes: any[];
};

export type MediaType = {
  url: string;
  type: Media;
};

export enum Media {
  Image,
  Video,
}

export interface CreatePostBodyReq {
  captions?: string;
  hashtags?: string[];
  medias: MediaType[];
  mentions?: string[];
}
