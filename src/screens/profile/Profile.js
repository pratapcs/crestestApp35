import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, StatusBar, ScrollView, KeyboardAvoidingView, StyleSheet, Image, TouchableOpacity, Dimensions, PermissionsAndroid, } from 'react-native';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useFocusEffect } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';
import Gstyles from '../../styles/GlobalStyle';
import { colors, fonts } from '../../styles/Crestest.config';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getData } from "../../utils/Util"

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';
import { decryptAES, } from "../../utils/Util";
import { DrawerActions,  } from '@react-navigation/native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

import { updateProfileDetails, getProfileDetailsById, getOTPByClassUpdateData, } from '../../store/actions/ProfileAction';
import { demoUserRecordExistsOrNot } from '../../store/actions/StudentAction';
import {
    getClassStandardByTokenList,
} from "../../store/actions/ClassStandardAction";

import { getSchoolListData, } from '../../store/actions/CommonActions';
import { getSubscriptionTextData } from '../../store/actions/SubscribeAction';

import MobileVerification from './MobileVerification'
import ClassVerification from './ClassVerification'
import ImageUploadOption from './ImageUploadOption'



const Profile = (props) => {

    const dispatch = useDispatch();
    // const navigation = useNavigation(); //useNavigation

    const status = useSelector(state => state.student.status);
    const mOtp = useSelector(state => state.student.mobile_otp);
    const otpValidTime = useSelector(state => state.student.otpValidTime);
    const showVerificationModal = useSelector(state => state.student.showVerificationModal);
    const profileStandardList = useSelector(state => state.standard.profileStandardList);

    const details = useSelector(state => state.student.details);

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    //For date picker
    const [dob, setDob] = useState('');
    const [isStoreDob, setIsStoreDob] = useState('');
    const [enterDob, setEnterDob] = useState(new Date());
    const [dobString, setDobString] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    //For End date picker

    const [profile_pic, setProfile_pic] = useState('')
    const [userId, setUserId] = useState('')

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const [gender, setGender] = useState(["Male", "Female", "Other",]);
    const [genderSelect, setGenderSelect] = useState('');
    const [genderSave, setGenderSave] = useState('');

    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');

    const [mobileNumber, setMobileNumber] = useState('');
    const [emailId, setEmailId] = useState('');
    const [previousMobile, setPreviousMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [standard, setStandard] = useState();
    const [standardSelect, setStandardSelect] = useState('');
    const [standardSave, setStandardSave] = useState("")

    const [academicYear, setAcademicYear] = useState("");
    const [board, setBoard] = useState('');
    const [boardName, setBoardName] = useState('');

    const [schoolName, setSchoolName] = useState('[]');
    const [schoolNameSelect, setSchoolNameSelect] = useState('');
    const [schoolNameSave, setSchoolNameSave] = useState('');

    const [schoolAddress, setSchoolAddress] = useState('');

    const [proImgFile, setProImgFile] = useState(null);
    const [date, setDate] = useState();
    const [profileUpdatedWithMobile, setProfileUpdatedWithMobile] = useState('')
    const [isExpired, setIsExpired] = useState('')
    // const [gender, setGender] = useState(["Male", "Female", "Other",]);
    const [isExpiredSelect, setIsExpiredSelect] = useState('');

    const [clsOTPdetails, setClsOTPdetails] = useState(null);
    const [otpClassModal, setOtpClassModal] = useState(false);

    const [preStandard, setPreStandard] = useState("");

    const [isPageRefresh, setIsPageRefresh] = useState(false)

    const [manualSchoolName, setManualSchoolName] = useState("");
    const [ismanualSchoolName, setIsManualSchoolName] = useState(0); /* 0= name collect from list, 1= manual type */

    const schoolList = useSelector(state => state.common.schoolList);
    const currentSession = useSelector(state => state.subscribe.currentSession);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const dobRef = useRef();

    const addressRef = useRef();
    const pincodeRef = useRef();
    const mobileNumberRef = useRef();
    const emailIdRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const alphabetsCheck = /^[A-Za-z\s]*$/;
    const onlyNumber = /^[0-9]+$/;
    const passwordPatteren = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const allowSpecialCharForAddress = /^[-()#A-Za-z0-9/,.\s/g]+$/;

    useFocusEffect(
        React.useCallback(() => {
            getUserDetails();
            dispatch(getSubscriptionTextData(props));
            if (schoolNameSelect != '') {
                // console.log("@12")
                setIsPageRefresh(!isPageRefresh)
            }
        }, [])
    );

    /* useEffect(() => {
        getUserDetails()
    }, [schoolNameSelect]); */

    async function getUserDetails() {
        Emitter.emit(Events.SHOW_PRELOADER);
        let result = await getData("crestestUserDetails");
        // console.log('result==============', result)
        let userId = result['id'];
        result = JSON.parse(result);
        let fname = result['fname'];
        let lname = result['lname'];
        let dob = result['dob'];
        let email = result['email'];
        let gender = result['gender'];
        let mobile = result['mobile'];
        let address = result['address'];
        let pincode = result['pincode'];
        let standard = result['standard'];
        let school_name = result['school_name'];
        let school_address = result['school_address'];
        let profile_pic = result['profile_pic'];

        let board_name = result['board_name'];
        let board = result['board'];
        let class_id = result['class_id'];
        let academic_year = result['academic_year'];
        let expired = result['expired'];
        console.log("dob---->>>>>>>>>", dob)
        setUserId(userId);
        setFirstName(fname);
        setLastName(lname);
        // setDob(dob != null || dob != "null" ? moment(dob).format('DD/MM/YYYY') : null ); /* || dob != null || dob != 'null'  */
        setDob(dob && dob != null && dob != "null" ? moment(dob).format('DD/MM/YYYY') : null);

        setIsStoreDob(dob)
        // setDob(dob ? new Date(dob) : null);
        setEmailId(email);
        // setGenderSelect(gender.charAt(0).toUpperCase() + gender.slice(1));
        setGenderSelect(gender == null || gender == 'null' || gender == undefined || gender == 'undefined'  ? '' : gender?.charAt(0).toUpperCase() + gender?.slice(1));
        setGenderSave(gender == null || gender == 'null' || gender == undefined || gender == 'undefined' ? '' : gender)
        setProfile_pic(profile_pic);
        setMobileNumber(mobile);
        setAddress((address == null || address == 'null') ? '' : address);
        setPincode(pincode == 0 || pincode == null || pincode == 'null' || pincode == undefined || pincode == 'undefined' ? '' : pincode.toString());

        setStandard(standard.toString());
        setStandardSave(standard.toString());

        setPreStandard(standard.toString());
        setStandardSelect(standard) //
        setBoardName(board_name);
        setBoard(board);
        // setSchoolName(school_name);
        setSchoolAddress((school_address == null || school_address == 'null') ? '' : school_address);
        setPreviousMobile(mobile);
        setAcademicYear(details?.academic_year);
        setIsExpired(expired);
        setSchoolNameSelect((school_name == null || school_name == 'null') ? '' : school_name);
        setSchoolAddress((school_address == null || school_address == 'null') ? '' : school_address);
        Emitter.emit(Events.HIDE_PRELOADER);
        setIsPageRefresh(!isPageRefresh)
        setManualSchoolName((school_name == null || school_name == 'null') ? '' : school_name)
        setSchoolNameSave((school_name == null || school_name == 'null') ? '' : school_name)
    };

    useEffect(() => {
        if (showVerificationModal == 0) {
            onPressMobileVerificationOption()
        }
    }, [showVerificationModal]);

    useEffect(() => {
        // Emitter.emit(Events.SHOW_PRELOADER);
        async function fetcUserDataFromLocalStorage() {
            let getData = await AsyncStorage.getItem('crestestUserDetails');
            let board_id = JSON.parse(getData).board;
            dispatch(getSchoolListData(board_id, props.navigation));
        }
        fetcUserDataFromLocalStorage()
        // Emitter.emit(Events.HIDE_PRELOADER);
        setIsPageRefresh(!isPageRefresh)
    }, []);

    /* useEffect(() => {
        if (schoolList != '') {
            // Emitter.emit(Events.SHOW_PRELOADER);
            setSchoolName([])
            let creact_new = "Create new";
            let school_name = [];
            schoolList.forEach((ele) => {
                school_name.push(ele.school_name)
            })
            school_name.unshift(creact_new)
            setSchoolName(school_name);
            // Emitter.emit(Events.HIDE_PRELOADER);
            setIsPageRefresh(!isPageRefresh)
        }
    }, [schoolList]); */

    useEffect(() => {
        if (schoolList != '') {
            // Emitter.emit(Events.SHOW_PRELOADER);
            setSchoolName([])
            let selectSchoolName = {};
            // let creact_new = "Create new";
            let creact_new = {}
            creact_new["value"] = "Create new";
            creact_new["label"] = "Create new";
            creact_new["id"] = 0;
            let school_name = [];
            schoolList.forEach((ele) => {
                selectSchoolName = {};
                selectSchoolName["value"] = ele.school_name;
                selectSchoolName["label"] = ele.school_name;
                selectSchoolName["id"] = ele.id;
                school_name.push(selectSchoolName)
            })
            school_name.unshift(creact_new)
            setSchoolName(school_name);
            // Emitter.emit(Events.HIDE_PRELOADER);
            setIsPageRefresh(!isPageRefresh)
        }
    }, [schoolList]);

    useEffect(() => {
        if (profileUpdatedWithMobile == 1) {
            profileUpdatewithNewMobile()
            setProfileUpdatedWithMobile(0)
        }

    }, [profileUpdatedWithMobile]);

    useEffect(() => {
        dispatch(getProfileDetailsById(props));
        dispatch(getClassStandardByTokenList(props))
    }, [])

    useEffect(() => {
        if (otpClassModal) {
            onPressClassVerificationOption();
        }
    }, [otpClassModal])

    useEffect(() => {
        let class_name = [];
        profileStandardList.forEach((ele) => {
            class_name.push(ele.class_no)
        })
        setStandard(class_name);
        setStandardSelect(standard)
    }, [profileStandardList]);

    const seenPasswordOn = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const newPasswordWhiteSpaceRemoveHandle = (value) => {
        setPassword(value.replace(/\s/g, ''))
    }

    const newConfirmPasswordWhiteSpaceRemoveHandle = (value) => {
        setConfirmPassword(value.replace(/\s/g, ''))
    }

    const postalCodeAllowOnlyNumberHandle = (value) => {
        setPincode(value.replace(/[^0-9]/g, ""))
    }

    const profilePageValidateData = async () => {

        const enteredFirstName = firstName.trim();
        const enteredLastName = lastName.trim();
        const enteredDob = dob;
        // const genderSelect = genderSelect;
        const enteredAddress = address.trim();
        const enteredPincode = pincode;
        const enteredPassword = password.trim()
        const enteredConfirmPassword = confirmPassword.trim()
        const enteredMobileNumber = mobileNumber.trim()

        //check all validations
        return new Promise(function (resolve, reject) {
            setFirstName(enteredFirstName)
            setLastName(enteredLastName)
            setAddress(enteredAddress)
            setPincode(enteredPincode)
            setMobileNumber(enteredMobileNumber)
            // console.log("genderSelect---5555-", genderSelect)
            // console.log("genderSelect---66666-", genderSave)

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

            } else if (genderSelect == undefined || genderSelect == 'undefined' || genderSelect == null || genderSelect == "null" || genderSelect == '') {
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Gender is missing" });
                resolve({ success: 0, message: 'failure' });

            } else if (enteredMobileNumber == '') {
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
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Postal code is missing!" });
                resolve({ success: 0, message: 'failure' });

            } else if (enteredPincode.length < 6) {
                pincodeRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Minimum 6 Character is Required" });
                resolve({ success: 0, message: 'failure' });

            } else if (enteredPincode == "000000") {
                pincodeRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Not a valid postal code" });
                resolve({ success: 0, message: 'failure' });

            } else if (!onlyNumber.test(enteredPincode)) {
                pincodeRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Postal code allow only number" });
                resolve({ success: 0, message: 'failure' });
            } else if (schoolNameSelect == '' && ismanualSchoolName == 0) {
                // passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "School name is missing!" });
                resolve({ success: 0, message: 'failure' });
            } /* else if (schoolNameSelect == 'Create new' && schoolNameSave == '') {
                // passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "School name is missing!" });
                resolve({ success: 0, message: 'failure' });
            } */ else if (ismanualSchoolName == 1 && manualSchoolName == '') {
                // passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "School name is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (schoolAddress == '') {
                // passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "School address is missing!" });
                resolve({ success: 0, message: 'failure' });
            }/* else if (enteredPassword != '' && !passwordPatteren.test(enteredPassword)) {
                passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Password not in pattern" });
                resolve({ success: 0, message: 'failure' });
            } */ else if (enteredPassword != '' && enteredPassword.length < 6 || enteredPassword.length > 15) {
                passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Password minimum 6 and maximum 15 characters required" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredPassword == '' && enteredConfirmPassword != '') {
                confirmPasswordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Password is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredPassword != '' && enteredConfirmPassword == '') {
                confirmPasswordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Confirm Password is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredPassword != '' && enteredConfirmPassword != enteredPassword) {
                confirmPasswordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Mismatched with password!" });
                resolve({ success: 0, message: 'failure' });
            } else {
                resolve({ success: 1, message: 'success' });
            }
        });

    }

    /* DOB Date */
    const setDobDate = (event, selectedDate) => {

        const currentDate = selectedDate || enterDob;
        if (event.type == 'dismissed') {
            setShow(Platform.OS === 'ios')
        } else {
            setShow(Platform.OS === 'ios')
            // setDobString(currentDate)
            setDobString(moment(currentDate).format('YYYY-MM-DD'))
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

    const closeButtomSheet = () => {
        setOtpClassModal(false)
    }

    const profileUpdate = () => {
        // console.log("genderSelect-3333---", previousMobile, mobileNumber)
        // console.log("dob ? ---", dob, "+", dobString, ">", isStoreDob)
        // console.log("dob ? ---", moment(dob).format('DD/MM/YYYY'))
        // console.log("dob ? ---", moment(dob).format('YYYY-MM-DD'))

        // setDob(dob ? moment(dob).format('DD-MM-YYYY') : null);

        // return
        profilePageValidateData()

            .then((response) => {

                if (response.success == 1) {
                    if (previousMobile != mobileNumber && standardSelect == preStandard) { //&& preStandard == standard[0]
                        console.log("@1")
                        dispatch(demoUserRecordExistsOrNot(mobileNumber, '', props))
                    } else if ((standardSelect != preStandard && previousMobile == mobileNumber)) {
                        console.log("@2")
                        // dispatch(getOTPByClassUpdateData(props));
                        dispatch(getOTPByClassUpdateData(getClassVerificationDetail, props));
                    } else if (previousMobile != mobileNumber && standardSelect != preStandard) {
                        console.log("@3")
                        dispatch(getOTPByClassUpdateData(getClassVerificationDetail, props));
                    } else {
                        dispatch(updateProfileDetails(
                            proImgFile == null ? '' : proImgFile,
                            firstName,
                            lastName,
                            // dob ? moment(dob).format('YYYY-MM-DD') : '',
                            // dob ? moment(dob).format('YYYY-MM-DD') : '',
                            dobString ? dobString : isStoreDob,
                            emailId,
                            genderSelect,
                            address,
                            pincode,
                            previousMobile,
                            // standard,
                            '',
                            board,
                            // schoolName,
                            // schoolNameSelect != 'Create new' ? schoolNameSelect : schoolNameSave,
                            ismanualSchoolName === 0 ? schoolNameSelect : manualSchoolName,
                            schoolAddress,
                            confirmPassword,
                            props
                        ))
                    }
                }
            });
    }

    const profileUpdatewithNewMobile = () => {
        dispatch(updateProfileDetails(
            proImgFile == null ? '' : proImgFile,
            firstName,
            lastName,
            dob ? moment(dob).format('YYYY-MM-DD') : '',
            emailId,
            genderSelect,
            address,
            pincode,
            mobileNumber,
            // profileUpdatedWithMobile == 1 ? mobileNumber : previousMobile,
            standardSelect != preStandard ? standardSelect : '',
            board,
            // schoolName,
            // schoolNameSelect != 'Create new' ? schoolNameSelect : schoolNameSave,
            ismanualSchoolName === 0 ? schoolNameSelect : manualSchoolName,
            schoolAddress,
            confirmPassword,
            props
        ));
    }

    const onPressMobileVerificationOption = () => {
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <MobileVerification props={props} updateProfileData={() => profileUpdatewithNewMobile()} params={{ mobile_otp: decryptAES(mOtp), otpValidTime: otpValidTime, mobile: mobileNumber, }} />,
                'componentHeight': 300,
            });
    }

    const profileImageUploadHandeler = () => {
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <ImageUploadOption props={props} onSelectGalleryOption={() => onSelectGalleryOption()} onUseCameraOption={() => onUseCameraOption()} />,
                'componentHeight': 100,
            });
    }

    const onPressClassVerificationOption = () => {
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <ClassVerification props={props} updateProfileData={() => profileUpdatewithNewMobile()} closeModal={() => closeButtomSheet()} params={{ mobile_otp: decryptAES(clsOTPdetails.mobile_otp), otpValidTime: clsOTPdetails.otp_valid_time, email_otp: decryptAES(clsOTPdetails.email_otp), mobile: mobileNumber, }} />,
                'componentHeight': 400,
            });
    }

    const leftIconHandeler = () => {

        if (props?.route.params?.params == 1) {
            props.navigation.dispatch(DrawerActions.toggleDrawer())
        } else {
            props.navigation.goBack()
        }
    }

    const getClassVerificationDetail = (data) => {
        // console.log("####--------------", data)
        setClsOTPdetails(data);
        setOtpClassModal(true);
    };


    onSelectGalleryOption = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            let image_filename = image.path.substring(image.path.lastIndexOf('/') + 1);

            setProfile_pic(image.path)

            let thumb = {
                name: image_filename,
                uri: `file://${image.path}`,
                type: "image/jpeg",
            };
            setProImgFile(thumb)
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
                    cropping: true,
                }).then(image => {
                    let image_filename = image.path.substring(image.path.lastIndexOf('/') + 1);

                    setProfile_pic(image.path)

                    let thumb = {
                        name: image_filename,
                        uri: `file://${image.path}`,
                        type: "image/jpeg",
                    };
                    setProImgFile(thumb)
                });
            } else {
                //console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }

        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    };

    const uploadImage = () => {
        profileImageUploadHandeler()
    }

    const showSchoolList = () => {
        setIsManualSchoolName(0);
        setSchoolNameSelect('');
        /* setSchoolNameSelect('');
        setSchoolAddress('');
        setSchoolNameSave(''); */
    }

    const updataMobile = (data) => {
        // (mobileNumber) => setMobileNumber(mobileNumber) setPreviousMobile
        //previousMobile != mobileNumber && standardSelect != preStandard
        setMobileNumber(data)
        if (data == previousMobile) {
            setPreviousMobile(data)
        }
    }

    const updataClass = (data) => {
        // (mobileNumber) => setMobileNumber(mobileNumber) setPreviousMobile
        //previousMobile != mobileNumber && standardSelect != preStandard
        setStandardSelect(data)
        if (data == preStandard) {
            setPreStandard(data)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "none"}
            style={styles.keyboardAvoidContainer}
        >

            {/* {console.log("previousMobile != mobileNumber", previousMobile, mobileNumber)} */}
            {/* {console.log("standardSelect != preStandard", standardSelect != preStandard)} */}
            {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
            <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
            <HeaderComponent
                headerName='Profile'
                leftIcon={props?.route.params?.params == 1 ? 'menu-outline' : 'chevron-back'}
                leftIconHandeler={() => leftIconHandeler()}
                headerProfileImage={true}
            />
            {/* {console.log("dob--123----", moment(dob).format('DD-MM-YYYY'), dob)} */}
            {/* {console.log("@@@@@", moment(dob).format('YYYY-MM-DD'))} */}
            <View style={{ flex: 1, }}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={Gstyles.scrollViewContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.userImageContainer}>
                        <TouchableOpacity onPress={() => uploadImage()} style={styles.imageContainer}>
                            {profile_pic != '' && profile_pic != null && profile_pic != undefined ?
                                <Image source={{ uri: profile_pic }} style={Gstyles.imageStyle} />
                                :
                                <Image source={require('../../assets/images/profile.png')} style={Gstyles.imageStyle} tintColor={"#137999"} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => uploadImage()} style={styles.cameraIconContainer}>
                            <Icon name={'camera'} color={'#fff'} size={9} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                            <Text style={styles.inputLabel}>First name</Text>
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

                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                            <Text style={styles.inputLabel}>Last name</Text>
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
                    
                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                            <Text style={Gstyles.inputLabel}>Date of birth</Text>
                            {/* <Text style={Gstyles.inputMandatoryMark}>*</Text> */}
                        </View>
                        <View style={Gstyles.passwordInputContainer}>
                            <TextInput
                                ref={dobRef}
                                style={Gstyles.input}
                                onChangeText={(dob) => setDob(dob)}
                                value={dob}
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


                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <Text style={Gstyles.inputMandatoryMark}></Text>
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
                            editable={false}

                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                            <Text style={styles.inputLabel}>Gender</Text>
                            <Text style={Gstyles.inputMandatoryMark}>*</Text>
                        </View>
                        <SelectDropdown
                            data={gender}
                            defaultValue={genderSelect}
                            onSelect={(selectedItem, index) => {
                                // console.log(selectedItem, index);
                                setGenderSelect(selectedItem);
                                setGenderSave(genderSelect)
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

                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                            <Text style={styles.inputLabel}>Mobile number</Text>
                            <Text style={Gstyles.inputMandatoryMark}>*</Text>
                        </View>
                        <TextInput
                            ref={mobileNumberRef}
                            style={Gstyles.input}
                            onChangeText={(mobileNumber) => updataMobile(mobileNumber)}
                            value={mobileNumber.toString()}
                            placeholder="Enter mobile no."
                            keyboardType="number-pad"
                            maxLength={10}
                            autoCapitalize='none' //words: first letter of each word.
                            returnKeyType="next"
                        // editable={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                            <Text style={styles.inputLabel}>Address</Text>
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
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                            <Text style={styles.inputLabel}>Postal Code</Text>
                            <Text style={Gstyles.inputMandatoryMark}>*</Text>
                        </View>
                        <TextInput
                            ref={pincodeRef}
                            style={Gstyles.input}
                            onChangeText={(pincode) => { setPincode(pincode); }} /* postalCodeAllowOnlyNumberHandle(pincode)  */
                            // value={pincode.toString()}
                            value={pincode}
                            placeholder="Enter postal code"
                            keyboardType="number-pad"
                            maxLength={6}
                            autoCapitalize='none' //words: first letter of each word.
                        // returnKeyType="next"
                        />
                    </View>
                    {/* {console.log("currentSession-----", currentSession)} */}
                    {/* {console.log("academicYear-----", academicYear)} */}
                    {/* currentSession */}
                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                            <Text style={styles.disableText}>Academic year</Text>
                            <Text style={Gstyles.inputMandatoryMark}></Text>
                        </View>
                        <TextInput
                            // ref={lastNameRef}
                            style={styles.disableInput} /* Gstyles.input */
                            onChangeText={(academicYear) => setAcademicYear(academicYear)}
                            // value={`${academicYear}`}
                            value={academicYear.toString()}
                            // value={`Class + ${standard.toString()}`}
                            placeholder=""
                            // keyboardType="email-address"
                            maxLength={100}
                            autoCapitalize='none' //words: first letter of each word.
                            returnKeyType="next"
                            editable={false}
                        />

                    </View>
                    {/* {console.log("details.expired------", details.expired)} */}
                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                            <Text style={details.expired == 1 ? styles.inputLabel : styles.disableText}>Standard</Text>
                            <Text style={Gstyles.inputMandatoryMark}></Text>
                        </View>
                        {/* {isExpired === 0 ? */}

                        {details.expired == 1 ?
                            <SelectDropdown
                                data={standard}
                                defaultValue={standardSelect}
                                onSelect={(selectedItem, index) => {
                                    // console.log(selectedItem, index);
                                    setStandardSelect(selectedItem);
                                    setStandardSave(selectedItem)
                                    updataClass(selectedItem)
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
                            :
                            <View>
                                <TextInput
                                    // ref={lastNameRef}
                                    // style={Gstyles.input}
                                    style={styles.disableInput}
                                    onChangeText={(standard) => setStandard(standard)}
                                    // value={`Class ${standard}`}
                                    value={standardSave}
                                    // value={standard}
                                    // value={`Class + ${standard.toString()}`}
                                    placeholder="Select standard"
                                    // keyboardType="email-address"
                                    maxLength={100}
                                    autoCapitalize='none' //words: first letter of each word.
                                    returnKeyType="next"
                                    editable={false}
                                />
                            </View>
                        }
                    </View>


                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                            <Text style={styles.inputLabel}>Board</Text>
                            <Text style={Gstyles.inputMandatoryMark}></Text>
                        </View>
                        <TextInput
                            // ref={lastNameRef}
                            style={Gstyles.input}
                            // onChangeText={(board_name) => setBoard(board_name)}
                            value={boardName}
                            placeholder="Select board"
                            // keyboardType="email-address"
                            maxLength={100}
                            autoCapitalize='none' //words: first letter of each word.
                            returnKeyType="next"
                            editable={false}
                        />
                    </View>
                    {/* {schoolNameSelect != 'Create new' ? */}

                    {ismanualSchoolName === 0 ?
                        <View style={styles.inputContainer}>
                            <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                <Text style={Gstyles.inputLabel}>School name</Text>
                                <Text style={Gstyles.inputMandatoryMark}>*</Text>
                            </View>
                            <SelectDropdown
                                data={schoolName}
                                // defaultValueByIndex={1}
                                defaultValue={schoolNameSelect}
                                onSelect={(selectedItem, index) => {
                                    // console.log("@------...", selectedItem, index);
                                    setSchoolNameSelect(selectedItem.value);
                                    if (selectedItem.value != 'Create new') {
                                        let school_address = schoolList.find(element => element.school_name === selectedItem.value && element.id === selectedItem.id)
                                        setSchoolAddress(school_address.school_address)
                                    } else {
                                        // setSchoolAddress('')
                                        setIsManualSchoolName(1)
                                    }
                                }}

                                defaultButtonText={schoolNameSelect != '' ? schoolNameSelect : 'Select school name'}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem.label;
                                    // return schoolNameSelect == '' ? 'Select school name11' : selectedItem; 
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item.label;
                                }}
                                buttonStyle={Gstyles.dropdown1BtnStyle}
                                buttonTextStyle={schoolNameSelect == '' ? Gstyles.dropdown1BtnTxtBlankStyle : Gstyles.dropdown1BtnTxtStyle}
                                renderDropdownIcon={isOpened => {
                                    return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.inputText} size={22} />;
                                }}
                                dropdownIconPosition={'right'}
                                dropdownStyle={Gstyles.dropdownSchoolNameListStyle}
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
                                // disabled={boardSelect != '' ? false : true}
                                selectedRowTextStyle={{ color: '#ff0000' }}
                            />
                        </View>
                        :
                        <View style={styles.inputContainer}>
                            <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                <Text style={Gstyles.inputLabel}>School name</Text>
                                <Text style={Gstyles.inputMandatoryMark}>*</Text>
                            </View>
                            <View style={Gstyles.passwordInputContainer}>
                                <View style={Gstyles.passwordContainer}>
                                    <TextInput
                                        style={Gstyles.input}
                                        onChangeText={(data) => setManualSchoolName(data)}
                                        // onChangeText={(schoolNameSave) => setManualSchoolName(schoolNameSave)}
                                        // value={schoolNameSave.toString()}
                                        value={manualSchoolName}
                                        // value={schoolNameSave}
                                        placeholder="Enter school name"
                                        maxLength={100}
                                    />
                                </View>
                                <View style={Gstyles.eyeContainer}>
                                    <TouchableOpacity style={Gstyles.eyePosition} onPress={showSchoolList} ><IconAntDesign name="closecircle" size={width < 500 ? 20 : 33} color={colors.inputText} /></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }

                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                            <Text style={Gstyles.inputLabel}>School address</Text>
                            <Text style={Gstyles.inputMandatoryMark}>*</Text>
                        </View>
                        <TextInput
                            style={Gstyles.input}
                            onChangeText={(schoolAddress) => setSchoolAddress(schoolAddress)}
                            value={schoolAddress.toString()}
                            placeholder="Enter school address"
                            // keyboardType="number-pad"
                            // maxLength={200}
                            autoCapitalize='none' //words: first letter of each word.
                            returnKeyType="next"
                            multiline={true}
                            // onKeyPress={(e) => addressSpecialCharacter(e)}
                            // editable={schoolNameSelect == 'Create new' ? true : false}
                            editable={ismanualSchoolName === 0 ? false : true}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                            <Text style={styles.inputLabel}>New password</Text>
                            {/* <Text style={Gstyles.inputMandatoryMark}>*</Text> */}
                        </View>
                        <View>
                            <Text style={[styles.inputLabel, { marginLeft: 10, fontSize: 10, marginBottom: 3, }]}>(If you wish not to change your password, keep this blank)</Text>
                        </View>
                        <View style={Gstyles.passwordInputContainer}>
                            <View style={Gstyles.passwordContainer}>
                                <TextInput
                                    ref={passwordRef}
                                    style={Gstyles.passwordInput}
                                    onChangeText={(password) => { setPassword(password); newPasswordWhiteSpaceRemoveHandle(password) }}
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

                    <View style={[styles.inputContainer, { marginTop: 15 }]}>
                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                            <Text style={styles.inputLabel}>New confirm password</Text>
                            {/* <Text style={Gstyles.inputMandatoryMark}>*</Text> */}
                        </View>
                        <TextInput
                            ref={confirmPasswordRef}
                            style={Gstyles.input}
                            onChangeText={(confirmPassword) => { setConfirmPassword(confirmPassword); newConfirmPasswordWhiteSpaceRemoveHandle(confirmPassword) }}
                            value={confirmPassword.toString()}
                            placeholder="confirm password"
                            secureTextEntry
                            // keyboardType="email-address"
                            // maxLength={200}
                            autoCapitalize='none' //words: first letter of each word.
                            // returnKeyType="next"
                            /* onSubmitEditing={() => {
                                signup();
                            }} */
                            signup
                            contextMenuHidden={true}
                        />
                    </View>


                </ScrollView>
            </View>
            <TouchableOpacity onPress={() => profileUpdate()} style={Gstyles.examSubmitContainer} >
                <Text style={Gstyles.examSubmitText}>Update</Text>
            </TouchableOpacity>


        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create(
    {
        keyboardAvoidContainer: {
            flex: 1,
            backgroundColor: '#fff'
        },
        scrollViewContainer: {
            justifyContent: 'center',
            marginVertical: 10,
            paddingVertical: 10,
        },
        userImageContainer: {
            width: '100%',
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        },
        imageContainer: {
            height: 76,
            width: 76,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            borderColor: '#137897',
            borderWidth: 1,
            borderRadius: 40,
            borderStyle: 'solid',
            overflow: 'hidden',
        },
        imageStyle: {
            height: 76,
            width: 76,
        },
        inputContainer: {
            width: '90%'
        },
        inputLabel: {
            fontFamily: fonts.rLight,
            fontSize: 12,
            color: colors.inputText,
        },
        labelMargin: {
            marginLeft: 10,
            marginBottom: 5,
        },
        cameraIconContainer: {
            width: 20,
            height: 20,
            backgroundColor: '#ff0000',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            right: -20,
            bottom: 18,
        },
        disableText: {
            // backgroundColor: colors.disableBackground,
            color: colors.disableText,
            fontFamily: fonts.rLight,
            fontSize: 12,
        },
        disableInput: {
            width: '100%',
            height: width < 500 ? 50 : height * 0.060,
            marginBottom: 12,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 8,
            // backgroundColor: colors.disableBackground,
            backgroundColor: '#F6F6F6',
            borderColor: colors.inputBorder,
            borderRadius: 10,
            fontSize: width < 500 ? 14 : height * 0.020,
            color: colors.disableText,
        },



    });

export default Profile;