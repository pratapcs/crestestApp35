import React from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {colors, fonts} from '../../styles/Crestest.config';
import LableUi from '../LabelUi';

function PerformanceAnalysis(props) {
  const data = props?.labels.map((item, index) => {
    return [
      {
        value: parseFloat(props?.mockData?.data[index] ?? 0),
        frontColor: 'rgba(133, 145, 203, 1)',
        subject: item,
        testType: 'Mock',
        spacing: 2,
      },
      
      {
        value: parseFloat(props?.moduleData?.data[index] ?? 0),
        frontColor: 'rgba(255, 172, 49, 1)',
        subject: item,
        testType: 'Module',
        spacing: 2,
      },
      {
        value: parseFloat(props?.setData?.data[index] ?? 0),
        label: item,
        frontColor: 'grey',
        subject: item,
        testType: 'Ch Test',
        spacing: 12,
        labelComponent: () => {
          return (
            <View style={{width: 80, marginLeft:-30}}>
              <Text
                style={{
                  textAlign: 'left',
                  fontFamily: fonts?.rRegular,
                  fontSize: 10,
                  color: 'grey',
                }}
                rotateXAxisTexts={30}
                numberOfLines={2}>
                {item}
              </Text>
            </View>
          );
        },
      },
      
    ];
  });
  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, {marginBottom: 20}]}>
        <Text style={styles.scoreSpectrumTitle}>Performance Analysis</Text>
      </View>
      <BarChart
        data={data.flat()}
        width={Dimensions.get('window').width * 0.65}
        barWidth={14}
        initialSpacing={5}
        spacing={0}
        barBorderRadius={4}
        yAxisThickness={0}
        xAxisType={'solid'}
        xAxisColor={'grey'}
        yAxisTextStyle={{color: 'grey'}}
        labelWidth={80}
        xAxisLabelTextStyle={{color: 'grey'}}
        xAxisTextNumberOfLines={2}
        onPress={data => {
          Alert.alert(data?.subject, `${data?.testType} : ${data?.value}`);
        }}
        // rotateLabel={true}
        shiftX={20}
      />
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <LableUi
          color={`rgba(133, 145, 203, 1)`}
          title={props?.mockData?.name}
        />
        <LableUi
          color={`rgba(255, 172, 49, 1)`}
          title={props?.moduleData?.name}
        />
        <LableUi color={`grey`} title={props?.setData?.name} />
      </View>
    </View>
  );
}
export default PerformanceAnalysis;

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
