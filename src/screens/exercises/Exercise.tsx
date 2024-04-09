import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {FirebaseExercise} from '../../types/exercise';

export default function Exercise({route, navigation}) {
  const {id} = route.params;

  const ref = firestore().collection<FirebaseExercise>('exercises').doc(id);

  const [exercise, setExercise] = useState<FirebaseExercise | undefined>(
    undefined,
  );

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      setExercise(querySnapshot.data());
    });
  }, []);

  return (
    <View>
      {exercise ? (
        <View>
          <Text>Name: {exercise.name}</Text>
          <Text>Description: {exercise.description}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
