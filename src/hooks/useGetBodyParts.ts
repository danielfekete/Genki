import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

interface BodyPart {
  id: string;
  name: string;
}

export default function useGetBodyParts() {
  const ref = firestore().collection<Omit<BodyPart, 'id'>>('bodyParts');

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
