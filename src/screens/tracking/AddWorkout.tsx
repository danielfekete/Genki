import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useGetWorkouts from '../../hooks/useGetWorkouts';
import {useForm} from 'react-hook-form';

interface AddWorkoutForm {
  date: string;
  workouts: string[];
}

export default function AddWorkout() {
  const {workouts, loading} = useGetWorkouts();

  useForm<AddWorkoutForm>({
    defaultValues: {},
  });

  return (
    <View>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({});
