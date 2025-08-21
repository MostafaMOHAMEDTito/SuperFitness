import apiClient from "./axios.config";

export const getMuscles = async () => {
  const response = await apiClient.get(`/muscles/random`);
  return response.data;
};
