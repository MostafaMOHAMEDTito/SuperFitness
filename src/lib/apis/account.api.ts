import apiClient from "./axios.config";

export const changeUserPassword = async (payload: changePasswordFields) => {
  const response = await apiClient.patch("/auth/change-password", {
    password: payload.password,
    newPassword: payload.newPassword,
  });
  return response.data;
};
