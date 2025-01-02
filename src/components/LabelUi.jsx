import React from 'react';
import {View, Text} from 'react-native';
function LableUi({color, title, square = false}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
      }}>
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: square ? 3 : 10,
          backgroundColor: color ?? 'black',
          marginRight: 5,
        }}
      />
      <Text style={{fontSize: 14, color: '#262626'}}>{title}</Text>
    </View>
  );
}
export default LableUi;