import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions, } from '@react-navigation/native';

import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    ImageBackground,
    View,
    Text,
    Animated,
    TouchableWithoutFeedback,
    PermissionsAndroid,
    Alert
} from 'react-native';
import TableBottomSheet from '../../components/TableBottomSheet';
import { Row, Rows, Table } from 'react-native-reanimated-table';

import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Orientation from 'react-native-orientation-locker';

import { container, fonts } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import HeaderComponent from '../../components/HeaderComponent';
import DashboardBoxComponent from '../../components/DashboardBoxComponent';
import { getData } from "../../utils/Util";
import CourseComponentForDesktop from '../../components/CourseComponentForDesktop';
import ThemeUtils from "../../utils/ThemeUtils";
// import { dashboardLogindataDataDetails } from '../../../store/actions/AuthActions';
import { dashboardLogindataDataDetails, dashboardProfileImageUploadAction, getAdvertisementDetails } from '../../store/actions/AuthActions';
import { getAwsCredentialsData } from '../../store/actions/LibraryAction';
import { drawerMenuActiveIdUpdateAction } from '../../store/actions/DashboardAction';
import { getProfileDetailsById } from '../../store/actions/ProfileAction';


import { getCartData } from '../../store/actions/SubscribeAction';

import ImageUploadOption from '../profile/ImageUploadOption'
import PerformanceOption from '../../components/PerformanceOption'

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 150;
// const HEADER_MAX_HEIGHT = 38 + 40;

var myDate = new Date();
var hrs = myDate.getHours();

// ('../assets/images/brain_new.png')

const dashboardList = [
    {
        id: 1,
        label: 'Current status',
        labelImage: '',
        isImage: false,
        page: 'currentStatus',
        drawerMmenu: 0
    },
    {
        id: 2,
        label: 'Performance',
        labelImage: require('../../assets/images/performance.png'),
        isImage: false,
        page: 'PerformanceScore',
        drawerMmenu: 0, //6
    },
    {
        id: 3,
        label: 'Online exams',
        labelImage: require('../../assets/images/onlineexam.png'),
        isImage: true,
        page: 'Online Exams', /* Onlineexam */
        drawerMmenu: 2
    },
    {
        id: 4,
        label: 'e-Library',
        labelImage: require('../../assets/images/eLibrary.png'),
        isImage: true,
        page: 'e-library', /* ELibrary */  /* careerGuidance */
        drawerMmenu: 3
    },
    {
        id: 5,
        label: 'Class schedule',
        labelImage: require('../../assets/images/calender.png'),
        isImage: true,
        page: 'classSchedule',
        drawerMmenu: 0, //4
    },
    {
        id: 6,
        label: 'Today in History',
        labelImage: require('../../assets/images/book.png'),
        isImage: true,
        page: 'TodayHistory',
        drawerMmenu: 0
    },
    {
        id: 7,
        label: 'Career Guidance',
        labelImage: require('../../assets/images/brain_new.png'),
        isImage: true,
        page: 'CareerGuidance', /* careerGuidance */
        drawerMmenu: 0
    },
    {
        id: 8,
        label: 'Course',
        labelImage: require('../../assets/images/course.png'),
        isImage: true,
        page: 'course',
        drawerMmenu: 0
    },
    {
        id: 9,
        label: 'Instruction',
        labelImage: require('../../assets/images/info.png'),
        isImage: true,
        page: 'Instruction',
        drawerMmenu: 0
    },

]
const notDataForCompetitive = [
    {
        id: 1,
        text: 'No data Available for competitive'
    }
]

