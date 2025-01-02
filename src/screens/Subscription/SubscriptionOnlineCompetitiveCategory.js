import React, { useEffect } from 'react';
import { StatusBar, KeyboardAvoidingView, ImageBackground, FlatList } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import CompetitiveSubCategoryCard from '../../components/CompetitiveSubCategoryCard';

import { useDispatch, useSelector } from 'react-redux';
import { getExamTypeData } from '../../store/actions/ExamTypeAction';


const SubscriptionOnlineCompetitiveCategory = (props) => {

    const dispatch = useDispatch();

    const examTypeList = useSelector((state) => state.examtype.examTypeList);

    useEffect(() => {
        dispatch(getExamTypeData(2, props));
    }, []);

    const leftIconHandeler = () => {
        // navigation.dispatch(DrawerActions.toggleDrawer())
        props.navigation.goBack()
    }

    const selectPageHandeler = (item) => {
        props.navigation.navigate('nonAuthScenes', {
            screen: 'SubscriptionOnlineCompetitiveList',
            params: { item: item, type: item.id, currentSession:props?.route.params?.currentSession },
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
                    headerName='Subscription for Competitive Courses'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />
                <ImageBackground source={require('../../assets/images/background_base.png')} style={Gstyles.imageBackgroundContainer} >
                    <FlatList
                        data={examTypeList}
                        contentContainerStyle={[Gstyles.competitiveSubCategoryParentContainer]}
                        renderItem={({ item, index }) =>
                        (
                            <CompetitiveSubCategoryCard
                                id={item.id}
                                subHeading={item.type_name}
                                subDetails={item.sub_heading}
                                subscribe={1} // acctive all option
                                image_path={item.image_path}
                                goToSelectPage={() => selectPageHandeler(item)}
                                academicYear={item.academic_year != '' ? item.academic_year : "NA"}
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

export default SubscriptionOnlineCompetitiveCategory;