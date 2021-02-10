enum Routes {
  MAIN = `/`,
  LOGIN = `/login`,
  FAVORITES = `/favorites`,
  OFFER = `/offer/:id`
}

export const getOfferRoute = (id: number): string => `/offer/${id}`;

export default Routes;
