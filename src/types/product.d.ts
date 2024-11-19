export interface IUser {
  firstname: string;
  lastname: string;
  email: String;
  mobile: ttring;
  password: string;
  address: Array;
  cart: Array;
  wishlist: Array;
  isBlocked: boolean;
  refreshToken: String;
  passwordChangedAt: Date;
  passwordResetToken: String;
  passwordResetExpires: Date;
}
