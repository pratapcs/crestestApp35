import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, ImageBackground, ScrollView, Alert } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import { DrawerActions } from '@react-navigation/native';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import OnlineExamsBoxComponent from '../../components/OnlineExamsBoxComponent';
import { connect, useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const dashboardList = [
    {
        id: 1,
        label: 'Demo Exams',
        labelImage: '',
        isImage: false,
        page: 'DemoExams',
        backgroundColor: '#E0B326',
        iconBackground: "#fff",
        iconName: 'document-text',
        iconColor: '#245C75',
        textColor: '#fff',
        alterLabel: 'Demo'
    },
    {
        id: 2,
        label: 'Scholastic Exams',
        labelImage: require('../../assets/images/crestest-1683119506218ic.png'),
        isImage: true,
        page: 'ScholasticExamsSubject',
        backgroundColor: '#94AC4B',
        iconBackground: "#fff",
        iconName: 'document-text',
        textColor: '#fff',
        alterLabel: 'Scholastic'
    },
    {
        id: 3,
        label: 'Competitive Exams',
        labelImage: require('../../assets/images/crestest-1683119149939ve.png'),
        isImage: true,
        page: 'OnlineCompetitiveCategory',
        backgroundColor: '#57BAD7',
        iconBackground: "#fff",
        iconName: 'document-text',
        textColor: '#fff',
        alterLabel: 'Competitive'
    },
    {
        id: 4,
        label: 'Demo Assessment',
        labelImage: "",
        isImage: false,
        page: 'OnlineAssessmentList',
        backgroundColor: '#A46DFF',
        iconBackground: "#fff",
        iconName: 'bar-chart-outline',
        textColor: '#fff',
        alterLabel: 'Demo Assessment',
        iconColor: '#A46DFF',
    },
    {
        id: 5,
        label: 'Online Assessment List',
        labelImage: "",
        isImage: false,
        page: 'OnlineAssessmentList',
        backgroundColor: '#13B292',
        iconBackground: "#fff",
        iconName: 'bar-chart-sharp',
        textColor: '#fff',
        alterLabel: 'Online Assessment',
        iconColor: '#13B292',
    },

]


const OnlineExam = ({ navigation }) => {

    // const navigation = useNavigation();
    
    const demoExamSubmit = useSelector(state => state.questionNo.demoExamDoneOrNot);
    const demoUserOrNot = useSelector(state => state.auth.user_id);
    const regUserSubOrNot = useSelector(state => state.auth.is_subscribe);
    // const newStudentid = useSelector(state => state.student.newStudentid);

    useEffect(() => {
        // console.log("demoUserOrNot--useEffect--1>", demoUserOrNot)
        // console.log("demoExamSubmit--useEffect--2>", demoExamSubmit)
        // console.log("regUserSubOrNot--useEffect--3>", regUserSubOrNot)
    }, []);

    const leftIconHandeler = () => {
        navigation.dispatch(DrawerActions.toggleDrawer())
    }

    const goToNewPage = (pageName, alterLabel, id) => {
        // console.log("pageName--", pageName, alterLabel, id)
        /* if (pageName != '') {
            navigation.navigate('nonAuthScenes', {
                screen: `${pageName}`,
            });
        } */

        if (demoUserOrNot != 0 && (id == 2 || id == 3) && (regUserSubOrNot == 1 || regUserSubOrNot == 3 || regUserSubOrNot != 0)) {
            if (pageName != '') {
                navigation.navigate('nonAuthScenes', {
                    screen: `${pageName}`,
                });
            }
        } else if (id == 1) {
            navigation.navigate('nonAuthScenes', {
                screen: `${pageName}`,
            });
        } else {
            Alert.alert('Alert', `Please buy ${alterLabel} subscription`, [
                { text: 'OK' },
            ]);
        }
    }

    const demoAssessmentAlertHandeler = (pageName, alterLabel, id) => {
        if (demoExamSubmit == 1 && id == 4) {
            if (pageName != '') {
                navigation.navigate('nonAuthScenes', {
                    screen: `${pageName}`,
                    params: { pageName: pageName, alterLabel: alterLabel, id: id }
                });
            }
        } else {
            Alert.alert('Alert', `Please attend demo exam first`, [
                { text: 'OK' },
            ]);
        }
    }

    const onlineAssessmentAlertHandeler = (pageName, alterLabel, id) => {
        if (demoUserOrNot != 0 && id == 5 && (regUserSubOrNot == 1 || regUserSubOrNot == 2 || regUserSubOrNot == 3)) {
            if (pageName != '') {
                navigation.navigate('nonAuthScenes', {
                    screen: `${pageName}`,
                    params: { pageName: pageName, alterLabel: alterLabel, id: id }
                });
            }
        } else {
            Alert.alert('Alert', `Please attend any online exam first`, [
                { text: 'OK' },
            ]);
        }
    }

    const alertMessage = (alertLabel, id) => {
        if (demoUserOrNot > 0) {
            Alert.alert('Alert', `Please subscribe`, [
                { text: 'OK' },
            ]);
        }else {
            Alert.alert('Alert', `Please register yourself to view`, [
                { text: 'OK' },
            ]);
        }
    }

    const viewDemoAssessment = () => {
        navigation.navigate('nonAuthScenes', {
            screen: 'DemoAssessment',
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
                    headerName='Online Exams'
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
                                            // goToNewPage={() => goToNewPage(item.page)}
                                            goToNewPage={() => item.id == 1 ? goToNewPage(item.page, item.alterLabel, item.id) : demoUserOrNot != 0 && item.id == 2 && (regUserSubOrNot == 1 || regUserSubOrNot == 3 || regUserSubOrNot == 0) ? goToNewPage(item.page, item.alterLabel, item.id) : demoUserOrNot != 0 && item.id == 3 && (regUserSubOrNot == 2 || regUserSubOrNot == 3 || regUserSubOrNot == 0) ? goToNewPage(item.page, item.alterLabel, item.id) : (demoExamSubmit >= 0 || demoExamSubmit == null) && item.id == 4 ? demoAssessmentAlertHandeler(item.page, item.alterLabel, item.id) : demoUserOrNot != 0 && item.id == 5 && (regUserSubOrNot == 1 || regUserSubOrNot == 2 || regUserSubOrNot == 3 || regUserSubOrNot == 0) ? onlineAssessmentAlertHandeler(item.page, item.alterLabel, item.id) : alertMessage(item.alterLabel)}

                                            itemBackgroundColor={item.id == 1 ? item.backgroundColor : demoUserOrNot != 0 && item.id == 2 && (regUserSubOrNot == 1 || regUserSubOrNot == 3) ? item.backgroundColor : demoUserOrNot != 0 && item.id == 3 && (regUserSubOrNot == 2 || regUserSubOrNot == 3) ? item.backgroundColor : demoExamSubmit == 1 && item.id == 4 ? item.backgroundColor : demoUserOrNot != 0 && item.id == 5 && (regUserSubOrNot == 1 || regUserSubOrNot == 2 || regUserSubOrNot == 3) ? item.backgroundColor : '#999'}
                                            iconBackground={item.iconBackground}
                                            textColor={item.textColor}
                                        />
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

export default OnlineExam;