import {useEffect, useState} from 'react';
import {FirebaseWorkout, Workout} from '../types/workout';
import firestore from '@react-native-firebase/firestore';

export default function useGetWorkouts(queryStr?: string) {
  const ref = firestore().collection<FirebaseWorkout>('workouts');

  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  const [workouts, setWorkouts] = useState<Workout[]>([]); // Initial empty array of exercises

  useEffect(() => {
    // TODO: change order dynamically
    const query = ref.orderBy('name');

    if (queryStr) {
      query.startAt(queryStr).endAt(queryStr + '\uf8ff');
    }

    return query.onSnapshot(querySnapshot => {
      // set the workouts state to the data from the querySnapshot
      setWorkouts(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          exercises: doc.data().exercises.map(({exercise, sets}) => ({
            exerciseId: exercise.id,
            sets,
          })),
          userId: doc.data().user.id,
        })),
      );

      if (loading) {
        setLoading(false);
      }
    });
  }, [queryStr]);

  return {loading, workouts};
}
