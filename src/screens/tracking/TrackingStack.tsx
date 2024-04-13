import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tracking from './Tracking';
import AddWorkout from './AddWorkout';

// Stack param list
export type TrackingStackParamList = {
  Tracking: undefined;
  AddWorkout: undefined;
};

// Create stack
const Stack = createNativeStackNavigator<TrackingStackParamList>();

export default function TrackingStack() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Tracking"
          component={Tracking}
          options={{
            title: 'Tracking',
          }}
        />
        <Stack.Screen
          name="AddWorkout"
          component={AddWorkout}
          options={{
            title: 'Add Workouts',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
