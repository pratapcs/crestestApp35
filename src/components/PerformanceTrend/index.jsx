import React from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {colors, fonts} from '../../styles/Crestest.config';
import LableUi from '../LabelUi';
import {useSelector} from 'react-redux';
import TagButton from '../TagButton';
import { shortenText } from '../../utils/StringUtil';

function PerformanceTrend(props) {
  const fname = useSelector(state => state.auth?.fname);
  const data = props?.labels.map((item, index) => {
    return [
      {
        value: parseFloat(props?.data[0]?.data[index] ?? 0),
        label: item,
        subjectName: item,
        frontColor: '#008FFB',
        setName: fname,
        spacing: 7,
        labelComponent: () => (
          <View style={{width: 120, marginEnd:10,}}>
            <Text style={{textAlign: 'left'}}>{shortenText(item, 9, true)}</Text>
          </View>
        ),
      },
      {
        value: parseFloat(props?.data[1]?.data[index] ?? 0),
        frontColor: colors?.successBackground,
        setName: "Market Trend",
        subjectName: item,
      },
      //   {
      //     value:  parseFloat(props?.data[2].data[index] ?? 0),
      //     frontColor: 'rgba(255, 172, 49, 1)',
      //   },
    ];
  });
  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, {marginBottom: 20}]}>
        <Text style={styles.scoreSpectrumTitle}>Performance Trend</Text>
      </View>
      <BarChart
        data={data.flat()}
        width={Dimensions.get('window').width * 0.7}
        barWidth={18}
        initialSpacing={20}
        spacing={45}
        // barBorderRadius={0}
        barBorderTopLeftRadius={4}
        barBorderTopRightRadius={4}
        onPress={(event) => {Alert.alert(event?.setName, `${event?.subjectName} : ${event?.value}`)}}
        yAxisThickness={0}
        xAxisType={'solid'}
        xAxisColor={'grey'}
        yAxisTextStyle={{color: 'grey'}}
        xAxisTextNumberOfLines={2}
        labelWidth={70}
        xAxisLabelTextStyle={{color: 'grey', textAlign: 'center'}}
      />
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <LableUi color={'#008FFB'} title={fname} />
        <LableUi color={colors?.successBackground} title={'Market Trend'} />
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
export default PerformanceTrend;

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
