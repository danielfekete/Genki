import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListExercises from './ListExercises';
import CreateExercise from './CreateExercise';
import ModalScreen from '../../components/Picker';
import SelectBodyParts from './SelectBodyParts';
import Exercise from './Exercise';
import {Text} from 'react-native';

// export const ExerciseContext = React.createContext<{
//   selectedBodyParts: string[];
//   setSelectedBodyParts: (selectedBodyParts: string[]) => void;
// }>({
//   selectedBodyParts: [],
//   setSelectedBodyParts: () => {},
// });

export type WorkoutsStackParamList = {
  CreateWorkout: undefined;
  ListWorkouts: undefined;
  Workout: {id: string; name: string};
};

const Stack = createNativeStackNavigator<WorkoutsStackParamList>();

export default function ExercisesStack() {
  //   const [selectedBodyParts, setSelectedBodyParts] = React.useState<string[]>(
  //     [],
  //   );

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#fff',
        },
        headerShown: true,
        // headerTitle: ({children}) => {
        //   let text = children;
        //   switch (children) {
        //     case 'ListExercises':
        //       text = 'Exercises';
        //       break;
        //     case 'CreateExercise':
        //       text = 'Create Exercise';
        //       break;
        //     default:
        //       break;
        //   }
        //   return <Text>{text}</Text>;
        // },
      }}>
      <Stack.Group>
        <Stack.Screen
          name="ListWorkouts"
          component={ListExercises}
          options={{
            title: 'Workouts',
          }}
        />
        <Stack.Screen
          name="CreateWorkout"
          component={CreateExercise}
          options={{
            title: 'Create Workout',
          }}
        />
        <Stack.Screen
          name="Workout"
          component={Exercise}
          options={({route}) => ({title: route.params.name})}
        />
      </Stack.Group>
      {/* <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Body parts',
        }}>
        <Stack.Screen name="SelectBodyParts" component={SelectBodyParts} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}
