import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import ExerciseListItem from '../../components/ExerciseListItem';
import PressableAddButton from '../../components/PressableAddButton';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {TabParamList} from '../Dashboard';
import {ExercisesStackParamList} from './ExercisesStack';

interface Exercise {
  id: string;
  name: string;
  description: string;
  bodyParts: string[];
}

interface FirebaseExercise extends Omit<Exercise, 'id' | 'bodyParts'> {
  bodyParts: FirebaseFirestoreTypes.DocumentReference[];
}

export default function ListExercises({
  navigation,
}: CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Exercises'>,
  NativeStackScreenProps<ExercisesStackParamList, 'ListExercises'>
>) {
  const ref = firestore().collection<FirebaseExercise>('exercises');

  console.log(ref);

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [exercises, setExercises] = useState<Exercise[]>([]); // Initial empty array of exercises

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const exercises = querySnapshot.docs.map(doc => ({
        bodyParts: doc.data().bodyParts.map(item => item.id),
        name: doc.data().name,
        description: doc.data().description,
        id: doc.id,
      }));

      setExercises(exercises);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  console.log(exercises);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{flex: 1}}>
          <View style={{flex: 5}}>
            <FlatList
              data={exercises}
              keyExtractor={({id}) => id}
              renderItem={({item: {name}}) => (
                <ExerciseListItem
                  // muscleGroup={muscleGroup}
                  name={name}
                  // image={image}
                />
              )}
            />
          </View>
          <View style={styles.addButtonContainer}>
            <PressableAddButton
              onPress={() => {
                navigation.navigate('CreateExercise');
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});
