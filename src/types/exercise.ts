import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  bodyParts: string[];
}

export interface FirebaseExercise extends Omit<Exercise, 'id' | 'bodyParts'> {
  bodyParts: FirebaseFirestoreTypes.DocumentReference[];
}
