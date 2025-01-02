import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, ImageBackground, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';
import { DrawerActions } from '@react-navigation/native';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import OnlineExamsBoxComponent from '../../components/OnlineExamsBoxComponent';
import {  getAdvertisementDetails } from '../../store/actions/AuthActions';

import AdComponent from '../../components/AdComponent';
const adImageContent = "https://admin.clvdev.in/assets/advertisments/ad_project.png"

const dashboardList = [
    {
        id: 1,
        label: 'Demo',
        labelImage: '',
        isImage: false,
        page: 'ELibraryCategory',
        backgroundColor: '#E0B326',
        iconBackground: "#fff",
        iconName: 'document-text',
        iconColor: '#245C75',
        textColor: '#fff',
        activeMenu: 0
    },
    {
        id: 2,
        label: 'Scholastic List',
        labelImage: require('../../assets/images/crestest-1683119506218ic.png'),
        isImage: true,
        page: 'ELibraryList',
        backgroundColor: '#94AC4B',
        iconBackground: "#fff",
        iconName: 'document-text',
        textColor: '#fff',
        activeMenu: 1
    },
    {
        id: 3,
        label: 'Competitive List',
        labelImage: require('../../assets/images/crestest-1683119149939ve.png'),
        isImage: true,
        page: 'ELibraryCompetitiveCategory',
        backgroundColor: '#57BAD7',
        iconBackground: "#fff",
        iconName: 'document-text',
        textColor: '#fff',
        activeMenu: 2
    },
]


const ELibraryList = (props) => {

    const dispatch = useDispatch();

    const is_subscribe_e_library = useSelector(state => state.auth.is_subscribe_e_library);
    const advertisementDetails = useSelector(state => state.auth.advertisementDetails);

    useEffect(() => {
        dispatch(getAdvertisementDetails(props));
    }, []);

    const leftIconHandeler = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    const goToNewPage = (pageName, item) => {
        console.log("pageName--", pageName)
        if (pageName != '') {
            props.navigation.navigate('nonAuthScenes', {
                screen: `${pageName}`,
                params: { item: item, isScholasticOrCompetitive: item.id }
            });
        }
    }

    const subscriptionAlertHandeler = (id) => {
        // console.log("subscriptionAlertHandeler---", id)
        Alert.alert('Alert', `Please subscribe ${id == 2 ? "Scholastic" : id == 3 ? "Competitive" : null} e-Library`, [
            { text: 'OK' },
        ]);
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
                    headerName='e-Library'
                    leftIcon='menu-outline'
                    leftIconHandeler={leftIconHandeler}
                />
    
                <ImageBackground source={require('../../assets/images/background_base.png')} style={Gstyles.imageBackgroundContainer} >
                    <View style={Gstyles.insideParentContainer}>
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={Gstyles.scrollViewContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            {
                                dashboardList.map((item, index) => {
                                    return (
                                        <OnlineExamsBoxComponent
                                            key={item.id}
                                            isImage={item.isImage}
                                            iconName={item.iconName}
                                            iconColor={item.iconColor}
                                            labelImage={item.labelImage}
                                            labelName={item.label}

                                            goToNewPage={() => item.id == 1 ? goToNewPage(item.page, item) : item.id == 2 && (item.activeMenu == is_subscribe_e_library || is_subscribe_e_library == 3) ? goToNewPage(item.page, item) : item.id == 3 && (item.activeMenu == is_subscribe_e_library || is_subscribe_e_library == 3) ? goToNewPage(item.page, item) : subscriptionAlertHandeler(item.id)}

                                            itemBackgroundColor={item.id == 1 ? item.backgroundColor : item.id == 2 && (item.activeMenu == is_subscribe_e_library || is_subscribe_e_library == 3) ? item.backgroundColor : item.id == 3 && (item.activeMenu == is_subscribe_e_library || is_subscribe_e_library == 3) ? item.backgroundColor : '#999'}

                                            iconBackground={item.iconBackground}

                                            textColor={item.textColor}
                                        />
                                    );
                                })
                            }
                        </ScrollView>
                    </View>

                    {advertisementDetails?.[0] != '' ?
                        <AdComponent
                            // adImage={adImageContent}
                            adImage={advertisementDetails?.[0]}
                        />
                        : null}

                </ImageBackground>

            </KeyboardAvoidingView>
        </>

    );
};

export default ELibraryList;