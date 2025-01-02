import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Table, Row, Rows } from 'react-native-reanimated-table';

import { colors, fonts } from '../../../../styles/Crestest.config';
import TableBottomSheet from '../../../../components/TableBottomSheet';

import TagButton from '../../../../components/TagButton';
// import { LineChart } from 'react-native-chart-kit';
import LableUi from '../../../../components/LabelUi';

import { LineChart } from "react-native-gifted-charts";

const SessionTime = (props) => {

  const screenWidth = Dimensions.get("window").width;

  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  // const userStandard = useSelector(state => state.auth.standard);
  const userStandard = useSelector(state => state.archivePerformance.archiveClass);
  const userBoard = useSelector(state => state.auth.board_name);



  // const data = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];

  const lineData = props?.categories.map((item, index) => {
    return (
      {
        value: parseFloat(props?.series.data[index] ?? 0),
        label: item,
        frontColor: 'rgba(1, 122, 205, 1)',
        testType: 'Session duration (mins)'
      }
    )
  });

  /* const data = {
    // labels: ["January", "February", "March", "April", "May", "June"],
    labels: props.categories,
    datasets: [
      {
        // data: [20, 45, 28, 80, 99, 43],
        data: props.series.data,
        color: (opacity = 1) => `rgba(38, 159, 251, 1)`, // optional
        strokeWidth: 1.5 // optional
      },
      {
        data: [100],
        withDots: false,
      },
    ],
    // legend: ["Rainy Days"] // optional
  }; */

  const showTable = () => {
    setDetailsModalVisible(true)
  }

  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, { marginBottom: 20 }]}>
        <Text style={styles.scoreSpectrumTitle}>{props.heading}</Text>
      </View>
      <View style={{}}>

        <LineChart
          data={lineData}
          width={210}
          barWidth={14}
          initialSpacing={40}
          spacing={80}
          endSpacing={60}
          barBorderRadius={0}
          yAxisThickness={0}
          xAxisType={'solid'}
          xAxisColor={'grey'}
          yAxisTextStyle={{ color: 'grey' }}
          labelWidth={100}
          xAxisLabelTextStyle={{ color: 'grey', textAlign: 'center', width: 80, }}
          // curved
          color="#017acd"
          // hideDataPoints
          dataPointsHeight={16}
          dataPointsWidth={16}
          thickness={2}
          dataPointsRadius={7}
          dataPointsColor="red"
          onPress={data => {
            Alert.alert(data?.label, `${data?.testType} : ${data?.value}`);
          }}
        />

        {/* <LineChart
          data={data}
          width={Dimensions.get('window').width * 0.9}
          height={280}
          verticalLabelRotation={-50}
          chartConfig={chartConfig}
          withDots={false}
          withShadow={false}
          bezier
          xLabelsOffset={-10}
          fromZero={true}
          segments={10}
        /> */}
      </View>
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
        <View style={{ height: 180 }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingVertical: 20, }}
            showsVerticalScrollIndicator={false}
          >
            <Table borderStyle={{ borderWidth: 5, borderColor: '#ffffff' }}>

              <Row
                flexArr={[2, 2,]}
                data={["Subject", "Session time (in mins.)"]}

                /* data={
                  elibrarySessionTime.map(item =>
                    Object.keys(item).map(str =>
                      capitalizeFirstLetter(str ?? ''),
                    ),
                  )[0]
                } */
                style={{ height: 40, backgroundColor: '#CAEBF9' }}
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
}
export default SessionTime;

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
    alignSelf: 'center'
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
