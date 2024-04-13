import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Calendar from '../../components/Calendar';
import PressableAddButton from '../../components/PressableAddButton';

export default function Tracking() {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2}}>
        <Calendar />
      </View>
      <View style={{flex: 8}}>
        <Text>No workouts added yet for this day.</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <PressableAddButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
