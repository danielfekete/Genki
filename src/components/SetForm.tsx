import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Input from './Input';
import {Controller, useFormContext} from 'react-hook-form';
import {WorkoutForm} from '../types/workout';

interface Props {
  exerciseIndex: number;
  setIndex: number;
}

export default function SetForm({exerciseIndex, setIndex}: Props) {
  const {control} = useFormContext<WorkoutForm>();

  return (
    <View>
      <Controller
        control={control}
        name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <Input
            placeholder="Reps"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={error?.message}
            keyboardType="numeric"
          />
        )}
      />
      <Controller
        control={control}
        name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <Input
            placeholder="Weight(kg)"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={error?.message}
            keyboardType="numeric"
          />
        )}
      />
      <Controller
        control={control}
        name={`exercises.${exerciseIndex}.sets.${setIndex}.time`}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <Input
            placeholder="Time"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={error?.message}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
