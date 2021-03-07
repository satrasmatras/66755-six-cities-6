import {WIDTH_PER_STAR} from "../constants";
import City from "./city";

interface Offer {
  id: number,
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string
  },
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: {
    latitude: number,
    longitude: number,
    zoom: number
  },
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string
}

export const calculateRatingBarWidth = (rating: number): number => {
  return WIDTH_PER_STAR * Math.round(rating);
};

export default Offer;
