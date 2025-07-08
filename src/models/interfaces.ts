export interface User {
  _id?: string;
  fullName: string;
  dob: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OtpRecord {
  otp: string;
  expiresAt: Date;
  type: "signup" | "signin";
  userData?: Partial<User>;
}

export interface JwtPayload {
  email: string;
  fullName: string;
  iat?: number;
  exp?: number;
}
