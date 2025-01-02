import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../styles/Crestest.config';
import TagButton from '../TagButton';
import { PieChart } from 'react-native-gifted-charts';

const pieData = [
  { chapter: 96, color: "#177AD5", subject: 15, text: "CH1", value: 30 }, { "chapter": 97, "color": "#79D2DE", "subject": 15, "text": "CH2", "value": 30 }, { "chapter": 98, "color": "#ED6665", "subject": 15, "text": "CH3", "value": 25 }, { "chapter": 99, "color": "#ff0", "subject": 15, "text": "CH4", "value": 30 }, { "chapter": 100, "color": "#ff0000", "subject": 15, "text": "CH5", "value": 30 }, { "chapter": 101, "color": "#ccebf8", "subject": 15, "text": "CH6", "value": 40 }
];


function SubjectAnalysisCard({
  title,
  onPressDetails,
  data,
  centerLabel,
  isSelected,
  subject,
  onPressPaiData = event => { },
}) {
  return (
    <View
      style={[
        styles.card,
        isSelected ? { borderWidth: 2, borderColor: 'brown' } : null,
      ]}>
      <View style={[styles.cardContainer, { marginBottom: 20 }]}>
        <Text style={styles.scoreSpectrumTitle}>{title}</Text>
      </View>

      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        {data.length !== 0 ? (
          data?.every(dataItem => dataItem.value === 0) ? (
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
              }}>
              0.00%
            </Text>
          ) : (
            <PieChart
              data={data ?? []}
              donut
              showText
              textColor="black"
              radius={150}
              innerRadius={40}
              textSize={10}
              labelsPosition="outward"
              showValuesAsLabels
              // showTextBackground
              // textBackgroundRadius={26}
              onPress={event => {
                onPressPaiData(event);
              }}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      {centerLabel}%
                    </Text>
                  </View>
                );
              }}
              strokeWidth={2}
              strokeColor="white"
            />
          )
        ) : (
          <Text>No Data</Text>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <TagButton
          title={'Details'}
          bgColor="green"
          onPress={() => onPressDetails(subject)}
        />
      </View>
    </View>
  );
}
export default SubjectAnalysisCard;

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
    minHeight: 300,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 10,
  },
  flexEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  StrengthAnalysisTitle: {
    fontFamily: fonts.rRegular,
    color: colors.subheadingGreytext,
    fontSize: 16,
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
});
