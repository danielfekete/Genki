import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {BodyPart, FireBaseBodyPart} from '../types/bodyPart';

export default function useGetBodyParts() {
  const ref = firestore().collection<FireBaseBodyPart>('bodyParts');

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]); // Initial empty array of exercises

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const bodyParts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setBodyParts(bodyParts);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  return {loading, bodyParts};
}
