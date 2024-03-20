import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';
import React from 'react';

export default function PressableButton({
  title,
  ...props
}: {title: string} & PressableProps) {
  return (
    <Pressable style={styles.pressable} {...props}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '80%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0ea5e9',
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    color: '#fff',
  },
});
