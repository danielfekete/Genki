import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {WorkoutForm} from '../types/workout';
import Input from './Input';
import PressableButton from './PressableButton';
import SetForm from './SetForm';

interface Props {
  index: number;
}

export default function ExerciseForm({index}: Props) {
  const {control} = useFormContext<WorkoutForm>();

  const {append, fields} = useFieldArray({
    control,
    name: `exercises.${index}.sets`,
  });

  const handleAddSet = () => {
    append({
      reps: '',
      weight: '',
      time: '',
    });
  };

  return (
    <View>
      {/* List of sets  */}
      <View>
        <FlatList
          data={fields}
          renderItem={({index: setIndex}) => (
            <SetForm exerciseIndex={index} setIndex={setIndex} />
          )}
        />
      </View>
      <View>
        <PressableButton title="Add set" onPress={handleAddSet} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
