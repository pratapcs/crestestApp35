import React, { useEffect } from 'react';
import { View, StatusBar, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import CategoryCard from "../../components/CategoryCard"
import { getCategoryData, } from '../../store/actions/ExamCategoryAction';
import { getAdvertisementDetails } from '../../store/actions/AuthActions';
import { getSubscriptionTextData } from '../../store/actions/SubscribeAction';


import AdComponent from '../../components/AdComponent';
const adImageContent = "https://admin.clvdev.in/assets/advertisments/ad_project.png"


const SubscriptionELibraryCategory = (props) => {

    const dispatch = useDispatch();

    const examcategoryList = useSelector(state => state.category.examcategoryList);
    const advertisementDetails = useSelector(state => state.auth.advertisementDetails);/*  */
    const currentSession = useSelector(state => state.subscribe.currentSession);

    useEffect(() => {
        dispatch(getCategoryData(props));
        dispatch(getSubscriptionTextData(props));
    }, []);

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const goToNewPage = (item) => {
        if (item.id == 1) {
            props.navigation.navigate('nonAuthScenes', {
                screen: "SubscriptionElibraryScholasticList",
                params: { item: item, category: 1, currentSession:currentSession }
            });
        } else if (item.id == 2) {
            props.navigation.navigate('nonAuthScenes', {
                screen: "SubscriptionELibraryCompetitiveCategory",
                params: { item: item, category: 2, currentSession:currentSession }
            });
        }
    }

    const getCourseValidityDateformat = (date) => {
        let output = "NA";
        if (date) {
            let validityDate = date.split("-");
            let startDate = `${validityDate[0]}-${validityDate[1]}-${validityDate[2]}`;
            let endDate = `${validityDate[3]}-${validityDate[4]}-${validityDate[5]}`;
            let formattedStartDate = moment(startDate).format("DD/MM/YYYY");
            let formattedEndDate = moment(endDate).format("DD/MM/YYYY");
            output = `${formattedStartDate} - ${formattedEndDate}`;
        }
        return output;
    };


    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >
                {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                <HeaderComponent
                    headerName='Subscription e-Library Category'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />
                <View style={Gstyles.academicYearContainer}>
                    <Text style={Gstyles.academicYearText}>{`Academic Year: ${currentSession ? currentSession : 'NA'}`}</Text>
                </View>
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
                                goToNewPage={() => goToNewPage(item)}
                            />
                        )
                        )}
                    </ScrollView>
                    {advertisementDetails?.[6] != '' ?
                        <AdComponent
                            adImage={advertisementDetails?.[6]}
                        />
                        : null}
                </View>
            </KeyboardAvoidingView>
        </>

    );
};

export default SubscriptionELibraryCategory;