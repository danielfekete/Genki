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
      <View style={styles.container}>
        {/* <Image source={{uri: image}} /> */}

        <Text style={styles.name}>{name}</Text>
        {/* <Text>{muscleGroup}</Text> */}
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#0ea5e9',
    height: 10,
    flexDirection: 'row',
  },
  image: {
    flex: 4,
  },
  name: {
    color: '#fff',
    fontSize: 15,
    paddingLeft: 5,
    fontWeight: 'bold',
  },
});
