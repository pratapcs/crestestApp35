import React, { useEffect, useState } from 'react';
import { View, StatusBar, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import CategoryCard from "../../components/CategoryCard"

import { selectExamCategoryAction, getCategoryData, selectExamCategoryRequestAction } from '../../store/actions/ExamCategoryAction';

import { getDemoPdfContentData, getElibraryContentRequest, eliraryShowCallIcon, eliraryCategoryAction } from '../../store/actions/LibraryAction';


const ELibraryCategory = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("route=====", props.route.params.id)
        dispatch(getCategoryData(props));
    }, []);

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const goToDemoPdfPage = (item) => {
        // console.log("goToDemoPdfPage----", item)
        dispatch(eliraryCategoryAction([]));
		dispatch(eliraryCategoryAction([item.category, "Demo"]));
        
        dispatch(getDemoPdfContentData(item.id, props));
        /* if (id == 1) {
            props.navigation.navigate('nonAuthScenes', {
                screen: "careerGuidance",
            });
        }else if (id == 2) {
            props.navigation.navigate('nonAuthScenes', {
                screen: "careerGuidance",
            });
        } */

    }

    const examcategoryList = useSelector(state => state.category.examcategoryList);

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >
                {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                <HeaderComponent
                    headerName='e-Library Category'
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
                                iconImage={item.e_library}
                                goToNewPage={() => goToDemoPdfPage(item)}
                            />
                        )
                        )}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </>

    );
};

export default ELibraryCategory;