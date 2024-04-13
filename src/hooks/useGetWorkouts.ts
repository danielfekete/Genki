export default function useGetWorkouts() {
  const ref = firestore().collection<Omit<BodyPart, 'id'>>('workouts');
}
