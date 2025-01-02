import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

//styles
import { colors, containerInside, rbSheetBorderRdious } from '../../styles/Crestest.config';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import CounterClockComponent from '../../components/CounterClockComponent'

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

import { sendVerificationOtp, verificationInputBoxAction, verificationCodeAction } from '../../store/actions/StudentAction';


import { useDispatch, useSelector } from 'react-redux';

import { validateEmail, decryptAES } from "../../utils/Util";

import { useNavigation } from '@react-navigation/native';

import Gstyles from '../../styles/GlobalStyle';

const ClassVerification = (props) => {

    const navigation = useNavigation();

    const [emailOtp, setEmailOtp] = useState('');
    const [mobileOtp, setMobileOtp] = useState('');
    const [isShowResendOtp, setIsShowResendOtp] = useState(0);

    const mobile_otp = useSelector(state => state.student.mobile_otp);
    
    const otpValidTime = useSelector(state => state.student.otpValidTime);

    const time_used = useSelector(state => state.auth.time_used);

    const onlyNumber = /^[0-9]+$/;

    const dispatch = useDispatch();

    const mobileOtpRef = useRef();
    const emailOtpRef = useRef();


    useEffect(() => {
        // console.log("@2222----route--", props) otp_valid_time
    }, []);

    useEffect(() => {
        console.log("time_used------", "mobile_otp:", decryptAES(mobile_otp), "otpValidTime:", otpValidTime, "e-", props.params.email_otp)
        console.log("time_used--111----", props.params.otpValidTime, props.params.mobile_otp, props.params.email_otp)
        if (props.params.otpValidTime <= 0) {
            // console.log("@1",)
            setIsShowResendOtp(1)
            setMobileOtp('');
            setEmailOtp('');
            removeOtpDetails();
        } else {
            // console.log("@2",)
            setIsShowResendOtp(0)
        }
    }, [props.params.otpValidTime, props.params.mobile_otp, props.params.email_otp]);

    const closeVerificationOption = () => {
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
        props.closeModal()
        dispatch(verificationInputBoxAction(1))
        removeOtpDetails();
        
    }

    const removeOtpDetails = () => {

        const removeOtp = {
            email_otp: '',
            mobile_otp: '',
            otp_valid_time: '',
        }
        dispatch(verificationCodeAction(removeOtp))
    }

    const resendVerificationOption = () => {
        dispatch(sendVerificationOtp(props.params.mobile, '', props));

    }

    const SubmitVerificationOption = () => {
        Emitter.emit(Events.SHOW_PRELOADER);
        verificationValidate()
            .then((response) => {
                if (response.success == 1) {
                    // dispatch(loginAction(email, password, devicetoken, navigation));

                    // if (mobileOtp == decryptAES(mobile_otp)) {
                    if (mobileOtp == props.params.mobile_otp && emailOtp == props.params.email_otp) {
                        // console.log("SubmitVerificationOption", props.navigation);
                        // console.log("@1")
                        dispatch(verificationInputBoxAction(1))
                        // console.log("@2")
                        closeVerificationOption();
                        // console.log("@2")
                        props.updateProfileData()
                        // console.log("@4")

                        Emitter.emit(Events.HIDE_PRELOADER);

                    } else {
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Please check verification otp" });
                        Emitter.emit(Events.HIDE_PRELOADER);
                    }

                } else {
                    //validation error
                    //   Emitter.emit(Events.HIDE_PRELOADER);
                    Emitter.emit(Events.HIDE_PRELOADER);
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
                    <View style={[Gstyles.topHeadingContainer, Gstyles.marginBottom50]}>
                        {/* <Text style={Gstyles.verifyHeading}>Verify Your Contact Information</Text> */}
                        <Text style={Gstyles.verifyHeading}>Please Verify your Mobile Number and Email ID</Text>
                        <View style={[Gstyles.fdr]}>
                            {/* <View style={[Gstyles.w50]}>
                                <Text style={Gstyles.details}>Please Verify your Mobile Number </Text>
                            </View> */}
                            <View style={{paddingVertical:5, width:'100%', alignItems:'center', justifyContent:'center'}}>
                                {isShowResendOtp != 1 ?
                                    <View>
                                        <CounterClockComponent
                                            // duration={props.params.otpValidTime} 
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
                        {/* <View><Text>{`m: ${props?.params?.mobile_otp} E: ${props?.params?.email_otp}`}</Text></View> */}
                        
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

export default ClassVerification;

const styles = StyleSheet.create(
    {


    })