interface User {
  email: string,
  password: string
}

interface AuthInfo {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string
}

export default User;
