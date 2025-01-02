import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';

import {container} from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import {
  clearCompetitiveSetWiseSatMatData,
  getAllSubjectWiseCompetitiveScore,
  getAllSubjectWiseCompetitiveScoreWithoutMat,
} from '../../store/actions/PerformanceScoreAction';
import {colors, fonts} from '../../styles/Crestest.config';
import TableBottomSheet from '../../components/TableBottomSheet';
import {
  Col,
  Row,
  Rows,
  Table,
  TableWrapper,
} from 'react-native-reanimated-table';
import CompetitiveGradeGridCard from '../../components/CompetitiveGradeGridCard';
import CompetitiveSubjectAnalysisCard from '../../components/CompetitiveSubjectAnalysisCard';

const SubjectWiseCompetitiveScore = props => {
  const dispatch = useDispatch();
  const {examType = '', set_no = ''} = props?.route?.params;
  const [satScore, setSatScore] = useState([]);
  const [matScore, setMatScore] = useState([]);
  const [satScoreSubject, setSatScoreSubject] = useState([]);
  const [matScoreSubject, setMatScoreSubject] = useState([]);
  const [satScoreTableVisible, setSatScoreTableVisible] = useState(false);
  const [matScoreTableVisible, setMatScoreTableVisible] = useState(false);
  const [satSubjectTableVisible, setSatSubjectTableVisible] = useState(false);
  const [matSubjectTableVisible, setMatSubjectTableVisible] = useState(false);
  const getcompetitiveSetwiseSatScore = useSelector(
    state => state.performance.getcompetitiveSetwiseSatScore,
  );
  const getcompetitiveSwiseMatScore = useSelector(
    state => state.performance.getcompetitiveSwiseMatScore,
  );
  const competitiveSetwiseSatScoreSubject = useSelector(
    state => state.performance.competitiveSetwiseSatScoreSubject,
  );

  const competitiveSetwiseMatScoreSubject = useSelector(
    state => state.performance.competitiveSetwiseMatScoreSubject,
  );

  useEffect(() => {
    if (
      getcompetitiveSetwiseSatScore !== undefined &&
      getcompetitiveSetwiseSatScore !== ''
    ) {
      setSatScore([
        {
          text: getcompetitiveSetwiseSatScore?.correct_record,
          value: parseInt(getcompetitiveSetwiseSatScore?.correct_record),
          color: '#00B050',
          fieldName: 'Correct',
        },
        {
          text: getcompetitiveSetwiseSatScore?.incorrect_record,
          value: parseInt(getcompetitiveSetwiseSatScore?.incorrect_record),
          color: '#A60000',
          fieldName: 'Incorrect',
        },
        {
          text: getcompetitiveSetwiseSatScore?.not_attempted,
          value: parseInt(getcompetitiveSetwiseSatScore?.not_attempted),
          color: '#A6A6A6',
          fieldName: 'Not Attempted',
        },
      ]);
    }
  }, [getcompetitiveSetwiseSatScore]);

  useEffect(() => {
    if (examType === 'NTSE') {
      if (
        getcompetitiveSwiseMatScore !== undefined &&
        getcompetitiveSwiseMatScore !== ''
      ) {
        setMatScore([
          {
            text: getcompetitiveSwiseMatScore?.correct_record,
            value: parseInt(getcompetitiveSwiseMatScore?.correct_record),
            color: '#00B050',
            fieldName: 'Correct',
          },
          {
            text: getcompetitiveSwiseMatScore?.incorrect_record,
            value: parseInt(getcompetitiveSwiseMatScore?.incorrect_record),
            color: '#A60000',
            fieldName: 'Incorrect',
          },
          {
            text: getcompetitiveSwiseMatScore?.not_attempted,
            value: parseInt(getcompetitiveSwiseMatScore?.not_attempted),
            color: '#A6A6A6',
            fieldName: 'Not Attempted',
          },
        ]);
      }
    }
  }, [getcompetitiveSwiseMatScore]);

  useEffect(() => {
    if (competitiveSetwiseSatScoreSubject?.series) {
      setSatScoreSubject([
        {
          stacks: competitiveSetwiseSatScoreSubject?.series[0]?.map(
            (item, index) => {
              return {
                value: item?.data[0],
                color: competitiveSetwiseSatScoreSubject?.colors[index],
                name: item?.name,
                
              };
            },
          ),
          labelComponent: () => (
            <View style={{flex: 1, marginRight: 10}}>
              <Text style={{textAlign: 'center'}}>{'SAT'}</Text>
            </View>
          ),
          label: 'SAT',
        },
      ]);
    }
  }, [competitiveSetwiseSatScoreSubject]);

  useEffect(() => {
    if (examType === 'NTSE') {
      if (competitiveSetwiseMatScoreSubject?.series) {
        setMatScoreSubject([
          {
            stacks: competitiveSetwiseMatScoreSubject?.series[0]?.map(
              (item, index) => {
                return {
                  value: item?.data[0],
                  color: competitiveSetwiseMatScoreSubject?.colors[index],
                  name: item?.name
                };
              },
            ),
            labelComponent: () => (
              <View style={{flex: 1, marginRight: 10}}>
                <Text style={{textAlign: 'center'}}>{'MAT'}</Text>
              </View>
            ),
            label: 'MAT',
          },
        ]);
      }
    }
  }, [competitiveSetwiseMatScoreSubject]);

  useEffect(() => {
    if (examType !== '' && set_no !== '') {
      if (examType === 'NTSE') {
        dispatch(getAllSubjectWiseCompetitiveScore(set_no, examType, props));
      } else {
        dispatch(
          getAllSubjectWiseCompetitiveScoreWithoutMat(set_no, examType, props),
        );
      }
      return () => {
        dispatch(clearCompetitiveSetWiseSatMatData());
      };
    }
  }, [examType, set_no]);

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
        headerName={`${examType} Subjectwise Competitive Score`}
        leftIcon="chevron-back"
        leftIconHandeler={leftIconHandeler}
      />
      <ImageBackground
        source={require('../../assets/images/competitive_background.png')}
        style={Gstyles.imageBackgroundContainer}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            {satScore?.length !== 0 && (
              <CompetitiveGradeGridCard
                title={
                  examType == 'NTSE'
                    ? 'Grade Grid - Set (SAT)'
                    : 'Set Wise Score'
                }
                desc={''}
                subject={''}
                onPressDetails={() => {
                  setSatScoreTableVisible(true);
                }}
                onPressMoreDetails={() => {
                  props.navigation.navigate('nonAuthScenes', {
                    screen: 'CompetitiveSubjectwiseAnalysisOnSet',
                    params: {
                      examType: examType,
                      set_no: set_no,
                      subType: 'SAT',
                    },
                  });
                }}
                data={satScore}
              />
            )}
            {satScoreSubject && satScoreSubject.length !== 0 && (
              <CompetitiveSubjectAnalysisCard
                data={satScoreSubject}
                title={'Subject Analysis - Set'}
                onPressDetails={() => setSatSubjectTableVisible(true)}
              />
            )}

            {examType === 'NTSE' && matScore?.length !== 0 && (
              <CompetitiveGradeGridCard
                title={'Grade Grid - Set (MAT)'}
                desc={''}
                subject={''}
                onPressDetails={() => {
                  setMatScoreTableVisible(true);
                }}
                onPressMoreDetails={() => {
                  props.navigation.navigate('nonAuthScenes', {
                    screen: 'CompetitiveSubjectwiseAnalysisOnSet',
                    params: {
                      examType: examType,
                      set_no: set_no,
                      subType: 'MAT',
                    },
                  });
                }}
                data={matScore}
              />
            )}
            {examType === 'NTSE' &&
              matScoreSubject &&
              matScoreSubject.length !== 0 && (
                <CompetitiveSubjectAnalysisCard
                  data={matScoreSubject}
                  title={'Subject Analysis - Set'}
                  onPressDetails={() => setMatSubjectTableVisible(true)}
                />
              )}
          </View>
        </ScrollView>
        <TableBottomSheet
          title={
            examType == 'NTSE' ? 'Score Grid - Set (SAT)' : 'Score grid - Set'
          }
          description={`Competitive > ${examType} > ${
            examType == 'NTSE' ? 'Grade Grid - Set (SAT)' : 'Score grid - Set'
          }`}
          isVisible={satScoreTableVisible}
          onCloseRequest={() => setSatScoreTableVisible(false)}>
          <View style={{minHeight: 80}}>
            {getcompetitiveSetwiseSatScore?.correct_record !== undefined && (
              <Table borderStyle={{borderWidth: 5, borderColor: '#ffffff'}}>
                <Row
                  flexArr={[1, 1, 1, 1]}
                  data={['Set', 'Correct', 'Incorrect', 'Not\n attempted']}
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
                      set_no,
                      getcompetitiveSetwiseSatScore?.correct_record,
                      getcompetitiveSetwiseSatScore?.incorrect_record,
                      getcompetitiveSetwiseSatScore?.not_attempted,
                    ],
                  ]}
                  flexArr={[1, 1, 1, 1]}
                  textStyle={{textAlign: 'center'}}
                  style={{backgroundColor: '#D1D3D4', height: 40}}
                />
              </Table>
            )}
          </View>
        </TableBottomSheet>
        <TableBottomSheet
          title={'Score Grid - Set (MAT)'}
          description={`Competitive > ${examType} > Grade Grid - Set (MAT)`}
          isVisible={matScoreTableVisible}
          onCloseRequest={() => setMatScoreTableVisible(false)}>
          <View style={{minHeight: 80}}>
            {getcompetitiveSwiseMatScore?.correct_record !== undefined && (
              <Table borderStyle={{borderWidth: 5, borderColor: '#ffffff'}}>
                <Row
                  flexArr={[1, 1, 1, 1]}
                  data={['MAT', 'Correct', 'Incorrect', 'Not\n attempted']}
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
                      set_no,
                      getcompetitiveSwiseMatScore?.correct_record,
                      getcompetitiveSwiseMatScore?.incorrect_record,
                      getcompetitiveSwiseMatScore?.not_attempted,
                    ],
                  ]}
                  flexArr={[1, 1, 1, 1]}
                  textStyle={{textAlign: 'center'}}
                  style={{backgroundColor: '#D1D3D4', height: 40}}
                />
              </Table>
            )}
          </View>
        </TableBottomSheet>
        <TableBottomSheet
          title={'Subject Activity - Set'}
          description={`Competitive > ${examType} > Subject Analysis - Set`}
          isVisible={satSubjectTableVisible}
          onCloseRequest={() => setSatSubjectTableVisible(false)}>
          <View style={{maxHeight: 300, marginTop: 10}}>
            <ScrollView>
              <ScrollView horizontal>
                {competitiveSetwiseSatScoreSubject?.table_data !==
                  undefined && (
                  <Table borderStyle={{borderWidth: 5, borderColor: '#ffffff'}}>
                    <Row
                      widthArr={[100, 80, 60, 60, 60, 60, 60, 60]}
                      data={[
                        'Set',
                        'Subject',
                        'Total qs',
                        'Attempted',
                        'Correct',
                        'Not attempted',
                        'Incorrect',
                        'Score',
                      ]}
                      style={{height: 40, backgroundColor: '#CAEBF9'}}
                      textStyle={{
                        textAlign: 'center',
                        fontSize: 10,
                        fontFamily: fonts.rBold,
                        color: '#777777',
                      }}
                    />
                    <TableWrapper style={{flexDirection: 'row'}}>
                      <Col
                        data={[set_no]}
                        heightArr={[
                          40 *
                            competitiveSetwiseSatScoreSubject?.table_data
                              ?.length,
                        ]}
                        width={100}
                        style={{backgroundColor: '#D1D3D4'}}
                        textStyle={{textAlign: 'center'}}
                      />
                      <Rows
                        data={competitiveSetwiseSatScoreSubject?.table_data.map(
                          item => {
                            return [
                              item?.name,
                              item?.total_questions,
                              item?.attempt_record,
                              item?.correct_record,
                              item?.notattempt_record,
                              item?.incorrect_record,
                              item?.marks,
                            ];
                          },
                        )}
                        widthArr={[80, 60, 60, 60, 60, 60, 60]}
                        textStyle={{textAlign: 'center'}}
                        style={{backgroundColor: '#D1D3D4', height: 40}}
                      />
                    </TableWrapper>
                  </Table>
                )}
              </ScrollView>
            </ScrollView>
          </View>
        </TableBottomSheet>
        <TableBottomSheet
          title={'Subject Activity - Set'}
          description={`Competitive > ${examType} > Subject Analysis - Set`}
          isVisible={matSubjectTableVisible}
          onCloseRequest={() => setMatSubjectTableVisible(false)}>
          <View style={{maxHeight: 300, marginTop: 10}}>
            <ScrollView>
              <ScrollView horizontal>
                {competitiveSetwiseMatScoreSubject?.table_data !==
                  undefined && (
                  <Table borderStyle={{borderWidth: 5, borderColor: '#ffffff'}}>
                    <Row
                      widthArr={[100, 80, 60, 60, 60, 60, 60, 60]}
                      data={[
                        `Set ${set_no}`,
                        'Subject',
                        'Total Qs',
                        'Attempted',
                        'Correct',
                        'Not Attempted',
                        'Incorrect',
                        'Score',
                      ]}
                      style={{height: 40, backgroundColor: '#CAEBF9'}}
                      textStyle={{
                        textAlign: 'center',
                        fontSize: 10,
                        fontFamily: fonts.rBold,
                        color: '#777777',
                      }}
                    />
                    <TableWrapper style={{flexDirection: 'row'}}>
                      <Col
                        data={['MAT']}
                        heightArr={[
                          40 *
                            competitiveSetwiseMatScoreSubject?.table_data
                              ?.length,
                        ]}
                        width={100}
                        style={{backgroundColor: '#D1D3D4'}}
                        textStyle={{textAlign: 'center'}}
                      />
                      <Rows
                        data={competitiveSetwiseMatScoreSubject?.table_data.map(
                          item => {
                            return [
                              item?.name,
                              item?.total_questions,
                              item?.attempt_record,
                              item?.correct_record,
                              item?.notattempt_record,
                              item?.incorrect_record,
                              item?.marks,
                            ];
                          },
                        )}
                        widthArr={[80, 60, 60, 60, 60, 60, 60]}
                        textStyle={{textAlign: 'center'}}
                        style={{backgroundColor: '#D1D3D4', height: 40}}
                      />
                    </TableWrapper>
                  </Table>
                )}
              </ScrollView>
            </ScrollView>
          </View>
        </TableBottomSheet>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SubjectWiseCompetitiveScore;

const styles = StyleSheet.create({
  barInnerLableStyle: {
    fontFamily: fonts?.rRegular,
    fontSize: 5,
    color: 'white',
  },
});
