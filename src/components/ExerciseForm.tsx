import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useRef} from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {WorkoutForm} from '../types/workout';
import PressableButton from './PressableButton';
import SetForm from './SetForm';
import useGetExercises from '../hooks/useGetExercises';

interface Props {
  index: number;
  id: string;
}

const MAX_SETS = 20;

export default function ExerciseForm({index, id}: Props) {
  const {control} = useFormContext<WorkoutForm>();

  const {exercises = []} = useGetExercises();

  const exercise = useMemo(
    () => exercises.find(({id: exerciseId}) => exerciseId === id) || null,
    [exercises],
  );

  const {append, fields, remove} = useFieldArray({
    control,
    name: `exercises.${index}.sets`,
  });

  const handleAddSet = () => {
    // Limit the number of sets to ${MAX_SETS}
    if (fields.length > MAX_SETS) {
      return;
    }
    append({
      reps: '',
      weight: '',
      time: '',
    });
  };

  const handleDeleteSet = (setIndex: number) => {
    remove(setIndex);
  };

  return (
    <View>
      <View>
        <Text>{exercise?.name}</Text>
      </View>
      {/* List of sets  */}
      <View>
        <FlatList
          data={fields}
          keyExtractor={item => item.id}
          renderItem={({index: setIndex}) => (
            <SetForm
              exerciseIndex={index}
              setIndex={setIndex}
              onDelete={handleDeleteSet}
            />
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
