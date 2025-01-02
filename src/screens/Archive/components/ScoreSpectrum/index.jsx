import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../../styles/Crestest.config';
import TagButton from '../TagButton';
import SpeedoMeter from '../Graph/SpeedoMeter';

function ScoreSpectrum({onPressDetails = () => {}, value}) {
  
  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, {marginBottom: 20}]}>
        <Text style={styles.scoreSpectrumTitle}>Score Spectrum</Text>
      </View>
      <SpeedoMeter
        value={parseFloat(value ?? 0)}
      />
      <TagButton
        title={( value ?? 0) + ' %'}
        bgColor={colors.scholasticColor}
      />
      <View style={[styles.cardContainer, styles.flexEnd]}>
        <TagButton
          onPress={onPressDetails}
          title={'Details'}
          bgColor={colors.successBackground}
        />
      </View>
    </View>
  );
}
export default ScoreSpectrum;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardContainer: {
    width: '100%',
    marginBottom: 10,
  },
  flexEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  scoreSpectrumTitle: {
    fontFamily: fonts.rRegular,
    color: colors.subheadingGreytext,
    fontSize: 16,
  },
});
