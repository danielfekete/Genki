import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';

export default function Input({
  error,
  ...props
}: {error?: string} & TextInputProps) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} {...props} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    paddingVertical: 5,
    paddingLeft: 5,
  },
});
