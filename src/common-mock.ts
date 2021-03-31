import Offer from "./models/offer";
import Comment from "./models/comment";
import City from "./models/city";
import SortType from "./models/sort-type";
import Routes from "./routes";
import {AuthorizationStatus, LoginPayload} from "./store/user/slice";
import AuthInfo from "./models/auth-info";
import {adaptDataToOffer} from "./adapters/offers";
import {adaptDataToComment} from "./adapters/comments";
import {CommentPost} from "./models/comment-post";
import {adaptDataToAuthInfo} from "./adapters/auth-info";
import {RootState} from "./store";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {redirectMiddleware} from "./store/redirect";

export const MOCK_OFFER_FROM_API = {
  "bedrooms": 3,
  "city": {
    "location": {
      "latitude": 52.370216,
      "longitude": 4.895168,
      "zoom": 10
    },
    "name": `Amsterdam`
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  "host": {
    "avatar_url": `img/1.png`,
    "id": 3,
    "is_pro": true,
    "name": `Angelina`
  },
  "id": 1,
  "images": [`img/1.png`, `img/2.png`],
  "is_favorite": false,
  "is_premium": false,
  "location": {
    "latitude": 52.35514938496378,
    "longitude": 4.673877537499948,
    "zoom": 8
  },
  "max_adults": 4,
  "preview_image": `img/1.png`,
  "price": 120,
  "rating": 4.8,
  "title": `Beautiful & luxurious studio at great location`,
  "type": `apartment`
};
export const MOCK_ADAPTED_OFFER: Offer = adaptDataToOffer(MOCK_OFFER_FROM_API);

export const MOCK_OFFERS_FROM_API = [
  MOCK_OFFER_FROM_API,
  MOCK_OFFER_FROM_API,
  MOCK_OFFER_FROM_API,
  MOCK_OFFER_FROM_API
].map((offer, i) => ({
  ...offer,
  id: i + 1
}));

export const MOCK_ADAPTED_OFFERS: Offer[] = MOCK_OFFERS_FROM_API.map(adaptDataToOffer);

export const MOCK_COMMENT_FROM_API = {
  "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "date": `2019-05-08T14:13:56.569Z`,
  "id": 1,
  "rating": 4,
  "user": {
    "avatar_url": `img/1.png`,
    "id": 4,
    "isPro": false,
    "name": `Max`
  }
};

export const MOCK_COMMENTS_FROM_API = [
  MOCK_COMMENT_FROM_API,
  MOCK_COMMENT_FROM_API,
  MOCK_COMMENT_FROM_API,
  MOCK_COMMENT_FROM_API
].map((comment, i) => ({
  ...comment,
  id: i + 1
}));

export const MOCK_ADAPTED_COMMENT: Comment = adaptDataToComment(MOCK_COMMENT_FROM_API);

export const MOCK_ADAPTED_COMMENTS: Comment[] = MOCK_COMMENTS_FROM_API.map(adaptDataToComment);

export const MOCK_CITY: City = {
  "location": {
    "latitude": 52.370216,
    "longitude": 4.895168,
    "zoom": 10
  },
  "name": `Amsterdam`
};

export const MOCK_SORT_TYPE = SortType.TOP_RATED;

export const MOCK_ROUTE = Routes.FAVORITES;

export const MOCK_AUTH_INFO_FROM_API = {
  "avatar_url": `img/1.png`,
  "email": `Oliver.conner@gmail.com`,
  "id": 1,
  "is_pro": false,
  "name": `Oliver.conner`
};

export const MOCK_ADAPTED_AUTH_INFO: AuthInfo = adaptDataToAuthInfo(MOCK_AUTH_INFO_FROM_API);

export const MOCK_AUTHORIZATION_STATUS = AuthorizationStatus.AUTH;

export const MOCK_EMPTY_ACTION = {
  type: `test`,
  payload: 0
};

export const MOCK_LOGIN_PAYLOAD: LoginPayload = {
  email: MOCK_ADAPTED_AUTH_INFO.email,
  password: `12345`
};

export const MOCK_COMMENT_POST: CommentPost = {
  comment: `Lalalalalalallaallaa`,
  rating: 5,
};

export const MOCK_INITIAL_STATE: RootState = {
  offers: {
    offers: MOCK_ADAPTED_OFFERS,
    isLoading: false,
    sortType: MOCK_SORT_TYPE
  },
  city: {
    city: MOCK_CITY
  },
  map: {
    hoveredOffer: MOCK_ADAPTED_OFFER
  },
  user: {
    authorizationStatus: MOCK_AUTHORIZATION_STATUS,
    authInfo: MOCK_ADAPTED_AUTH_INFO
  },
  offer: {
    offer: MOCK_ADAPTED_OFFER,
    offerIsLoading: false,
    comments: MOCK_ADAPTED_COMMENTS,
    commentsAreLoading: false
  },
  favorites: {
    favorites: MOCK_ADAPTED_OFFERS,
    isLoading: false
  }
};

export const MOCK_STORE = configureStore([thunk, redirectMiddleware])(MOCK_INITIAL_STATE);
