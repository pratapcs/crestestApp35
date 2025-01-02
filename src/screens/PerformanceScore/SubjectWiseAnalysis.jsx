import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';
import {container} from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import {colors, fonts} from '../../styles/Crestest.config';
import SubjectAnalysisCard from '../../components/SubjectAnalysisCard';
import {
  getScholasticGetsubjectwiseChaptersDataDetails,
  getscholasticGetsubjectwiseChaptersAction,
  scholasticGetsubjectwiseChaptersTableDataAction,
  scholasticGetsubjectwiseChaptersTableDataDetails,
} from '../../store/actions/PerformanceScoreAction';
import TableBottomSheet from '../../components/TableBottomSheet';
import {capitalizeFirstLetter} from '../../utils/StringUtil';
import {
  Col,
  Row,
  Rows,
  Table,
  TableWrapper,
} from 'react-native-reanimated-table';
import {ActivityIndicator} from 'react-native-paper';

const SubjectWiseAnalysis = props => {
  const dispatch = useDispatch();
  const userStandard = useSelector(state => state.auth.standard);
  
  const userBoard = useSelector(state => state.auth.board_name);
  const scholasticGetsubjectwiseChaptersPiechart = useSelector(
    state => state.performance.scholasticGetsubjectwiseChaptersPiechart,
  );
  const scholasticGetsubjectwiseChaptersTabledata = useSelector(
    state => state.performance.scholasticGetsubjectwiseChaptersTabledata,
  );
  const scholasticSetTableData =
    useSelector(state => state.performance.scholasticSetTableData) ?? [];
  const [subjectWiseList, setSubjectWiseList] = useState([]);
  const [tableVisible, setTableVisible] = useState(false);
  const [moduleMockTableVisible, setModuleMockTableVisible] = useState(false);
  const [moduleMockTableData, setModuleMockTableData] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState('');
  const {examType, subjectId, sortName, subject} = props.route.params;
  const leftIconHandeler = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    if (tableVisible) {
      dispatch(
        scholasticGetsubjectwiseChaptersTableDataDetails(
          selectedSubject,
          examType,
          subjectId,
          props,
        ),
      );
      return () => {
        dispatch(scholasticGetsubjectwiseChaptersTableDataAction([]));
      };
    }
  }, [tableVisible, selectedSubject]);

  useEffect(() => {
    if (examType !== undefined && subjectId !== undefined) {
      dispatch(
        getScholasticGetsubjectwiseChaptersDataDetails(
          examType,
          subjectId,
          props,
        ),
      );
      return () => {
        dispatch(getscholasticGetsubjectwiseChaptersAction([]));
      };
    }
  }, [examType, subjectId]);

  useEffect(() => {
    if (scholasticGetsubjectwiseChaptersPiechart) {
      const convertedData = [];

      for (const [subject, values] of Object.entries(
        scholasticGetsubjectwiseChaptersPiechart,
      )) {
        const subjectData = {
          subject: subject,
          color: values[Object.keys(values)[0]][4],
          centerText: values[Object.keys(values)[0]][3],
          data: [],
        };

        for (const [key, value] of Object.entries(values)) {
          const dataItem = {
            value: parseFloat(value[0]),
            color: values[Object.keys(values)[0]][4],
            text: key,
            chapter: value[1],
            subject: value[2],
          };
          subjectData.data.push(dataItem);
        }

        convertedData.push(subjectData);
      }
      setSubjectWiseList(convertedData);
    }
  }, [scholasticGetsubjectwiseChaptersPiechart]);

  useEffect(() => {
    if (
      scholasticGetsubjectwiseChaptersTabledata !== undefined &&
      Object.keys(scholasticGetsubjectwiseChaptersTabledata).length !== 0 &&
      selectedSubject !== ''
    ) {
      setModuleMockTableData(
        scholasticGetsubjectwiseChaptersTabledata[selectedSubject],
      );
    }
  }, [scholasticGetsubjectwiseChaptersTabledata, selectedSubject]);

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
          color: '#777777',
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
        headerName={`Subjectwise Analysis ${sortName}`}
        leftIcon="chevron-back"
        leftIconHandeler={leftIconHandeler}
      />
      <ImageBackground
        source={require('../../assets/images/scholastic_background.png')}
        style={Gstyles.imageBackgroundContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          {subjectWiseList.map((item, index) => {
            return (
              <SubjectAnalysisCard
                key={index}
                isSelected={
                  item?.subject?.toLowerCase() === subject.toLowerCase()
                }
                title={`${sortName} Analysis - ${item?.subject}`}
                data={item?.data}
                centerLabel={item?.centerText}
                subject={item?.subject}
                onPressPaiData={event => {
                  props.navigation.navigate('nonAuthScenes', {
                    screen: 'ChapterWiseAnalysis',
                    params: {
                      subjectId,
                      examType,
                      sortName,
                      chapterId: event?.chapter,
                      singleSubjectId: event.subject,
                      subject: item?.subject,
                    },
                  });
                }}
                onPressDetails={sub => {
                  if (sortName === 'CTL') {
                    setTableVisible(true);
                  } else {
                    setModuleMockTableVisible(true);
                  }
                  setSelectedSubject(sub);
                }}
              />
            );
          })}
        </ScrollView>
        <TableBottomSheet
          title={`${sortName} Activity - ${selectedSubject}`}
          description={`Scholastic > ${userBoard}:${userStandard} > Chapter Test > ${selectedSubject}`}
          isVisible={tableVisible}
          onCloseRequest={() => setTableVisible(false)}>
          {scholasticSetTableData.length !== 0 ? (
            <ScrollView horizontal>
              <View style={{maxHeight: 300}}>
                <ScrollView>
                  <Table borderStyle={{borderWidth: 5, borderColor: '#ffffff'}}>
                    <Row
                      data={[
                        elementButton(' ', '#ffffff'),
                        elementButton('Chapter', '#BADDEB'),
                        elementButton('Exam', '#BADDEB'),
                        elementButton('Total qs', '#BADDEB'),
                        elementButton('Attempted', '#FFFCC7'),
                        elementButton('Not-\nattempted', '#E8E8E8'),
                        elementButton('Correct', '#C5FFCA'),
                        elementButton('Incorrect', '#FFC0C0'),
                        elementButton('Marks', '#F9DCDC'),
                      ]}
                      style={{height: 40, backgroundColor: '#CAEBF9'}}
                      textStyle={{
                        textAlign: 'center',
                        fontFamily: fonts.rRegular,
                        fontSize: 8,
                      }}
                      widthArr={[100, 80, 80, 60, 60, 60, 60, 60, 60]}
                    />

                    <TableWrapper style={{flexDirection: 'row'}}>
                      <Col
                        width={100}
                        data={[selectedSubject]}
                        flex={1}
                        heightArr={[40 * scholasticSetTableData?.length]}
                        textStyle={{textAlign: 'center'}}
                        style={{
                          backgroundColor: '#F9DCDC',
                        }}
                      />
                      <Rows
                        data={scholasticSetTableData.map(item => {
                          return [
                            elementData(item?.chapter, '#F1F2F2'),
                            elementData(item?.exam, '#D1D3D4'),
                            elementData(item?.total_question, '#F1F2F2'),
                            elementData(item?.total_attended, '#D1D3D4'),
                            elementData(item?.total_notattended_no, '#F1F2F2'),
                            elementData(item?.total_correct, '#D1D3D4'),
                            elementData(item?.total_incorrect, '#F1F2F2'),
                            elementData(item?.total_marks, '#F9DCDC'),
                          ];
                        })}
                        textStyle={{textAlign: 'center'}}
                        widthArr={[80, 80, 60, 60, 60, 60, 60, 60]}
                        style={{backgroundColor: '#D1D3D4', height: 40}}
                      />
                    </TableWrapper>
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                height: 100,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'small'} color="#BADDEB" />
            </View>
          )}
        </TableBottomSheet>
        <TableBottomSheet
          title={`${sortName} Activity - ${selectedSubject}`}
          description={`Scholastic > ${userBoard}:${userStandard} > ${
            sortName === 'MOL' ? 'Module' : 'Mock Test'
          } > ${selectedSubject}`}
          isVisible={moduleMockTableVisible}
          onCloseRequest={() => setModuleMockTableVisible(false)}>
          {Object.keys(moduleMockTableData).length !== 0 ? (
            <ScrollView horizontal>
              <View style={{maxHeight: 300}}>
                <ScrollView>
                  <Table borderStyle={{borderWidth: 5, borderColor: '#ffffff'}}>
                    <Row
                      data={[
                        elementButton(' ', '#ffffff'),
                        elementButton(' ', '#ffffff'),
                        elementButton('Total qs', '#BADDEB'),
                        elementButton('Attempted', '#FFFCC7'),
                        elementButton('Not-\nattempted', '#E8E8E8'),
                        elementButton('Correct', '#C5FFCA'),
                        elementButton('Incorrect', '#FFC0C0'),
                        elementButton('Marks', '#F9DCDC'),
                      ]}
                      style={{height: 40, backgroundColor: '#CAEBF9'}}
                      textStyle={{
                        textAlign: 'center',
                        fontFamily: fonts.rRegular,
                        fontSize: 8,
                      }}
                      widthArr={[100, 80, 80, 60, 60, 60, 60, 60]}
                    />
                    <TableWrapper style={{flexDirection: 'row'}}>
                      <Col
                        width={100}
                        data={[selectedSubject]}
                        flex={1}
                        heightArr={[
                          40 * Object.keys(moduleMockTableData).length,
                        ]}
                        textStyle={{textAlign: 'center'}}
                        style={{
                          backgroundColor: '#F9DCDC',
                        }}
                      />

                      <Rows
                        data={Object.keys(moduleMockTableData).map(thekey => {
                          return [
                            elementData(thekey, '#F1F2F2'),
                            elementData(
                              moduleMockTableData[thekey]?.total_question,
                              '#F1F2F2',
                            ),
                            elementData(
                              moduleMockTableData[thekey]?.total_attended,
                              '#D1D3D4',
                            ),
                            elementData(
                              moduleMockTableData[thekey]?.total_not_attempted,
                              '#F1F2F2',
                            ),
                            elementData(
                              moduleMockTableData[thekey]?.total_correct_ans,
                              '#D1D3D4',
                            ),
                            elementData(
                              moduleMockTableData[thekey]?.total_incorrect_ans,
                              '#F1F2F2',
                            ),
                            elementData(
                              moduleMockTableData[thekey]?.total_marks,
                              '#F9DCDC',
                            ),
                          ];
                        })}
                        textStyle={{textAlign: 'center'}}
                        widthArr={[80, 80, 60, 60, 60, 60, 60]}
                        style={{backgroundColor: '#D1D3D4', height: 40}}
                      />
                    </TableWrapper>
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                height: 100,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'small'} color="#BADDEB" />
            </View>
          )}
        </TableBottomSheet>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SubjectWiseAnalysis;

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
});
