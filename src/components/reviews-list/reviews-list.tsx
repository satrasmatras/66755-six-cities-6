import React, {ReactElement} from 'react';
import Review from "../review";
import Comment from "../../models/comment";

interface ReviewsListProps {
  comments: Comment[],
  count: number,
}

const ReviewsList = ({comments, count}: ReviewsListProps): ReactElement => {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{count}</span></h2>

      <ul className="reviews__list">
        {comments.map((comment, i) => {
          return (
            <Review comment={comment} key={`comment-${i}`} />
          );
        })}
      </ul>
    </>
  );
};

export default ReviewsList;
