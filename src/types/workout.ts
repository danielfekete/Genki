import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface Set {
  reps: number;
  weight: number;
  time: string;
}

export interface Workout {
  id: string;
  name: string;
  exercises: {
    exerciseId: string;
    sets: Set[];
  }[];
  userId: string;
}

export interface FirebaseWorkout
  extends Omit<Workout, 'id' | 'exercises' | 'userId'> {
  exercises: {
    exercise: FirebaseFirestoreTypes.DocumentReference;
    sets: Set[];
  }[];
  user: FirebaseFirestoreTypes.DocumentReference;
}

export interface WorkoutForm {
  name: string;
  exercises: {
    exerciseId: string;
    sets: {
      reps?: string;
      weight?: string;
      time?: string;
    }[];
  }[];
}
