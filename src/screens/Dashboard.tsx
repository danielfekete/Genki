import {StyleSheet} from 'react-native';
import React from 'react';
import Workouts from './Workouts';
import Profile from './Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExercisesStack from './exercises/ExercisesStack';

export type TabParamList = {
  Profile: undefined;
  Workouts: undefined;
  Exercises: undefined;
};

// Bottom tab navigator for the dashboard
const Tab = createBottomTabNavigator<TabParamList>();

export default function Dashboard() {
  return (
    <Tab.Navigator
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Workouts" component={Workouts} />
      <Tab.Screen name="Exercises" component={ExercisesStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: '#fff',
    padding: 20,
  },
});
