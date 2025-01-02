import React, { useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';
import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import { colors, fonts } from '../../styles/Crestest.config';
import TableBottomSheet from '../../components/TableBottomSheet';
import GradeGrid from '../../components/GradeGrid';
import InstructionCard from '../../components/InstructionCard';
import { Row, Rows, Table } from 'react-native-reanimated-table';
import { capitalizeFirstLetter } from '../../utils/StringUtil';
import { subjectWiseScholasticScoreDataDetails } from '../../store/actions/ArchivePerformanceScoreAction';

const ArchiveSubjectWiseScholasticScore = props => {
  const dispatch = useDispatch();
  // console.log("props.route.params;----", props.route.params)
  const { subjectId, sortName, class_id } = props.route.params;
  const mockData = useSelector(state => state.archivePerformance.MockData);
  const moduleData = useSelector(state => state.archivePerformance.ModuleData);
  const setData = useSelector(state => state.archivePerformance.SetData);
  const setLable = useSelector(state => state.archivePerformance.setLable);
  const moduleLable = useSelector(state => state.archivePerformance.moduleLable);
  const mockLable = useSelector(state => state.archivePerformance.mockLable);
  // const userStandard = useSelector(state => state.auth.standard);
  const userStandard = useSelector(state => state.archivePerformance.archiveClass);
  const userBoard = useSelector(state => state.auth.board_name);
  const [ctldetailsModalVisible, setctlDetailsModalVisible] = useState(false);
  const [moduledetailsModalVisible, setModuleDetailsModalVisible] =
    useState(false);
  const [mockdetailsModalVisible, setMockDetailsModalVisible] = useState(false);

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

  useEffect(() => {
    dispatch(subjectWiseScholasticScoreDataDetails(subjectId, class_id, props));
  }, []);

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
  return (
    <>
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
          headerName="Archive Subjectwise Scholastic Score"
          leftIcon="chevron-back"
          leftIconHandeler={leftIconHandeler}
        />
        <ImageBackground
          source={require('../../assets/images/scholastic_background.png')}
          style={Gstyles.imageBackgroundContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}>
            {setData?.data && (
              <GradeGrid
                type="CTL"
                isSelected={sortName === 'CTL'}
                data={setData}
                labels={setLable}
                primaryColor={'rgba(133, 146, 203,1)'}
                secondaryColor={'rgba(56, 81, 171,1)'}
                onPressDetails={() => setctlDetailsModalVisible(true)}
                onPressSubject={(subject, sortName) => {
                  props.navigation.navigate('nonAuthScenes', {
                    screen: 'ArchiveSubjectWiseAnalysis',
                    params: {
                      examType: 1,
                      subjectId: subjectId,
                      subject,
                      sortName,
                      class_id,
                    },
                  });
                }}
              />
            )}
            {moduleData?.data && (
              <GradeGrid
                type="MOL"
                data={moduleData}
                isSelected={sortName === 'MOL'}
                labels={moduleLable}
                primaryColor={'rgba(249, 143, 198,1)'}
                secondaryColor={'rgba(246, 87, 170,1)'}
                onPressDetails={() => setModuleDetailsModalVisible(true)}
                onPressSubject={(subject, sortName) => {
                  props.navigation.navigate('nonAuthScenes', {
                    screen: 'ArchiveSubjectWiseAnalysis',
                    params: {
                      examType: 2,
                      subjectId: subjectId,
                      subject,
                      sortName,
                      class_id,
                    },
                  });
                }}
              />
            )}
            {mockData?.data && (
              <GradeGrid
                type="MCL"
                isSelected={sortName === 'MCL'}
                data={mockData}
                labels={mockLable}
                primaryColor={'rgba(247, 161, 109,1)'}
                secondaryColor={'rgba(244, 115, 36,1)'}
                onPressDetails={() => setMockDetailsModalVisible(true)}
                onPressSubject={(subject, sortName) => {
                  props.navigation.navigate('nonAuthScenes', {
                    screen: 'ArchiveSubjectWiseAnalysis', 
                    params: {
                      examType: 3,
                      subjectId: subjectId,
                      subject,
                      sortName,
                      class_id
                    },
                  });
                }}
              />
            )}
            <InstructionCard data={instructionData} />
          </ScrollView>
          <TableBottomSheet
            title={'Score Grid - CTL'}
            description={`Scholastic > ${userBoard}:${userStandard} > Score grid CTL`}
            isVisible={ctldetailsModalVisible}
            onCloseRequest={() => setctlDetailsModalVisible(false)}>
            <Table borderStyle={{ borderWidth: 5, borderColor: '#ffffff' }}>
              <Row
                data={['Subject', capitalizeFirstLetter(setData?.name)]}
                style={{ height: 40, backgroundColor: '#CAEBF9' }}
                textStyle={{ textAlign: 'center', fontFamily: fonts.rBold, color: '#777777' }}
              />
              <Rows
                data={setData?.data?.map((item, index) => [
                  setLable[index],
                  elementData(item, "#F1F2F2"),
                ])}
                textStyle={{ textAlign: 'center' }}
                style={{ backgroundColor: '#D1D3D4', height: 40 }}
              />
              <Row
                data={['Overall', elementData(setData?.overall, "#F1F2F2")]}
                style={{ height: 40, backgroundColor: '#D1D3D4' }}
                textStyle={{ textAlign: 'center' }}
              />
            </Table>
          </TableBottomSheet>
          <TableBottomSheet
            title={'Score Grid - MOL'}
            description={`Scholastic > ${userBoard}:${userStandard} > Score grid MOL`}
            isVisible={moduledetailsModalVisible}
            onCloseRequest={() => setModuleDetailsModalVisible(false)}>
            <Table borderStyle={{ borderWidth: 5, borderColor: '#ffffff' }}>
              <Row
                data={['Subject', capitalizeFirstLetter(moduleData?.name)]}
                style={{ height: 40, backgroundColor: '#CAEBF9' }}
                textStyle={{ textAlign: 'center', fontFamily: fonts.rBold, color: '#777777' }}
              />
              <Rows
                data={moduleData?.data?.map((item, index) => [
                  moduleLable[index],
                  elementData(item, "#F1F2F2"),
                ])}
                textStyle={{ textAlign: 'center' }}
                style={{ backgroundColor: '#D1D3D4', height: 40 }}
              />
              <Row
                data={['Overall', elementData(moduleData?.overall, "#F1F2F2")]}
                style={{ height: 40, backgroundColor: '#D1D3D4' }}
                textStyle={{ textAlign: 'center' }}
              />
            </Table>
          </TableBottomSheet>
          <TableBottomSheet
            title={'Score Grid - MCL'}
            description={`Scholastic > ${userBoard}:${userStandard} > Score grid MCL`}
            isVisible={mockdetailsModalVisible}
            onCloseRequest={() => setMockDetailsModalVisible(false)}>
            <Table borderStyle={{ borderWidth: 5, borderColor: '#ffffff' }}>
              <Row
                data={['Subject', capitalizeFirstLetter(mockData?.name)]}
                style={{ height: 40, backgroundColor: '#CAEBF9' }}
                textStyle={{ textAlign: 'center', fontFamily: fonts.rBold, color: '#777777' }}
              />
              <Rows
                data={mockData?.data?.map((item, index) => [
                  mockLable[index],
                  elementData(item, "#F1F2F2"),
                ])}
                textStyle={{ textAlign: 'center' }}
                style={{ backgroundColor: '#D1D3D4', height: 40 }}
              />
              <Row
                data={['Overall', elementData(mockData?.overall, "#F1F2F2")]}
                style={{ height: 40, backgroundColor: '#D1D3D4' }}
                textStyle={{ textAlign: 'center' }}
              />
            </Table>
          </TableBottomSheet>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
};

export default ArchiveSubjectWiseScholasticScore;

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
