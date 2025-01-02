import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

//styles
import { colors, container, scrollViewContainer, containerInside, fonts } from '../../styles/Crestest.config';

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';
import { validateEmail } from "../../utils/Util";

import { forgetPasswordEmail } from '../../store/actions/AuthActions'
import { useDispatch } from 'react-redux';

import Gstyles from '../../styles/GlobalStyle';
import topImage from '../../assets/images/login_img.png'
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = ({ navigation }) => {
    // const navigation = useNavigation();
    const [emailId, setEmailId] = useState('');

    const dispatch = useDispatch();

    const emailRef = useRef()

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    emailWhiteSpaceRemoveHandle = (value) => {
        setEmailId(value.replace(/\s/g, ''))
    }

    const validateData = () => {
        const enteredEmail = emailId.trim()

        //check all validations
        return new Promise(function (resolve, reject) {
            setEmailId(enteredEmail)

            if (enteredEmail == '') {
                emailRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Registered email id is missing!" });
                resolve({ success: 0, message: 'failure' });

            } else if (!validateEmail(enteredEmail)) {
                emailRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Valid email id require" });
                resolve({ success: 0, message: 'failure' });
            } else {
                resolve({ success: 1, message: 'success' });
            }
        });
    }

    const onPressSubmitHandler = async () => {
        validateData()
            .then((response) => {

                if (response.success == 1) {
                    dispatch(forgetPasswordEmail(emailId, navigation));
                    // dispatch(loginAction(email, password, devicetoken, navigation));
                } else {
                    //validation error
                    //   Emitter.emit(Events.HIDE_PRELOADER);
                }
            });
    }

    const onPressCloseHandler = () => {
        navigation.goBack()
    }

    return (
        <>
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
                            <View style={Gstyles.imageContainer}>
                                {/* <Image source={require('../../assets/images/login_img.png')} style={Gstyles.topImage} /> */}
                                <Image source={require('../../assets/images/top_image.png')} style={Gstyles.topImage} />
                            </View>
                        </View>


                        <View style={Gstyles.bottomParentContainer}>
                            <View style={Gstyles.topHeadingContainer}>
                                <Text style={Gstyles.heading}>Forgot Password?</Text>
                                <Text style={Gstyles.details}>No worries, we’ll send reset instructions to your registered email Id</Text>
                            </View>

                            <View style={Gstyles.inputContainer}>
                                <View>
                                    <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                        <Text style={Gstyles.inputLabel}>Email ID</Text>
                                        <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                    </View>
                                    <TextInput
                                        ref={emailRef}
                                        style={Gstyles.input}
                                        onChangeText={(emailId) => {setEmailId(emailId); emailWhiteSpaceRemoveHandle(emailId)}}
                                        value={emailId.toString()}
                                        placeholder="Enter your registered email id"
                                        // keyboardType="email-address"
                                        maxLength={100}
                                        autoCapitalize='none' //words: first letter of each word.
                                        onSubmitEditing={
                                            onPressSubmitHandler
                                        }
                                    />
                                </View>
                            </View>

                            <View style={Gstyles.buttonContainer}>
                                <TouchableOpacity style={[Gstyles.buttonLeftContainer, Gstyles.yellowButtonBackground]} onPress={onPressCloseHandler}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Close</Text></ TouchableOpacity>
                                <TouchableOpacity onPress={onPressSubmitHandler} style={Gstyles.buttonRightContainer}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Submit</Text></ TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>

            </KeyboardAvoidingView>

        </>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create(
    {



    })