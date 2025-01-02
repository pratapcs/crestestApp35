import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, ImageBackground, ScrollView, FlatList } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import CompetitiveSubCategoryCard from '../../components/CompetitiveSubCategoryCard';

import { connect, useDispatch, useSelector } from 'react-redux';
import { getExamTypeData } from '../../store/actions/ExamTypeAction';


const ELibraryCompetitiveCategoryPerformance = (props) => {

    const dispatch = useDispatch();

    const examTypeList = useSelector((state) => state.examtype.examTypeList);

    useEffect(() => {
        // console.log("props.route.params.id---", props.route.params)
        // console.log("route==ELibraryCompetitiveCategoryPerformance===", props.route.params.isScholasticOrCompetitive)
        dispatch(getExamTypeData(2, props));
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
            screen: 'ELibraryCompetitivePerformanceScore',
            params: { categoryId: props.route.params.categoryId, item:item },
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
                    headerName='e-Library Competitive Segments'
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
                                subscribe={item.subscribe}
                                goToSelectPage={() => selectPageHandeler(item)}
                                image_path={item.image_path}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ImageBackground>

            </KeyboardAvoidingView>
        </>

    );
};

export default ELibraryCompetitiveCategoryPerformance;