import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { NavigationContainer, getfocusedroutenamefromroute, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from './RootNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { storeData, getData, clearAllData } from "../utils/Util";
import { connect, useDispatch, useSelector } from 'react-redux';

import { isAuthenticated } from '../store/selectors/AuthSelectors';


// Auth Scenes
import Signin from '../screens/auth/Signin';
import Registration from '../screens/auth/Registration';
import ForgotPassword from '../screens/auth/ForgotPassword';
import SuccessRegister from '../screens/auth/SuccessRegister';

// Non Auth Scenes
import Profile from '../screens/profile/Profile';
import Dashboard from '../screens/home/Dashboard';
import CurrentStatus from '../screens/home/CurrentStatus';
import TodayHistory from '../screens/home/TodayHistory';
import CareerGuidance from '../screens/home/CareerGuidance';
import Instruction from '../screens/home/Instruction';
import PdfViewer from '../screens/home/PdfViewer';
import PdfViewerForDetails from '../screens/home/PdfViewerForDetails';
import ClassSchedule from '../screens/home/ClassSchedule';
import Course from '../screens/home/Course';
import PerformanceCategory from '../screens/PerformanceScore/PerformanceCategory';
import PerformanceELibraryCategory from '../screens/PerformanceScore/PerformanceELibraryCategory';
import OverallScholasticPerformanceScore from '../screens/PerformanceScore/OverallScholasticPerformanceScore';
import OverallCompetitivePerformanceScore from '../screens/PerformanceScore/OverallCompetitivePerformanceScore';

import ELibraryScholasticPerformanceScore from '../screens/PerformanceScore/ELibraryScholasticPerformanceScore';

import ELibraryCompetitivePerformanceScore from '../screens/PerformanceScore/ELibraryCompetitivePerformanceScore';
import ELibraryCompetitiveCategoryPerformance from '../screens/PerformanceScore/ELibraryCompetitiveCategoryPerformance';
import OnlineCompetitiveCategoryPerformance from '../screens/PerformanceScore/OnlineCompetitiveCategoryPerformance';

import ELibraryCategory from '../screens/E-library/ELibraryCategory';
import ELibraryList from '../screens/E-library/ELibraryList';
import ELibraryListSubjectWise from '../screens/E-library/ELibraryListSubjectWise';
import ELibraryCompetitiveCategory from '../screens/E-library/ELibraryCompetitiveCategory';
import OnlineCompetitiveCategory from '../screens/home/OnlineCompetitiveCategory';
import OnlineCompetitiveSubCategory from '../screens/home/OnlineCompetitiveSubCategory';
import ScholasticExamsSubject from '../screens/OnlineExam/ScholasticExamsSubject';
import OnlineAssessmentList from '../screens/OnlineExam/OnlineAssessmentList';
import OnlineExamsDetails from '../screens/OnlineExam/OnlineExamsDetails';


import Cart from '../screens/Subscription/Cart';
import PaymentSuccessful from '../screens/Subscription/PaymentSuccessful';
import SubscriptionCategory from '../screens/Subscription/SubscriptionCategory';
import SubscriptionELibraryCategory from '../screens/Subscription/SubscriptionELibraryCategory';
import SubscriptionOnlineCompetitiveCategory from '../screens/Subscription/SubscriptionOnlineCompetitiveCategory';
import SubscriptionELibraryCompetitiveCategory from '../screens/Subscription/SubscriptionELibraryCompetitiveCategory';
import SubscriptionOnlineScholasticList from '../screens/Subscription/SubscriptionOnlineScholasticList';
import SubscriptionOnlineCompetitiveList from '../screens/Subscription/SubscriptionOnlineCompetitiveList';
import SubscriptionElibraryCompetitiveList from '../screens/Subscription/SubscriptionElibraryCompetitiveList';
import SubscriptionElibraryScholasticList from '../screens/Subscription/SubscriptionElibraryScholasticList';
import MyPurchasedList from '../screens/Subscription/MyPurchasedList';

// Drawer Scenes
import Elibrary from '../screens/home/Elibrary';
import OnlineExam from '../screens/home/OnlineExam';
import OnlineClasses from '../screens/home/OnlineClasses';
import Subscribe from '../screens/home/Subscribe';
import PerformanceScore from '../screens/home/PerformanceScore';
import DemoExams from '../screens/home/exam/DemoExams';
import ExamsDetails from '../screens/home/exam/ExamsDetails';
import DemoRegistration from '../screens/home/exam/DemoRegistration';
import DemoAssessment from '../screens/home/exam/DemoAssessment';
import CustomDrawer from './CustomDrawer';
import ScholasticPerformanceScore from '../screens/PerformanceScore/ScholasticPerformanceScore';
import SubjectWiseScholasticScore from '../screens/PerformanceScore/SubjectWiseScholasticScore';
import SubjectWiseAnalysis from '../screens/PerformanceScore/SubjectWiseAnalysis';
import ChapterWiseAnalysis from '../screens/PerformanceScore/ChapterWiseAnalysis';
import SubjectWiseCompetitiveScore from '../screens/PerformanceScore/SubjectWiseCompetitiveScore';
import CompetitiveSubjectwiseAnalysisOnSet from '../screens/PerformanceScore/CompetitiveSubjectwiseAnalysisOnSet';
import TermsCondition from '../screens/home/TermsCondition';
import PrivacyPolicy from '../screens/home/PrivacyPolicy';
import Faqs from '../screens/home/Faqs';
import Feedback from '../screens/home/Feedback';


import ArchivePerformanceScore from '../screens/Archive/ArchivePerformanceScore';
import ArchivePerformanceCategory from '../screens/Archive/ArchivePerformanceCategory';
import ArchiveScholasticPerformanceScore from '../screens/Archive/ArchiveScholasticPerformanceScore';
import ArchiveOverallScholasticPerformanceScore from '../screens/Archive/ArchiveOverallScholasticPerformanceScore';
import ArchiveSubjectWiseScholasticScore from '../screens/Archive/ArchiveSubjectWiseScholasticScore';
import ArchiveSubjectWiseAnalysis from '../screens/Archive/ArchiveSubjectWiseAnalysis';
import ArchiveChapterWiseAnalysis from '../screens/Archive/ArchiveChapterWiseAnalysis';
import ArchiveOnlineCompetitiveCategoryPerformance from '../screens/Archive/ArchiveOnlineCompetitiveCategoryPerformance';
import ArchiveOverallCompetitivePerformanceScore from '../screens/Archive/ArchiveOverallCompetitivePerformanceScore';
import ArchiveSubjectWiseCompetitiveScore from '../screens/Archive/ArchiveSubjectWiseCompetitiveScore';
import ArchiveCompetitiveSubjectwiseAnalysisOnSet from '../screens/Archive/ArchiveCompetitiveSubjectwiseAnalysisOnSet';
import ArchivePerformanceELibraryCategory from '../screens/Archive/ArchivePerformanceELibraryCategory';
import ArchiveELibraryScholasticPerformanceScore from '../screens/Archive/ArchiveELibraryScholasticPerformanceScore';
import ArchiveELibraryCompetitiveCategoryPerformance from '../screens/Archive/ArchiveELibraryCompetitiveCategoryPerformance';
import ArchiveELibraryCompetitivePerformanceScore from '../screens/Archive/ArchiveELibraryCompetitivePerformanceScore';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const AuthScenes = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Signin"
                component={Signin}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="Registration"
                component={Registration}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="SuccessRegister"
                component={SuccessRegister}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
        </Stack.Navigator>
    );
}

