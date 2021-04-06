import React, {ReactElement, Fragment, SyntheticEvent, useState, useRef, useEffect} from 'react';
import {CommentPost} from "../../models/comment-post";
import {postComment, selectCommentsError} from "../../store/offer/offer";
import {useDispatch, useSelector} from "react-redux";

interface RatingItem {
  title: string,
  value: number
}

const RATING_ITEMS: RatingItem[] = [
  {
    value: 5,
    title: `perfect`,
  },
  {
    value: 4,
    title: `good`,
  },
  {
    value: 3,
    title: `not bad`,
  },
  {
    value: 2,
    title: `badly`,
  },
  {
    value: 1,
    title: `terribly`,
  },
];

const INITIAL_DATA: CommentPost = {
  rating: 5,
  comment: ``
};

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

interface CreateCommentFormProps {
  offerId: number,
}

const CreateCommentForm = ({offerId}: CreateCommentFormProps): ReactElement => {
  const [data, setData] = useState<CommentPost>(INITIAL_DATA);
  const [valid, setValid] = useState<boolean>(false);
  const formRef = useRef(null);
  const commentsError = useSelector(selectCommentsError);

  const dispatch = useDispatch();

  const handleChange = (event: SyntheticEvent) => {
    const {name, value} = event.target as HTMLInputElement;
    setData({...data, [name]: value});
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(postComment(data, offerId));
    formRef.current.reset();
    setData(INITIAL_DATA);
  };

  useEffect(() => {
    const valid = data.comment.length >= MIN_REVIEW_LENGTH
      && data.comment.length <= MAX_REVIEW_LENGTH;
    setValid(valid);
  }, [data]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          RATING_ITEMS.map((ratingItem) => {
            const {title, value} = ratingItem;
            return (
              <Fragment key={`fragment-${value}`}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={value}
                  id={`${value}-stars`}
                  type="radio"
                  defaultChecked={data.rating === value}
                />
                <label
                  id={`label-${value}-stars`}
                  htmlFor={`${value}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title={title}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </Fragment>
            );
          })
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!valid}
        >
          Submit
        </button>
      </div>
      {
        commentsError && (
          <strong>{commentsError}</strong>
        )
      }
    </form>
  );
};

export default CreateCommentForm;
