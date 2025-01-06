import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, ImageBackground, ScrollView, FlatList } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import { DrawerActions } from '@react-navigation/native';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import CompetitiveSubTypeCategoryCard from '../../components/CompetitiveSubTypeCategoryCard';

import { connect, useDispatch, useSelector } from 'react-redux';

import { getExamTypeData } from '../../store/actions/ExamTypeAction';

import { getNtseExamTypeData } from '../../store/actions/ExamTypeAction';
import { getOnlineCompetitiveSubscriptionDetailsData, getOnlineCompetitiveSubscriptionDetailsMatData, getCompetitiveSubscriptionDetailsSuccessAction, getCompetitiveSubscriptionDetailsMatSuccessAction } from '../../store/actions/OnlineExamAction';
import { useNavigation } from '@react-navigation/native';



const OnlineCompetitiveSubCategory = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const examTypeList = useSelector((state) => state.examtype.examTypeList);
    const ntseType = useSelector((state) => state.examtype.ntseType);
    const competitiveSubscriptionDetails = useSelector((state) => state.onlineexam.competitiveSubscriptionDetails);
    const competitiveSubscriptionDetailsMat = useSelector((state) => state.onlineexam.competitiveSubscriptionDetailsMat);

    const [previousPageData, setpreviousPageData] = useState(props.route.params.data)


    useEffect(() => {
        
        dispatch(getNtseExamTypeData(2, 1, props));
        if (previousPageData.id == 1) {
            dispatch(getOnlineCompetitiveSubscriptionDetailsData(1, 'NTSE', props)) // SAT
            dispatch(getOnlineCompetitiveSubscriptionDetailsMatData(2, 'NTSE', props)) // MAT
        } else {
            // console.log("@1-->", previousPageData.id, previousPageData.type_name)
            dispatch(getOnlineCompetitiveSubscriptionDetailsData(previousPageData.id, previousPageData.type_name, props))
        }
    }, [previousPageData]);

    useEffect(() => {
        // console.log("1----competitiveSubscriptionDetails-->", competitiveSubscriptionDetails)
        // console.log("1----competitiveSubscriptionDetailsMat-->", competitiveSubscriptionDetailsMat)
        {/* {console.log("2----ntseTypeData-->", ntseType )} */ }
        // console.log("3----competitiveSubscriptionDetailsData-->", competitiveSubscriptionDetails )
        {/* {console.log("4----competitiveSubscriptionDetailsMatData-->", competitiveSubscriptionDetailsMat )} */ }
    }, [competitiveSubscriptionDetails, competitiveSubscriptionDetailsMat]);

    useEffect(() => {


        return () => {
            // console.log("return () => {-----")
            dispatch(getCompetitiveSubscriptionDetailsSuccessAction([]));
            dispatch(getCompetitiveSubscriptionDetailsMatSuccessAction([]));
        }
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
        /* props.navigation.navigate('nonAuthScenes', {
            screen: 'OnlineCompetitiveSubCategory',
            params: { data: 0 },
        }) */

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
                    headerName={previousPageData.id == 1 ? 'Competitive Types' : 'Competitive Exam Select'}
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />
    
                <ImageBackground source={require('../../assets/images/background_base.png')} style={Gstyles.imageBackgroundContainer} >

                    {(previousPageData.id == 1 ? competitiveSubscriptionDetails != '' && competitiveSubscriptionDetails != undefined && competitiveSubscriptionDetailsMat != '' && competitiveSubscriptionDetailsMat != undefined && ntseType != '' && ntseType != undefined : competitiveSubscriptionDetails != '' && competitiveSubscriptionDetails != undefined) ?
                        <>
                            <FlatList
                                data={previousPageData.id == 1 ? ntseType : competitiveSubscriptionDetails}
                                contentContainerStyle={[Gstyles.competitiveSubCategoryParentContainer]}
                                renderItem={({ item, index }) =>
                                (
                                    <CompetitiveSubTypeCategoryCard
                                        id={index}
                                        subHeading={previousPageData.id == 1 ? item.subtype_name : previousPageData.type_name}
                                        subDetails={previousPageData.id == 1 ? item.sub_heading : previousPageData.type_name}
                                        subscribe={item.subscribe}
                                        goToSelectPage={() => selectPageHandeler(item)}
                                        satCount={competitiveSubscriptionDetails[0]}
                                        matCount={competitiveSubscriptionDetailsMat[0]}
                                        imageId={previousPageData.id}
                                        navigation={props}
                                    />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </>
                        : null
                    }

                </ImageBackground>

            </KeyboardAvoidingView>
        </>

    );
};

export default OnlineCompetitiveSubCategory;