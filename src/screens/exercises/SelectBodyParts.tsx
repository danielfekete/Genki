import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import useGetBodyParts from '../../hooks/useGetBodyParts';
import {ExerciseContext} from './ExercisesStack';
import MultipleSelect from '../../components/MultipleSelect';

export default function SelectBodyParts() {
  // Get body parts from Firestore
  const {bodyParts = []} = useGetBodyParts();

  const {selectedBodyParts, setSelectedBodyParts} = useContext(ExerciseContext);

  return (
    <View>
      <MultipleSelect
        options={bodyParts}
        onChange={values => {
          setSelectedBodyParts(values);
        }}
        value={selectedBodyParts}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
