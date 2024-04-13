import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Calendar from '../../components/Calendar';
import PressableAddButton from '../../components/PressableAddButton';
import {startOfDay} from 'date-fns';

export default function Tracking() {
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2}}>
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      </View>
      <View style={{flex: 8}}>
        <Text>No workouts added for this day yet.</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <PressableAddButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
