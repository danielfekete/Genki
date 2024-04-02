import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Link} from '@react-navigation/native';

interface Props {
  id: string;
  name: string;
  //   muscleGroup: string;
  //   bodyParts: string[];
  //   image: string;
}

export default function ExerciseListItem({name, id}: Props) {
  return (
    <Link screen="Exercise" params={{id}}>
      <View>
        {/* <Image source={{uri: image}} /> */}
        <View>
          <Text>{name}</Text>
          {/* <Text>{muscleGroup}</Text> */}
        </View>
      </View>
    </Link>
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
