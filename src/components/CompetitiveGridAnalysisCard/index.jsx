import React from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import {colors, fonts} from '../../styles/Crestest.config';
import LableUi from '../LabelUi';
import TagButton from '../TagButton';

function CompetitiveGridAnalysisCard({
  data,
  labels,
  colors,
  onPressSubject = () => {},
  onPressDetails = () => {},
}) {
  const barData = data.map((item, index) => {
    return {
      value: parseFloat(item ?? 0),
      label: labels[index],
      frontColor: colors[index],
      labelComponent: () => {
        return (
          <View style={{width: 60, height: 90}}>
            <Text
              style={{
                textAlign: 'right',
                fontFamily: fonts?.rRegular,
                fontSize: 11,
              }}
              numberOfLines={2}>
              {labels[index]}
            </Text>
          </View>
        );
      },
    };
  });
  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, {marginBottom: 10}]}>
        <Text style={styles.scoreSpectrumTitle}>Grade Grid - Subjectwise</Text>
      </View>
      <View
        style={{
          height:
            barData?.length > 5
              ? barData?.length * 45
              : barData?.length >= 2
              ? 150
              : 300,
          width: '100%',
        }}>
        {/* <ScrollView horizontal> */}
        {/* <View style={{width: 500}}> */}
        <BarChart
          height={
            barData?.length > 5
              ? barData?.length * 35
              : barData?.length >= 2
              ? 100
              : 220
          }
          width={Dimensions.get('window').width * 0.55}
          spacing={10}
          noOfSections={4}
          horizontal
          barWidth={22}
          barBorderRadius={4}
          frontColor="lightgray"
          data={barData}
          onPress={data => {
            Alert.alert(
              'Grade Grid - Subjectwise',
              `${data?.label} : ${data?.value}`,
            );
          }}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLabelTextStyle={{fontSize: 10, width: 80}}
          xAxisLabelsVerticalShift={35}
          shiftX={0}
          shiftY={-50}
        />
        {/* </View> */}
        {/* </ScrollView> */}
      </View>
      <View style={{width: '100%', marginTop: 10}}>
        <ScrollView horizontal>
          {labels?.map((item, index) => (
            <TagButton
              onPress={() => onPressSubject(item)}
              key={index}
              title={item}
              bgColor={
                index % 2 === 0 ? 'rgb(56, 81, 171)' : 'rgb(133, 146, 203)'
              }
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.detailsContainer}>
        <TagButton
          title={'Details'}
          bgColor="green"
          onPress={() => onPressDetails()}
        />
      </View>
    </View>
  );
}
export default CompetitiveGridAnalysisCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingVertical: 20,
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
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});
