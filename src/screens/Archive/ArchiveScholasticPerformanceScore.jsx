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
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';

import { colors, fonts } from '../../styles/Crestest.config';
import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import { getPurchasedGroupList,} from '../../store/actions/ExamCategoryAction';
import {  getAdvertisementDetails } from '../../store/actions/AuthActions';
import { getArchivePurchasedGroupListData } from "../../store/actions/SubjectAction";

import AdComponent from '../../components/AdComponent';
const adImageContent = "https://admin.clvdev.in/assets/advertisments/ad_project.png"


const ArchiveScholasticPerformanceScore = props => {
  const dispatch = useDispatch();
  const examPurchasedGroupList = useSelector(
    state => state.category.examPurchasedGroupList,
  );
  const advertisementDetails = useSelector(state => state.auth.advertisementDetails);
  const getpurchasedGrouplist = useSelector(state => state.subject.getpurchasedGrouplist);

  useEffect(() => {
    // dispatch(getPurchasedGroupList(props));
    dispatch(getArchivePurchasedGroupListData(props.route.params.class_id, props));
  }, []);

  useEffect(() => {
    dispatch(getAdvertisementDetails(props));
}, []);


  const leftIconHandeler = () => {
    props.navigation.goBack();
  };

  const goToNewPage = item => {
    // if (true) {
    // Emitter.emit(Events.SHOW_PRELOADER);
    props.navigation.navigate('nonAuthScenes', {
      screen: 'ArchiveOverallScholasticPerformanceScore',
      params: { data: item, class_id: props.route.params.class_id, },
    });
    // OverallScholasticPerformanceScore
    // }
    //  else if (false) {
    //   props.navigation.navigate('nonAuthScenes', {
    //     screen: 'OverallCompetitivePerformanceScore',
    //   });
    // }
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
          headerName="Archive Scholastic Performance Score"
          leftIcon="chevron-back"
          leftIconHandeler={leftIconHandeler}
        />

        <ImageBackground
          source={require('../../assets/images/scholastic_background.png')}
          style={Gstyles.imageBackgroundContainer}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles?.scrollViewStyle}
            contentContainerStyle={styles?.listContainer}
            showsVerticalScrollIndicator={false}>
            {getpurchasedGrouplist.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => goToNewPage(item)}
                  style={styles.parentContainer}
                  disabled={item?.is_exam === 0}>
                  <View style={[styles.leftContainer, styles.imageBox]}>
                    <Image
                      source={
                        item?.subject_image == ''
                          ? require('../../assets/images/dashboard.png')
                          : { uri: item?.subject_image }
                      }
                      style={styles.imageStyle}
                    />
                  </View>
                  <View style={styles.middleContainer}>
                    <Text style={styles.categoryHeading}>
                      {item?.subject_name}
                    </Text>
                  </View>
                  <View style={[styles.rightContainer]}>
                    <Image
                      source={
                        item?.subject_image == ''
                          ? require('../../assets/images/dashboard.png')
                          : { uri: item?.subject_image }
                      }
                      style={styles.rightImageStyle}
                      tintColor={'#B7C787'}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/* </View> */}
          {advertisementDetails?.[9] != '' ?
            <AdComponent
              adImage={advertisementDetails?.[9]}
            />
            : null}
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollViewStyle: {
    paddingTop: 10,
    flex: 1,
  },
  listContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  parentContainer: {
    width: '95%',
    height: 70,
    borderRadius: 10,
    backgroundColor: colors?.scholasticColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    marginBottom: 10,
  },
  imageBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 7,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    flex: 0.8,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  rightImageStyle: {
    flex: 0.9,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    opacity: 0.8,
  },
  leftContainer: {
    flex: 0.25,
    backgroundColor: '#ff0000',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 1,
    // backgroundColor: "#00ff00",
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  rightContainer: {
    flex: 0.25,
    // backgroundColor: "#ff0000",
  },
  categoryHeading: {
    fontFamily: fonts.rMedium,
    color: colors.textWhite,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  //disable
  parentDisableContainer: {
    width: '95%',
    height: 70,
    borderRadius: 10,
    backgroundColor: colors.disableBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    marginBottom: 10,
  },
  disableImageBox: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.disableWhiteBackground,
    borderRadius: 7,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
export default ArchiveScholasticPerformanceScore;
