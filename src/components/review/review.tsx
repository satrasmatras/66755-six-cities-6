import React, {ReactElement} from 'react';
import {calculateRatingBarWidth} from "../../models/offer";
import {formatDateToHuman, formatDateToMachine} from "../../utils";
import Comment from "../../models/comment";

interface ReviewProps {
  comment: Comment,
}

const Review = ({comment}: ReviewProps): ReactElement => {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className={`reviews__avatar-wrapper ${comment.user.isPro ? `reviews__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
          <img
            className="reviews__avatar user__avatar"
            src={comment.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${calculateRatingBarWidth(comment.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment.comment}</p>
        <time className="reviews__time" dateTime={formatDateToMachine(new Date(comment.date))}>
          {formatDateToHuman(new Date(comment.date))}
        </time>
      </div>
    </li>
  );
};

export default Review;
