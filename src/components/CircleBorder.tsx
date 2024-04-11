import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {
  size: number;
  borderWidth: number;
  borderColor: string;
  children: React.ReactNode;
}

export default function CircleBorder({
  size,
  borderWidth,
  borderColor,
  children,
}: Props) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 0.5 * size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor,
        borderWidth,
      }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({});
