import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    TextInput,
    BackHandler
} from 'react-native';

import Orientation, {
    useOrientationChange,
    useDeviceOrientationChange,
    useLockListener,
} from 'react-native-orientation-locker';

//styles
import { colors, container, scrollViewContainer, containerInside, fonts } from '../../../styles/Crestest.config';

const { width, height } = Dimensions.get('window');

import Emitter from '../../../utils/Emitter';
import * as Events from '../../../configs/Events';
import { validateEmail, decryptAES, inputAlphabetOnlyWithSpace } from "../../../utils/Util";

// import { loginAction } from '../../../store/actions/AuthActions'
import { useDispatch, useSelector } from 'react-redux';

import firebaseToken from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import Gstyles from '../../../styles/GlobalStyle';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown';

import { getClassStandardData, getBoardData, getSchoolListData, } from '../../../store/actions/CommonActions';
import { userDetailsExistsOrNot, newStudentRegistrationWithoutDemo, verificationCodeInputOffAction } from '../../../store/actions/AuthActions';

import DemoVerification from './DemoVerification'

import { newStudentRegistration, showingLoaderStudentAction, demoUserRecordExistsOrNot, verificationCodeAction, recordExistsSuccess, registrationStatusDetails, postDemoStudentRegistrationAction } from '../../../store/actions/StudentAction';

import TermsCondition from '../../../components/TermsCondition';
import { useNavigation } from '@react-navigation/native';

