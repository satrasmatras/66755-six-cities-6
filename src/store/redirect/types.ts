export const REDIRECT_TO_ROUTE = `redirect/redirectToRoute`;

interface RedirectToRoute {
  type: typeof REDIRECT_TO_ROUTE,
  payload: string
}

export const redirectToRoute = (url: string): RedirectToRoute => ({
  type: REDIRECT_TO_ROUTE,
  payload: url,
});
