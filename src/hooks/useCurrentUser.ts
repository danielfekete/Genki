import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';

export default function useCurrentUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return user;
}
