import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import useGetBodyParts from '../../hooks/useGetBodyParts';
import Input from '../../components/Input';
import {ExerciseContext} from './ExercisesStack';

function FlatListItem({
  onPress,
  name,
  selected,
}: {
  onPress: () => void;
  name: string;
  selected: boolean;
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          marginLeft: 15,
          paddingVertical: 10,
          borderColor: '#000',
          borderBottomWidth: 0.2,
          flexDirection: 'row',
        }}>
        <Text style={{flex: 1}}>{name}</Text>
        {/* TODO: vector icon */}
        {selected ? (
          <Text
            style={{
              marginRight: 10,
              fontSize: 20,
              color: '#0ea5e9',
            }}>
            ⎷
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

export default function SelectBodyParts() {
  // Get body parts from Firestore
  const {loading, bodyParts = []} = useGetBodyParts();

  const {selectedBodyParts, setSelectedBodyParts} = useContext(ExerciseContext);

  return (
    <View>
      {/* Search input */}
      <View style={{paddingHorizontal: 10}}>
        <Input placeholder="Search..." />
      </View>
      {/* Selected Body Parts */}
      <View>
        <View
          style={{
            padding: 10,
            borderColor: '#000',
            borderBottomWidth: 0.2,
            flexDirection: 'row',
          }}>
          <Text style={{flex: 1}}>Selected</Text>
          <Pressable
            onPress={() => {
              setSelectedBodyParts([]);
            }}>
            <Text style={{color: '#0ea5e9'}}>Deselect All</Text>
          </Pressable>
        </View>

        <FlatList
          data={selectedBodyParts}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <FlatListItem
              name={bodyParts.find(i => i.id === item)?.name}
              selected={true}
              onPress={() => {
                setSelectedBodyParts(selectedBodyParts.filter(i => i !== item));
              }}
            />
          )}
        />
      </View>

      {/* List of Body Parts */}
      <View style={{marginTop: 40}}>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            borderColor: '#000',
            borderBottomWidth: 0.2,
            flexDirection: 'row',
          }}>
          <Text style={{flex: 1}}>All</Text>
          <Pressable
            onPress={() => {
              setSelectedBodyParts([]);
            }}>
            <Text style={{color: '#0ea5e9'}}>Select All</Text>
          </Pressable>
        </View>
        <FlatList
          data={bodyParts}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <FlatListItem
              name={item.name}
              selected={selectedBodyParts.includes(item.id)}
              onPress={() => {
                if (selectedBodyParts.includes(item.id)) {
                  return setSelectedBodyParts(
                    selectedBodyParts.filter(s => s !== item.id),
                  );
                }
                setSelectedBodyParts([...selectedBodyParts, item.id]);
              }}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