const DemoRegistration = (props) => {

    const navigation = useNavigation();
    // const [email, setEmail] = useState('');  
    // const [password, setPassword] = useState('123456');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    // const [isEnabled, setIsEnabled] = React.useState(true);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    //For date picker
    const [dob, setDob] = useState('');
    const [enterDob, setEnterDob] = useState(new Date());
    const [dobString, setDobString] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    //For End date picker

    const [gender, setGender] = useState(["Male", "Female", "Other",]);
    const [genderSelect, setGenderSelect] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailId, setEmailId] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [standard, setStandard] = useState(["1", "2", "3"]);
    const [standardSelect, setStandardSelect] = useState('');
    const [standardSave, setStandardSave] = useState('');

    const [board, setBoard] = useState([]);
    const [boardSelect, setBoardSelect] = useState('');
    const [boardSave, setBoardSave] = useState('');

    const [schoolName, setSchoolName] = useState([]);
    const [schoolNameSelect, setSchoolNameSelect] = useState('');
    const [schoolNameSave, setSchoolNameSave] = useState('');

    const [schoolAddress, setSchoolAddress] = useState('');

    const [pageOne, setPageOne] = useState(1);
    const [pageTwo, setPageTwo] = useState(0);
    const [pageThree, setPageThree] = useState(0);

    const [devicetoken, setDevicetoken] = useState(true);

    const [isLocked, setLocked] = useState();
    const [orientation, setOrientation] = useState();
    const [deviceOrientation, setDeviceOrientation] = useState();
    const [lock, setLock] = useState();
    const [showTermsCondition, setShowTermsCondition] = useState(false);

    const dispatch = useDispatch();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const dobRef = useRef();
    const genderRef = useRef();
    const addressRef = useRef();
    const pincodeRef = useRef();
    const mobileNumberRef = useRef();
    const emailIdRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const standardRef = useRef();
    const boardRef = useRef();
    const schoolNameRef = useRef();
    const schoolAddressRef = useRef();
    // const emailRef = useRef()
    // const passwordRef = useRef()
    const schoolListRef = useRef();

    /* if (!/[A-Za-z\s]/.test(event.key)) {
        event.preventDefault();
      } */

    // const alphabetsCheck = /^[A-Za-z\s]+$/;
    const alphabetsCheck = /^[A-Za-z\s]*$/;
    const onlyNumber = /^[0-9]+$/;
    const passwordPatteren = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const allowSpecialCharForAddress = /^[-()#A-Za-z0-9/,.\s/g]*$/;
    const onlyAllowedSpace = /^[a-zA-Z0-9_ ]*$/;

    const classStandardList = useSelector(state => state.common.classStandardList);
    const boardList = useSelector(state => state.common.boardList);
    const schoolList = useSelector(state => state.common.schoolList);
    const isSchoolList = useSelector(state => state.common.isSchoolList);
    const email_otp = useSelector(state => state.auth.email_otp);
    const mobile_otp = useSelector(state => state.auth.mobile_otp);
    const otpValidTime = useSelector(state => state.auth.otpValidTime);
    const isShowOtpBox = useSelector(state => state.auth.isShowOtpBox);
    const time_used = useSelector(state => state.auth.time_used);

    useEffect(() => {
        // firstNameRef.current.focus();
        dispatch(getClassStandardData(navigation));
        dispatch(getBoardData(navigation));
        getDeviceToken();
    }, []);

    useEffect(() => {
        // console.log("route.params?.validationStatus========", navigation)
        if (isShowOtpBox == 1) {
            onPressOpenVisibleOption();
        }

    }, [email_otp, mobile_otp, otpValidTime, isShowOtpBox]);

    useEffect(() => {
        let class_name = [];
        classStandardList.forEach((ele) => {
            class_name.push(ele.short_code)
        })
        setStandard(class_name);

    }, [classStandardList]);

    useEffect(() => {
        let board_name = [];
        boardList.forEach((ele) => {
            board_name.push(ele.name);
        })
        setBoard(board_name)

    }, [boardList]);


    useEffect(() => {
        // console.log("time_used------", time_used)
    }, [time_used]);

    useEffect(() => {
        Orientation.lockToPortrait();
        checkLocked();

        const backAction = (e) => {
            navigation.replace('drawerScenes', {
                screen: 'Dashboard',
            })
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();

    }, []);


    useEffect(() => {

        if (schoolList != '') {
            Emitter.emit(Events.SHOW_PRELOADER);
            setSchoolName([])
            let creact_new = "Create new";
            let school_name = [];
            schoolList.forEach((ele) => {
                school_name.push(ele.school_name)
            })
            school_name.unshift(creact_new)
            setSchoolName(school_name);
            Emitter.emit(Events.HIDE_PRELOADER);
        }
    }, [schoolList]);

    const demoUserRegistrationHandeler = () => {
        // console.log("demoUserRegistrationHandeler")
        dispatch(newStudentRegistration(firstName.trim(), lastName.trim(), dobString, genderSelect, address.trim(), pincode.trim(), mobileNumber.trim(), emailId, password.trim(), standardSave, boardSave, schoolNameSelect != 'Create new' ? schoolNameSelect.trim() : schoolNameSave.trim(), schoolAddress.trim(), devicetoken, navigation));
    }

    const getSchoolListAsPerBoard = (board_id) => {
        setSchoolName([]);
        setSchoolNameSelect('')
        schoolListRef.current.reset();
        setSchoolAddress('');
        dispatch(getSchoolListData(board_id, navigation));
    }

    const seenPasswordOn = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const showSchoolList = () => {
        setSchoolNameSelect('')
        setSchoolAddress('')
        setSchoolNameSave('')
    }

    /* DOB Date */
    const setDobDate = (event, selectedDate) => {

        const currentDate = selectedDate || enterDob;
        if (event.type == 'dismissed') {
            setShow(Platform.OS === 'ios')
        } else {
            setShow(Platform.OS === 'ios')
            setDobString(currentDate)
            setDob(moment(currentDate).format('DD/MM/YYYY'))
            setEnterDob(currentDate)
        }
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    };

    const showFromDatepicker = () => {
        showMode('date');
    }
    /* End DOB Date */

    const goToSignin = () => {
        navigation.navigate('Signin')
    }

    const goToFirstPageHandler = () => {
        setPageOne(1);
        setPageTwo(0);
        setPageThree(0)
    }

    const goToSecondPageHandler = () => {
        pageOneValidateData()
            .then((response) => {
                if (response.success == 1) {
                    // dispatch(loginAction(email, password, devicetoken, navigation));
                    setPageOne(0);
                    setPageTwo(1);
                    setPageThree(0)
                } else {
                    //validation error
                    //   Emitter.emit(Events.HIDE_PRELOADER);
                }
            });
    }

    const goToThirdPageHandler = () => { // 
        pageTwoValidateData()
            .then((response) => {

                if (response.success == 1) {
                    // dispatch(loginAction(email, password, devicetoken, navigation));
                    setPageOne(0);
                    setPageTwo(0);
                    setPageThree(1)
                } else {
                    //validation error
                    //   Emitter.emit(Events.HIDE_PRELOADER);
                }
            });

    }

    /* const signup = async () => {
        demoUserRegistrationHandeler()
    } */


    const signup = async () => {
        pageThreeValidateData()
            .then((response) => {
                if (response.success == 1) {
                    setShowTermsCondition(true)
                    // dispatch(loginAction(email, password, devicetoken, navigation));------
                    console.log("#5")
                    dispatch(verificationCodeInputOffAction(0));
                    // dispatch(userDetailsExistsOrNot(emailId, mobileNumber, navigation));

                    // console.log("Call Sign up API")-----
                } else {
                    //validation error
                    //   Emitter.emit(Events.HIDE_PRELOADER);----
                }
            });
    }

    const checkingForMobileEmail = () => {
        console.log("#6")
        dispatch(verificationCodeInputOffAction(0));
        dispatch(userDetailsExistsOrNot(emailId, mobileNumber, navigation));
    }


    const onPressOpenVisibleOption = () => {
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                // 'component': <EditClubMenuScene navigation={this.props.navigation} parent={this} />,
                'component': <DemoVerification navigation={navigation} demoRegistrationHandler={demoUserRegistrationHandeler} params={{ email_otp: decryptAES(email_otp), mobile_otp: decryptAES(mobile_otp), otpValidTime: otpValidTime, mobile: mobileNumber, email: emailId, }} />,
                'componentHeight': 400,
            });
    }

    const addressSpecialCharacter = (event) => {
        // console.log("$$$$----",  event)
        if (!/[-#A-Za-z0-9/,.\s/g]/.test(event.key)) {
            event.preventDefault();
        }
    }

    const checkLocked = () => {
        const locked = Orientation.isLocked();
        if (locked !== isLocked) {
            setLocked(locked);
        }
    }


    const pageOneValidateData = async () => {
        const enteredFirstName = firstName.trim()
        const enteredLastName = lastName.trim()
        const enteredDob = dob.trim()
        const enteredAddress = address.trim()
        const enteredPincode = pincode.trim()
        //check all validations
        return new Promise(function (resolve, reject) {
            setFirstName(enteredFirstName)
            setLastName(enteredLastName)
            setAddress(enteredAddress)
            setAddress(enteredAddress)
            setPincode(enteredPincode)

            if (enteredFirstName == '') {
                firstNameRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "First name is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredFirstName.length < 3) {
                firstNameRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Minimum 3 Character is Required" });
                resolve({ success: 0, message: 'failure' });

            } else if (!alphabetsCheck.test(enteredFirstName)) {
                firstNameRef.current.focus();
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Allow only alphabets" });
                resolve({ success: 0, message: 'failure' });

            } else if (enteredLastName == '') {
                lastNameRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Last name is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredLastName.length < 3) {
                lastNameRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Minimum 3 Character is Required" });
                resolve({ success: 0, message: 'failure' });

            } else if (!alphabetsCheck.test(enteredLastName)) {
                lastNameRef.current.focus();
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Allow only alphabets" });
                resolve({ success: 0, message: 'failure' });

            } else if (enteredDob == '') {
                dobRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "DOB is missing!" });
                resolve({ success: 0, message: 'failure' });

            } else if (enteredAddress == '') {
                addressRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Address is missing!" });
                resolve({ success: 0, message: 'failure' });

            } else if (enteredAddress.length < 3) {
                addressRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Minimum 3 Character is Required" });
                resolve({ success: 0, message: 'failure' });

            } else if (enteredPincode == '') {
                pincodeRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Pin is missing!" });
                resolve({ success: 0, message: 'failure' });

            } else if (enteredPincode.length < 6) {
                pincodeRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Minimum 6 Character is Required" });
                resolve({ success: 0, message: 'failure' });

            } else {
                resolve({ success: 1, message: 'success' });
            }
        });
    }

    const pageTwoValidateData = async () => {


        //check all validations
        return new Promise(function (resolve, reject) {

            if (genderSelect == '') {
                // genderRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Gender is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (standardSelect == '') {
                // genderRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Standard is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (boardSelect == '') {
                // genderRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Board is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (schoolNameSelect == '') {
                // genderRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "School name is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (!alphabetsCheck.test(schoolNameSave)) {
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "School name allow only alphabets" });
                resolve({ success: 0, message: 'failure' });

            } else if (!allowSpecialCharForAddress.test(schoolAddress)) {
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Allowed only those Special characters ',./-()# '" });
                resolve({ success: 0, message: 'failure' });

            } else if (schoolAddress == '') {
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "School Address is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else {

                resolve({ success: 1, message: 'success' });
            } /*  */
        });
    }

    const pageThreeValidateData = async () => {
        const enteredMobileNumber = mobileNumber.trim()
        const enteredEmailId = emailId.trim()
        const enteredPassword = password.trim()
        const enteredConfirmPassword = confirmPassword.trim()

        //check all validations
        return new Promise(function (resolve, reject) {
            setMobileNumber(enteredMobileNumber)
            setEmailId(enteredEmailId)
            setPassword(enteredPassword)
            setConfirmPassword(enteredConfirmPassword)

            if (enteredMobileNumber == '') {
                mobileNumberRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Mobile number is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredMobileNumber.length < 10) {
                mobileNumberRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Please check Mobile number" });
                resolve({ success: 0, message: 'failure' });
            } else if (!onlyNumber.test(enteredMobileNumber)) {
                mobileNumberRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Allow only number" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredMobileNumber == '0000000000') {
                mobileNumberRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Please enter valid number" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredEmailId == '') {
                emailIdRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Email id is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (!validateEmail(enteredEmailId)) {
                emailIdRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Valid email id required" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredPassword == '') {
                passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Password is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredPassword.length < 6 || enteredPassword.length > 15) {
                passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Password minimum 6 and maximum 15 characters required" });
                resolve({ success: 0, message: 'failure' });
            } /* else if (!passwordPatteren.test(enteredPassword)) {
                passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Password not in pattern" });
                resolve({ success: 0, message: 'failure' });
            } */ else if (enteredConfirmPassword == '') {
                confirmPasswordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Confirm Password is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredConfirmPassword != enteredPassword) {
                confirmPasswordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Mismatched with password!" });
                resolve({ success: 0, message: 'failure' });
            } else {
                resolve({ success: 1, message: 'success' });
            }
        });
    }

    const getDeviceToken = () => {
        messaging().getToken(firebaseToken.app().options.messagingSenderId)
            .then((x) => {
                console.log("GET TOKEN ERROR 1111 :" + x)
                setDevicetoken(x);

            })
            .catch(e => console.log("GET TOKEN ERROR :" + e));
    }

    const closeTermsModal = () => {
        setShowTermsCondition(false)
    }

    const acceptTermsCondition = () => {
        setShowTermsCondition(false)
        checkingForMobileEmail()
    }


    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "none"}
            style={container}
        >
            <View style={containerInside}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={scrollViewContainer}
                    showsVerticalScrollIndicator={false}
                >

                    <View style={Gstyles.topParentContainer}>
                        <View>
                            {/* <Image source={require('../../assets/images/login_img.png')} style={Gstyles.topImage} /> */}
                            <Image source={require('../../../assets/images/top_image.png')} style={Gstyles.topImage} />
                        </View>
                    </View>

                    <View style={Gstyles.bottomParentContainer}>
                        <View style={Gstyles.topHeadingContainer}>
                            <Text style={Gstyles.heading} >Sign Up</Text>
                            <Text style={Gstyles.details}>(<Text style={Gstyles.inputMandatoryMark}>*</Text>) Marked fields are mandatory to fill</Text>
                        </View>
                        <View style={Gstyles.counterParentContainer}>
                            <View style={[Gstyles.pageOneLine, { backgroundColor: pageTwo == 1 || pageThree == 1 ? colors.correctAssessmentBackgroundColor : colors.notAttendedBackgroundColor }]}></View>
                            <View style={[Gstyles.pageTwoLine, { backgroundColor: pageThree == 1 ? colors.correctAssessmentBackgroundColor : colors.notAttendedBackgroundColor }]}></View>
                            <View style={[Gstyles.numberParentContainer, { backgroundColor: pageOne == 1 || pageTwo == 1 || pageThree == 1 ? colors.correctAssessmentBackgroundColor : colors.notAttendedBackgroundColor }]}><Text style={Gstyles.counterText}>1</Text></View>

                            <View style={[Gstyles.numberParentContainer, { backgroundColor: pageTwo == 1 || pageThree == 1 ? colors.correctAssessmentBackgroundColor : colors.notAttendedBackgroundColor }]}><Text style={Gstyles.counterText}>2</Text></View>
                            <View style={[Gstyles.numberParentContainer, { backgroundColor: pageThree == 1 ? colors.correctAssessmentBackgroundColor : colors.notAttendedBackgroundColor }]}><Text style={Gstyles.counterText}>3</Text></View>

                        </View>

                        <View style={Gstyles.inputContainerTwo}>
                            {/* Page 1------------------------------------- */}
                            {pageOne == 1 ?
                                <>
                                    <View>
                                        <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                            <Text style={Gstyles.inputLabel}>First name</Text>
                                            <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                        </View>
                                        <TextInput
                                            ref={firstNameRef}
                                            style={Gstyles.input}
                                            onChangeText={(firstName) => setFirstName(firstName)}
                                            value={firstName.toString()}
                                            placeholder="Enter first name"
                                            // keyboardType="email-address"
                                            maxLength={100}
                                            autoCapitalize='none' //words: first letter of each word.
                                            returnKeyType="next"
                                            onSubmitEditing={() => {
                                                lastNameRef.current.focus();
                                            }}
                                        />
                                    </View>

                                    <View>
                                        <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                            <Text style={Gstyles.inputLabel}>Last name</Text>
                                            <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                        </View>
                                        <TextInput
                                            ref={lastNameRef}
                                            style={Gstyles.input}
                                            onChangeText={(lastName) => setLastName(lastName)}
                                            value={lastName.toString()}
                                            placeholder="Enter last name"
                                            // keyboardType="email-address"
                                            maxLength={100}
                                            autoCapitalize='none' //words: first letter of each word.
                                            returnKeyType="next"
                                            onSubmitEditing={() => {
                                                dobRef.current.focus();
                                            }}
                                        />
                                    </View>

                                    <View>
                                        <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                            <Text style={Gstyles.inputLabel}>Date of birth</Text>
                                            <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                        </View>
                                        <View style={Gstyles.passwordInputContainer}>
                                            <TextInput
                                                ref={dobRef}
                                                style={Gstyles.input}
                                                onChangeText={(dob) => setDob(dob)}
                                                value={dob.toString()}
                                                placeholder="DOB"
                                                maxLength={100}
                                                autoCapitalize='none' //words: first letter of each word.
                                                returnKeyType="next"
                                                editable={false}
                                            /* onSubmitEditing={() => {
                                                genderRef.current.focus();
                                            }} */
                                            />
                                            {show && <DateTimePicker
                                                value={enterDob}
                                                maximumDate={new Date()}
                                                mode={mode}
                                                is24Hour={true}
                                                display="spinner"
                                                onChange={setDobDate}
                                            />
                                            }
                                            <View style={Gstyles.eyeContainer}>
                                                <TouchableOpacity style={Gstyles.eyePosition} onPress={seenPasswordOn}><Icon name="calendar" size={width < 500 ? 16 : 33} color={colors.inputText} /></TouchableOpacity>
                                            </View>
                                            <TouchableOpacity onPress={showFromDatepicker} style={Gstyles.inputTouchable}></TouchableOpacity>
                                        </View>
                                    </View>


                                    <View>
                                        <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                            <Text style={Gstyles.inputLabel}>Address</Text>
                                            <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                        </View>
                                        <TextInput
                                            ref={addressRef}
                                            style={Gstyles.input}
                                            onChangeText={(address) => setAddress(address)}
                                            value={address.toString()}
                                            placeholder="Enter your address "
                                            // keyboardType="email-address"
                                            maxLength={200}
                                            autoCapitalize='none' //words: first letter of each word.
                                            returnKeyType="next"
                                            onSubmitEditing={() => {
                                                pincodeRef.current.focus();
                                            }}
                                        />
                                    </View>

                                    <View>
                                        <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                            <Text style={Gstyles.inputLabel}>Pin</Text>
                                            <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                        </View>
                                        <TextInput
                                            ref={pincodeRef}
                                            style={Gstyles.input}
                                            onChangeText={(pincode) => setPincode(pincode)}
                                            value={pincode.toString()}
                                            placeholder="Enter pin"
                                            keyboardType="number-pad"
                                            maxLength={6}
                                            autoCapitalize='none' //words: first letter of each word.
                                            // returnKeyType="next"
                                            onSubmitEditing={() => {
                                                goToSecondPageHandler();
                                            }}
                                        />
                                    </View>
                                </>
                                : pageTwo == 1 ?
                                    <>
                                        {/* Page 2 ---------------------------------------- */}
                                        <View>
                                            <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                                <Text style={Gstyles.inputLabel}>Gender</Text>
                                                <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                            </View>
                                            <SelectDropdown
                                                data={gender}
                                                // defaultValueByIndex={1}
                                                // defaultValue={'Egypt'}
                                                defaultValue={genderSelect}
                                                onSelect={(selectedItem, index) => {
                                                    // console.log(selectedItem, index);
                                                    setGenderSelect(selectedItem);
                                                }}
                                                defaultButtonText={'Select gender'}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return selectedItem;
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    return item;
                                                }}
                                                buttonStyle={Gstyles.dropdown1BtnStyle}
                                                buttonTextStyle={genderSelect == '' ? Gstyles.dropdown1BtnTxtBlankStyle : Gstyles.dropdown1BtnTxtStyle}
                                                renderDropdownIcon={isOpened => {
                                                    return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.inputText} size={22} />;
                                                }}
                                                dropdownIconPosition={'right'}
                                                dropdownStyle={Gstyles.dropdown1DropdownStyle}
                                                rowStyle={Gstyles.dropdown1RowStyle}
                                                rowTextStyle={Gstyles.dropdown1RowTxtStyle}
                                            />
                                        </View>

                                        <View>
                                            <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                                <Text style={Gstyles.inputLabel}>Standard</Text>
                                                <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                            </View>
                                            <SelectDropdown
                                                data={standard}
                                                // defaultValueByIndex={1}
                                                defaultValue={standardSelect}
                                                onSelect={(selectedItem, index) => {
                                                    // console.log(selectedItem, index);
                                                    let class_details = classStandardList.find(element => element.short_code === selectedItem)
                                                    setStandardSelect(selectedItem);
                                                    setStandardSave(class_details.class_no)

                                                }}
                                                defaultButtonText={'Select standard'}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return selectedItem;
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    return item;
                                                }}
                                                buttonStyle={Gstyles.dropdown1BtnStyle}
                                                buttonTextStyle={standardSelect == '' ? Gstyles.dropdown1BtnTxtBlankStyle : Gstyles.dropdown1BtnTxtStyle}
                                                renderDropdownIcon={isOpened => {
                                                    return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.inputText} size={22} />;
                                                }}
                                                dropdownIconPosition={'right'}
                                                dropdownStyle={Gstyles.dropdown1DropdownStyle}
                                                rowStyle={Gstyles.dropdown1RowStyle}
                                                rowTextStyle={Gstyles.dropdown1RowTxtStyle}
                                            />
                                        </View>

                                        <View>
                                            <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                                <Text style={Gstyles.inputLabel}>Board</Text>
                                                <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                            </View>
                                            <SelectDropdown
                                                data={board}
                                                // defaultValueByIndex={1}
                                                defaultValue={boardSelect}
                                                onSelect={(selectedItem, index) => {
                                                    // console.log(selectedItem, index);
                                                    setBoardSelect(selectedItem);
                                                    let board_details = boardList.find(element => element.name === selectedItem)
                                                    setBoardSave(board_details.id)
                                                    getSchoolListAsPerBoard(board_details.id)

                                                }}
                                                defaultButtonText={'Select board'}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return selectedItem;
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    return item;
                                                }}
                                                buttonStyle={Gstyles.dropdown1BtnStyle}
                                                buttonTextStyle={boardSelect == '' ? Gstyles.dropdown1BtnTxtBlankStyle : Gstyles.dropdown1BtnTxtStyle}
                                                renderDropdownIcon={isOpened => {
                                                    return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.inputText} size={22} />;
                                                }}
                                                dropdownIconPosition={'right'}
                                                dropdownStyle={Gstyles.dropdown1DropdownStyle}
                                                rowStyle={Gstyles.dropdown1RowStyle}
                                                rowTextStyle={Gstyles.dropdown1RowTxtStyle}
                                            />
                                        </View>
                                        {schoolNameSelect != 'Create new' ?
                                            <View>
                                                <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                                    <Text style={Gstyles.inputLabel}>School name</Text>
                                                    <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                                </View>
                                                <SelectDropdown
                                                    ref={schoolListRef}
                                                    data={schoolName}
                                                    // defaultValueByIndex={1}
                                                    defaultValue={schoolNameSelect}
                                                    onSelect={(selectedItem, index) => {
                                                        // console.log(selectedItem, index);
                                                        setSchoolNameSelect(selectedItem);
                                                        if (selectedItem != 'Create new') {
                                                            let school_address = schoolList.find(element => element.school_name === selectedItem)
                                                            setSchoolAddress(school_address.school_address)
                                                        } else {
                                                            setSchoolAddress('')
                                                        }
                                                    }}
                                                    defaultButtonText={'Select school name'}
                                                    buttonTextAfterSelection={(selectedItem, index) => {
                                                        return selectedItem;
                                                    }}
                                                    rowTextForSelection={(item, index) => {
                                                        return item;
                                                    }}
                                                    buttonStyle={Gstyles.dropdown1BtnStyle}
                                                    buttonTextStyle={schoolNameSelect == '' ? Gstyles.dropdown1BtnTxtBlankStyle : Gstyles.dropdown1BtnTxtStyle}
                                                    renderDropdownIcon={isOpened => {
                                                        return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.inputText} size={22} />;
                                                    }}
                                                    dropdownIconPosition={'right'}
                                                    dropdownStyle={Gstyles.dropdown1DropdownStyle}
                                                    // rowStyle={schoolName[0] == 'Create new' ? Gstyles.dropdownNewRowStyle : Gstyles.dropdown1RowStyle}
                                                    rowStyle={Gstyles.dropdown1RowStyle}
                                                    rowTextStyle={Gstyles.dropdown1RowTxtStyle}

                                                    search
                                                    searchInputStyle={styles.dropdown1searchInputStyleStyle}
                                                    searchPlaceHolder={'Search here'}
                                                    searchPlaceHolderColor={'darkgrey'}
                                                    renderSearchInputLeftIcon={() => {
                                                        return <Icon name={'search'} color={'#444'} size={18} />;
                                                    }}
                                                    disabled={boardSelect != '' ? false : true}
                                                    selectedRowTextStyle={{ color: '#ff0000' }}
                                                />
                                            </View>
                                            :
                                            <View>
                                                <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                                    <Text style={Gstyles.inputLabel}>School name</Text>
                                                    <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                                </View>
                                                <View style={Gstyles.passwordInputContainer}>
                                                    <View style={Gstyles.passwordContainer}>
                                                        <TextInput
                                                            ref={schoolNameRef}
                                                            style={Gstyles.input}
                                                            onChangeText={(schoolNameSave) => setSchoolNameSave(schoolNameSave)}
                                                            value={schoolNameSave.toString()}
                                                            placeholder="Enter school name"
                                                            maxLength={100}
                                                            // keyboardType="numeric"
                                                            onSubmitEditing={() => {
                                                                schoolAddressRef.current.focus();
                                                            }}

                                                        />
                                                    </View>
                                                    <View style={Gstyles.eyeContainer}>
                                                        <TouchableOpacity style={Gstyles.eyePosition} onPress={showSchoolList}><IconAntDesign name="closecircle" size={width < 500 ? 20 : 33} color={colors.inputText} /></TouchableOpacity>

                                                    </View>
                                                </View>
                                            </View>
                                        }


                                        <View>
                                            <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                                <Text style={Gstyles.inputLabel}>School address</Text>
                                                <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                            </View>
                                            <TextInput
                                                ref={schoolAddressRef}
                                                style={Gstyles.input}
                                                onChangeText={(schoolAddress) => setSchoolAddress(schoolAddress)}
                                                value={schoolAddress.toString()}
                                                placeholder="Enter school address"
                                                // keyboardType="number-pad"
                                                // maxLength={200}
                                                autoCapitalize='none' //words: first letter of each word.
                                                returnKeyType="next"
                                                multiline={true}
                                                onKeyPress={(e) => addressSpecialCharacter(e)}
                                                editable={schoolNameSelect == 'Create new' ? true : false}
                                            />
                                        </View>
                                    </>
                                    : pageThree == 1 ?
                                        <>
                                            {/* Page 3------------------------------------- */}
                                            <View>
                                                <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                                    <Text style={Gstyles.inputLabel}>Mobile number</Text>
                                                    <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                                </View>
                                                <TextInput
                                                    ref={mobileNumberRef}
                                                    style={Gstyles.input}
                                                    onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)}
                                                    value={mobileNumber.toString()}
                                                    placeholder="Enter mobile no."
                                                    keyboardType="number-pad"
                                                    maxLength={10}
                                                    autoCapitalize='none' //words: first letter of each word.
                                                    returnKeyType="next"
                                                    onSubmitEditing={() => {
                                                        emailIdRef.current.focus();
                                                    }}
                                                />
                                            </View>

                                            <View>
                                                <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                                    <Text style={Gstyles.inputLabel}>Email</Text>
                                                    <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                                </View>
                                                <TextInput
                                                    ref={emailIdRef}
                                                    style={Gstyles.input}
                                                    onChangeText={(emailId) => setEmailId(emailId)}
                                                    value={emailId.toString()}
                                                    placeholder="Enter email id"
                                                    keyboardType="email-address"
                                                    // maxLength={200}
                                                    autoCapitalize='none' //words: first letter of each word.
                                                    returnKeyType="next"
                                                    onSubmitEditing={() => {
                                                        passwordRef.current.focus();
                                                    }}
                                                />
                                            </View>


                                            <View>
                                                <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                                    <Text style={Gstyles.inputLabel}>Password</Text>
                                                    <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                                </View>
                                                <View style={Gstyles.passwordInputContainer}>
                                                    <View style={Gstyles.passwordContainer}>
                                                        <TextInput
                                                            ref={passwordRef}
                                                            style={Gstyles.passwordInput}
                                                            onChangeText={(password) => setPassword(password)}
                                                            value={password.toString()}
                                                            placeholder="Password"
                                                            secureTextEntry={secureTextEntry}
                                                            maxLength={15}
                                                            minLength={6}
                                                            // keyboardType="numeric"
                                                            onSubmitEditing={() => {
                                                                confirmPasswordRef.current.focus();
                                                            }}
                                                            contextMenuHidden={true}
                                                        />
                                                    </View>
                                                    <View style={Gstyles.eyeContainer}>
                                                        {secureTextEntry ?
                                                            <TouchableOpacity style={Gstyles.eyePosition} onPress={seenPasswordOn}><Icon name="eye" size={width < 500 ? 20 : 33} color="#3B3A36" /></TouchableOpacity>
                                                            :
                                                            <TouchableOpacity style={Gstyles.eyePosition} onPress={seenPasswordOn}><Icon name="eye-slash" size={width < 500 ? 20 : 33} color="#3B3A36" /></TouchableOpacity>
                                                        }
                                                    </View>
                                                </View>
                                                {/* <View>
                                                    <Text style={Gstyles.hintsText}>Password Hint: Must contain at least one number and one uppercase and one special character, and min 8  and max 16 characters require</Text>
                                                </View> */}
                                            </View>

                                            <View>
                                                <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                                    <Text style={Gstyles.inputLabel}>Confirm password</Text>
                                                    <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                                </View>
                                                <TextInput
                                                    ref={confirmPasswordRef}
                                                    style={Gstyles.input}
                                                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                                                    value={confirmPassword.toString()}
                                                    placeholder="Confirm password"
                                                    secureTextEntry
                                                    // keyboardType="email-address"
                                                    // maxLength={200}
                                                    autoCapitalize='none' //words: first letter of each word.
                                                    // returnKeyType="next"
                                                    onSubmitEditing={() => {
                                                        signup();
                                                    }}
                                                    signup
                                                    contextMenuHidden={true}
                                                />
                                            </View>
                                        </>
                                        : null}

                        </View>

                        {pageOne == 1 ?

                            <View style={Gstyles.buttonContainer}>
                                <View style={[Gstyles.buttonLeftContainer, Gstyles.disableButtonBackground]}><Text style={[Gstyles.buttonDisableText, Gstyles.disableText]}>Sign up</Text></ View>
                                <TouchableOpacity onPress={goToSecondPageHandler} style={[Gstyles.buttonRightContainer, Gstyles.yellowButtonBackground]}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Proceed</Text></TouchableOpacity>
                            </View>
                            : pageTwo == 1 ?
                                <View style={Gstyles.buttonContainer}>
                                    <TouchableOpacity onPress={goToFirstPageHandler} style={[Gstyles.buttonLeftContainer, Gstyles.blueButtonBackground]}><Text style={[Gstyles.buttonDisableText, Gstyles.whiteText]}>Back</Text></ TouchableOpacity>
                                    <TouchableOpacity onPress={goToThirdPageHandler} style={[Gstyles.buttonRightContainer, Gstyles.yellowButtonBackground]}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Proceed</Text></TouchableOpacity>
                                </View>
                                : pageThree == 1 ?
                                    <View style={Gstyles.buttonContainer}>
                                        <TouchableOpacity onPress={goToSecondPageHandler} style={[Gstyles.buttonLeftContainer, Gstyles.blueButtonBackground]}><Text style={[Gstyles.buttonDisableText, Gstyles.whiteText]}>Back</Text></ TouchableOpacity>
                                        <TouchableOpacity onPress={signup} style={[Gstyles.buttonRightContainer, Gstyles.yellowButtonBackground]}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Sign up</Text></TouchableOpacity>
                                    </View> : null}

                    </View>
                </ScrollView>

            </View>
            <TermsCondition
                isVisable={showTermsCondition}
                closeModal={() => closeTermsModal()}
                acceptModal={() => acceptTermsCondition()}
            />

        </KeyboardAvoidingView >


    );
};

export default DemoRegistration;

const styles = StyleSheet.create(
    {


    })