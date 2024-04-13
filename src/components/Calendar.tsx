import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {format} from 'date-fns-tz';
import {
  startOfWeek,
  eachDayOfInterval,
  isToday,
  lastDayOfMonth,
  startOfMonth,
  isEqual,
} from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');
const column = 7;
const padding = 20;
const WIDTH = (width - padding * 2) / column;

//TODO calc height
const HEIGHT = 75;

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const today = new Date();
const startMonthInterval = startOfMonth(today);
const endMonthInterval = lastDayOfMonth(today);
const arr = eachDayOfInterval({
  start: startMonthInterval,
  end: endMonthInterval,
}).map(date => ({
  val: date,
  today: isToday(date),
  date: format(date, 'dd', {
    timeZone,
  }),
  weekDay: format(date, 'eee', {
    timeZone,
  }),
}));

const weekStart = startOfWeek(arr.find(({today}) => today)?.val, {
  weekStartsOn: 1,
});
const initialScrollIndex = arr.findIndex(({val}) => isEqual(val, weekStart));
console.log(initialScrollIndex);

interface Props {
  value: Date;
  onChange: (date: Date) => void;
}

export default function Calendar({value, onChange}) {
  // const
  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={arr}
        keyExtractor={item => String(item.date)}
        horizontal
        snapToInterval={WIDTH}
        getItemLayout={(_, index) => ({
          length: WIDTH,
          offset: WIDTH * index,
          index: index,
        })}
        initialScrollIndex={initialScrollIndex}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() => {
                onChange(item.val);
              }}>
              <View
                style={{
                  width: WIDTH,
                  height: HEIGHT,
                  paddingVertical: 5,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#000',
                  backgroundColor: isEqual(item.val, value)
                    ? '#0ea5e9'
                    : '#fff',
                }}>
                <Text
                  style={{
                    marginBottom: 5,
                    color: isEqual(value, item.val) ? '#fff' : '#000',
                  }}>
                  {item.weekDay}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: isEqual(value, item.val) ? '#fff' : '#000',
                  }}>
                  {item.date}
                </Text>
                {item.today ? (
                  <Ionicons
                    name="ellipse"
                    WIDTH={20}
                    color={isEqual(value, item.val) ? '#fff' : '#0ea5e9'}
                  />
                ) : null}
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
