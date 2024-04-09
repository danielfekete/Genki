import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useLinkProps, Props} from '@react-navigation/native';

export default function LinkButton({
  screen,
  params,
  action,
  href,
  children,
  ...rest
}) {
  const props = useLinkProps({screen, params, action, href});
  return (
    <Pressable {...props} {...rest}>
      <Text>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
