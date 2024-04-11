import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';

interface Props extends TextInputProps {
  error?: string;
  label?: string;
}

export default function Input({error, label, ...props}: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text>{label}</Text> : null}
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
