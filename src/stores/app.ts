import {create} from 'zustand';

interface AppState {
  message: string;
  setMessage: (message: string) => void;
}

const useAppStore = create<AppState>(set => ({
  message: '',
  setMessage: (message: string) => set({message}),
}));

export default useAppStore;
