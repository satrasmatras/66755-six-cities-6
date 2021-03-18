import {AxiosInstance} from "axios";
import {setIsLoading, updateOffers} from "./actions";
import {RootState} from "../index";
import {Action} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {adaptOfferFromServer} from "../../services/offers";

enum ApiRoutes {
  FETCH_OFFERS = `hotels`,
}

export const fetchOffers = () => (next: ThunkDispatch<undefined, undefined, Action>, _: RootState, api: AxiosInstance): void => {
  next(setIsLoading(true));
  api.get(ApiRoutes.FETCH_OFFERS)
    .then(({data}) => {
      next(updateOffers(data.map(adaptOfferFromServer)));
      next(setIsLoading(false));
    });
};
