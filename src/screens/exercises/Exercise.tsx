import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React from 'react';

export default function Exercise({route}) {
  const {id} = route.params;

  const ref = firestore().collection('exercises').doc(id);

  return (
    <View>
      <Text>Exercise: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
