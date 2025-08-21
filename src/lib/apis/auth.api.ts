import apiClient from "./axios.config";

export async function register(signupData: SignupData) {
  try {
    const response = await apiClient.post("/auth/signup", signupData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}

export async function login(loginData: SigninData) {
  try {
    const response = await apiClient.post("/auth/signin", loginData);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export const getLoggedUserData = async () => {
  const response = await apiClient.get(`/auth/profile-data`);
  return response.data;
};

// Forget Password
export async function forgetPassword(data: ForgetPasswordData) {
  try {
    const response = await apiClient.post("/auth/forgotPassword", data);
    return response.data;
  } catch (error) {
    console.error("Forget password failed:", error);
    throw error;
  }
}

// Verify Reset Code
export async function verifyResetCode(data: VerifyResetData) {
  try {
    const response = await apiClient.post("/auth/verifyResetCode", data);
    return response.data;
  } catch (error) {
    console.error("Verify reset code failed:", error);
    throw error;
  }
}

// Reset Password
export async function resetPassword(data: ResetPasswordData) {
  try {
    const response = await apiClient.post("/auth/resetPassword", data);
    return response.data;
  } catch (error) {
    console.error("Reset password failed:", error);
    throw error;
  }
}