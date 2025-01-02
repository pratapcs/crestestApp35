import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../styles/Crestest.config';
import TagButton from '../TagButton';
import {PieChart} from 'react-native-gifted-charts';
import LableUi from '../LabelUi';

function GriponChapterCard({
  title,
  desc,
  onPressDetails = () => {},
  data,
  subject,
}) {
  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, {marginBottom: 20}]}>
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
          data.length === 1 && data[0].value === 0 ? (
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
                radius={70}
                textSize={12}
                labelsPosition="mid"
                textBackgroundColor="#ffffff"
                showTextBackground
                // strokeWidth={2}
                strokeColor="white"
              />
            </View>
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
export default GriponChapterCard;

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
});
