import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useGetExercises from '../../hooks/useGetExercises';

// interface Props {
//   onSelect: (id: string) => void;
// }
export default function SelectExercise() {
  const {exercises = [], loading} = useGetExercises();

  const handleOnPress = (id: string) => {
    // Set the selected exercise
    // Close the modal
  };

  return (
    <View>
      <FlatList
        data={exercises}
        keyExtractor={({id}) => id}
        renderItem={({item: {name, id}}) => (
          <Pressable
            onPress={() => {
              handleOnPress(id);
            }}>
            <View>
              <Text>{name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
