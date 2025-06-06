import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';
import {Table, Row, Rows} from 'react-native-reanimated-table';
import {container} from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import {colors, fonts} from '../../styles/Crestest.config';
import {
  clearScholasticData,
  getScholasticAllData,
} from '../../store/actions/PerformanceScoreAction';

import {
  // clearScholasticData,
  getArchiiveScholasticAllData,
  getScholasticOverAllPerformanceData
} from '../../store/actions/ArchivePerformanceScoreAction';

import {capitalizeFirstLetter} from '../../utils/StringUtil';

import ScholasticCompetitiveIndex from './components/ScholasticCompetitiveIndex';
import PerformanceAnalysis from './components/PerformanceAnalysis';
import TableBottomSheet from './components/TableBottomSheet';
import ScoreSpectrum from './components/ScoreSpectrum';
import StrengthAnalysis from './components/StrengthAnalysis';

const ArchiveOverallScholasticPerformanceScore = props => {
  const dispatch = useDispatch();
  const {data} = props?.route?.params;
  const mockData = useSelector(state => state.archivePerformance.MockData);
  const mockLable = useSelector(state => state.archivePerformance.mockLable);
  const moduleData = useSelector(state => state.archivePerformance.ModuleData);
  const moduleLable = useSelector(state => state.archivePerformance.moduleLable);
  const setData = useSelector(state => state.archivePerformance.SetData);
  const setLable = useSelector(state => state.archivePerformance.setLable);
  const scholasticLabel = useSelector(
    state => state.archivePerformance.scholasticLabel,
  );
  const compareScholasticCompetitiveDatasets = useSelector(
    state => state.archivePerformance.compareScholasticCompetitiveDatasets,
  );
  const compareScholasticCompetitiveLabels = useSelector(
    state => state.archivePerformance.compareScholasticCompetitiveLabels,
  );
  const scholasticOverAllPerformance = useSelector(
    state => state.archivePerformance.scholasticOverAllPerformance,
  );

  // const userStandard = useSelector(state => state.auth.standard);
  const userStandard = useSelector(state => state.archivePerformance.archiveClass);
  const userBoard = useSelector(state => state.auth.board_name);

  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  useEffect(() => {
    if (
      data?.subejct_id !== undefined ||
      data?.subejct_id !== null ||
      data?.subejct_id !== ''
    ) {
      dispatch(getArchiiveScholasticAllData(data?.subejct_id, props.route.params.class_id, 'Competitive', props));
      // dispatch(getScholasticOverAllPerformanceData(data?.subejct_id, props.route.params.class_id, 'Competitive', props));
      // dispatch(getScholasticAllData(data?.subejct_id, props.route.params.class_id, 'Competitive', props));
      return () => {
        // dispatch(clearScholasticData());
      };
    }
  }, [data?.subejct_id, props.route.params.class_id]);

  const leftIconHandeler = () => {
    props.navigation.goBack();
  };

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
          headerName="Archive Overall Scholastic Performance Score"
          leftIcon="chevron-back"
          leftIconHandeler={leftIconHandeler}
        />
      
        <ImageBackground
          source={require('../../assets/images/scholastic_background.png')}
          style={Gstyles.imageBackgroundContainer}>
          <View style={{width: '100%'}}>
            <View style={styles.subjectHolder}>
              <Text style={styles.subjectTitle}>{data?.subject_name}</Text>
              <Image
                source={
                  data?.subject_image == ''
                    ? require('../../assets/images/dashboard.png')
                    : {uri: data?.subject_image}
                }
                style={styles.subjectImage}
              />
            </View>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}>
              
            {scholasticOverAllPerformance.length !== 0 && (
              <ScoreSpectrum
                value={scholasticOverAllPerformance[1]?.total}
                onPressDetails={() => {
                  setDetailsModalVisible(true);
                }}
              />
            )}
            {scholasticLabel.length !== 0 && (
              <StrengthAnalysis
                mockData={mockData}
                mockLable={mockLable}
                moduleData={moduleData}
                moduleLable={moduleLable}
                setData={setData}
                setLable={setLable}
                scholasticLabel={scholasticLabel}
                onPressSubject={(sortName) => {
                  props.navigation.navigate('nonAuthScenes', {
                    screen: 'ArchiveSubjectWiseScholasticScore',
                    params: {subjectId: data?.subejct_id, sortName, class_id: props.route.params.class_id },
                  });
                }}
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

            {scholasticLabel.length !== 0 && (
              <PerformanceAnalysis
                labels={scholasticLabel}
                mockData={mockData}
                moduleData={moduleData}
                setData={setData}
              />
            )}
          </ScrollView>
          
          <TableBottomSheet
            title={'Weighted Average Performance'}
            description={`Scholastic > ${userBoard}:${userStandard} > Weighted Average Performance`}
            isVisible={detailsModalVisible}
            onCloseRequest={() => setDetailsModalVisible(false)}>
            <View style={{height: 180}}>
              <Table borderStyle={{borderWidth: 5, borderColor: '#ffffff'}}>
                <Row
                  flexArr={[3, 2, 2, 2, 2]}
                  data={
                    scholasticOverAllPerformance.map(item =>
                      Object.keys(item).map(str =>
                        capitalizeFirstLetter(str ?? ''),
                      ),
                    )[0]
                  }
                  style={{height: 40, backgroundColor: '#CAEBF9'}}
                  textStyle={{textAlign: 'center', fontFamily:fonts.rBold, color:'#777777'}}
                />
                <Rows
                  data={scholasticOverAllPerformance.map(item =>
                    Object.values(item),
                  )}
                  flexArr={[3, 2, 2, 2, 2]}
                  textStyle={{textAlign: 'center'}}
                  style={{backgroundColor: '#D1D3D4', height: 70}}
                />
              </Table>
            </View>
          </TableBottomSheet>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
};

export default ArchiveOverallScholasticPerformanceScore;

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
    backgroundColor:'white',
    borderRadius:5
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
