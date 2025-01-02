import React, {useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../styles/Crestest.config';
import TagButton from '../TagButton';
import {BarChart, PieChart} from 'react-native-gifted-charts';
import LableUi from '../LabelUi';
function ActivityCheckCard({
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
      <ScrollView style={{width:'100%'}} horizontal>
      {data[0]?.stacks?.map((item, index) => {
          return <LableUi square={true} key={index} color={item?.color} title={item?.name} />;
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          marginBottom: 10,
        }}>
        
      </View>
      {data.length !== 0 && (
        <View
          style={{
            width: '100%',
            flex: 1,
          }}>
          <BarChart
            width={Dimensions.get('window').width * 0.7}
            noOfSections={10}
            barWidth={150}
            stackData={data}
            focusBarOnPress={true}
            initialSpacing={50}
            height={400}
            xAxisTextNumberOfLines={
              data?.length !== 0
                ? Math.ceil(data[0]?.label?.length / 22) === 0
                  ? 1
                  : Math.ceil(data[0]?.label?.length / 22)
                : 1
            }
          />
        </View>
      )}
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
export default ActivityCheckCard;

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