const Dashboard = (props) => {

    const dispatch = useDispatch();

    const [itemList, setItemList] = useState(dashboardList);
    const [wish, setWish] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [userid, setUserid] = useState('')
    const [profile_pic, setProfile_pic] = useState('')
    // const [updateTime, setUpdateTime] = useState(true)
    // const [iconPressed, setIconPressed] = useState(false);
    const [proImgFile, setProImgFile] = useState(null);

    const [isLocked, setLocked] = useState();
    // const [orientation, setOrientation] = useState();
    // const [deviceOrientation, setDeviceOrientation] = useState();
    // const [lock, setLock] = useState();
    const [performanceViewVisible, setPerformanceViewVisible] = useState(false);

    const scrollYAnimatedValue = new Animated.Value(0);
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);

    const competitive_overall = useSelector(state => state.auth.competitive_overall);
    const demoUserOrNot = useSelector(state => state.auth.user_id);
    const performance_details_sch = useSelector(state => state.auth.performance_details_sch);
    const performance_details_comp = useSelector(state => state.auth.performance_details_comp);
    const performance_total_exam_count = useSelector(state => state.auth.performance_total_exam_count);

    // const profile_pic = useSelector((state) => state.auth.profile_pic);

    React.useEffect(() => {
        const callUpdateUserDetails = props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            if (hrs < 12) {
                setWish('Good Morning');
            }
            else if (hrs >= 12 && hrs < 16) {
                setWish('Good Afternoon');
            }
            else if (hrs >= 16 && hrs <= 24) {
                setWish('Good Evening');
            }

            async function getUserDetails() {
                let result = await getData("crestestUserDetails");
                result = JSON.parse(result);
                // console.log("%%%%--3---", result )
                let fname = result['fname'];
                let lname = result['lname'];
                let profile_pic = result['profile_pic'];
                let loging_id = result['id'];
                setFname(fname);
                setLname(lname);
                setProfile_pic(profile_pic)
                setUserid(loging_id)
            };
            getUserDetails();
            dispatch(getCartData(props));
            dispatch(getAwsCredentialsData(props));
            // console.log("@11-----")
            dispatch(drawerMenuActiveIdUpdateAction(1))

        });
        Orientation.lockToPortrait();
        checkLocked();
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return callUpdateUserDetails;
    }, [props.navigation]);

    useEffect(() => {
        StatusBar.setHidden(false, 'fade');
    }, []);

    useEffect(() => {
        Orientation.lockToPortrait();
        checkLocked();

        setItemList(dashboardList)

    }, []);


    useEffect(() => {
        /*  dashbaord data calling without parameter */
        dispatch(dashboardLogindataDataDetails());
        return () => {
        };
    }, []);

    useEffect(() => {
        dispatch(getProfileDetailsById(props));
        /*  dashbaord data calling without parameter */
        dispatch(getAdvertisementDetails(props));

    }, []);

    const leftIconHandeler = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    const goToNewPage = (pageName, id, drawerMmenuid) => {
        // console.log("pageName--", pageName, )
        if (id == 2 && userid != 0) {
            performanceDetails()
        } else if (userid == 0 && (pageName == 'PerformanceScore' || pageName == 'currentStatus' || pageName == 'course')) {
            Alert.alert('Alert', 'You do not have permission to access ?', [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ]);
        } else if (pageName == 'Online Exams' || pageName == 'e-library') {
            // console.log("@1")
            props.navigation.navigate('drawerScenes', {
                screen: `${pageName}`,
            });
        } else {
            console.log("@3", id, userid)
            if (id != 2 ) { /* && id != 1 && id != 8 */
                // console.log("@2")
                props.navigation.navigate('nonAuthScenes', {
                    screen: `${pageName}`,
                });
            }
        }
        if (drawerMmenuid != 0) {
            dispatch(drawerMenuActiveIdUpdateAction(drawerMmenuid))
        }
    }

    const elementButton = (value, color) => (
        <View
            style={{
                flex: 1,
                backgroundColor: color,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text
                style={{
                    textAlign: 'center',
                    fontFamily: fonts.rBold,
                    color: '#777777',
                    fontSize: 10,
                }}>
                {value}
            </Text>
        </View>
    );

    const elementData = (value, color) => (
        <View
            style={{
                flex: 1,
                backgroundColor: color,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text
                style={{
                    color: 'black',
                    textAlign: 'center',
                    fontFamily: fonts.rRegular,
                    fontSize: 10,
                }}>
                {value}
            </Text>
        </View>
    );

    const headerHeight = scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        }
    )

    const headerBackgroundColor = scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, 50, 70, 80, 90, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: ['#137897', '#1C84A4', '#359AB9', '#5FA8BF', '#99BAC5', 'rgba(0, 0, 0, 0)'],
            extrapolate: 'clamp',
        }
    )

    const getNormalTitleOpacity = scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, 100, 150],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
            useNativeDriver: true,
        }
    )

    const profileImageBorderWidth = scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, 140],
            outputRange: [2, 1],
            extrapolate: 'clamp',
            useNativeDriver: true,
        }
    );

    const profileImageBorderColor = scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, 140],
            outputRange: ['#fff', '#fff'],
            extrapolate: 'clamp',
            useNativeDriver: true,
        }
    );

    const profileImageHeight = scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, 140],
            // outputRange: [ThemeUtils.relativeWidth(76), ThemeUtils.APPBAR_HEIGHT - 20],
            outputRange: [76, 25],
            extrapolate: 'clamp',
            useNativeDriver: true,
        }
    );

    const profileImageWidth = scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, 140],
            // outputRange: [ThemeUtils.relativeWidth(76), ThemeUtils.APPBAR_HEIGHT - 20],
            outputRange: [76, 25],
            extrapolate: 'clamp',
            useNativeDriver: true,
        }
    );

    //artist profile image position from left
    const profileImageLeft = scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, 80, 140],
            outputRange: [ThemeUtils.relativeWidth(75), ThemeUtils.relativeWidth(75), ThemeUtils.relativeWidth(77)],
            extrapolate: 'clamp',
            useNativeDriver: true,
        }
    );

    //artist profile image position from top
    const profileImageTop = scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, 140],
            outputRange: [10, -44],
            extrapolate: 'clamp',
            useNativeDriver: true,
        }
    );

    const iconOpacity = scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, 10],
            outputRange: [1, 0],
            extrapolate: 'clamp',
            useNativeDriver: true,
        }
    )

    const goToProfilePageHandeler = () => {
        // console.log("goToProfilePageHandeler=======")
        props.navigation.navigate('nonAuthScenes', {
            screen: 'Profile',
        })
    }

    const performanceDetails = () => {
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <PerformanceOption props={props} performanceMoreDetails={() => performanceMoreDetails()} performanceViewDetails={() => performanceViewDetails()} />,
                'componentHeight': 100,
            });
    }

    const performanceMoreDetails = () => {
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
        props.navigation.navigate('nonAuthScenes', {
            screen: 'PerformanceScore',
        });
    }

    const performanceViewDetails = () => {
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
        setPerformanceViewVisible(true)
    }

    const changeProfileImageOnlyHandeler = () => {
        profileImageUploadHandeler();
    }

    const profileImageUploadHandeler = () => {
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <ImageUploadOption props={props} onSelectGalleryOption={() => onSelectGalleryOption()} onUseCameraOption={() => onUseCameraOption()} />,
                'componentHeight': 100,
            });
    }

    onSelectGalleryOption = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            let image_filename = image.path.substring(image.path.lastIndexOf('/') + 1);

            Alert.alert('Confirm', 'Are you sure ?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        // console.log('OK Pressed');
                        setProfile_pic(image.path)

                        let thumb = {
                            name: image_filename,
                            uri: `file://${image.path}`,
                            type: "image/jpeg",
                        };

                        setProImgFile(thumb)
                        dispatch(dashboardProfileImageUploadAction(thumb));
                    }
                },
            ]);

        });
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    }

    const onUseCameraOption = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                ImagePicker.openCamera({
                    mediaType: 'photo',
                    compressImageQuality: 0.8,
                    cropping: true
                }).then(image => {
                    let image_filename = image.path.substring(image.path.lastIndexOf('/') + 1);

                    Alert.alert('Confirm', 'Are you sure ?', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'OK', onPress: () => {
                                // console.log('OK Pressed'),
                                setProfile_pic(image.path)

                                let thumb = {
                                    name: image_filename,
                                    uri: `file://${image.path}`,
                                    type: "image/jpeg",
                                };

                                setProImgFile(thumb)
                                dispatch(dashboardProfileImageUploadAction(thumb));
                            }

                        },
                    ]);

                });
            } else {
                //console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }

        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    };

    const checkLocked = () => {
        const locked = Orientation.isLocked();
        if (locked !== isLocked) {
            setLocked(locked);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "none"}
            style={container}
        >
            {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
            <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
            <HeaderComponent
                headerName='Dashboard'
                leftIcon='menu-outline'
                leftIconHandeler={leftIconHandeler}
                headerProfileImage={true}
            />

            <ImageBackground source={require('../../assets/images/background_base.png')} style={Gstyles.imageBackgroundContainer} >
                <View style={Gstyles.insideParentContainer}>
                    <ScrollView
                        overScrollMode={'never'}
                        // style={{ zIndex: 10 }}
                        scrollEventThrottle={16}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={[Gstyles.scrollViewContainer, { paddingTop: HEADER_MAX_HEIGHT }]} 
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event([{
                            nativeEvent: { contentOffset: { y: scrollYAnimatedValue } },
                        }], {
                            listener: (event) => {
                            },
                            useNativeDriver: false,
                        })}
                    >
                        {
                            dashboardList != '' && dashboardList != undefined ?
                                dashboardList.map((item, index) => {
                                    return (
                                        <DashboardBoxComponent
                                            key={item.id}
                                            indexValue={item.id}
                                            isImage={item.isImage}
                                            imageName={item.labelImage}
                                            labelName={item.label}
                                            percent={(demoUserOrNot == 0 ? 0 : competitive_overall)}
                                            goToNewPage={() => goToNewPage(item.page, item.id, item.drawerMmenu)}
                                        />
                                    );
                                })
                                : null
                        }
                    </ScrollView>
                </View>
                <View style={Gstyles.dashboardBottomContainer}>
                    <View style={Gstyles.dashboardBottomTextContainer}>
                        <Text style={Gstyles.dashboardBottomText}>Course Details</Text>
                    </View>

                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        // contentContainerStyle={Gstyles.scrollViewContainer}
                        showsVerticalScrollIndicator={false}
                        horizontal={true}
                    >
                        <CourseComponentForDesktop
                            width={Dimensions.get('window').width - 70}
                            marginHorizontal={15}
                            marginTop={10}
                            CourseName='S'
                        />
                        <CourseComponentForDesktop
                            width={Dimensions.get('window').width - 70}
                            marginHorizontal={15}
                            marginTop={10}
                            CourseName='C'
                        />
                    </ScrollView>
                </View>
            </ImageBackground>

            <Animated.View style={[Gstyles.topUserDetails, styles.animatedHeaderContainer, { height: headerHeight, backgroundColor: headerBackgroundColor }]}>
                <View>
                    <Animated.Text style={[Gstyles.topUserTextDetails, { opacity: getNormalTitleOpacity }]}>Hello <Animated.Text style={[Gstyles.studentName, { opacity: getNormalTitleOpacity }]}>{fname + ' ' + lname}</Animated.Text></Animated.Text>
                    <Animated.Text style={[Gstyles.wishesDetails, { opacity: getNormalTitleOpacity }]}>{wish}</Animated.Text>

                    <TouchableOpacity
                        onPress={userid == 0 ? null : goToProfilePageHandeler}
                        style={{ marginTop: 20, flexDirection: 'row' }}
                    >

                        <Animated.Image
                            source={require('../../assets/images/clv.png')}
                            style={[styles.clvImage, {
                                opacity: iconOpacity, transform: [{ scale: iconOpacity }]

                            }]}
                        />
                        <Animated.Text style={[Gstyles.wishesDetails, { opacity: getNormalTitleOpacity }]}>{`My CLV Profile`}</Animated.Text>

                    </TouchableOpacity>

                </View>
                            {console.log("profile_pic------", profile_pic)}
                <TouchableWithoutFeedback
                    onPress={userid == 0 ? null : changeProfileImageOnlyHandeler}
                >
                    <Animated.Image
                        source={profile_pic != '' && profile_pic != null && profile_pic != undefined ? { uri: profile_pic } : require('../../assets/images/profile.png')}

                        style={[styles.profileImage, {
                            borderWidth: profileImageBorderWidth,
                            borderColor: profileImageBorderColor,
                            borderRadius: 40,
                            height: profileImageHeight,
                            width: profileImageWidth,
                            transform: [
                                { translateY: profileImageTop },
                                { translateX: profileImageLeft },
                            ],
                        }]}

                        tintColor={profile_pic != '' && profile_pic != null && profile_pic != undefined ? null : "#137999"} />

                </TouchableWithoutFeedback>

            </Animated.View>

            <TableBottomSheet
                title={'Performance'}
                isVisible={performanceViewVisible}
                onCloseRequest={() => setPerformanceViewVisible(false)}
            >
                <View style={{ maxHeight: 350 }}>
                    <ScrollView>
                        <ScrollView
                            horizontal
                        >

                            <Table borderStyle={{ borderWidth: 5, borderColor: '#ffffff' }}>
                                <Row
                                    widthArr={[80, 60, 100, 100, 170, 90, 90, 90, 90,]}
                                    data={[
                                        elementButton('Category', '#CAF0FF'),
                                        elementButton('Type', '#CAF0FF'),
                                        elementButton('Group', '#CAF0FF'),
                                        elementButton('Subject', '#CAF0FF'),
                                        elementButton('Chapter', '#CAF0FF'),
                                        elementButton('Test name', '#FFFCC7'),
                                        elementButton('Score', '#E8E8E8'),
                                        elementButton('Full marks', '#C5FFCA'),
                                        elementButton('Percentage', '#FFC0C0'),
                                    ]}

                                    style={{ height: 40, backgroundColor: '#CAEBF9' }}
                                    textStyle={{
                                        textAlign: 'center',
                                        fontSize: 12,
                                        fontFamily: fonts.rBold,
                                        color: '#777777',
                                    }}
                                />
                                {performance_details_sch != '' ?
                                    <Rows
                                        data={performance_details_sch?.map(item => {
                                            return [
                                                elementData('SCHOLASTIC', '#F9DCDC'),
                                                elementData('-', '#D1D3D4'),
                                                elementData(item?.group_name, '#D1D3D4'),
                                                elementData(item?.subject, '#D1D3D4'),
                                                elementData(item?.chapter_name, '#D1D3D4'),
                                                elementData(item?.exam_type, '#D1D3D4'),
                                                elementData(item?.correct_record, '#D1D3D4'),
                                                elementData(item?.total_record, '#D1D3D4'),
                                                elementData(item?.percentage, '#D1D3D4'),
                                            ];
                                        })}
                                        textStyle={{ textAlign: 'center' }}
                                        widthArr={[80, 60, 100, 100, 170, 90, 90, 90, 90,]}
                                        style={{ backgroundColor: '#D1D3D4', height: 60, }}
                                    />
                                    :
                                    <Rows
                                        data={notDataForCompetitive?.map(item => {
                                            return [
                                                elementData('No data Available for scholastic', '#F9DCDC'),
                                            ];
                                        })}
                                        textStyle={{ textAlign: 'center' }}
                                        flexArr={[1]}
                                        style={{ backgroundColor: '#D1D3D4', height: 40 }}
                                    />
                                }

                                {performance_details_comp != '' ?
                                    <Rows
                                        data={performance_details_comp?.map(item => {
                                            return [
                                                elementData('COMPETITIVE', '#F9DCDC'),
                                                elementData(item?.subject, '#D1D3D4'),
                                                elementData(item?.group_name, '#D1D3D4'),
                                                elementData('-', '#D1D3D4'),
                                                elementData(item?.chapter_name, '#D1D3D4'),
                                                elementData(item?.exam_type, '#D1D3D4'),
                                                elementData(item?.score, '#D1D3D4'),
                                                elementData(item?.total, '#D1D3D4'),
                                                elementData(item?.percentage, '#D1D3D4'),
                                            ];
                                        })}
                                        textStyle={{ textAlign: 'center' }}
                                        widthArr={[80, 60, 100, 100, 170, 90, 90, 90, 90,]}
                                        style={{ backgroundColor: '#D1D3D4', height: 60 }}
                                    />
                                    :
                                    <Rows
                                        data={notDataForCompetitive.map(item => {
                                            return [
                                                elementData('No data Available for competitive', '#F9DCDC'),
                                            ];
                                        })}
                                        textStyle={{ textAlign: 'center' }}
                                        // widthArr={[80, 60, 100, 100, 90, 90, 90, 90, 90,]}
                                        flexArr={[1]}
                                        style={{ backgroundColor: '#D1D3D4', height: 40 }}
                                    />
                                }

                                <Rows
                                    data={notDataForCompetitive?.map(item => {
                                        return [
                                            elementData('Total', '#F9DCDC'),
                                            elementData('', '#D1D3D4'),
                                            elementData('', '#D1D3D4'),
                                            elementData('', '#D1D3D4'),
                                            elementData('', '#D1D3D4'),
                                            elementData(performance_total_exam_count, '#D1D3D4'),
                                            elementData('', '#D1D3D4'),
                                            elementData('', '#D1D3D4'),
                                            elementData((demoUserOrNot == 0 ? 0 : competitive_overall), '#D1D3D4'),
                                        ];
                                    })}
                                    textStyle={{ textAlign: 'center' }}
                                    widthArr={[80, 60, 100, 100, 170, 90, 90, 90, 90,]}
                                    style={{ backgroundColor: '#D1D3D4', height: 40 }}
                                />

                            </Table>

                        </ScrollView>
                    </ScrollView>
                </View>

            </TableBottomSheet>

        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create(
    {
        animatedHeaderContainer: {
            position: 'absolute',
            top: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight + 38.5,
            left: 0,
            right: 0,
            alignItems: 'center'
        },
        profileImage: {
            position: 'absolute',
            zIndex: -100,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        },
        cameraIconContainer: {
            width: 20,
            height: 20,
            backgroundColor: '#ff0000',
            alignContent: 'center',
            textAlign: 'center',
            lineHeight: 20,
            borderRadius: 20,
            right: 0,
            bottom: -40,
            zIndex: 999
        },
        clvImage: {
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: 25,
            height: 25,
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 100,
            marginRight: 5,
            top:-2,
        }
    })

export default Dashboard;