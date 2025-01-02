import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { Table, Row, Rows } from 'react-native-reanimated-table';
import { colors, fonts } from '../../../../styles/Crestest.config';

import { BarChart } from 'react-native-gifted-charts';

import TagButton from '../../../../components/TagButton';
import TableBottomSheet from '../../../../components/TableBottomSheet';

const screenWidth = Dimensions.get('window').width;

const MostSearchQuestion = props => {
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  // const barData = [{ value: props.series.data[0] }, { value: props.series.data[1] }, { value: props.series.data[2] }];

  const barData = props?.categories.map((item, index) => {
    return (
      {
        value: parseFloat(props?.series.data[index] ?? 0),
        label: item,
        frontColor: 'rgba(1, 122, 205, 1)',
        testType: 'Most search questions'
      }
    )
  });


  const showTable = () => {
    setDetailsModalVisible(true);
  };

  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, {marginBottom: 20}]}>
        <Text style={styles.scoreSpectrumTitle}>{props.heading}</Text>
      </View>

      <BarChart
        data={barData}
        width={210}
        barWidth={14}
        initialSpacing={40}
        spacing={80}
        barBorderRadius={0}
        yAxisThickness={0}
        xAxisType={'solid'}
        xAxisColor={'grey'}
        yAxisTextStyle={{ color: 'grey' }}
        labelWidth={60}
        xAxisLabelTextStyle={{ color: 'grey', textAlign: 'center', width:80, }}
        onPress={data => {
          Alert.alert(data?.label, `${data?.testType} : ${data?.value}`);
        }}
      />

      <View style={[styles.cardContainer, styles.flexEnd, { marginTop: 20 }]}>
        <TagButton
          onPress={showTable}
          title={'Details'}
          bgColor={colors.successBackground}
        />
      </View>
      <TableBottomSheet
        title={props.heading}
        description={`e-library > ${props.heading}`}
        isVisible={detailsModalVisible}
        onCloseRequest={() => setDetailsModalVisible(false)}>
        <View style={{height: 180}}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{paddingVertical: 20}}
            showsVerticalScrollIndicator={false}>
            <Table borderStyle={{borderWidth: 5, borderColor: '#ffffff'}}>
              <Row
                flexArr={[2, 2,]}
                data={["Subject", "Most search questions"]}

                style={{ height: 50, backgroundColor: '#CAEBF9' }}
                textStyle={{ textAlign: 'center' }}
              />

              <Rows
                data={props.categories.map((item, index) =>
                  [item, props.series.data[index]],
                )}
                flexArr={[2, 2]}
                textStyle={{ textAlign: 'center' }}
                style={{ backgroundColor: '#D1D3D4', height: 50 }}
              />

            </Table>
          </ScrollView>
        </View>
      </TableBottomSheet>
    </View>
  );
};
export default MostSearchQuestion;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
    alignSelf: 'center',
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
