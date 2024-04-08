import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {create} from 'zustand';

interface AppState {
  message: string;
  setMessage: (message: string) => void;
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
}

const useAppStore = create<AppState>(set => ({
  message: '',
  setMessage: message => set({message}),
  user: null,
  setUser: user => set({user}),
}));

export default useAppStore;
