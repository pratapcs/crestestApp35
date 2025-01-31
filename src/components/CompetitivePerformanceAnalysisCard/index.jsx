import React from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import {colors, fonts} from '../../styles/Crestest.config';
import LableUi from '../LabelUi';
import TagButton from '../TagButton';

function CompetitivePerformanceActivityCard(props) {
  const data = props?.labels.map((item, index) => {
    return [
      {
        value: parseFloat(props?.data[0]?.data[index] ?? 0),
        label: item,
      },
    ];
  });
  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, {marginBottom: 20}]}>
        <Text style={styles.scoreSpectrumTitle}>Performance Analysis</Text>
      </View>
      <LineChart
        data={data.flat()}
        width={Dimensions.get('window').width * 0.65}
        noOfSections={5}
        thickness={6}
        color="rgba(255, 172, 49, 1)"
        focusEnabled={true}
        onFocus={data =>
          Alert.alert('Performance Analysis', `${data?.label} : ${data?.value}`)
        }
        maxValue={100}
        startOpacity={0.9}
        endOpacity={0.2}
        startFillColor1="rgba(255, 172, 49, 1)"
        endFillColor1="rgba(255, 172, 49, 1)"
        areaChart
        spacing={100}
      />
      <View style={{flexDirection: 'row', marginTop: 10, marginBottom:10,}}>
        {props?.labels.map((item, index) => {
          return (
            <TagButton
              key={index}
              onPress={() => props?.onPressSet(item)}
              title={item}
              bgColor={index % 2 == 0 ? '#3851AB' : '#8592CB'}
            />
          );
        })}
      </View>
      <View style={[styles.cardContainer, styles.flexEnd]}>
        <TagButton
          onPress={props?.onPressDetails}
          title={'Details'}
          bgColor={colors.successBackground}
        />
      </View>
    </View>
  );
}
export default CompetitivePerformanceActivityCard;

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
