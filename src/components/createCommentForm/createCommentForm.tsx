import React, {ReactElement, SyntheticEvent, useState} from 'react';

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

const INITIAL_DATA = {
  rating: 5,
  review: ``
};

const MIN_REVIEW_LENGTH = 50;

const CreateCommentForm = (): ReactElement => {
  const [data, setData] = useState(INITIAL_DATA);

  const handleChange = (event: SyntheticEvent) => {
    const {name, value} = event.target as HTMLInputElement;
    setData({...data, [name]: value});
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          RATING_ITEMS.map((ratingItem) => {
            const {title, value} = ratingItem;
            return (
              <>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={value}
                  id={`${value}-stars`}
                  type="radio"
                  checked={data.rating === value}
                />
                <label
                  htmlFor={`${value}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title={title}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </>
            );
          })
        }
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={data.review.length < MIN_REVIEW_LENGTH}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateCommentForm;
