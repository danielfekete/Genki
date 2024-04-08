import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
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
import {Exercise, FirebaseExercise} from '../../types/exercise';

export default function ListExercises({
  navigation,
}: CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Exercises'>,
  NativeStackScreenProps<ExercisesStackParamList, 'ListExercises'>
>) {
  const ref = firestore().collection<FirebaseExercise>('exercises');

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

  return (
    // <View style={{flex: 1}}>
    //   {loading ? (
    //     <Text>Loading...</Text>
    //   ) : (
    //     <View style={{flex: 1}}>
    // <SafeAreaView style={{flex: 1}}>
    //   <FlatList
    //     data={exercises}
    //     keyExtractor={({id}) => id}
    //     renderItem={({item: {name, id, bodyParts}}) => (
    //       <ExerciseListItem name={name} id={id} />
    //     )}
    //   />
    // </SafeAreaView>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({item: {name}}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{name}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>

    // )}
    // </View>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  item: {
    borderRadius: 5,
    backgroundColor: '#0ea5e9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: '#fff',
  },
});
