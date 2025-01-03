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
} from 'react-native';

//styles
import { colors, container, scrollViewContainer, containerInside, fonts } from '../../styles/Crestest.config';

const { width, height } = Dimensions.get('window');

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';
import { validateEmail, decryptAES, } from "../../utils/Util";

// import { loginAction } from '../../store/actions/AuthActions'
import { useDispatch, useSelector } from 'react-redux';

import firebaseToken from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import Gstyles from '../../styles/GlobalStyle';

import Icon from 'react-native-vector-icons/FontAwesome';

import SelectDropdown from 'react-native-select-dropdown';

import { getClassStandardData, getBoardData, } from '../../store/actions/CommonActions';
import { userDetailsExistsOrNot, newStudentRegistrationWithoutDemo, verificationCodeInputOffAction, } from '../../store/actions/AuthActions';
import {
    getAcademicYearByBoardList,
    getAcademicYearByBoardIdAction,
} from "../../store/actions/AcademicActions";
import { registrationStatusDetails } from '../../store/actions/StudentAction'

import Verification from './Verification'

import PrivacyPolicy from '../../components/PrivacyPolicy';
import TermsCondition from '../../components/TermsCondition';
import { useNavigation } from '@react-navigation/native';


const Registration = (props) => {

    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [mobileNumber, setMobileNumber] = useState('');
    const [emailId, setEmailId] = useState('');

    const [standard, setStandard] = useState(["1", "2", "3"]);
    const [standardSelect, setStandardSelect] = useState('');
    const [standardSave, setStandardSave] = useState('');

    const [board, setBoard] = useState([]);
    const [boardSelect, setBoardSelect] = useState('');
    const [boardSave, setBoardSave] = useState('');

    const [academicYear, setAcademicYear] = useState([]);
    const [academicYearSelect, setAcademicYearSelect] = useState('');
    const [academicYearSave, setAcademicYearSave] = useState('');

    const [devicetoken, setDevicetoken] = useState(true);

    const [privacyPolicyModal, setPrivacyPolicyModal] = useState(false);
    const [showTermsCondition, setShowTermsCondition] = useState(false);

    const dispatch = useDispatch();

    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const mobileNumberRef = useRef();
    const emailIdRef = useRef();
    const passwordRef = useRef();

    const alphabetsCheck = /^[A-Za-z\s]*$/;
    const onlyNumber = /^[0-9]+$/;

    const classStandardList = useSelector(state => state.common.classStandardList);
    const boardList = useSelector(state => state.common.boardList);
    const email_otp = useSelector(state => state.auth.email_otp);
    const mobile_otp = useSelector(state => state.auth.mobile_otp);
    const otpValidTime = useSelector(state => state.auth.otpValidTime);
    const academicMasterList = useSelector(state => state.academic.academicMasterList);
    const isShowOtpBox = useSelector(state => state.auth.isShowOtpBox);
    const [isShowVerification, setIsShowVerification ] = useState(false)

    useEffect(() => {
        dispatch(verificationCodeInputOffAction(0));
        dispatch(getClassStandardData(navigation));
        dispatch(getBoardData(navigation));
        getDeviceToken();
    }, []);

    useEffect(() => {
        if (isShowOtpBox == 1 && isShowVerification) {
            onPressOpenVisibleOption();
        }

    }, [email_otp, mobile_otp, otpValidTime, isShowOtpBox, isShowVerification]);


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
        let academic_year = [];
        academicMasterList.forEach((ele) => {
            academic_year.push(ele.academicyear);
        })
        setAcademicYear(academic_year)
    }, [academicMasterList]);

    useEffect(() => {
        return () => {
            console.log("registration return useEffect")
            setIsShowVerification(false)
        }
    }, []);


    /* React.useEffect(() => {
        if (route.params?.validationStatus) {
            dispatch(
                newStudentRegistrationWithoutDemo(
                    firstName.trim(),
                    lastName.trim(),
                    mobileNumber.trim(),
                    emailId.trim(),
                    standardSave,
                    boardSave,
                    academicYearSave,
                    devicetoken,
                    navigation
                ));
        }
    }, [route.params?.validationStatus]); */


    const getAcademicYearPerBoard = (val) => {
        if (val) {
            dispatch(getAcademicYearByBoardList(parseInt(val)));
            setAcademicYearSelect('');
            setAcademicYearSave('')
            setAcademicYear([]);
        } else {
            dispatch(getAcademicYearByBoardIdAction([]));
        }
    }


    const goToSignin = () => {
        props.navigation.navigate('Signin')
    }

    const studentDetailsBeforeOtpVerify = () => {
        dispatch(
            registrationStatusDetails(
                mobileNumber.trim(),
                `${firstName.trim()} ${lastName.trim()}`,
                emailId.trim(),
                0,
                0,
                1,
                standardSave,
                boardSave,
                academicYearSave
            )
        );
    };


    const signup = async () => {
        pageOneValidateData()
            .then((response) => {
                /* for show terms & condition */

                if (response.success == 1) {
                    studentDetailsBeforeOtpVerify();
                    setShowTermsCondition(true)

                } else {
                    //validation error
                    //   Emitter.emit(Events.HIDE_PRELOADER);----
                }
            });
    }

    const checkingForMobileEmail = () => {
        dispatch(verificationCodeInputOffAction(0));
        dispatch(userDetailsExistsOrNot(emailId, mobileNumber, isShowVerificationHandeler, navigation));
    }

    const submitStudentDetails = () => {
        // console.log("devicetoken------", devicetoken)
        setIsShowVerification(false);
        dispatch(verificationCodeInputOffAction(0));
        dispatch(
            newStudentRegistrationWithoutDemo(
                firstName.trim(),
                lastName.trim(),
                mobileNumber.trim(),
                emailId.trim(),
                standardSave,
                boardSave,
                academicYearSave,
                devicetoken,
                1,
                navigation,
                props
            ));
    }

    const isShowVerificationHandeler = () => {
        setIsShowVerification(true)
    }

    const onPressOpenVisibleOption = () => {
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                // 'component': <EditClubMenuScene navigation={this.props.navigation} parent={this} />,
                'component': <Verification navigation={navigation} params={{ email_otp: decryptAES(email_otp), mobile_otp: decryptAES(mobile_otp), otpValidTime: otpValidTime, mobile: mobileNumber, email: emailId, firstName: firstName, lastName: lastName, std: standardSelect, class_id: standardSave, board: boardSelect, board_id: boardSave, academic_year: academicYearSave }} submitStudentDetails={submitStudentDetails} />,
                'componentHeight': 400,
            });
    }

    const pageOneValidateData = async () => {
        const enteredFirstName = firstName.trim();
        const enteredLastName = lastName.trim();
        const enteredMobileNumber = mobileNumber.trim();
        const enteredEmailId = emailId.trim();
        //check all validations
        return new Promise(function (resolve, reject) {
            setFirstName(enteredFirstName);
            setLastName(enteredLastName);
            setMobileNumber(enteredMobileNumber);
            setEmailId(enteredEmailId);

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
            } else if (enteredMobileNumber == '') {
                // mobileNumberRef.current.focus();
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
            } else if (academicYearSelect == '') {
                // genderRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Academic Year is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else {
                resolve({ success: 1, message: 'success' });

            }
        });
    }



    const getDeviceToken = () => {
        messaging().getToken(firebaseToken.app().options.messagingSenderId)
            .then((x) => {
                // console.log("GET TOKEN ERROR 1111 :" + x)
                setDevicetoken(x);

            })
            .catch(e => console.log("GET TOKEN ERROR :" + e));
    }

    const openPrivacyModal = () => {
        setPrivacyPolicyModal(true)
    }
    const closePrivacyPolicyModal = () => {
        setPrivacyPolicyModal(false)
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
            {/* <View style={containerInside}> */}
            <View style={Gstyles.registrationContainerInside}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={scrollViewContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* {console.log("isShowOtpBox------", isShowOtpBox)} */}
                    <View style={Gstyles.signupTopParentContainer}>
                        <View>
                            <Image source={require('../../assets/images/infographic.jpg')} style={Gstyles.topImage} />
                        </View>
                    </View>

                    <View style={Gstyles.signupBottomParentContainer}>
                        <View style={Gstyles.topHeadingContainer}>
                            <Text style={Gstyles.heading} >Sign Up</Text>
                            <Text style={Gstyles.details}>(<Text style={Gstyles.inputMandatoryMark}>*</Text>) Marked fields are mandatory to fill</Text>
                        </View>

                        <View style={Gstyles.inputContainerTwo}>
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
                                            mobileNumberRef.current.focus();
                                        }}
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
                                        defaultButtonText={'Select Class'}
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
                                            setBoardSave([board_details.id, board_details.short_code, board_details.name,])
                                            // getSchoolListAsPerBoard(board_details.id)
                                            getAcademicYearPerBoard(board_details.id)
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
                                        /* onSubmitEditing={() => {
                                            passwordRef.current.focus();
                                        }} */
                                    />
                                </View>

                                <View>
                                    <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                        <Text style={Gstyles.inputLabel}>Academic Year</Text>
                                        <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                    </View>
                                    <SelectDropdown
                                        data={academicYear}
                                        // defaultValueByIndex={1}
                                        defaultValue={academicYearSelect}
                                        onSelect={(selectedItem, index) => {
                                            // console.log(selectedItem, index);
                                            setAcademicYearSelect(selectedItem);
                                            let aYear_details = academicMasterList.find(element => element.academicyear === selectedItem)
                                            setAcademicYearSave(aYear_details.id)
                                            // getSchoolListAsPerBoard(board_details.id)

                                        }}
                                        defaultButtonText={'Academic Year'}
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
                                        disabled={boardSave == '' ? true : false }
                                    />
                                </View>
                            </>

                        </View>

                        <View style={Gstyles.singlebuttonContainer}>
                            <TouchableOpacity onPress={signup} style={[Gstyles.buttonRightContainer, Gstyles.signupBackground]}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Sign up</Text></TouchableOpacity>
                        </View>



                        <View style={Gstyles.signupText}>
                            <Text style={Gstyles.signupNormalText}>Already have an account?</Text>
                            <TouchableOpacity onPress={goToSignin}><Text style={Gstyles.signupLinkText}>Sign in</Text></TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => openPrivacyModal()} style={Gstyles.privacyPolicyContainer}>
                            <Text style={[Gstyles.privacyPolicytext]}>Privacy policy</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>

            </View>

            <PrivacyPolicy
                isVisable={privacyPolicyModal}
                closeModal={() => closePrivacyPolicyModal()}
            />

            <TermsCondition
                isVisable={showTermsCondition}
                closeModal={() => closeTermsModal()}
                acceptModal={() => acceptTermsCondition()}
            />

        </KeyboardAvoidingView >


    );
};

export default Registration;

const styles = StyleSheet.create(
    {


    })