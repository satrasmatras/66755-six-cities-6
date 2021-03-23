import Offer from "../models/offer";

export const adaptDataToComment = (data: any): Offer => {

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

export const adaptCommentToData = (comment: any): Offer => {

  return comment;
};
