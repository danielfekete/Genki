import firestore from '@react-native-firebase/firestore';
import {Exercise, FirebaseExercise} from '../types/exercise';
import {useEffect, useState} from 'react';

export default function useGetExercises(queryStr?: string) {
  const ref = firestore().collection<FirebaseExercise>('exercises');

  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  const [exercises, setExercises] = useState<Exercise[]>([]); // Initial empty array of exercises

  useEffect(() => {
    const query = ref.orderBy('name');

    if (queryStr) {
      query.startAt(queryStr).endAt(queryStr + '\uf8ff');
    }

    return query.onSnapshot(querySnapshot => {
      setExercises(
        querySnapshot.docs.map(doc => ({
          bodyParts: doc.data().bodyParts.map(item => item.id),
          name: doc.data().name,
          description: doc.data().description,
          id: doc.id,
        })),
      );
      if (loading) {
        setLoading(false);
      }
    });
  }, [queryStr]);

  return {loading, exercises};
}
