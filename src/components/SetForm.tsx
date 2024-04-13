import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Input from './Input';
import {Controller, useFormContext} from 'react-hook-form';
import {WorkoutForm} from '../types/workout';
import {formatWithMask, Masks} from 'react-native-mask-input';
import Ionicons from 'react-native-vector-icons/Ionicons';

console.log(Masks);

interface Props {
  exerciseIndex: number;
  setIndex: number;
  onDelete?: (index: number) => void;
}

const MAX_REPS = 3;
const MAX_WEIGHT = 3;
const TIME_MASK = [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/];

function SetHeaders() {
  return (
    <View style={styles.row}>
      <View style={{flex: 1, ...styles.col}}>
        <Text>Set</Text>
      </View>
      <View style={{flex: 1, ...styles.col}}>
        <Text>Reps</Text>
      </View>
      <View style={{flex: 1, ...styles.col}}>
        <Text>Weight</Text>
      </View>
      <View style={{flex: 2, ...styles.col}}>
        <Text>Time</Text>
      </View>
      <View style={{flex: 1, ...styles.col}} />
    </View>
  );
}

export default function SetForm({exerciseIndex, setIndex, onDelete}: Props) {
  const {control} = useFormContext<WorkoutForm>();

  const handleDelete = () => {
    if (onDelete) {
      onDelete(setIndex);
    }
  };

  return (
    <View>
      {setIndex === 0 ? <SetHeaders /> : null}
      <View style={styles.row}>
        <View style={{flex: 1, ...styles.col}}>
          <Text>{setIndex + 1}</Text>
        </View>
        <View style={{flex: 1, ...styles.col}}>
          <Controller
            control={control}
            name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={error?.message}
                keyboardType="numeric"
                maxLength={MAX_REPS}
              />
            )}
          />
        </View>
        <View style={{flex: 1, ...styles.col}}>
          <Controller
            control={control}
            name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={error?.message}
                keyboardType="numeric"
                maxLength={MAX_WEIGHT}
              />
            )}
          />
        </View>
        <View style={{flex: 2, ...styles.col}}>
          <Controller
            control={control}
            name={`exercises.${exerciseIndex}.sets.${setIndex}.time`}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                onChangeText={e => {
                  const {masked} = formatWithMask({
                    mask: TIME_MASK,
                    text: e,
                  });
                  onChange(masked);
                }}
                onBlur={onBlur}
                value={value}
                error={error?.message}
              />
            )}
          />
        </View>
        <View style={{flex: 1, ...styles.col}}>
          <Pressable onPress={handleDelete}>
            <Ionicons name="trash" size={30} color="red" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 5,
  },
  col: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
