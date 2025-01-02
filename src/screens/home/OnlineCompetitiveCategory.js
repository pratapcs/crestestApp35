import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, ImageBackground, ScrollView, FlatList } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import CompetitiveSubCategoryCard from '../../components/CompetitiveSubCategoryCard';

import { connect, useDispatch, useSelector } from 'react-redux';
import { getExamTypeData } from '../../store/actions/ExamTypeAction';
import { useNavigation } from '@react-navigation/native';

const OnlineCompetitiveCategory = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const examTypeList = useSelector((state) => state.examtype.examTypeList);

    useEffect(() => {
        dispatch(getExamTypeData(2, props));
    }, []);

    const leftIconHandeler = () => {
        // navigation.dispatch(DrawerActions.toggleDrawer())
        props.navigation.goBack()
    }

    const goToNewPage = (pageName) => {
        // console.log("pageName--", pageName)
        props.navigation.navigate('nonAuthScenes', {
            screen: `${pageName}`,
        });
    }

    const selectPageHandeler = (item) => {
        // console.log("selectType----", item.id)
        props.navigation.navigate('nonAuthScenes', {
            screen: 'OnlineCompetitiveSubCategory',
            params: { data: item },
        })
        /* if (item.id == 1) {
            history.push({ pathname: '/competitive-types', state: { id: item.id, exam_type: item.type_name, } })
        } else {
            history.push({ pathname: '/competitive-exam-Select', state: { id: item.id, exam_type: item.type_name, } })
        }
        // history.push({ pathname: '/competitive-exam-Select', state: { id: item.id, exam_type: item.type_name } }) */
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
                    headerName='Competitive Exams'
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
                                image_path={item.image_path}
                                goToSelectPage={() => selectPageHandeler(item)}
                                academicYear={item?.academic_year}
                                courseValidity={item?.course_validity}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ImageBackground>

            </KeyboardAvoidingView>
        </>

    );
};

export default OnlineCompetitiveCategory;