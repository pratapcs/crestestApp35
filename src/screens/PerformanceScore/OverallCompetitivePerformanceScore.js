import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';
import {colors, fonts} from '../../styles/Crestest.config';
import {container} from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import {
  competitiveOverAllPerformanceSuccessAction,
  getCompareScholasticCompetitiveDataAction,
  getCompareScholasticCompetitiveDataDataDetails,
  getCompetitiveOverAllPerformanceData,
  getCompetitiveSetwiseScoreDataDetails,
  getCompetitiveSetwiseScoreSuccessAction,
  getcompetitiveSubjectAvgscoreDataAction,
  getcompetitiveSubjectAvgscoreDataDetails,
  performanceRequestAction,
} from '../../store/actions/PerformanceScoreAction';
import ScoreSpectrum from '../../components/ScoreSpectrum';
import ScholasticCompetitiveIndex from '../../components/ScholasticCompetitiveIndex';
import PerformanceTrend from '../../components/PerformanceTrend';
import TableBottomSheet from '../../components/TableBottomSheet';
import {Row, Rows, Table} from 'react-native-reanimated-table';
import CompetitivePerformanceActivityCard from '../../components/CompetitivePerformanceAnalysisCard';
import ntse from '../../assets/images/exam_type/ntse.png';
import nstse from '../../assets/images/exam_type/nstse.png';
import geo_genious from '../../assets/images/exam_type/geo_genious.png';
import nso from '../../assets/images/exam_type/nso.png';
import imo from '../../assets/images/exam_type/imo.png';
const OverallCompetitivePerformanceScore = props => {
  const dispatch = useDispatch();
  const [scoreSpectrumTableVisible, setScoreSpectrumTableVisible] =
    useState(false);
  const [performanceAnalysisTableVisible, setPerformanceAnalysisTableVisible] =
    useState(false);
  const [performanceActivityTableVisible, setPerformanceActivityTableVisible] =
    useState(false);
  const {examType = '', item: routeItem} = props?.route?.params;

  const compareScholasticCompetitiveDatasets =
    useSelector(
      state => state.performance.compareScholasticCompetitiveDatasets,
    ) ?? [];
  const compareScholasticCompetitiveLabels =
    useSelector(
      state => state.performance.compareScholasticCompetitiveLabels,
    ) ?? [];
  const compititiveSetwiseScore = useSelector(
    state => state.performance.compititiveSetwiseScore,
  );
  const getcompetitiveSubjectAvgscore = useSelector(
    state => state.performance.getcompetitiveSubjectAvgscore,
  );

  const competitiveOverAllPerformance = useSelector(
    state => state.performance.competitiveOverAllPerformance,
  );
  useEffect(() => {
    if (examType !== '') {
      dispatch(getCompetitiveOverAllPerformanceData(examType, props));
      dispatch(
        getCompareScholasticCompetitiveDataDataDetails(examType, 0, props),
      );
      dispatch(getCompetitiveSetwiseScoreDataDetails(examType, props));
      dispatch(getcompetitiveSubjectAvgscoreDataDetails(examType, 0, props));
      return () => {
        // dispatch(
        //   getCompareScholasticCompetitiveDataAction({datasets: [], labels: []}),
        // );
        dispatch(competitiveOverAllPerformanceSuccessAction([]));
        dispatch(getCompetitiveSetwiseScoreSuccessAction([]));
        dispatch(getcompetitiveSubjectAvgscoreDataAction([]));
        dispatch(getCompareScholasticCompetitiveDataAction([]));
      };
    }
  }, [examType]);

  const leftIconHandeler = () => {
    props.navigation.goBack();
  };
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
        headerName={`${examType} Performance Score`}
        leftIcon="chevron-back"
        leftIconHandeler={leftIconHandeler}
      />
      <ImageBackground
        source={require('../../assets/images/competitive_background.png')}
        style={Gstyles.imageBackgroundContainer}>
        <View style={{width: '100%'}}>
          <View style={styles.subjectHolder}>
            <Text style={styles.subjectTitle}>{examType}</Text>
            <View style={{backgroundColor:'white', padding:4, borderRadius:6, marginLeft:10}}>
            <Image
              source={
                routeItem.id == 1
                  ? ntse
                  : routeItem.id == 2
                  ? nstse
                  : routeItem.id == 3
                  ? geo_genious
                  : routeItem.id == 4
                  ? nso
                  : routeItem.id == 5
                  ? imo
                  : null
              }
              style={styles.subjectImage}
            />
          </View>
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            {competitiveOverAllPerformance?.Competitive_avg && (
              <ScoreSpectrum
                value={competitiveOverAllPerformance?.Competitive_avg}
                onPressDetails={() => {
                  setScoreSpectrumTableVisible(true);
                }}
              />
            )}
            {getcompetitiveSubjectAvgscore !== undefined &&
              getcompetitiveSubjectAvgscore !== '' &&
              getcompetitiveSubjectAvgscore?.categories && (
                <PerformanceTrend
                  labels={getcompetitiveSubjectAvgscore?.categories ?? []}
                  data={getcompetitiveSubjectAvgscore?.series ?? []}
                  onPressDetails={() =>
                    setPerformanceAnalysisTableVisible(true)
                  }
                />
              )}
            {compareScholasticCompetitiveLabels.length !== 0 &&
              compareScholasticCompetitiveDatasets.length !== 0 && (
                <ScholasticCompetitiveIndex
                  pageHeading="Scholastic/Competitive Index (%)"
                  label={compareScholasticCompetitiveLabels}
                  dataSets={compareScholasticCompetitiveDatasets}
                />
              )}

            {compititiveSetwiseScore !== undefined &&
              compititiveSetwiseScore != '' && (
                <CompetitivePerformanceActivityCard
                  onPressSet={setNo => {
                    props.navigation.navigate('nonAuthScenes', {
                      screen: 'SubjectWiseCompetitiveScore',
                      params: {
                        examType: examType,
                        set_no: setNo.slice(3),
                      },
                    });
                  }}
                  labels={compititiveSetwiseScore?.categories}
                  data={compititiveSetwiseScore?.series}
                  onPressDetails={() =>
                    setPerformanceActivityTableVisible(true)
                  }
                />
              )}
          </View>
        </ScrollView>
        <TableBottomSheet
          title={'Weighted Average Performance'}
          description={`Competitive > ${examType} > Score Spectrum`}
          isVisible={scoreSpectrumTableVisible}
          onCloseRequest={() => setScoreSpectrumTableVisible(false)}>
          {competitiveOverAllPerformance?.competitntseary && (
            <ScrollView horizontal style={{maxHeight: 200}}>
              <Table borderStyle={{borderWidth: 5, borderColor: '#ffffff'}}>
                <Row
                  widthArr={[
                    100,
                    ...competitiveOverAllPerformance?.competitntseary.map(
                      item => 50,
                    ),
                    100,
                  ]}
                  data={[
                    'Label',
                    ...competitiveOverAllPerformance?.competitntseary.map(
                      item => {
                        return 'Set ' + item?.set_no;
                      },
                    ),
                    'Weightage',
                  ]}
                  style={{height: 40, backgroundColor: '#CAEBF9'}}
                  textStyle={{
                    textAlign: 'center',
                    fontSize: 10,
                    fontFamily: fonts.rBold,
                    color: '#777777',
                  }}
                />

                <Rows
                  data={[
                    [
                      'Competitive',
                      ...competitiveOverAllPerformance?.competitntseary.map(
                        item => {
                          return item?.total_correct_ans;
                        },
                      ),
                      competitiveOverAllPerformance?.Competitive_avg,
                    ],
                  ]}
                  widthArr={[
                    100,
                    ...competitiveOverAllPerformance?.competitntseary.map(
                      item => 50,
                    ),
                    100,
                  ]}
                  textStyle={{textAlign: 'center'}}
                  style={{backgroundColor: '#D1D3D4', height: 70}}
                />
              </Table>
            </ScrollView>
          )}
        </TableBottomSheet>
        <TableBottomSheet
          title={'Performance Trend'}
          description={`Competitive > ${examType} > Performance Trend`}
          isVisible={performanceAnalysisTableVisible}
          onCloseRequest={() => setPerformanceAnalysisTableVisible(false)}>
          {getcompetitiveSubjectAvgscore?.categories && (
            <ScrollView style={{maxHeight: 200}}>
              <Table borderStyle={{borderWidth: 5, borderColor: '#ffffff'}}>
                <Row
                  flexArr={[1, 1, 1]}
                  data={['Subject', 'Market trend(%)', 'Score']}
                  style={{height: 40, backgroundColor: '#CAEBF9'}}
                  textStyle={{
                    textAlign: 'center',
                    fontSize: 10,
                    fontFamily: fonts.rBold,
                    color: '#777777',
                  }}
                />

                <Rows
                  data={getcompetitiveSubjectAvgscore?.categories.map(
                    (item, index) => {
                      return [
                        item,
                        getcompetitiveSubjectAvgscore?.series[1].data[index],
                        getcompetitiveSubjectAvgscore?.series[2].data[index],
                      ];
                    },
                  )}
                  flexArr={[1, 1, 1]}
                  textStyle={{textAlign: 'center'}}
                  style={{backgroundColor: '#D1D3D4', height: 70}}
                />
              </Table>
            </ScrollView>
          )}
        </TableBottomSheet>
        <TableBottomSheet
          title={'Performance Activity'}
          description={`Competitive > ${examType} > Performance Activity`}
          isVisible={performanceActivityTableVisible}
          onCloseRequest={() => setPerformanceActivityTableVisible(false)}>
          {compititiveSetwiseScore?.categories && (
            <ScrollView style={{maxHeight: 200}}>
              <Table borderStyle={{borderWidth: 5, borderColor: '#ffffff'}}>
                <Row
                  flexArr={[1, 1]}
                  data={['Sets', 'Marks']}
                  style={{height: 40, backgroundColor: '#CAEBF9'}}
                  textStyle={{
                    textAlign: 'center',
                    fontSize: 15,
                    fontFamily: fonts.rBold,
                    color: '#777777',
                  }}
                />

                <Rows
                  data={compititiveSetwiseScore?.categories.map(
                    (item, index) => {
                      return [
                        item,
                        compititiveSetwiseScore?.series[0]?.data[index],
                      ];
                    },
                  )}
                  flexArr={[1, 1]}
                  textStyle={{textAlign: 'center'}}
                  style={{backgroundColor: '#D1D3D4', height: 70}}
                />
              </Table>
            </ScrollView>
          )}
        </TableBottomSheet>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default OverallCompetitivePerformanceScore;
const styles = StyleSheet.create({
  subjectHolder: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  subjectTitle: {
    fontFamily: fonts.rRegular,
    color: colors.textBlue,
    fontSize: 18,
  },
  subjectImage: {
    height: 35,
    width: 35,
    backgroundColor: 'white',
    borderRadius: 5,
    objectFit: 'contain',
  },
  scrollContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
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
