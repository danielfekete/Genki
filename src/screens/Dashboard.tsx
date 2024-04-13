import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Workouts from './Workouts';
import Profile from './Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExercisesStack from './exercises/ExercisesStack';
import WorkoutsStack from './workouts/WorkoutsStack';
import Placeholder from './Placeholder';

import CircleBorder from '../components/CircleBorder';
import Tracking from './tracking/Tracking';

export type TabParamList = {
  Profile: undefined;
  Workouts: undefined;
  Exercises: undefined;
  Placeholder: undefined;
  Tracking: undefined;
};

// Bottom tab navigator for the dashboard
const Tab = createBottomTabNavigator<TabParamList>();

export default function Dashboard() {
  return (
    <Tab.Navigator
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          const name = route.name;

          if (name === 'Tracking') {
            // return <Text style={{color: 'red'}}>G</Text>;
            // return <Ionicons name="ios-pulse" size={size} color={color} />;
            return (
              <CircleBorder borderColor="#0ea5e9" borderWidth={2} size={60}>
                <Text
                  style={{
                    color: '#0ea5e9',
                    fontSize: 30,
                    fontFamily: 'MPLUSRounded1c-Bold',
                  }}>
                  G
                </Text>
              </CircleBorder>
            );
          }
        },
      })}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerShown: true,
        }}
      />
      <Tab.Screen name="Placeholder" component={Placeholder} />
      <Tab.Screen
        name="Tracking"
        component={Tracking}
        options={{
          tabBarLabelStyle: {
            display: 'none',
          },
          headerShown: true,
        }}
      />
      <Tab.Screen name="Workouts" component={WorkoutsStack} />
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
