import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {
  name: string;
  //   muscleGroup: string;
  //   bodyParts: string[];
  //   image: string;
}

export default function ExerciseListItem({name}: Props) {
  return (
    <View>
      {/* <Image source={{uri: image}} /> */}
      <View>
        <Text>{name}</Text>
        {/* <Text>{muscleGroup}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    flex: 4,
  },
});
