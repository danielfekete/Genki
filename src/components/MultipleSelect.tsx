import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Input from './Input';

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
      <View style={styles.selectItemContainer}>
        <Text style={styles.selectItemText}>{name}</Text>
        {/* TODO: vector icon */}
        {selected ? <Text style={styles.selectedItemIconText}>⎷</Text> : null}
      </View>
    </Pressable>
  );
}

interface Props {
  list: {id: string; name: string}[];
}

export default function MultipleSelect({list}: Props) {
  const [selected, setSelected] = React.useState<string[]>([]);

  return (
    <View>
      {/* Search input */}
      <View style={styles.searchInput}>
        <Input placeholder="Search..." />
      </View>
      {/* Selected */}
      <View>
        <View style={styles.selectItemContainer}>
          <Text style={styles.selectItemText}>Selected</Text>
          <Pressable
            onPress={() => {
              setSelected([]);
            }}>
            <Text style={styles.deselectText}>Deselect All</Text>
          </Pressable>
        </View>

        <FlatList
          data={selected}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <FlatListItem
              name={list.find(i => i.id === item)?.name || ''}
              selected={true}
              onPress={() => {
                setSelected(selected.filter(i => i !== item));
              }}
            />
          )}
        />
      </View>

      {/* Full List */}
      <View style={styles.selectContainer}>
        <View style={styles.selectItemContainer}>
          <Text style={styles.selectItemText}>All</Text>
          <Pressable
            onPress={() => {
              setSelected([]);
            }}>
            <Text style={styles.selectAllText}>Select All</Text>
          </Pressable>
        </View>
        <FlatList
          data={list}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <FlatListItem
              name={item.name}
              selected={selected.includes(item.id)}
              onPress={() => {
                if (selected.includes(item.id)) {
                  setSelected(selected.filter(s => s !== item.id));
                  return;
                }
                setSelected([...selected, item.id]);
              }}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    paddingHorizontal: 10,
  },
  selectContainer: {
    marginTop: 40,
  },
  selectItemContainer: {
    padding: 10,
    borderColor: '#000',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
  },
  selectItemText: {
    flex: 1,
  },
  selectedItemIconText: {
    marginRight: 10,
    fontSize: 20,
    color: '#0ea5e9',
  },
  deselectText: {
    color: '#0ea5e9',
  },
  selectAllText: {
    color: '#0ea5e9',
  },
});
