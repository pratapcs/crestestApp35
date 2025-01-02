import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, ImageBackground, ScrollView } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import ELibrarySubjectWiseChapterListCard from './ElibraryComponents/ELibrarySubjectWiseChapterListCard';

import { elibraryGetsubjectListDetails, getElibraryContentRequest, elibraryGetLastsubjectListAction, getStoreElibraryVisitData } from '../../store/actions/LibraryAction';
import { getChapterData, loadingChapterAction, getChapterAction } from '../../store/actions/ChapterAction';
import { getOnlineConceptMapDetails, elibraryLoading, eliraryScholasticCategoryAction, elibraryListActivePageAction } from '../../store/actions/LibraryAction';


const ELibraryListSubjectWise = (props) => {

    const dispatch = useDispatch();

    const chapterList = useSelector(state => state.chapter.chapterList);


    useEffect(() => {
        console.log("route===========11", props.route.params)
        if (props.route.params.isScholasticOrCompetitive == 2) {
            dispatch(getChapterData(props.route.params.subject_id, '', 0, props));
        } else if (props.route.params.isScholasticOrCompetitive == 3) {
            dispatch(getChapterData(props.route.params.subject_id, 0, 0, props));
        }

    }, []);

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const goToConceptMapPage = (item) => {
        // console.log("pageName--", item)

        dispatch(getStoreElibraryVisitData(item.subject_id, item.short_code))

        if (props.route.params.isScholasticOrCompetitive == 2) {
            dispatch(getOnlineConceptMapDetails(1, 0, item.id, item, props));
            dispatch(eliraryScholasticCategoryAction([item, "Scholastic", props.route.params.item.name, props.route.params.item.subject_id])); 
            // console.log("goToConceptMapPage----@1-", 'item.id:', item.id, 'item:', item)
        } else if (props.route.params.isScholasticOrCompetitive == 3) {
            // console.log("goToConceptMapPage----@2-", 'item.board_id:', item.board_id, 'item.id:', item.id, 'item:',  item)
            dispatch(getOnlineConceptMapDetails(2, item.board_id, item.id, item, props));
            dispatch(eliraryScholasticCategoryAction([item, "Competitive", props.route.params.item.name, props.route.params.item.subject_id]));
        }
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
                    // headerName={`e-Library ${props.route.params.isScholasticOrCompetitive == 2 ? 'Scholastic' : props.route.params.isScholasticOrCompetitive == 3 ? 'Competitive' : null} Subject List`}
                    headerName={`${props.route.params.isScholasticOrCompetitive == 2 ? 'Scholastic' : props.route.params.isScholasticOrCompetitive == 3 ? props.route.params.type_name : null} Chapter List`}
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />

                <ImageBackground source={require('../../assets/images/background_base.png')} style={Gstyles.imageBackgroundContainer} >
                    <View style={Gstyles.insideParentContainer}>
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={Gstyles.elibraryChapterListScrollViewContainer}
                            showsVerticalScrollIndicator={false}
                        >

                            {
                                chapterList.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <ELibrarySubjectWiseChapterListCard
                                                elibrary_image={item.elibrary_image}
                                                subject_color_code={item.subject_color_code}
                                                sub_heading={item.sub_heading}
                                                chapterNo={index + 1}
                                                goToConceptMapPage={() => goToConceptMapPage(item)}
                                            />
                                        </React.Fragment>
                                    );
                                })
                            }
                        </ScrollView>
                    </View>
                </ImageBackground>

            </KeyboardAvoidingView>
        </>

    );
};

export default ELibraryListSubjectWise;