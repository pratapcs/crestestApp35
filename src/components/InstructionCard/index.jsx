import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../styles/Crestest.config';

/**
 * InstructionCard component to display instructions with colored indicators.
 * @param {object} props - Component props.
 * @param {Array<{color:string, text:string}>} props.data - Array of objects containing color and text information for instructions.
 * @returns {JSX.Element} InstructionCard component.
 */
function InstructionCard({data = []}) {
  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, {marginBottom: 20}]}>
        <Text style={styles.scoreSpectrumTitle}>Colour Guide</Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          width: '100%',
          borderRadius: 10,
        }}>
        <View>
          {data.map((item, index) => {
            return (
              <View style={styles.insItem} key={index}>
                <View
                  style={[styles.insItemColor, {backgroundColor: item?.color}]}
                />
                <Text
                  style={{
                    fontFamily: fonts.rRegular,
                    color: 'grey',
                    fontSize: 15,
                    maxWidth: 200,
                  }}>
                  {item?.text}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
export default InstructionCard;

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
    minHeight: 250,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 10,
  },
  scoreSpectrumTitle: {
    fontFamily: fonts.rRegular,
    color: colors.subheadingGreytext,
    fontSize: 16,
  },
  insItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  insItemColor: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
});
