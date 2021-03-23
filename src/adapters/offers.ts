import Offer from "../models/offer";

export const adaptDataToOffer = (data: any): Offer => {

  const offer = {
    ...data,
    previewImage: data[`preview_image`],
    isFavorite: data[`is_favorite`],
    isPremium: data[`is_premium`],
    maxAdults: data[`max_adults`],
    host: {
      ...data.host,
      isPro: data.host[`is_pro`],
      avatarUrl: data.host[`avatar_url`],
    }
  };

  delete offer[`preview_image`];
  delete offer[`is_favorite`];
  delete offer[`is_premium`];
  delete offer[`max_adults`];
  delete offer.host[`is_pro`];
  delete offer.host[`avatar_url`];

  return offer;
};

export const adaptOfferToData = (offer: any): Offer => {

  const data = {
    ...offer,
    previewImage: offer[`preview_image`],
    isFavorite: offer[`is_favorite`],
    isPremium: offer[`is_premium`],
    maxAdults: offer[`max_adults`],
    host: {
      ...offer.host,
      isPro: offer.host[`is_pro`],
      avatarUrl: offer.host[`avatar_url`],
    }
  };

  delete data[`preview_image`];
  delete data[`is_favorite`];
  delete data[`is_premium`];
  delete data[`max_adults`];
  delete data.host[`is_pro`];
  delete data.host[`avatar_url`];

  return data;
};
