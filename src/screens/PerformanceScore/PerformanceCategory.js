import React, { useEffect, useState } from 'react';
import { View, StatusBar, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import CategoryCard from '../../components/CategoryCard';
import {  getAdvertisementDetails } from '../../store/actions/AuthActions';


import {
  getCategoryData,
} from '../../store/actions/ExamCategoryAction';

import AdComponent from '../../components/AdComponent';
import { useNavigation } from '@react-navigation/native';

const adImageContent = "https://admin.clvdev.in/assets/advertisments/ad_project.png"


const PerformanceCategory = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCategoryData(props));
  }, []);

  useEffect(() => {
    dispatch(getAdvertisementDetails(props));
}, []);

  const leftIconHandeler = () => {
    props.navigation.goBack();
  };

  const goToNewPage = id => {
    if (id == 1) {
      props.navigation.navigate('nonAuthScenes', {
        screen: 'ScholasticPerformanceScore',
      });
      // OverallScholasticPerformanceScore
    } else if (id == 2) {
      props.navigation.navigate('nonAuthScenes', {
        // screen: 'OverallCompetitivePerformanceScore',
        screen: 'OnlineCompetitiveCategoryPerformance',
        params: { categoryId: id }
      });
    }
  };

  const examcategoryList = useSelector(state => state.category.examcategoryList);
  const categorylist = useSelector(state => state.category.examcategoryList);

  const advertisementDetails = useSelector(state => state.auth.advertisementDetails);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'none'}
        style={container}>
        {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
        <StatusBar
          barStyle="light-content"
          backgroundColor="#245C75"
          translucent
          hidden={false}
        />

        <HeaderComponent
          headerName="Performance Category"
          leftIcon="chevron-back"
          leftIconHandeler={leftIconHandeler}
        />
        <View style={Gstyles.insideOnlineExamParentContainer}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            // contentContainerStyle={Gstyles.scrollViewContainer}
            showsVerticalScrollIndicator={false}>
            {categorylist.map((item, ind) => (
              <CategoryCard
                key={ind}
                disabled={item?.is_exam === 0}
                id={item.id}
                category={item.category}
                online_subheading={item.performance_subheading}
                iconImage={item.performance}
                goToNewPage={() => goToNewPage(item.id)}
              />
            ))}
          </ScrollView>

          {advertisementDetails?.[8] != '' ?
            <AdComponent
              adImage={advertisementDetails?.[8]}
            />
            : null}

        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default PerformanceCategory;
