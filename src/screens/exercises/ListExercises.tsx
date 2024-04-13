import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
import Input from '../../components/Input';
import LinkButton from '../../components/LinkButton';
import useGetExercises from '../../hooks/useGetExercises';

export default function ListExercises({
  navigation,
}: CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Exercises'>,
  NativeStackScreenProps<ExercisesStackParamList, 'ListExercises'>
>) {
  const ref = firestore().collection<FirebaseExercise>('exercises');

  const [search, setSearch] = useState(''); // Set search to empty string on component mount

  const {loading, exercises = []} = useGetExercises(search);

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
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Input
          placeholder="Search"
          value={search}
          onChangeText={v => {
            setSearch(v);
          }}
        />
      </View>
      <View style={styles.listContainer}>
        <View style={styles.container}>
          <FlatList
            data={exercises}
            renderItem={({item: {name, id}}) => (
              <Pressable
                onPress={() => {
                  navigation.navigate('Exercise', {id, name});
                }}>
                <View style={styles.item}>
                  <Text style={styles.title}>{name}</Text>
                </View>
              </Pressable>
            )}
            keyExtractor={item => item.id}
          />

          {/* <View style={styles.addButtonContainer}>
        <PressableAddButton
          onPress={() => navigation.navigate('CreateExercise')}
        />
      </View> */}
        </View>
      </View>
      <View style={styles.addButtonContainer}>
        <PressableAddButton
          onPress={() => navigation.navigate('CreateExercise')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  listContainer: {
    flex: 8,
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
