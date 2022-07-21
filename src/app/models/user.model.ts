export class User {
  constructor(
    public id: number,
    public email: string,
    public firstNname: string,
    public lastName: string,
    public avatar: string
  ) {}
}

export interface UserBackend {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export const userAdapter = (user: UserBackend): User => {
  return new User(
    user.id,
    user.email,
    user.first_name,
    user.last_name,
    user.avatar
  );
};
