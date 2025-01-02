import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../styles/Crestest.config';
import {ProgressChart} from 'react-native-chart-kit';
import TagButton from '../TagButton';

function GradeGrid({
  onPressDetails = () => {},
  onPressSubject = () => {},
  isSelected,
  ...props
}) {
  const data = {
    labels: props.labels, // optional
    data: props.data.data
      .map(item => {
        return parseFloat(item) * 0.01;
      })
      .reverse(),
    colors: props.data.data
      .map((item, index) => {
        if ((index + 1) % 2 === 0) {
          return props.primaryColor;
        } else {
          return props.secondaryColor;
        }
      })
      .reverse(),
  };
  return (
    <View style={[styles.card, isSelected ? styles.selectedBorder : null]}>
      <View style={[styles.cardContainer, {marginBottom: 20}]}>
        <Text style={styles.scoreSpectrumTitle}>
          Grade Grid - {props?.type}
        </Text>
      </View>
      {props.data?.data && props.data?.data.length !== 0 ? (
        <>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              {props.labels.map((item, index) => {
                return (
                  <View
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    key={index}>
                    <View
                      style={{
                        backgroundColor:
                          (index + 1) % 2 === 0
                            ? props.primaryColor
                            : props.secondaryColor,
                        height: 10,
                        width: 10,
                        borderRadius: 10,
                        marginHorizontal: 5,
                      }}
                    />
                    <Text
                      key={index}
                      style={{
                        fontSize: 10,
                        color:
                          (index + 1) % 2 === 0
                            ? props.primaryColor
                            : props.secondaryColor,
                      }}>
                      {item}: {props.data.data[index]}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={{height: 170}}>
              <ProgressChart
                data={data}
                width={160}
                height={160}
                strokeWidth={data?.data?.length > 5
                  ? data?.data?.length > 10
                    ? 1
                    : 3
                  : 5}
                hideLegend={true}
                withCustomBarColorFromData={true}
                radius={30}
                chartConfig={{
                  backgroundGradientFromOpacity: 0.5,
                  backgroundGradientToOpacity: 1,
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                }}
                style={{
                  // marginVertical: 8,
                  // borderRadius: 10,
                  padding: 2,
                }}
              />
            </View>
          </View>
          <ScrollView horizontal={true} style={{marginBottom: 10}}>
            {props.labels.map((item, index) => {
              return (
                <TagButton
                  key={index}
                  title={item}
                  bgColor={
                    (index + 1) % 2 === 0
                      ? props.primaryColor
                      : props.secondaryColor
                  }
                  onPress={() => onPressSubject(item, props?.type)}
                />
              );
            })}
          </ScrollView>
          <View style={styles.detailsContainer}>
            <TagButton
              title={'Details'}
              bgColor="green"
              onPress={onPressDetails}
            />
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{fontFamily: fonts.rRegular, color: 'grey', fontSize: 15}}>
            No Data Available
          </Text>
        </View>
      )}
    </View>
  );
}
export default GradeGrid;

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
    minHeight: 250,
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
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  selectedBorder: {borderWidth: 2, borderColor: 'brown'},
});
