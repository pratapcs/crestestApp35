import React, { useEffect, useState } from 'react';
import { View, StatusBar, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import CategoryCard from '../../components/CategoryCard';
import { getAdvertisementDetails } from '../../store/actions/AuthActions';

import {

} from "../../store/actions/ExamCategoryAction";

import {
  getCategoryData,
  getArchiveCategoryData,
} from '../../store/actions/ExamCategoryAction';

import AdComponent from '../../components/AdComponent';
const adImageContent = "https://admin.clvdev.in/assets/advertisments/ad_project.png"


const ArchivePerformanceCategory = (props) => {
  const dispatch = useDispatch();


  const [examCategory, setExamCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log("props----", props.route.params)
    // dispatch(getCategoryData(props));
    dispatch(
      getArchiveCategoryData(
        props.route.params.class_id,
        archiveCategoryCallBack,
        props,
      )
    );
  }, []);

  useEffect(() => {
    dispatch(getAdvertisementDetails(props));
  }, []);

  const leftIconHandeler = () => {
    props.navigation.goBack();
  };

  const archiveCategoryCallBack = (data) => {
    setExamCategory(data);
    setLoading(false);
  };

  const goToNewPage = id => {
    if (id == 1) {
      props.navigation.navigate('nonAuthScenes', {
        screen: 'ArchiveScholasticPerformanceScore',
        params: {class_id: props.route.params.class_id, }
      });
      // OverallScholasticPerformanceScore
    } else if (id == 2) {
      props.navigation.navigate('nonAuthScenes', {
        // screen: 'OverallCompetitivePerformanceScore',
        screen: 'ArchiveOnlineCompetitiveCategoryPerformance',
        params: { categoryId: id, class_id: props.route.params.class_id, }
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
          headerName="Archive Performance Category"
          leftIcon="chevron-back"
          leftIconHandeler={leftIconHandeler}
        />
        <View style={Gstyles.insideOnlineExamParentContainer}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            // contentContainerStyle={Gstyles.scrollViewContainer}
            showsVerticalScrollIndicator={false}>
            {examCategory.map((item, ind) => (
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

export default ArchivePerformanceCategory;
