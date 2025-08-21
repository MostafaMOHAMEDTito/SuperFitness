import apiClient from "./axios.config";

export const getExercises = async () => {
  const response = await apiClient.get(`/exercises`);
  return response.data;
};

// Fetch all exercises
export const fetchAllExercises = async (
  page = 1
) => {
  const res = await apiClient.get(`/exercises?page=${page}`);
  return res.data;
};

// Get exercises by primeMoverMuscle & difficulty for details page
export const fetchExercisesByPrimeMover = async (
  primeMoverMuscleId: string,
  difficultyLevelId: string,
  page = 1
) => {
  const res = await apiClient.get(`/exercises/by-muscle-difficulty`, {
    params: { primeMoverMuscleId, difficultyLevelId, page },
  });
  return res.data;
};

// Get exercise by id
export const fetchExerciseById = async (
  id: string
) => {
  const res = await apiClient.get(`/exercises/${id}`);
  return res.data.exercise || null;
};
