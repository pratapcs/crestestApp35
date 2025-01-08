import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    View,
    StatusBar,
    ScrollView,
    ImageBackground,
    Image,
    Text
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';
import { container } from '../../styles/Crestest.config';

import DashboardBoxComponent from '../../components/DashboardBoxComponent';
import { getAdvertisementDetails } from '../../store/actions/AuthActions';

import Gstyles from '../../styles/GlobalStyle';

import AdComponent from '../../components/AdComponent';
const adImageContent = "https://admin.clvdev.in/assets/advertisments/ad_project.png"

import { useNavigation } from '@react-navigation/native';

const performanceDashboardList = [

    {
        id: 1,
        label: 'Online exam',
        labelImage: require('../../assets/images/onlineexam.png'),
        isImage: true,
        page: 'PerformanceCategory', /* Onlineexam */
    },
    {
        id: 2,
        label: 'e-Library',
        labelImage: require('../../assets/images/eLibrary.png'),
        isImage: true,
        page: 'PerformanceELibraryCategory', /* ELibrary */
    },
]


const PerformanceScore = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const userId = useSelector(state => state.auth?.user_id);
    const advertisementDetails = useSelector(state => state.auth.advertisementDetails);

    useEffect(() => {
        dispatch(getAdvertisementDetails(props));
    }, []);

    console.log(userId, "USER ID");

    const leftIconHandeler = () => {
        // console.log("$$$$$$")
        props.navigation.goBack();
        /* if (userId == 0) {
            console.log("$$$$$$")
        } else {
            console.log("####", navigation)
            navigation.dispatch(DrawerActions.toggleDrawer())
        } */
    }

    const goToNewPage = (pageName, listId) => {
        // console.log("pageName--", pageName)
        props.navigation.navigate('nonAuthScenes', {
            screen: `${pageName}`,
            params: { id: listId }
        });
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                <HeaderComponent
                    headerName=''
                    leftIcon='chevron-back' /* 'menu-outline' */
                    leftIconHandeler={leftIconHandeler}
                />
                <ImageBackground source={require('../../assets/images/background_base.png')} style={[Gstyles.imageBackgroundContainer, { position: 'relative' }]} >
                    <View style={Gstyles.watermarkImageContainer}>
                        <Image
                            style={Gstyles.watermarkImage}
                            source={require('../../assets/images/crestest-logo.png')}
                        />
                    </View>
                    <View style={Gstyles.insideParentContainer}>
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={Gstyles.scrollViewContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            {
                                performanceDashboardList.map((item, index) => {
                                    return (
                                        <DashboardBoxComponent
                                            disabled={userId == 0}
                                            key={item.id}
                                            isImage={item.isImage}
                                            imageName={item.labelImage}
                                            labelName={item.label}
                                            goToNewPage={() => goToNewPage(item.page, item.id)}
                                        />
                                    );
                                })
                            }
                        </ScrollView>
                    </View>

                    {advertisementDetails?.[7] != '' ?
                        <AdComponent
                            adImage={advertisementDetails?.[7]}
                        />
                        : null}

                </ImageBackground>
            </KeyboardAvoidingView>
        </>
    );
};

export default PerformanceScore;