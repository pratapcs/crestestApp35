import React, { useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';
import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import { colors, fonts } from '../../styles/Crestest.config';
import {
  getScholasticChapterwiseAnalysisDataAction,
  getScholasticChapterwiseAnalysisDataDetails,
  getScholasticGetchapterwiseAnalysisCaseStudyDataDetails,
  getScholasticGetchapterwiseAnalysisCaseStudyAction
} from '../../store/actions/PerformanceScoreAction';
import TableBottomSheet from '../../components/TableBottomSheet';
import {
  Col,
  Row,
  Rows,
  Table,
  TableWrapper,
} from 'react-native-reanimated-table';
import GriponChapterCard from '../../components/GriponChapterCard';
import ActivityCheckCard from '../../components/ActivityCheckCard';

const ChapterWiseAnalysis = props => {
  // console.log("$$$$---props.route.params--", props.route.params.sortName)
  const { examType, subjectId, singleSubjectId, chapterId, sortName, subject } =
    props.route.params;
  const dispatch = useDispatch();
  const userStandard = useSelector(state => state.auth.standard);
  const userBoard = useSelector(state => state.auth.board_name);
  const board = useSelector(state => state.auth.board);
  const scholasticChaptersAnalysisDataPiechart = useSelector(
    state => state.performance.scholasticChaptersAnalysisDataPiechart,
  );
  const scholasticChaptersAnalysisDataTabledata = useSelector(
    state => state.performance.scholasticChaptersAnalysisDataTabledata,
  );
  const scholasticChaptersAnalysisCaseStudyDataPiechart = useSelector(
    state => state.performance.scholasticChaptersAnalysisCaseStudyDataPiechart,
  );
  const scholasticChaptersAnalysisCaseStudyDataTabledata = useSelector(
    state => state.performance.scholasticChaptersAnalysisCaseStudyDataTabledata,
  );

  const [tableVisible, setTableVisible] = useState(false);
  const [skillCheckTableVisible, setSkillCheckTableVisible] = useState(false);
  const [selectedPaiChartData, setSelectedPaiChartData] = useState({});
  const [chapterWiseDataList, setChapterWiseDataList] = useState([]);
  const [chapterWiseCssDataList, setChapterWiseCssDataList] = useState([]);

  const leftIconHandeler = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    if (scholasticChaptersAnalysisDataPiechart) {
      var tempChapterWiseData = [];
      if (Object.keys(scholasticChaptersAnalysisDataPiechart).length !== 0) {
        tempChapterWiseData = Object.keys(
          scholasticChaptersAnalysisDataPiechart,
        ).map(keys => {
          return {
            paiChartData: [
              {
                text: scholasticChaptersAnalysisDataPiechart[keys]
                  ?.total_correct_ans,
                value: parseInt(
                  scholasticChaptersAnalysisDataPiechart[keys]
                    ?.total_correct_ans,
                ),
                color: '#00B050',
                fieldName: 'Correct',
              },
              {
                text: scholasticChaptersAnalysisDataPiechart[keys]
                  ?.total_incorrect_ans,
                value: parseInt(
                  scholasticChaptersAnalysisDataPiechart[keys]
                    ?.total_incorrect_ans,
                ),
                color: '#A60000',
                fieldName: 'Incorrect',
              },
              {
                text: scholasticChaptersAnalysisDataPiechart[keys]
                  ?.total_not_attempted,
                value: parseInt(
                  scholasticChaptersAnalysisDataPiechart[keys]
                    ?.total_not_attempted,
                ),
                color: '#A6A6A6',
                fieldName: 'Not Attempted',
              },
            ],
            paiChartAllInOne: scholasticChaptersAnalysisDataPiechart[keys],
            stackBarData: [
              {
                stacks: scholasticChaptersAnalysisDataTabledata[keys]?.CSS != undefined ? [
                  {
                    value:
                      scholasticChaptersAnalysisDataTabledata[keys]?.SWA
                        ?.total_correct,
                    color: '#008EFA',
                    name: 'Correct SWA',
                    innerBarComponent: () => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles?.barInnerLableStyle}>
                          {
                            scholasticChaptersAnalysisDataTabledata[keys]?.SWA
                              ?.total_correct
                          }
                        </Text>
                      </View>
                    ),
                  },
                  {
                    value:
                      scholasticChaptersAnalysisDataTabledata[keys]?.HOT
                        ?.total_correct,
                    color: '#00E396',
                    name: 'Correct HOTS',
                    innerBarComponent: () => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles?.barInnerLableStyle}>
                          {
                            scholasticChaptersAnalysisDataTabledata[keys]?.HOT
                              ?.total_correct
                          }
                        </Text>
                      </View>
                    ),
                  },
                  {
                    value:
                      scholasticChaptersAnalysisDataTabledata[keys]?.DES
                        ?.total_correct,
                    color: '#FEB019',
                    name: 'Correct DES',
                    // borderTopLeftRadius: 10,
                    // borderTopRightRadius: 10,
                    innerBarComponent: () => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles?.barInnerLableStyle}>
                          {
                            scholasticChaptersAnalysisDataTabledata[keys]?.DES
                              ?.total_correct
                          }
                        </Text>
                      </View>
                    ),
                  },
                  {
                    value:
                      scholasticChaptersAnalysisDataTabledata[keys]?.CSS
                        ?.total_correct,
                    color: '#FFCCFF',
                    name: 'Correct CSS',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    innerBarComponent: () => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles?.barInnerLableStyle}>
                          {
                            scholasticChaptersAnalysisDataTabledata[keys]?.CSS
                              ?.total_correct
                          }
                        </Text>
                      </View>
                    ),
                  },
                ]
                  :
                  [
                    {
                      value:
                        scholasticChaptersAnalysisDataTabledata[keys]?.SWA
                          ?.total_correct,
                      color: '#008EFA',
                      name: 'Correct SWA',
                      innerBarComponent: () => (
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={styles?.barInnerLableStyle}>
                            {
                              scholasticChaptersAnalysisDataTabledata[keys]?.SWA
                                ?.total_correct
                            }
                          </Text>
                        </View>
                      ),
                    },
                    {
                      value:
                        scholasticChaptersAnalysisDataTabledata[keys]?.HOT
                          ?.total_correct,
                      color: '#00E396',
                      name: 'Correct HOTS',
                      innerBarComponent: () => (
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={styles?.barInnerLableStyle}>
                            {
                              scholasticChaptersAnalysisDataTabledata[keys]?.HOT
                                ?.total_correct
                            }
                          </Text>
                        </View>
                      ),
                    },
                    {
                      value:
                        scholasticChaptersAnalysisDataTabledata[keys]?.DES
                          ?.total_correct,
                      color: '#FEB019',
                      name: 'Correct DES',
                      // borderTopLeftRadius: 10,
                      // borderTopRightRadius: 10,
                      innerBarComponent: () => (
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={styles?.barInnerLableStyle}>
                            {
                              scholasticChaptersAnalysisDataTabledata[keys]?.DES
                                ?.total_correct
                            }
                          </Text>
                        </View>
                      ),
                    },
                  ]
                ,
                labelComponent: () => (
                  <View
                    style={{
                      marginRight: 10,
                    }}>
                    <Text style={{ textAlign: 'center' }}>
                      {
                        scholasticChaptersAnalysisDataPiechart[keys]
                          ?.chapter_heading
                      }
                    </Text>
                  </View>
                ),
                label:
                  scholasticChaptersAnalysisDataPiechart[keys]?.chapter_heading,
              },
            ],
            allTableData: scholasticChaptersAnalysisDataTabledata[keys],
            chapterName:
              scholasticChaptersAnalysisDataPiechart[keys]?.chapter_name,
            testNumber:
              scholasticChaptersAnalysisDataPiechart[keys]?.chapter_test,
            chapterHeader:
              scholasticChaptersAnalysisDataPiechart[keys]?.chapter_heading,
          };
        });
        setChapterWiseDataList(tempChapterWiseData);
      }
    }
  }, [scholasticChaptersAnalysisDataPiechart]);

  useEffect(() => {
    if (scholasticChaptersAnalysisCaseStudyDataPiechart) {
      var tempChapterWiseData = [];
      if (Object.keys(scholasticChaptersAnalysisCaseStudyDataPiechart).length !== 0) {
        tempChapterWiseData = Object.keys(
          scholasticChaptersAnalysisCaseStudyDataPiechart,
        ).map(keys => {
          return {
            paiChartData: [
              {
                text: scholasticChaptersAnalysisCaseStudyDataPiechart[keys]
                  ?.total_correct_ans,
                value: parseInt(
                  scholasticChaptersAnalysisCaseStudyDataPiechart[keys]
                    ?.total_correct_ans,
                ),
                color: '#00B050',
                fieldName: 'Correct',
              },
              {
                text: scholasticChaptersAnalysisCaseStudyDataPiechart[keys]
                  ?.total_incorrect_ans,
                value: parseInt(
                  scholasticChaptersAnalysisCaseStudyDataPiechart[keys]
                    ?.total_incorrect_ans,
                ),
                color: '#A60000',
                fieldName: 'Incorrect',
              },
              {
                text: scholasticChaptersAnalysisCaseStudyDataPiechart[keys]
                  ?.total_not_attempted,
                value: parseInt(
                  scholasticChaptersAnalysisCaseStudyDataPiechart[keys]
                    ?.total_not_attempted,
                ),
                color: '#A6A6A6',
                fieldName: 'Not Attempted',
              },
            ],
            paiChartAllInOne: scholasticChaptersAnalysisCaseStudyDataPiechart[keys],
            stackBarData: [
              {
                stacks: [
                  {
                    value:
                      scholasticChaptersAnalysisCaseStudyDataTabledata[keys]?.CSS
                        ?.total_correct,
                    color: '#FFCCFF',
                    name: 'Correct CSS',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    innerBarComponent: () => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles?.barInnerLableStyle}>
                          {
                            scholasticChaptersAnalysisCaseStudyDataTabledata[keys]?.CSS
                              ?.total_correct
                          }
                        </Text>
                      </View>
                    ),
                  },
                ],
                labelComponent: () => (
                  <View
                    style={{
                      marginRight: 10,
                    }}>
                    <Text style={{ textAlign: 'center' }}>
                      {
                        scholasticChaptersAnalysisCaseStudyDataPiechart[keys]
                          ?.chapter_heading
                      }
                    </Text>
                  </View>
                ),
                label:
                  scholasticChaptersAnalysisCaseStudyDataPiechart[keys]?.chapter_heading,
              },
            ],
            allTableData: scholasticChaptersAnalysisCaseStudyDataTabledata[keys],
            chapterName:
              scholasticChaptersAnalysisCaseStudyDataPiechart[keys]?.chapter_name,
            testNumber:
              scholasticChaptersAnalysisCaseStudyDataPiechart[keys]?.chapter_test,
            chapterHeader:
              scholasticChaptersAnalysisCaseStudyDataPiechart[keys]?.chapter_heading,
          };
        });
        setChapterWiseCssDataList(tempChapterWiseData);
      }
    }
  }, [scholasticChaptersAnalysisCaseStudyDataPiechart]);


  useEffect(() => {
    if (
      examType !== undefined &&
      subjectId !== undefined &&
      singleSubjectId !== undefined &&
      chapterId !== undefined
    ) {
      dispatch(
        getScholasticChapterwiseAnalysisDataDetails(
          chapterId,
          singleSubjectId,
          examType,
          subjectId,
          props,
        ),
      );
      if (props.route.params.sortName == "CTL" && board == 2) {
        dispatch(
          getScholasticGetchapterwiseAnalysisCaseStudyDataDetails(
            chapterId,
            singleSubjectId,
            examType,
            subjectId,
            props,
          ),
        );
      }
      return () => {
        dispatch(getScholasticChapterwiseAnalysisDataAction([]));
        dispatch(getScholasticGetchapterwiseAnalysisCaseStudyAction([]));
      };
    }
  }, [chapterId, singleSubjectId, examType, subjectId]);

  const elementButton = (value, color) => (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: fonts.rBold,
          color: '#777777cf',
          fontSize: 8,
        }}>
        {value}
      </Text>
    </View>
  );
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
        headerName={`Chapterwise Analysis ${sortName}`}
        leftIcon="chevron-back"
        leftIconHandeler={leftIconHandeler}
      />
      {/* {console.log("scholasticChaptersAnalysisCaseStudyDataPiechart---", scholasticChaptersAnalysisCaseStudyDataPiechart)} */}
      
      {/* {console.log("scholasticChaptersAnalysisCaseStudyDataTabledata---", scholasticChaptersAnalysisCaseStudyDataTabledata)} */}
      {/* {console.log("chapterWiseCssDataList---", chapterWiseCssDataList)} */}
      <ImageBackground
        source={require('../../assets/images/scholastic_background.png')}
        style={Gstyles.imageBackgroundContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}>
          {chapterWiseDataList.map((chapterData, index) => (
            <View style={{ width: '100%', alignItems: 'center' }} key={index}>
              <GriponChapterCard
                title={`Grip on Chapter - ${sortName}`}
                desc={`${sortName === 'CTL' ? subject + ' >' : ''} ${sortName === 'CTL'
                  ? 'Ch Test ' + chapterData?.testNumber
                  : chapterData?.chapterHeader
                  } > ${chapterData?.chapterName}`}
                data={chapterData?.paiChartData ?? []}
                onPressDetails={() => {
                  setSelectedPaiChartData(chapterData);
                  setTableVisible(true);
                }}
              />
              <ActivityCheckCard
                title={`Activity Check - ${sortName}`}
                desc={chapterData?.chapterHeader}
                data={chapterData?.stackBarData ?? []}
                onPressDetails={() => {
                  setSelectedPaiChartData(chapterData);
                  setSkillCheckTableVisible(true);
                }}
              />

            </View>
          ))}
          <View style={{ width: '100%', alignItems: 'center' }}>
            {chapterWiseCssDataList.length ?
              <>
                <GriponChapterCard
                  title={`Grip on Chapter - ${sortName}`}
                  desc={`${sortName === 'CTL' ? subject + ' >' : ''} ${sortName === 'CTL'
                    ? 'Case Study'
                    : chapterWiseCssDataList[0]?.chapterName
                    } > ${chapterWiseCssDataList[0]?.chapterName}`}
                  data={chapterWiseCssDataList[0]?.paiChartData ?? []}
                  onPressDetails={() => {
                    setSelectedPaiChartData(chapterWiseCssDataList[0]);
                    setTableVisible(true);
                  }}
                />
                <ActivityCheckCard
                  title={`Activity Check - ${sortName}`}
                  desc={chapterWiseCssDataList[0]?.chapterHeader}
                  data={chapterWiseCssDataList[0]?.stackBarData ?? []}
                  onPressDetails={() => {
                    setSelectedPaiChartData(chapterWiseCssDataList[0]);
                    setSkillCheckTableVisible(true);
                  }}
                />
              </>
              :
              null
            }
          </View>
        </ScrollView>
        <TableBottomSheet
          title={`Finished Figures - ${sortName}`}
          description={
            sortName == 'CTL'
              ? `Scholastic > ${userBoard}:${userStandard} > Chapter Test > ${subject} ${selectedPaiChartData?.testNumber == 'Case Study' ? '> ' + selectedPaiChartData?.testNumber : '> Ch Test' + selectedPaiChartData?.testNumber} > ${selectedPaiChartData?.chapterName}`
              : `Scholastic > ${userBoard}:${userStandard} > Module >  ${subject}`
          }
          isVisible={tableVisible}
          onCloseRequest={() => setTableVisible(false)}>
          <Table
            borderStyle={{ borderWidth: 5, borderColor: '#ffffff' }}
            style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Row
              data={[
                elementButton(' ', '#fff'),
                'Correct',
                'Incorrect',
                'Not attempted',
                'TOTAL',
              ]}
              style={{ height: 40, backgroundColor: '#CAEBF9' }}
              widthArr={[65, 65, 65, 65, 65]}
              textStyle={{
                textAlign: 'center',
                fontFamily: fonts.rBold,
                color: '#777777',
                fontSize: 10,
              }}
            />
            <TableWrapper style={{ flexDirection: 'row' }}>
              <Col
                width={65}
                data={[
                  sortName == 'CTL'
                    ? 'Ch Test ' + selectedPaiChartData?.testNumber
                    : selectedPaiChartData?.chapterHeader,
                ]}
                heightArr={[40]}
                textStyle={{ textAlign: 'center', fontSize: 10 }}
                style={{
                  backgroundColor: '#F9DCDC',
                }}
              />
              <Rows
                widthArr={[65, 65, 65, 65]}
                data={[
                  [
                    selectedPaiChartData?.paiChartAllInOne?.total_correct_ans,
                    selectedPaiChartData?.paiChartAllInOne?.total_incorrect_ans,
                    selectedPaiChartData?.paiChartAllInOne?.total_not_attempted,
                    selectedPaiChartData?.paiChartAllInOne?.total_question,
                  ],
                ]}
                textStyle={{ textAlign: 'center' }}
                style={{ backgroundColor: '#D1D3D4', height: 40 }}
              />
            </TableWrapper>
          </Table>
        </TableBottomSheet>
        <TableBottomSheet
          title={`Skill Scan - ${sortName}`}
          description={
            sortName == 'CTL'
              ? `Scholastic > ${userBoard}:${userStandard} ${selectedPaiChartData?.testNumber == 'Case Study' ? '> ' + selectedPaiChartData?.testNumber : '> Ch Test'} > ${selectedPaiChartData?.testNumber == 'Case Study' ? selectedPaiChartData?.chapterName : subject}`
              : sortName == 'MOL'
                ? `Scholastic > ${userBoard}:${userStandard} > Module >  ${subject}`
                : `Scholastic > ${userBoard}:${userStandard} > Mock >  ${subject}`
          }
          isVisible={skillCheckTableVisible}
          onCloseRequest={() => setSkillCheckTableVisible(false)}>
          <ScrollView horizontal>
            <Table
              borderStyle={{ borderWidth: 5, borderColor: '#ffffff' }}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Row
                data={sortName == 'CTL' && selectedPaiChartData?.testNumber != 'Case Study' ? [
                  elementButton(' ', '#fff'),
                  'SWA',
                  'HOT',
                  'DES',
                  'TOTAL',
                ] : sortName == 'CTL' && selectedPaiChartData?.testNumber == 'Case Study' ? [
                  elementButton(' ', '#fff'),
                  'CSS',
                  'TOTAL',
                ] :
                  [
                    elementButton(' ', '#fff'),
                    'SWA',
                    'HOT',
                    'DES',
                    'CSS',
                    'TOTAL',
                  ]
                }
                style={{ height: 40, backgroundColor: '#E8E8E8' }}
                widthArr={sortName == 'CTL' && selectedPaiChartData?.testNumber != 'Case Study' ? [65, 100, 100, 100, 100] : sortName == 'CTL' && selectedPaiChartData?.testNumber == 'Case Study' ? [65, 100, 100,] : [65, 100, 100, 100, 100, 100]}
                textStyle={{
                  textAlign: 'center',
                  fontFamily: fonts.rBold,
                  color: '#777777',
                  fontSize: 10,
                }}
              />
              <Row
                data={sortName == 'CTL' && selectedPaiChartData?.testNumber != 'Case Study' ? [
                  elementButton(' ', '#fff'),
                  elementButton('Correct', '#008EFA'),
                  elementButton('Marks', '#CAEBF9'),
                  elementButton('Correct', '#55BE8A'),
                  elementButton('Marks', '#CAEBF9'),
                  elementButton('Correct', '#FCAF1C'),
                  elementButton('Marks', '#CAEBF9'),
                  elementButton('Correct', '#F7C79F'),
                  elementButton('Marks', '#CAEBF9'),
                ] : sortName == 'CTL' && selectedPaiChartData?.testNumber == 'Case Study' ? [
                  elementButton(' ', '#fff'),
                  elementButton('Correct', '#FFCCFF'),
                  elementButton('Marks', '#CAEBF9'),
                  elementButton('Correct', '#F7C79F'),
                  elementButton('Marks', '#CAEBF9'),
                ]
                  :
                  [
                    elementButton(' ', '#fff'),
                    elementButton('Correct', '#008EFA'),
                    elementButton('Marks', '#CAEBF9'),
                    elementButton('Correct', '#55BE8A'),
                    elementButton('Marks', '#CAEBF9'),
                    elementButton('Correct', '#FCAF1C'),
                    elementButton('Marks', '#CAEBF9'),
                    elementButton('Correct', '#FFCCFF'),
                    elementButton('Marks', '#CAEBF9'),
                    elementButton('Correct', '#F7C79F'),
                    elementButton('Marks', '#CAEBF9'),
                  ]
                }
                style={{ height: 40 }}
                widthArr={sortName == 'CTL' && selectedPaiChartData?.testNumber != 'Case Study' ? [65, 50, 50, 50, 50, 50, 50, 50, 50] : sortName == 'CTL' && selectedPaiChartData?.testNumber == 'Case Study' ? [65, 50, 50, 50, 50] : [65, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]}
                textStyle={{
                  textAlign: 'center',
                  fontFamily: fonts.rRegular,
                  fontSize: 10,
                }}
              />
              <TableWrapper style={{ flexDirection: 'row' }}>
                <Col
                  width={65}
                  data={[
                    sortName === 'CTL' && selectedPaiChartData?.testNumber != 'Case Study'
                      ? `Ch Test ${selectedPaiChartData?.testNumber}` : sortName === 'CTL' && selectedPaiChartData?.testNumber == 'Case Study' ? `${selectedPaiChartData?.testNumber} ${selectedPaiChartData?.chapterName}`
                        : selectedPaiChartData?.chapterHeader,
                  ]}
                  heightArr={[40]}
                  textStyle={{ textAlign: 'center', fontSize: 10 }}
                  style={{
                    backgroundColor: '#F9DCDC',
                  }}
                />
                <Rows
                  widthArr={sortName == 'CTL' && selectedPaiChartData?.testNumber != 'Case Study' ? [50, 50, 50, 50, 50, 50, 50, 50] : sortName == 'CTL' && selectedPaiChartData?.testNumber == 'Case Study' ? [50, 50, 50, 50,] : [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]}
                  data={[sortName == 'CTL' && selectedPaiChartData?.testNumber != 'Case Study' ?
                    [
                      elementData(
                        selectedPaiChartData?.allTableData?.SWA?.total_correct,
                        '#F1F2F2',
                      ),
                      elementData(
                        selectedPaiChartData?.allTableData?.SWA?.total_marks,
                        '#D1D3D4',
                      ),
                      elementData(
                        selectedPaiChartData?.allTableData?.HOT?.total_correct,
                        '#F1F2F2',
                      ),
                      elementData(
                        selectedPaiChartData?.allTableData?.HOT?.total_marks,
                        '#D1D3D4',
                      ),
                      elementData(
                        selectedPaiChartData?.allTableData?.DES?.total_correct,
                        '#F1F2F2',
                      ),
                      elementData(
                        selectedPaiChartData?.allTableData?.DES?.total_marks,
                        '#D1D3D4',
                      ),
                      elementData(
                        selectedPaiChartData?.allTableData?.total
                          ?.total_correct,
                        '#F1F2F2',
                      ),
                      elementData(
                        selectedPaiChartData?.allTableData?.total?.total_marks,
                        '#D1D3D4',
                      ),
                    ]
                    : sortName == 'CTL' && selectedPaiChartData?.testNumber == 'Case Study' ?
                      [
                        elementData(
                          selectedPaiChartData?.allTableData?.CSS?.total_correct,
                          '#F1F2F2',
                        ),
                        elementData(
                          selectedPaiChartData?.allTableData?.CSS?.total_marks,
                          '#D1D3D4',
                        ),
                        elementData(
                          selectedPaiChartData?.allTableData?.total
                            ?.total_correct,
                          '#F1F2F2',
                        ),
                        elementData(
                          selectedPaiChartData?.allTableData?.total?.total_marks,
                          '#D1D3D4',
                        ),
                      ]
                      :
                      [
                        elementData(
                          selectedPaiChartData?.allTableData?.SWA?.total_correct,
                          '#F1F2F2',
                        ),
                        elementData(
                          selectedPaiChartData?.allTableData?.SWA?.total_marks,
                          '#D1D3D4',
                        ),
                        elementData(
                          selectedPaiChartData?.allTableData?.HOT?.total_correct,
                          '#F1F2F2',
                        ),
                        elementData(
                          selectedPaiChartData?.allTableData?.HOT?.total_marks,
                          '#D1D3D4',
                        ),
                        elementData(
                          selectedPaiChartData?.allTableData?.DES?.total_correct,
                          '#F1F2F2',
                        ),
                        elementData(
                          selectedPaiChartData?.allTableData?.DES?.total_marks,
                          '#D1D3D4',
                        ),
                        elementData(
                          selectedPaiChartData?.allTableData?.CSS?.total_correct,
                          '#F1F2F2',
                        ),
                        elementData(
                          selectedPaiChartData?.allTableData?.CSS?.total_marks,
                          '#D1D3D4',
                        ),
                        elementData(
                          selectedPaiChartData?.allTableData?.total
                            ?.total_correct,
                          '#F1F2F2',
                        ),
                        elementData(
                          selectedPaiChartData?.allTableData?.total?.total_marks,
                          '#D1D3D4',
                        ),
                      ],
                  ]}
                  textStyle={{ textAlign: 'center' }}
                  style={{ height: 40 }}
                />
              </TableWrapper>
            </Table>
          </ScrollView>
        </TableBottomSheet>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChapterWiseAnalysis;

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
    marginLeft: 10,
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
  barInnerLableStyle: {
    fontFamily: fonts?.rRegular,
    fontSize: 15,
    color: 'white',
  },
});
