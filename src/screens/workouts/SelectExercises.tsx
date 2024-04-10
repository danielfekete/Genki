import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import useGetExercises from '../../hooks/useGetExercises';
import MultipleSelect from '../../components/MultipleSelect';
import {WorkoutContext} from './WorkoutsStack';

export default function SelectExercises() {
  const {exercises = []} = useGetExercises();

  const {selectedExercises, setSelectedExercises} = useContext(WorkoutContext);

  return (
    <View>
      <MultipleSelect
        options={exercises}
        onChange={values => {
          setSelectedExercises(values);
        }}
        value={selectedExercises}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
