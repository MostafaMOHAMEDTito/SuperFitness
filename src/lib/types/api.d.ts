declare type DataBase = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

declare type Metadata = {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};

declare type ErrorResponse = {
  error: string;
};

declare type SuccessfulResponse<T> = {
  message: string;
} & T;

declare type PaginatedResponse<T> = {
  metadata: Metadata;
} & T;

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

declare interface User extends DatabaseFields {
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  age: number;
  height: number;
  weight: number;
  activityLevel: string;
  goal: string;
  photo: string;
}

declare type authResponse = {
  message: string;
  user: User;
  token: string;
};
