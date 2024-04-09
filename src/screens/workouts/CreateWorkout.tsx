import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useGetExercises from '../../hooks/useGetExercises';
import firestore from '@react-native-firebase/firestore';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import * as yup from 'yup';
import Input from '../../components/Input';
import PressableButton from '../../components/PressableButton';
import {WorkoutForm} from '../../types/workout';

export const workoutForm: yup.ObjectSchema<WorkoutForm> = yup.object({
  name: yup.string().required(),
  exercises: yup
    .array()
    .of(
      yup.object({
        exerciseId: yup.string().required(),
        sets: yup
          .array()
          .of(
            yup.object({
              reps: yup.string().optional(),
              weight: yup.string().optional(),
              time: yup.string().optional(),
            }),
          )
          .required()
          .default([]),
      }),
    )
    .required()
    .default([]),
});
export default function CreateWorkout({navigation}) {
  const {loading, exercises = []} = useGetExercises();

  const ref = firestore().collection('workouts');

  const {control, handleSubmit} = useForm<WorkoutForm>({
    defaultValues: {
      name: '',
      exercises: [],
    },
  });

  const {append, fields} = useFieldArray({
    control,
    name: 'exercises',
  });

  const handleAddExercise = () => {
    append({
      exerciseId: '',
      sets: [],
    });
  };

  const onSubmit = async (data: WorkoutForm) => {
    console.log(data);
  };

  return (
    <View>
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <Input
            label="Name"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={error?.message}
          />
        )}
      />
      <View style={styles.exercisesContainer}>
        <FlatList
          data={fields}
          renderItem={() => (
            <View>
              <Controller control={control} />
            </View>
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton title="Add exercise" onPress={handleAddExercise} />
        <PressableButton title="Create" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exercisesContainer: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
