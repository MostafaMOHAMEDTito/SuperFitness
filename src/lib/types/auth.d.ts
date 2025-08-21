type Gender = "male" | "female";

type ActivityLevel =
  | "Rookie"
  | "Beginner"
  | "Intermediate"
  | "Advance"
  | "True Beast";

type Goal =
  | "Gain weight"
  | "Lose weight"
  | "Get fitter"
  | "Gain more flexible"
  | "Learn the basic";

declare type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  gender: Gender;
  height: number;
  weight: number;
  age: number;
  goal: string;
  activityLevel: string;
};

declare type SigninData = {
  email: string;
  password: string;
};

declare type ForgetPasswordData = {
  email: string;
};

declare type VerifyResetData = {
  resetCode: string;
};

declare type ResetPasswordData = {
  email: string;
  newPassword: string;
};
