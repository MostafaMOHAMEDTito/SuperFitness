export interface Muscle {
  _id: string;
  name: string;
  image: string ;
}

export interface MusclesResponse {
  message: string;
  totalMuscles: number;
  muscles: Muscle[];
}
