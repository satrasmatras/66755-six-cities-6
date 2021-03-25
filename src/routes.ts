enum Routes {
  MAIN = `/`,
  LOGIN = `/login`,
  FAVORITES = `/favorites`,
  OFFER = `/offer/:id`,
  NOT_FOUND = `/not-found`,
}

export const getOfferRoute = (id: number): string => `/offer/${id}`;

export default Routes;
