// Competitive Subjectwise Analysis On Set

import React, { useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import { colors, fonts } from '../../styles/Crestest.config';
import TableBottomSheet from '../../components/TableBottomSheet';
import {
  Row,
  Rows,
  Table,
} from 'react-native-reanimated-table';
import {
  getCompetitiveSubjectWiseComparisonDataAction,
  getCompetitiveSubjectWiseComparisonDataDetails,
  getcompetitiveNonverbalcomparisonDataAction,
  getcompetitiveNonverbalcomparisonDataDetails,
  whereDoYouStandCompetitiveDataAction,
  whereDoYouStandCompetitiveDataDetails,
} from '../../store/actions/PerformanceScoreAction';
import CompetitiveGridAnalysisCard from '../../components/CompetitiveGridAnalysisCard';
import SetAnalysisCard from '../../components/SetAnalysisCard';
import WhereYouStandCard from '../../components/WhereYouStandCard';
import InstructionCard from '../../components/InstructionCard';
const CompetitiveSubjectwiseAnalysisOnSet = props => {
  const dispatch = useDispatch();
  const { examType = '', set_no = '', subType = '' } = props?.route?.params;
  const [scoreGridTableVisible, setScoreGridTableVisible] = useState(false);
  const [analysisTableVisible, setAnalysisTableVisible] = useState(false);
  const colorsList = [
    '#9AD37F',
    '#E3DD70',
    '#CAF0FC',
    '#F8CCC5',
    '#FEE4AC',
    '#F9D1E5',
    '#CCE6AF',
    '#F7DDEC',
    '#7DD6C7',
    '#FDB1B1',
    '#9AD37F',
    '#E3DD70',
    '#CAF0FC',
    '#F8CCC5',
    '#FEE4AC',
    '#F9D1E5',
    '#CCE6AF',
    '#F7DDEC',
    '#7DD6C7',
    '#FDB1B1',
  ];
  const getcompetitiveSubjectwisecomparison = useSelector(
    state => state.performance.getcompetitiveSubjectwisecomparison,
  );
  const getcompetitiveNonverbalcomparison = useSelector(
    state => state.performance.getcompetitiveNonverbalcomparison,
  );
  const wheredoyoustandCompetitive = useSelector(
    state => state.performance.wheredoyoustandCompetitive,
  );
  const instructionData = [
    { color: 'rgba(56, 81, 171,1)', text: 'CTL - Chapter Test Level' },
    { color: 'rgba(246, 87, 170,1)', text: 'MOL - Module Test Level' },
    { color: 'rgba(244, 115, 36,1)', text: 'MCL - Mock Test Level' },
    { color: colors?.competitiveColor, text: '90% and above' },
    {
      color: colors?.successBackground,
      text: 'Greater than or equal to 80% to less than 90%',
    },
    {
      color: colors?.buttonYellow,
      text: 'Greater than or equal to 70% to Less than 80%',
    },
    { color: colors?.headingTextRed, text: 'Less than 70%' },
  ];
  useEffect(() => {
    if (
      examType !== undefined &&
      set_no !== undefined &&
      subType !== undefined
    ) {
      dispatch(
        getCompetitiveSubjectWiseComparisonDataDetails(
          examType,
          set_no,
          subType,
          props,
        ),
      );
      dispatch(
        getcompetitiveNonverbalcomparisonDataDetails(
          '',
          examType,
          set_no,
          subType,
          props,
        ),
      );
      dispatch(
        whereDoYouStandCompetitiveDataDetails(examType, subType, set_no, props),
      );

      return () => {
        dispatch(getCompetitiveSubjectWiseComparisonDataAction([]));
        dispatch(getcompetitiveNonverbalcomparisonDataAction([]));
        dispatch(whereDoYouStandCompetitiveDataAction([]));
      };
    }
  }, [examType, set_no, subType]);

  const leftIconHandeler = () => {
    props.navigation.goBack();
  };
  const elementData = (value, color) => (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          fontFamily: fonts.rRegular,
          fontSize: 14,
        }}>
        {value}
      </Text>
    </View>
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'none'}
      style={container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#245C75"
        translucent
        hidden={false}
      />
      <HeaderComponent
        headerName={`${examType} Competitive Subjectwise Analysis On Set`}
        leftIcon="chevron-back"
        leftIconHandeler={leftIconHandeler}
      />
      <ImageBackground
        source={require('../../assets/images/competitive_background.png')}
        style={Gstyles.imageBackgroundContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            {getcompetitiveSubjectwisecomparison?.categories && (
              <CompetitiveGridAnalysisCard
                labels={getcompetitiveSubjectwisecomparison?.categories}
                colors={colorsList}
                data={
                  getcompetitiveSubjectwisecomparison?.series &&
                    getcompetitiveSubjectwisecomparison?.series.length !== 0
                    ? getcompetitiveSubjectwisecomparison?.series[0].data
                    : []
                }
                onPressDetails={() => {
                  setScoreGridTableVisible(true);
                }}
                onPressSubject={sub =>
                  dispatch(
                    getcompetitiveNonverbalcomparisonDataDetails(
                      sub,
                      examType,
                      set_no,
                      subType,
                      props,
                    ),
                  )
                }
              />
            )}
            {getcompetitiveNonverbalcomparison?.series && (
              <SetAnalysisCard
                data={getcompetitiveNonverbalcomparison}
                onPressDetails={() => {
                  setAnalysisTableVisible(true);
                }}
              />
            )}
            <WhereYouStandCard data={wheredoyoustandCompetitive ?? []} />
            <InstructionCard data={instructionData} />
          </View>
        </ScrollView>
        <TableBottomSheet
          title={'Score Grid - Subjectwise'}
          description={`Competitive > ${examType} > Grade Grid - Subjectwise`}
          isVisible={scoreGridTableVisible}
          onCloseRequest={() => setScoreGridTableVisible(false)}>
          <View style={{ minHeight: 80, maxHeight: 200 }}>
            {getcompetitiveSubjectwisecomparison?.series !== undefined && (
              <ScrollView>
                <Table borderStyle={{ borderWidth: 5, borderColor: '#ffffff' }}>
                  <Row
                    flexArr={[1, 1]}
                    data={['Subject', 'Score']}
                    style={{ height: 40, backgroundColor: '#CAEBF9' }}
                    textStyle={{
                      textAlign: 'center',
                      fontSize: 15,
                      fontFamily: fonts?.rBold,
                      color: 'grey',
                    }}
                  />
                  <Rows
                    data={getcompetitiveSubjectwisecomparison?.series[0].data.map(
                      (itm, inx) => {
                        return [
                          getcompetitiveSubjectwisecomparison?.categories[inx],
                          elementData(itm, '#F1F2F2'),
                        ];
                      },
                    )}
                    flexArr={[1, 1]}
                    textStyle={{ textAlign: 'center' }}
                    style={{ backgroundColor: '#D1D3D4', height: 40 }}
                  />
                </Table>
              </ScrollView>
            )}
          </View>
        </TableBottomSheet>
        <TableBottomSheet
          title={`Set Activity - ${getcompetitiveNonverbalcomparison?.subject_name}`}
          description={`Competitive > ${examType} > Set Analysis - ${getcompetitiveNonverbalcomparison?.subject_name}`}
          isVisible={analysisTableVisible}
          onCloseRequest={() => setAnalysisTableVisible(false)}>
          <View style={{ minHeight: 80, maxHeight: 200 }}>
            {getcompetitiveNonverbalcomparison?.series !== undefined && (
              <ScrollView>
                <Table borderStyle={{ borderWidth: 5, borderColor: '#ffffff' }}>
                  <Row
                    flexArr={[1, 1]}
                    data={['Set no', 'Score']}
                    style={{ height: 40, backgroundColor: '#CAEBF9' }}
                    textStyle={{
                      textAlign: 'center',
                      fontSize: 15,
                      fontFamily: fonts?.rBold,
                      color: 'grey',
                    }}
                  />
                  <Rows
                    data={getcompetitiveNonverbalcomparison?.series[0].data.map(
                      (itm, inx) => {
                        return [
                          getcompetitiveNonverbalcomparison?.categories[inx],
                          elementData(itm, '#F1F2F2'),
                        ];
                      },
                    )}
                    flexArr={[1, 1]}
                    textStyle={{ textAlign: 'center' }}
                    style={{ backgroundColor: '#D1D3D4', height: 40 }}
                  />
                </Table>
              </ScrollView>
            )}
          </View>
        </TableBottomSheet>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default CompetitiveSubjectwiseAnalysisOnSet;

const styles = StyleSheet.create({
  barInnerLableStyle: {
    fontFamily: fonts?.rRegular,
    fontSize: 15,
    color: 'white',
  },
});
