import apiClient from "../apis/axios.config";

export const logoutAction = async () => {
  const response = await apiClient.get("/auth/logout");
  return response.data;
};
