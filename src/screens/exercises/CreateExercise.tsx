import {
  Alert,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import * as yup from 'yup';
import Input from '../../components/Input';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import PressableButton from '../../components/PressableButton';
import firestore from '@react-native-firebase/firestore';
import {Picker, PickerIOS} from '@react-native-picker/picker';
import useGetBodyParts from '../../hooks/useGetBodyParts';
import {ExerciseContext} from './ExercisesStack';

interface ExerciseForm {
  name: string;
  description: string;
  bodyParts: string[];
}

interface FirebaseBodyPart {
  name: string;
}

const exerciseForm: yup.ObjectSchema<ExerciseForm> = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  bodyParts: yup.array().of(yup.string().ensure()).default([]).min(1),
});

export default function CreateExercise({navigation}) {
  const {loading, bodyParts = []} = useGetBodyParts();

  const {selectedBodyParts, setSelectedBodyParts} = useContext(ExerciseContext);
  const ref = firestore().collection('exercises');

  const selectedBodyPartsValue = useMemo(
    () =>
      bodyParts
        .filter(({id}) => selectedBodyParts.includes(id))
        .map(({name}) => name)
        .join(', '),
    [selectedBodyParts, bodyParts],
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors, isSubmitted},
  } = useForm<ExerciseForm>({
    resolver: yupResolver(exerciseForm),
    defaultValues: {
      name: '',
      description: '',
      bodyParts: [],
    },
  });

  useEffect(() => {
    setValue('bodyParts', selectedBodyParts, {shouldValidate: true});
  }, [selectedBodyParts]);

  const onSubmit = async (values: ExerciseForm) => {
    try {
      // Check if there is already an exercise with the same name
      const query = await ref.where('name', '==', values.name).get();
      if (query.size > 0) {
        // TODO: Create a form error
        return 0;
      }
      // Create exercise
      await ref.add({
        name: values.name,
        description: values.description,
        bodyParts: values.bodyParts,
      });
      // Reset selected body parts
      setSelectedBodyParts([]);
      // Navigate to ListExercises
      navigation.navigate('ListExercises');
    } catch (e) {
      console.log(e);
    }
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
      <Controller
        control={control}
        name="description"
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <Input
            label="Description"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={error?.message}
          />
        )}
      />
      <Pressable
        onPress={() => {
          navigation.navigate('SelectBodyParts');
        }}>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              gap: 5,
            }}>
            <Text>Body parts</Text>
            <View>
              {selectedBodyParts.length ? (
                <Text>{selectedBodyPartsValue}</Text>
              ) : (
                <Text>None selected</Text>
              )}
            </View>
          </View>
          <View style={{marginRight: 10}}>
            <Text>→</Text>
          </View>
        </View>
        {isSubmitted && errors.bodyParts && errors.bodyParts.message ? (
          <Text>{errors.bodyParts.message}</Text>
        ) : null}
      </Pressable>

      <View style={styles.buttonContainer}>
        <PressableButton title="Create" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
  },
});
