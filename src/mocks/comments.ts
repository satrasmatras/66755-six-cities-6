import Comment from "../models/comment";

const COMMENTS: Comment[] = [
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: `2019-05-08T14:13:56.569Z`,
    id: 1,
    rating: 4,
    user: {
      avatarUrl: `img/1.png`,
      id: 4,
      isPro: false,
      name: `Max`
    }
  },
  {
    comment: `Good place`,
    date: `2015-01-01T14:13:56.569Z`,
    id: 2,
    rating: 2,
    user: {
      avatarUrl: `img/1.png`,
      id: 4,
      isPro: true,
      name: `Denis`
    }
  }
];

export default COMMENTS;
