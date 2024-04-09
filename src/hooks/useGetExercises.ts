import firestore from '@react-native-firebase/firestore';
import {Exercise, FirebaseExercise} from '../types/exercise';
import {useEffect, useState} from 'react';

export default function useGetExercises() {
  const ref = firestore().collection<FirebaseExercise>('exercises');

  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  const [exercises, setExercises] = useState<Exercise[]>([]); // Initial empty array of exercises

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const exercises = querySnapshot.docs.map(doc => ({
        bodyParts: doc.data().bodyParts.map(item => item.id),
        name: doc.data().name,
        description: doc.data().description,
        id: doc.id,
      }));

      setExercises(exercises);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  return {loading, exercises};
}
