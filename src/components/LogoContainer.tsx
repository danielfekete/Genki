import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function LogoContainer() {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>Genki</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    height: 100,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 50,
    fontFamily: 'MPLUSRounded1c-Bold',
    color: '#fff',
  },
});
