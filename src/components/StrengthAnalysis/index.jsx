import React, {useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../styles/Crestest.config';
import TagButton from '../TagButton';
import {LineChart} from 'react-native-chart-kit';
import LableUi from '../LabelUi';
import LableUiWithTextColor from '../LabelUiWithTextColor';
// import {Rect, Svg, Text as TextSVG} from 'react-native-svg';
import { shortenText } from '../../utils/StringUtil';

function StrengthAnalysis({
  scholasticLabel,
  mockData,
  moduleData,
  setData,
  mockLable,
  moduleLable,
  setLable,
  onPressSubject = () => {},
}) {
  const prossedSetData = setData?.data.map((item, index) => {
    return {
      value: parseFloat(item),
      label: setLable[index],
    };
  });
  const prossedModuleData = moduleData?.data.map((item, index) => {
    return {
      value: parseFloat(item),
      label: moduleLable[index],
    };
  });
  const prossedMockData = mockData?.data.map((item, index) => {
    return {
      value: parseFloat(item),
      label: mockLable[index],
    };
  });
  const setDataLine = scholasticLabel.map((item, index) => {
    return (
      prossedSetData.find(
        srText => srText.label.toLowerCase() === item.toLowerCase(),
      )?.value ?? 0
    );
  });
  const ModuleLine = scholasticLabel.map((item, index) => {
    return (
      prossedModuleData.find(
        srText => srText.label.toLowerCase() === item.toLowerCase(),
      )?.value ?? 0
    );
  });
  const MockLine = scholasticLabel.map((item, index) => {
    return (
      prossedMockData.find(
        srText => srText.label.toLowerCase() === item.toLowerCase(),
      )?.value ?? 0
    );
  });
  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, {marginBottom: 20}]}>
        <Text style={styles.scoreSpectrumTitle}>Strength Analysis</Text>
      </View>
      <LineChart 
        verticalLabelRotation={scholasticLabel.length > 3 ? 60 : 0}
        fromZero={true}
        segments={10}
        data={{
          labels: scholasticLabel.map(item => shortenText(item, 10, scholasticLabel.length > 3)),
          datasets: [
            {
              data: MockLine,
              color: (opacity = 1) => 'rgba(255, 172, 49, 1)',
              strokeWidth: 2, // optional
              testType: "Mock"
            },
            {
              data: ModuleLine,
              color: (opacity = 1) => 'rgba(233, 136, 193, 1)',
              strokeWidth: 2, // optional
              testType: "Module"
            },
            {
              data: setDataLine,
              color: (opacity = 1) => 'rgba(133, 145, 203, 1)',
              strokeWidth: 2, // optional
              testType: "Ch Test"
            },
            {
              data: [100],
              withDots: false,
            },
          ],
        }}
        width={Dimensions.get('window').width * 0.9} 
        height={scholasticLabel.length > 3 ? 500 :300}
        withVerticalLines={true}
        yLabelsOffset={10}
        withDots={true}
        xLabelsOffset={0}
        // yAxisInterval={12.5}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, 0.5)`,
          decimalPlaces: 0,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          fillShadowGradientFromOpacity: 0.5,
          fillShadowGradientToOpacity: 0.2,
          useShadowColorFromDataset: true,
          propsForBackgroundLines: {
            strokeWidth: 0.5,
            strokeDasharray: [0, 0],
          },
          propsForHorizontalLabels: {
            letterSpacing: 1,
            fontSize: 10,
          },
        }}
        onDataPointClick={data => {
          Alert.alert(`${scholasticLabel[data.index]}`, `${data?.dataset?.testType} : ${data?.value}`);
        }}
        bezier
        style={{
          // marginVertical: 8,
          borderRadius: 10,
          overflow: 'hidden',
          left:-15
        }}
      /> 
      
      <View style={{flexDirection: 'row'}}>
        <LableUiWithTextColor
          color={`rgba(255, 172, 49, 1)`}
          title={mockData?.name}
        />
        <LableUiWithTextColor
          color={`rgba(233, 136, 193, 1)`}
          title={moduleData?.name}
        />
        <LableUiWithTextColor
          color={`rgba(133, 145, 203, 1)`}
          title={setData?.name}
        />
      </View>
      <View
        style={[
          styles.cardContainer,
          {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          },
        ]}>
        <TagButton
          title={setData?.name}
          bgColor={`rgba(133, 145, 203, 1)`}
          onPress={() => onPressSubject('CTL')}
        />
        <TagButton
          title={moduleData?.name}
          bgColor={`rgba(233, 136, 193, 1)`}
          onPress={() => onPressSubject('MOL')}
        />
        
        <TagButton
          title={mockData?.name}
          bgColor={`rgba(255, 172, 49, 1)`}
          onPress={() => onPressSubject('MCL')}
        />
      </View>
    </View>
  );
}
export default StrengthAnalysis;

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
  StrengthAnalysisTitle: {
    fontFamily: fonts.rRegular,
    color: colors.subheadingGreytext,
    fontSize: 16,
  },
});
