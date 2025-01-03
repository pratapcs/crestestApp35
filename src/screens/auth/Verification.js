import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

//styles
import { colors, containerInside, } from '../../styles/Crestest.config';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import CounterClockComponent from '../../components/CounterClockComponent'


import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

import { verificationCodeInputOffAction, sendVerificationOtp, } from '../../store/actions/AuthActions'
import { registrationStatusDetails } from '../../store/actions/StudentAction'

import { useDispatch, useSelector } from 'react-redux';

import { decryptAES } from "../../utils/Util";

import Gstyles from '../../styles/GlobalStyle';


const Verification = (props) => {

    const [emailOtp, setEmailOtp] = useState('');
    const [mobileOtp, setMobileOtp] = useState('');
    const [isShowResendOtp, setIsShowResendOtp] = useState(0);

    const time_used = useSelector(state => state.auth.time_used);

    const onlyNumber = /^[0-9]+$/;

    const dispatch = useDispatch();

    const emailOtpRef = useRef();
    const mobileOtpRef = useRef();


    useEffect(() => {
        console.log("@2222----mobile_otp--", props.params.mobile_otp)
        console.log("@2222----email_otp--", props.params.email_otp)
    }, []);

    useEffect(() => {
        if (time_used <= 0) {
            setIsShowResendOtp(1)
            setMobileOtp('');
            setEmailOtp('');
            /* failed registration */
            dispatch(
                registrationStatusDetails(
                    props.params.mobile.trim(),
                    `${props.params.firstName.trim()} ${props.params.lastName.trim()}`,
                    props.params.email,
                    0,
                    0,
                    2,
                    props.params.class_id,
                    props.params.board_id,
                    props.params.academic_year
                ));
        } else {
            setIsShowResendOtp(0)
        }
    }, [time_used]);

    const closeVerificationOption = () => {
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    }

    const resendVerificationOption = () => {
        dispatch(sendVerificationOtp(props.params.mobile, props.params.email));

    }

    const SubmitVerificationOption = () => {
        verificationValidate()
            .then((response) => {
                if (response.success == 1) {
                    // dispatch(loginAction(email, password, devicetoken, navigation));

                    if (mobileOtp == props.params.mobile_otp && emailOtp == props.params.email_otp) {
                        // console.log("SubmitVerificationOption", props.navigation);
                        console.log("#4")
                        dispatch(verificationCodeInputOffAction(0));
                        props.submitStudentDetails()
                        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);

                        /* props.navigation.navigate({
                            name: 'SuccessRegister',
                            params: { validationStatus: 1 },
                            // merge: true,
                        }); */

                    } else {
                        dispatch(
                            registrationStatusDetails(
                                props.params.mobile.trim(),
                                `${props.params.firstName.trim()} ${props.params.lastName.trim()}`,
                                props.params.email,
                                mobileOtp == decryptAES(props.params.mobile_otp) ? 1 : 0,
                                emailOtp == decryptAES(props.params.email_otp) ? 1 : 0,
                                1,
                                props.params.class_id,
                                props.params.board_id,
                                props.params.academic_year
                            ));

                        Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Please check verification otp" });
                    }

                } else {
                    //validation error
                    //   Emitter.emit(Events.HIDE_PRELOADER);
                }
            });

    }

    const verificationValidate = async () => {
        const enteredEmailOtp = emailOtp.trim()
        const enteredMobileOtp = mobileOtp.trim()

        //check all validations
        return new Promise(function (resolve, reject) {
            setEmailOtp(enteredEmailOtp)
            setMobileOtp(enteredMobileOtp)

            if (enteredMobileOtp == '') {
                mobileOtpRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Mobile otp is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredMobileOtp.length < 6 || enteredMobileOtp.length > 6) {
                mobileOtpRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Mobile otp minimum 6 Character is Required!" });
                resolve({ success: 0, message: 'failure' });
            } else if (!onlyNumber.test(enteredMobileOtp)) {
                mobileOtpRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Mobile otp Allow only number" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredEmailOtp == '') {
                mobileOtpRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Email otp is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else if (enteredEmailOtp.length < 6 || enteredEmailOtp.length > 6) {
                mobileOtpRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Email otp minimum 6 Character is Required!" });
                resolve({ success: 0, message: 'failure' });
            } else if (!onlyNumber.test(enteredEmailOtp)) {
                mobileOtpRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Email otp Allow only number" });
                resolve({ success: 0, message: 'failure' });
            } else {
                resolve({ success: 1, message: 'success' });
            }
        });
    }

    return (
        <>

            <View style={[containerInside, Gstyles.rbSheetStyle]}>

                <TouchableOpacity style={Gstyles.modalRbCloseButtonContainer} onPress={closeVerificationOption}>
                    <EntypoIcon name="cross" size={25} color={colors.backgroundDeepGray} />
                </TouchableOpacity>

                <View style={Gstyles.bottomParentContainer}>

                    <View style={[Gstyles.topHeadingContainer, { height: 110 }]}>
                        <Text style={Gstyles.heading}>Verification</Text>
                        <View style={[Gstyles.fdr]}>
                            <View style={[Gstyles.w50, { height: 80 }]}>
                                <Text style={Gstyles.details}>Please Verify your Mobile Number and Email ID </Text>
                            </View>
                            <View style={[Gstyles.w50]}>
                                {isShowResendOtp != 1 ?
                                    <View>
                                        <CounterClockComponent
                                            duration={props.params.otpValidTime}
                                            strokeWidth={15} size={30}
                                            strokeLinecap={`butt`}
                                        />
                                    </View>
                                    : null
                                }
                            </View>
                        </View>
                    </View>

                    {/* style={Gstyles.timerCounter} */}
                    <View style={Gstyles.inputContainerTwo}>
                        <View>
                            <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                <Text style={Gstyles.inputLabel}>Mobile OTP</Text>
                                <Text style={Gstyles.inputMandatoryMark}>*</Text>
                            </View>
                            <TextInput
                                ref={mobileOtpRef}
                                style={Gstyles.input}
                                onChangeText={(mobileOtp) => setMobileOtp(mobileOtp)}
                                value={mobileOtp.toString()}
                                placeholder="Enter Mobile OTP"
                                keyboardType="number-pad"
                                maxLength={6}
                                minLength={6}
                                autoCapitalize='none' //words: first letter of each word.
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailOtpRef.current.focus();
                                }}
                            />
                        </View>

                        <View>
                            <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                <Text style={Gstyles.inputLabel}>Email OTP</Text>
                                <Text style={Gstyles.inputMandatoryMark}>*</Text>
                            </View>
                            <TextInput
                                ref={emailOtpRef}
                                style={Gstyles.input}
                                onChangeText={(emailOtp) => setEmailOtp(emailOtp)}
                                value={emailOtp.toString()}
                                placeholder="Enter Email OTP"
                                keyboardType="number-pad"
                                maxLength={6}
                                minLength={6}
                                autoCapitalize='none' //words: first letter of each word.
                                // returnKeyType="next"
                                onSubmitEditing={() => {
                                    SubmitVerificationOption();
                                }}
                            />
                        </View>
                    </View>

                    <View style={Gstyles.buttonContainer}>
                        <TouchableOpacity style={[Gstyles.buttonLeftContainer, Gstyles.yellowButtonBackground]} onPress={closeVerificationOption}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Close</Text></ TouchableOpacity>
                        {isShowResendOtp == 1 ?
                            <TouchableOpacity onPress={resendVerificationOption} style={Gstyles.buttonRightContainer}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Resend</Text></ TouchableOpacity>
                            :
                            <TouchableOpacity onPress={SubmitVerificationOption} style={Gstyles.buttonRightContainer}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Submit</Text></ TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </>
    );
};

export default Verification;

const styles = StyleSheet.create(
    {


    })