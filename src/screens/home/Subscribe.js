import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import HeaderComponent from '../../components/HeaderComponent';
import { DrawerActions } from '@react-navigation/native';
import { container } from '../../styles/Crestest.config';

import Gstyles from '../../styles/GlobalStyle';
import OnlineExamsBoxComponent from '../../components/OnlineExamsBoxComponent';
import {  getAdvertisementDetails } from '../../store/actions/AuthActions';

import AdComponent from '../../components/AdComponent';
import { useNavigation } from '@react-navigation/native';

const adImageContent = "https://admin.clvdev.in/assets/advertisments/ad_project.png"

const subscriptionCategoryList = [
    {
        id: 1,
        label: 'Online Exam',
        labelImage: '',
        isImage: false,
        page: 'SubscriptionCategory',
        backgroundColor: '#137999',
        iconBackground: "#fff",
        iconName: 'newspaper',
        iconColor: '#245C75',
        textColor: '#fff',
        alterLabel: 'Demo'
    },
    {
        id: 2,
        label: 'e-Library',
        labelImage: '',
        isImage: false,
        page: 'SubscriptionELibraryCategory',
        backgroundColor: '#F0A901',
        iconBackground: "#fff",
        iconName: 'reader-outline',
        iconColor: '#245C75',
        textColor: '#fff',
        alterLabel: 'Scholastic'
    },
    {
        id: 3,
        label: 'Online Classes',
        labelImage: '',
        isImage: false,
        page: 'Online Classes',
        backgroundColor: '#90B817',
        iconBackground: "#fff",
        iconName: 'tv-outline',
        iconColor: '#245C75',
        textColor: '#fff',
        alterLabel: 'Competitive'
    },

]


const Subscribe = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [input, setInput] = useState('');
    const advertisementDetails = useSelector(state => state.auth.advertisementDetails);

    useEffect(() => {
        dispatch(getAdvertisementDetails(props));
    }, []);

    const leftIconHandeler = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    const addToCart = () => {
        console.log("addToCart----Subscribe----")
    }

    const goToNewPage = (pageName, alterLabel, id) => {
        // console.log("pageName--", pageName, alterLabel, id)
        if (pageName == 'Online Classes') {
            // console.log("Q1--",)
            /* props.navigation.navigate('drawerScenes', {
                screen: `${pageName}`,
            }); */
            Alert.alert('Alert', `Online classes coming soon`, [
                { text: 'OK' },
            ]);
        } else {
            props.navigation.navigate('nonAuthScenes', {
                screen: `${pageName}`,
            });
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
                    headerName='Subscription'
                    leftIcon='menu-outline'
                    leftIconHandeler={leftIconHandeler}
                />
                <ImageBackground source={require('../../assets/images/background_base.png')} style={Gstyles.imageBackgroundContainer} >
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={Gstyles.scrollViewContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            subscriptionCategoryList.map((item, index) => {
                                return (
                                    <OnlineExamsBoxComponent
                                        key={item.id}
                                        id={item.id}
                                        isImage={item.isImage}
                                        iconName={item.iconName}
                                        iconColor={item.iconColor}
                                        labelImage={item.labelImage}
                                        labelName={item.label}
                                        // goToNewPage={() => goToNewPage(item.page)}
                                        goToNewPage={() => goToNewPage(item.page, item.alterLabel, item.id)}

                                        itemBackgroundColor={item.backgroundColor}
                                        iconBackground={item.iconBackground}
                                        textColor={item.textColor}
                                    />
                                );
                            })
                        }
                    </ScrollView>

                    {advertisementDetails?.[4] != '' ?
                        <AdComponent
                            adImage={advertisementDetails?.[4]}
                        />
                        : null}
                </ImageBackground>


            </KeyboardAvoidingView>
        </>

    );
};

const styles = StyleSheet.create(
    {
    });



export default Subscribe;