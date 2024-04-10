import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import useGetExercises from '../../hooks/useGetExercises';
import firestore from '@react-native-firebase/firestore';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import * as yup from 'yup';
import Input from '../../components/Input';
import PressableButton from '../../components/PressableButton';
import {WorkoutForm} from '../../types/workout';
import {WorkoutContext} from './WorkoutsStack';
import ExerciseForm from '../../components/ExerciseForm';

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

  const {selectedExercises} = useContext(WorkoutContext);

  const ref = firestore().collection('workouts');

  const methods = useForm<WorkoutForm>({
    defaultValues: {
      name: '',
      exercises: [],
    },
  });
  const {control, handleSubmit} = methods;

  const {append, fields, remove, replace} = useFieldArray({
    control,
    name: 'exercises',
  });

  useEffect(() => {
    if (!selectedExercises.length) {
      // Clear fields
      replace([]);
    } else if (fields.length < selectedExercises.length) {
      // Add fields
      for (let i = fields.length; i < selectedExercises.length; i++) {
        append({exerciseId: selectedExercises[i], sets: []});
      }
    } else {
      // Remove fields
      for (let i = fields.length - 1; i >= selectedExercises.length; i--) {
        remove(i);
      }
    }
  }, [selectedExercises]);

  const onSubmit = async (data: WorkoutForm) => {
    console.log(data);
  };

  console.log('fields', fields);

  return (
    <FormProvider {...methods}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Controller
            control={control}
            name="name"
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                label="Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={error?.message}
              />
            )}
          />
        </View>
        <View style={styles.exercisesContainer}>
          <View>
            <Text>Exercises</Text>
          </View>
          <FlatList
            data={fields}
            keyExtractor={item => item.id}
            renderItem={({index, item: {exerciseId}}) => (
              <ExerciseForm index={index} id={exerciseId} />
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <PressableButton
            title="Add exercises"
            onPress={() => {
              navigation.navigate('SelectExercises');
            }}
          />
          <PressableButton title="Create" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  exercisesContainer: {
    flex: 5,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
