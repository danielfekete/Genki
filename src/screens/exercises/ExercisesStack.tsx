import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListExercises from './ListExercises';
import CreateExercise from './CreateExercise';

export type ExercisesStackParamList = {
  CreateExercise: undefined;
  ListExercises: undefined;
};

const Stack = createNativeStackNavigator<ExercisesStackParamList>();

export default function ExercisesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#fff',
        },
        headerShown: false,
      }}>
      <Stack.Screen name="ListExercises" component={ListExercises} />
      <Stack.Screen name="CreateExercise" component={CreateExercise} />
    </Stack.Navigator>
  );
}
