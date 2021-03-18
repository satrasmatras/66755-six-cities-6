import Offer from "../models/offer";

export const getOfferById = (id: number): Offer => {
  return [].find((offer) => offer.id === id);
};

export const adaptOfferFromServer = (offer: any): Offer => {

  const {
    // eslint-disable-next-line camelcase
    preview_image,
    // eslint-disable-next-line camelcase
    is_favorite,
    // eslint-disable-next-line camelcase
    is_premium,
    // eslint-disable-next-line camelcase
    max_adults,
    host
  } = offer;

  const {
    // eslint-disable-next-line camelcase
    is_pro,
    // eslint-disable-next-line camelcase
    avatar_url,
  } = host;

  const newHost = {
    ...host,
    // eslint-disable-next-line camelcase
    isPro: is_pro,
    // eslint-disable-next-line camelcase
    avatarUrl: avatar_url,
  };

  delete newHost.is_pro;
  delete newHost.avatar_url;

  delete offer.preview_image;
  delete offer.is_favorite;
  delete offer.is_premium;
  delete offer.host;
  delete offer.max_adults;

  return {
    ...offer,
    // eslint-disable-next-line camelcase
    previewImage: preview_image,
    // eslint-disable-next-line camelcase
    isFavorite: is_favorite,
    // eslint-disable-next-line camelcase
    isPremium: is_premium,
    // eslint-disable-next-line camelcase
    maxAdults: max_adults,
    host: newHost
  };
};
