import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListExercises from './ListExercises';
import CreateExercise from './CreateExercise';
import SelectBodyParts from './SelectBodyParts';
import Exercise from './Exercise';

export const ExerciseContext = React.createContext<{
  selectedBodyParts: string[];
  setSelectedBodyParts: (selectedBodyParts: string[]) => void;
}>({
  selectedBodyParts: [],
  setSelectedBodyParts: () => {},
});

export type ExercisesStackParamList = {
  CreateExercise: undefined;
  ListExercises: undefined;
  Exercise: {id: string; name: string};
  SelectBodyParts: undefined;
};

const Stack = createNativeStackNavigator<ExercisesStackParamList>();

export default function ExercisesStack() {
  const [selectedBodyParts, setSelectedBodyParts] = React.useState<string[]>(
    [],
  );

  return (
    <ExerciseContext.Provider value={{selectedBodyParts, setSelectedBodyParts}}>
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
            name="ListExercises"
            component={ListExercises}
            options={{
              title: 'Exercises',
            }}
          />
          <Stack.Screen
            name="CreateExercise"
            component={CreateExercise}
            options={{
              title: 'Create Exercise',
            }}
          />
          <Stack.Screen
            name="Exercise"
            component={Exercise}
            options={({route}) => ({title: route.params.name})}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Body parts',
          }}>
          <Stack.Screen name="SelectBodyParts" component={SelectBodyParts} />
        </Stack.Group>
      </Stack.Navigator>
    </ExerciseContext.Provider>
  );
}
