import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  // const
  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={days}
        horizontal
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View
            style={{
              width: 50,
            }}>
            <Text style={{color: '#000'}}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
