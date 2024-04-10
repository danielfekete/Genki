import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListWorkouts from './ListWorkouts';
import CreateWorkout from './CreateWorkout';
import Workout from './Workout';
import SelectExercises from './SelectExercises';

// Create context
export const WorkoutContext = React.createContext<{
  selectedExercises: string[];
  setSelectedExercises: (selectedExercises: string[]) => void;
}>({
  selectedExercises: [],
  setSelectedExercises: () => {},
});

// Stack param list
export type WorkoutsStackParamList = {
  CreateWorkout: undefined;
  ListWorkouts: undefined;
  Workout: {id: string; name: string};
  SelectExercises: undefined;
};

// Create stack
const Stack = createNativeStackNavigator<WorkoutsStackParamList>();

export default function WorkoutsStack() {
  const [selectedExercises, setSelectedExercises] = React.useState<string[]>(
    [],
  );

  return (
    <WorkoutContext.Provider value={{selectedExercises, setSelectedExercises}}>
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
            component={ListWorkouts}
            options={{
              title: 'Workouts',
            }}
          />
          <Stack.Screen
            name="CreateWorkout"
            component={CreateWorkout}
            options={{
              title: 'Create Workout',
            }}
          />
          <Stack.Screen
            name="Workout"
            component={Workout}
            options={({route}) => ({title: route.params.name})}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Exercises',
          }}>
          <Stack.Screen name="SelectExercises" component={SelectExercises} />
        </Stack.Group>
      </Stack.Navigator>
    </WorkoutContext.Provider>
  );
}
