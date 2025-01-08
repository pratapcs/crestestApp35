import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../styles/Crestest.config';
import TagButton from '../TagButton';
import { PieChart } from 'react-native-gifted-charts';
import LableUi from '../LabelUi';

function CompetitiveGradeGridCard({
  title,
  desc,
  onPressDetails = () => { },
  onPressMoreDetails = () => { },
  data,
  subject,
}) {
  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, { marginBottom: 20 }]}>
        <Text style={styles.griponChapterTitle}>{title}</Text>
        <Text style={styles.griponChapterDesc}>{desc}</Text>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>

        {data.length !== 0 ? (
          data.length === 1 && data[0].value === 'null' ? (
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
              }}>
              0.00%
            </Text>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>

              {!isNaN(data[0].value) && data[0].value !== null && data[0].value !== undefined && data[0].value !== 0 ?
                <>
                  <View>
                    {data.map((item, index) => {
                      return (
                        <LableUi
                          key={index}
                          title={item.fieldName}
                          color={item.color}
                        />
                      );
                    })}
                  </View>
                  <PieChart
                    data={data}
                    showText
                    textColor="black"
                    onPress={() => { onPressMoreDetails() }}
                    radius={70}
                    textSize={12}
                    labelsPosition="mid"
                    textBackgroundColor="#ffffff"
                    showTextBackground
                    strokeWidth={2}
                    strokeColor="white"
                  />
                </>
                : <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>No Data Available</Text>
                </View>
              }
            </View>
          )
        ) : (
          <Text>No Data</Text>
        )}
      </View>
      {!isNaN(data[0].value) && data[0].value !== null && data[0].value !== undefined && data[0].value !== 0 ?
        <>
          <View style={styles.detailsContainer}>
            <TagButton
              title={'More Details'}
              bgColor="grey"
              onPress={() => onPressMoreDetails(subject)}
            />
            <TagButton
              title={'Details'}
              bgColor="green"
              onPress={() => onPressDetails(subject)}
            />
          </View>
        </>
        : null}
    </View>
  );
}
export default CompetitiveGradeGridCard;

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
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  griponChapterTitle: {
    fontFamily: fonts.rRegular,
    color: colors.subheadingGreytext,
    fontSize: 16,
  },
  griponChapterDesc: {
    fontFamily: fonts.rRegular,
    color: colors.subheadingGreytext,
    fontSize: 12,
  },
  noDataContainer: {
    flex: 1,
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: '#C7C7C7',
    fontSize: 16,
  }
});
