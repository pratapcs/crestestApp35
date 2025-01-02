import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, ImageBackground, ScrollView, FlatList } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import CompetitiveSubCategoryCard from '../../components/CompetitiveSubCategoryCard';

import { connect, useDispatch, useSelector } from 'react-redux';
import { getExamTypeData, getArchiveExamTypeData } from '../../store/actions/ExamTypeAction';


const ArchiveOnlineCompetitiveCategoryPerformance = (props) => {

    const dispatch = useDispatch();

    const examTypeList = useSelector((state) => state.examtype.examTypeList);

    useEffect(() => {
        // console.log("props.route.params.id---", props.route.params)
        // console.log("route==ArchiveOnlineCompetitiveCategoryPerformance===", props.route.params.isScholasticOrCompetitive)
        // dispatch(getExamTypeData(2, props));
        dispatch(getArchiveExamTypeData(2, props.route.params.class_id, props.history));
    }, []);
    
    const leftIconHandeler = () => {
        // navigation.dispatch(DrawerActions.toggleDrawer())
        props.navigation.goBack()
    }

   /*  const goToNewPage = (pageName) => {
        // console.log("pageName--", pageName)
        props.navigation.navigate('nonAuthScenes', {
            screen: `${pageName}`,
        });
    } */

    const selectPageHandeler = (item) => {
        // console.log("selectType---11-", item)
        props.navigation.navigate('nonAuthScenes', {
            screen: 'ArchiveOverallCompetitivePerformanceScore',
            params: { examType: item?.type_name, item:item, class_id : props.route.params.class_id,  },
        })
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >

                {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                <HeaderComponent
                    headerName='Archive Competitive Performance Score'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />
                <ImageBackground source={require('../../assets/images/background_base.png')} style={Gstyles.imageBackgroundContainer} >
                    {/* <View style={[Gstyles.competitiveSubCategoryParentContainer ]}> */}
                    <FlatList
                        data={examTypeList}
                        contentContainerStyle={[Gstyles.competitiveSubCategoryParentContainer]}
                        renderItem={({ item, index }) =>
                        (
                            <CompetitiveSubCategoryCard
                                id={item.id}
                                subHeading={item.type_name}
                                subDetails={item.sub_heading}
                                subscribe={item?.is_exam}
                                goToSelectPage={() => selectPageHandeler(item)}
                                image_path={item.image_path}
                                academicYear={item.academic_year}
                                courseValidity={item.course_validity}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ImageBackground>

            </KeyboardAvoidingView>
        </>

    );
};

export default ArchiveOnlineCompetitiveCategoryPerformance;