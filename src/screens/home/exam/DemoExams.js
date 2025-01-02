import React, { useEffect, useState } from 'react';
import { View, StatusBar, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../../components/HeaderComponent';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { container } from '../../../styles/Crestest.config';
import Gstyles from '../../../styles/GlobalStyle';

// import ExamCard from "./examComponent/ExamCard"
import CategoryCard from "../../../components/CategoryCard"

import { getCategoryData, } from '../../../store/actions/ExamCategoryAction';
import { getAdvertisementDetails } from '../../../store/actions/AuthActions';

import AdComponent from '../../../components/AdComponent';
const adImageContent = "https://admin.clvdev.in/assets/advertisments/ad_project.png"


const DemoExams = (props) => {

    const dispatch = useDispatch();

    const examcategoryList = useSelector(state => state.category.examcategoryList);
    const advertisementDetails = useSelector(state => state.auth.advertisementDetails);

    useEffect(() => {
        dispatch(getCategoryData(props));
    }, []);

    useEffect(() => {
        dispatch(getAdvertisementDetails(props));
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getCategoryData(props));
            /* let isActive = true;
            if (isActive) {
                getEmergencyNumber();
            }
            return () => {
                isActive = false;
            }; */
        }, [])
    );


    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const goToNewPage = (id) => {
        props.navigation.navigate('nonAuthScenes', {
            screen: "ExamsDetails",
            params: { id: id, examDemo: 0 },
        });
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
                    headerName='Demo Exams'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />
                <View style={Gstyles.insideOnlineExamParentContainer}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        // contentContainerStyle={Gstyles.scrollViewContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {examcategoryList.map((item, ind) => (
                            <CategoryCard
                                key={ind}
                                id={item.id}
                                category={item.category}
                                online_subheading={item.online_subheading}
                                iconImage={item.onlineexam}
                                goToNewPage={() => goToNewPage(item.id)}
                            />
                        )
                        )}
                    </ScrollView>
                    {advertisementDetails?.[2] != '' ?
                        <AdComponent
                            adImage={advertisementDetails?.[2]}
                        />
                        : null
                    }
                </View>
            </KeyboardAvoidingView>
        </>

    );
};

export default DemoExams;