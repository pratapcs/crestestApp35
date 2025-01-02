import React from 'react';
import {View, Text} from 'react-native';
function LableUiWithTextColor({color, title}) {
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
          borderRadius: 10,
          backgroundColor: color ?? 'black',
          marginRight: 5,
        }}
      />
      <Text style={{fontSize: 14, color: color ?? 'black'}}>{title}</Text>
    </View>
  );
}
export default LableUiWithTextColor;