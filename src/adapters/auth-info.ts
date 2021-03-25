import AuthInfo from "../models/auth-info";

export const adaptDataToAuthInfo = (data: any): AuthInfo => {

  const authInfo = {
    ...data,
    isPro: data[`is_pro`],
    avatarUrl: data[`avatar_url`]
  };

  delete authInfo[`is_pro`];
  delete authInfo[`avatar_url`];

  return authInfo;
};

