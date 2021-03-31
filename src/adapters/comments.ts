import Comment from "../models/comment";

export const adaptDataToComment = (data: any): Comment => {

  const comment = {
    ...data,
    user: {
      avatarUrl: data.user[`avatar_url`],
      isPro: data.user[`is_pro`],
    }
  };

  delete comment.user[`avatar_url`];
  delete comment.user[`is_pro`];

  return comment;
};
