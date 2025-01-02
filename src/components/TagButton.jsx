import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {fonts} from '../styles/Crestest.config';

function TagButton({
  title,
  bgColor = 'green',
  textColor = 'white',
  onPress = () => {},
}) {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: bgColor}]}
      onPress={onPress}>
      <Text style={[styles.title, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
}
export default TagButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal:5
  },
  title: {
    fontFamily: fonts.rMedium,
  },
});
