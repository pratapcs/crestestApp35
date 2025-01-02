import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../styles/Crestest.config';
import TagButton from '../TagButton';
import {BarChart} from 'react-native-gifted-charts';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
function SetAnalysisCard({onPressDetails = () => {}, data}) {
  const [barData, setBarData] = useState([]);
  const isLoading = useSelector(
    state => state.performance.isCompetitiveNonVervelLoading,
  );
  useEffect(() => {
    if (data?.series) {
      if (data?.series[0]?.data) {
        setBarData(
          data?.series[0]?.data.map((item, index) => {
            return {
              value: parseFloat(item),
              label: data?.categories[index][0],
              frontColor: data?.series[0].colors[index],
            };
          }),
        );
      }
    }
  }, [data]);

  return (
    <View style={styles.card}>
      {!isLoading ? (
        <View style={{flex: 1}}>
          <View style={[styles.cardContainer, {marginBottom: 20}]}>
            <Text style={styles.griponChapterTitle}>
              Set Analysis - {data?.subject_name}
            </Text>
          </View>
          <View style={{width: '100%'}}>
            {data.length !== 0 && (
              <View
                style={{
                  width: '100%',
                  flex: 1,
                }}>
                <BarChart
                  width={Dimensions.get('window').width * 0.6}
                  noOfSections={10}
                  barWidth={80}
                  maxValue={100}
                  data={barData}
                  onPress={event =>
                    Alert.alert(
                      `Set Analysis - ${data?.subject_name}`,
                      `${event?.label} : ${event?.value}`,
                    )
                  }
                  initialSpacing={30}
                  isAnimated={true}
                  animationDuration={100}
                />
              </View>
            )}
          </View>
          <View style={styles.detailsContainer}>
            <TagButton
              title={'Details'}
              bgColor="green"
              onPress={() => onPressDetails()}
            />
          </View>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color="red" />
        </View>
      )}
    </View>
  );
}
export default SetAnalysisCard;

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