const NonAuthScenes = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="TodayHistory"
                component={TodayHistory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="currentStatus"
                component={CurrentStatus}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="CareerGuidance"
                component={CareerGuidance}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="Instruction"
                component={Instruction}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="PdfViewer"
                component={PdfViewer}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="PdfViewerForDetails"
                component={PdfViewerForDetails}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="classSchedule"
                component={ClassSchedule}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="course"
                component={Course}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="PerformanceScore"
                component={PerformanceScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="DemoExams"
                component={DemoExams}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="ExamsDetails"
                component={ExamsDetails}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="DemoRegistration"
                component={DemoRegistration}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="DemoAssessment"
                component={DemoAssessment}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="PerformanceCategory"
                component={PerformanceCategory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="PerformanceELibraryCategory"
                component={PerformanceELibraryCategory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="SubjectWiseCompetitiveScore"
                component={SubjectWiseCompetitiveScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="CompetitiveSubjectwiseAnalysisOnSet"
                component={CompetitiveSubjectwiseAnalysisOnSet}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="OverallScholasticPerformanceScore"
                component={OverallScholasticPerformanceScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ChapterWiseAnalysis"
                component={ChapterWiseAnalysis}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="SubjectWiseAnalysis"
                component={SubjectWiseAnalysis}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="SubjectWiseScholasticScore"
                component={SubjectWiseScholasticScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ScholasticPerformanceScore"
                component={ScholasticPerformanceScore}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="OverallCompetitivePerformanceScore"
                component={OverallCompetitivePerformanceScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ELibraryScholasticPerformanceScore"
                component={ELibraryScholasticPerformanceScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ELibraryCompetitivePerformanceScore"
                component={ELibraryCompetitivePerformanceScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="ELibraryCompetitiveCategoryPerformance"
                component={ELibraryCompetitiveCategoryPerformance}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="OnlineCompetitiveCategoryPerformance"
                component={OnlineCompetitiveCategoryPerformance}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="ELibraryCategory"
                component={ELibraryCategory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="ELibraryList"
                component={ELibraryList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="ELibraryListSubjectWise"
                component={ELibraryListSubjectWise}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="OnlineCompetitiveCategory"
                component={OnlineCompetitiveCategory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ELibraryCompetitiveCategory"
                component={ELibraryCompetitiveCategory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="OnlineCompetitiveSubCategory"
                component={OnlineCompetitiveSubCategory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="ScholasticExamsSubject"
                component={ScholasticExamsSubject}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="OnlineAssessmentList"
                component={OnlineAssessmentList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="OnlineExamsDetails"
                component={OnlineExamsDetails}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="PaymentSuccessful"
                component={PaymentSuccessful}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />


            <Stack.Screen
                name="SubscriptionCategory"
                component={SubscriptionCategory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="SubscriptionELibraryCategory"
                component={SubscriptionELibraryCategory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="SubscriptionOnlineCompetitiveCategory"
                component={SubscriptionOnlineCompetitiveCategory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="SubscriptionELibraryCompetitiveCategory"
                component={SubscriptionELibraryCompetitiveCategory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="SubscriptionOnlineScholasticList"
                component={SubscriptionOnlineScholasticList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="SubscriptionOnlineCompetitiveList"
                component={SubscriptionOnlineCompetitiveList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="SubscriptionElibraryCompetitiveList"
                component={SubscriptionElibraryCompetitiveList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="SubscriptionElibraryScholasticList"
                component={SubscriptionElibraryScholasticList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="ArchivePerformanceCategory"
                component={ArchivePerformanceCategory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="ArchiveScholasticPerformanceScore"
                component={ArchiveScholasticPerformanceScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ArchiveOverallScholasticPerformanceScore"
                component={ArchiveOverallScholasticPerformanceScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ArchiveSubjectWiseScholasticScore"
                component={ArchiveSubjectWiseScholasticScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ArchiveSubjectWiseAnalysis"
                component={ArchiveSubjectWiseAnalysis}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

            <Stack.Screen
                name="ArchiveChapterWiseAnalysis"
                component={ArchiveChapterWiseAnalysis}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ArchiveOnlineCompetitiveCategoryPerformance"
                component={ArchiveOnlineCompetitiveCategoryPerformance}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ArchiveOverallCompetitivePerformanceScore"
                component={ArchiveOverallCompetitivePerformanceScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ArchiveSubjectWiseCompetitiveScore"
                component={ArchiveSubjectWiseCompetitiveScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ArchiveCompetitiveSubjectwiseAnalysisOnSet"
                component={ArchiveCompetitiveSubjectwiseAnalysisOnSet}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ArchivePerformanceELibraryCategory"
                component={ArchivePerformanceELibraryCategory}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ArchiveELibraryScholasticPerformanceScore"
                component={ArchiveELibraryScholasticPerformanceScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ArchiveELibraryCompetitiveCategoryPerformance"
                component={ArchiveELibraryCompetitiveCategoryPerformance}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />
            <Stack.Screen
                name="ArchiveELibraryCompetitivePerformanceScore"
                component={ArchiveELibraryCompetitivePerformanceScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            />

        </Stack.Navigator>
    );

}

const DrawerScenes = () => {

    const demoExamSubmit = useSelector(state => state.questionNo.demoExamDoneOrNot);
    const demoUserOrNot = useSelector(state => state.auth.user_id);
    const regUserSubOrNot = useSelector(state => state.auth.is_subscribe);
    const newStudentid = useSelector(state => state.student.newStudentid);
    const is_subscribe_e_library = useSelector(state => state.auth.is_subscribe_e_library);

    const navigation = useNavigation()


    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#137897',
                drawerActiveTintColor: '#fff',
                drawerInactiveTineColor: '#333',
                drawerLabelStyle: { marginLeft: -25, fontSize: 15, },
                drawerStyle: {
                    // backgroundColor: '#c6c',
                    width: 300,
                    borderBottomRightRadius: 40,
                    borderTopRightRadius: 170,
                    // marginTop:30,
                },
                swipeEnabled: false,
                // drawerType:'slide'//'front' | 'back' | 'slide' | 'permanent'


            }}

            initialRouteParams='Dashboard'
            initialRouteName='Dashboard'

        // useLegacyImplementation
        >

            {/* <Drawer.Screen
                name="MY CLV Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Image
                            source={require('../assets/images/clv.png')}
                            style={{ width: 25, height: 25, }}
                        />
                    )
                }}
                initialParams={{ params: 1 }}
            /> */}

            <Drawer.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="grid-outline" size={22} color={color} />
                    )
                }}
            />

            <Drawer.Screen
                name="Online Exams"
                component={OnlineExam}
                options={{
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="document-text-outline" size={22} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="e-library"
                component={Elibrary}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="book-outline" size={22} color={color} />
                    )
                }}
            />

            {demoUserOrNot >= 1 && <Drawer.Screen
                name="Online Classes"
                component={OnlineClasses}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="tv-outline" size={22} color={color} />
                    )
                }}
            />
            }

            {demoUserOrNot >= 1 && <Drawer.Screen
                name="Subscription"
                component={Subscribe}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart-plus" size={22} color={color} />
                    )
                }}
            />
            }

            {demoUserOrNot >= 1 && <Drawer.Screen
                name="Performance Score"
                component={PerformanceScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="bar-chart-outline" size={22} color={color} />
                    )
                }}
            />
            }

            {demoUserOrNot >= 1 && <Drawer.Screen
                name="My Purchase"
                component={MyPurchasedList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="list" size={22} color={color} />
                    )
                }}
            />
            }
            {/* New Option */}
            {demoUserOrNot >= 1 && <Drawer.Screen
                name="About Us"
                component={MyPurchasedList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="list" size={22} color={color} />
                    )
                }}
            />
            }

            {demoUserOrNot >= 1 && <Drawer.Screen
                name="TermsCondition"
                component={TermsCondition}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="list" size={22} color={color} />
                    )
                }}
            />
            }

            {demoUserOrNot >= 1 && <Drawer.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="list" size={22} color={color} />
                    )
                }}
            />
            }
            {demoUserOrNot >= 1 && <Drawer.Screen
                name="Faqs"
                component={Faqs}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="list" size={22} color={color} />
                    )
                }}
            />
            }
            {demoUserOrNot >= 1 && <Drawer.Screen
                name="Feedback"
                component={Feedback}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="list" size={22} color={color} />
                    )
                }}
            />
            }

            {demoUserOrNot >= 1 && <Drawer.Screen
                name="Contact us"
                component={MyPurchasedList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="list" size={22} color={color} />
                    )
                }}
            />
            }

            {demoUserOrNot >= 1 && <Drawer.Screen
                name="FAQs"
                component={MyPurchasedList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="list" size={22} color={color} />
                    )
                }}
            />
            }

            {demoUserOrNot >= 1 && <Drawer.Screen
                name="Settings"
                component={MyPurchasedList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="list" size={22} color={color} />
                    )
                }}
            />
            }

            {demoUserOrNot >= 1 && <Drawer.Screen
                name="Share"
                component={MyPurchasedList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="list" size={22} color={color} />
                    )
                }}
            />
            }

            {demoUserOrNot >= 1 && <Drawer.Screen
                name="Rate Us"
                component={MyPurchasedList}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="list" size={22} color={color} />
                    )
                }}
            />
            }
            {/* Archive--------------------- */}
            {demoUserOrNot >= 1 && <Drawer.Screen
                name="Archive Performance Score"
                component={ArchivePerformanceScore}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerIcon: ({ color }) => (
                        <Ionicons name="list" size={22} color={color} />
                    )
                }}
            />
            }

        </Drawer.Navigator>
    );
}


const NavigationController = (props) => {

    const [initialRouteName, setInitialRouteName] = useState(props.singinCredential ? 'drawerScenes' : 'authScenes')

    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false, unmountOnBlur: true, }}>
                    <Stack.Screen name="drawerScenes" component={DrawerScenes} />
                    <Stack.Screen name="authScenes" component={AuthScenes} />
                    <Stack.Screen name="nonAuthScenes" component={NonAuthScenes} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default NavigationController;