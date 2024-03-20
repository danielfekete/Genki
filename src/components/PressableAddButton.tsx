import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function PressableAddButton(props: PressableProps) {
  return (
    <Pressable style={styles.pressable} {...props}>
      <Text style={styles.title}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0ea5e9',
    borderRadius: 10,
    height: 50,
    width: '15%',
  },
  title: {
    color: '#fff',
    fontSize: 25,
  },
});
