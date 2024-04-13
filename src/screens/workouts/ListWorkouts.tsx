import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FirebaseWorkout, Workout} from '../../types/workout';
import PressableAddButton from '../../components/PressableAddButton';
import useGetExercises from '../../hooks/useGetExercises';
import {Dimensions} from 'react-native';
import useGetWorkouts from '../../hooks/useGetWorkouts';

const {width} = Dimensions.get('window');
const column = 2;
const margin = 10;
const SIZE = (width - margin * column * 2) / column;

const MAX_VISIBLE_EXERCISES = 3;

export default function ListWorkouts({navigation}) {
  const {workouts = [], loading} = useGetWorkouts();

  const {exercises = []} = useGetExercises();

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          numColumns={2}
          data={workouts}
          //   contentContainerStyle={{
          //     alignItems: 'center',
          //   }}
          renderItem={({item}) => (
            <View style={styles.listItemContainer}>
              <Text style={styles.listItemText}>{item.name}</Text>
              {item.exercises.slice(0, MAX_VISIBLE_EXERCISES).map(exercise => (
                <View key={exercise.exerciseId}>
                  <Text style={styles.listItemText}>
                    {exercises.find(({id}) => exercise.exerciseId === id)?.name}
                  </Text>
                </View>
              ))}
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PressableAddButton
          onPress={() => navigation.navigate('CreateWorkout')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 8,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  listItemContainer: {
    backgroundColor: '#0ea5e9',
    margin: 10,
    height: 100,
    padding: 10,
    width: SIZE - 20,
    borderRadius: 5,
  },
  listItemText: {
    color: '#fff',
  },
});
