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
    StatusBar
} from 'react-native';

//styles
import { container, scrollViewContainer, containerInside } from '../../styles/Crestest.config';

const { width } = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome';

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';
import { validateEmail } from "../../utils/Util";

import { loginAction, demoLogin, verificationCodeInputOffAction } from '../../store/actions/AuthActions';
import PrivacyPolicy from '../../components/PrivacyPolicy';
import { useDispatch } from 'react-redux';

import firebaseToken from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import Gstyles from '../../styles/GlobalStyle';
import topImage from '../../assets/images/login_img.png'


const Signin = ({ navigation }) => {

    const [email, setEmail] = useState(''); /* pratap.santra18@gmail.com */
    const [password, setPassword] = useState('');/* Pass@123 */

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [devicetoken, setDevicetoken] = useState(true);
    

    const [privacyPolicyModal, setPrivacyPolicyModal] = useState(false);

    const dispatch = useDispatch();

    const emailRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        dispatch(verificationCodeInputOffAction(0));
        emailRef.current.focus();
        // console.log("@1")
        getDeviceToken()

    }, []);

    emailWhiteSpaceRemoveHandle = (value) => {
        setEmail(value.replace(/\s/g, ''))
    }

    passwordWhiteSpaceRemoveHandle = (value) => {
        setPassword(value.replace(/\s/g, ''))
    }

    const seenPasswordOn = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const validateData = () => {
        const enteredEmail = email.trim()
        const enteredPassword = password.trim()
        const regexp = /^\S*$/;
        //check all validations
        return new Promise(function (resolve, reject) {
            setEmail(enteredEmail)
            setPassword(enteredPassword)
            if (email == '') {
                emailRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Loginid is missing!" });
                resolve({ success: 0, message: 'failure' });

            } else if (!regexp.test(email) || !regexp.test(password)) {
                passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Please remove white space" });
                resolve({ success: 0, message: 'failure' });

            } else if (password == '') {
                passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Password is missing" });
                resolve({ success: 0, message: 'failure' });

            } else if (password.length < 6 || password.length > 15) {
                passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Password: Character limit min 6 and max 15!" });
                resolve({ success: 0, message: 'failure' });

            } else if (email.indexOf('@') >= 0 || email.indexOf('.') >= 0 || email) {
                if (!validateEmail(email.replace(/\s/g, ''))) {
                    emailRef.current.focus();
                    error: 1;
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Login Id is wrong!" });
                    resolve({ success: 0, message: 'failure' });

                } else {
                    resolve({ success: 1, message: 'success' });
                }

            } else {
                resolve({ success: 1, message: 'success' });
            }
        });
    }

    const onPressGetSinginHandler = async () => {
        validateData()
            .then((response) => {
                if (response.success == 1) {
                    dispatch(loginAction(email, password, devicetoken, navigation));
                } else {
                    //validation error
                    //   Emitter.emit(Events.HIDE_PRELOADER);
                }
            });
    }

    const getDeviceToken = () => {
        messaging().getToken(firebaseToken.app().options.messagingSenderId)
            .then((x) => {
                console.log("GET TOKEN ERROR 1111 123 :" + x)
                setDevicetoken(x);

            })
            .catch(e => console.log("GET TOKEN ERROR :" + e));
    }

    const goToRegistration = () => {
        navigation.navigate('Registration')
    }

    const goToSuccessRegister = () => {
        navigation.navigate('SuccessRegister')
    }

    const goToForgotPassword = () => {
        navigation.navigate('ForgotPassword')
    }

    const loginDemo = () => {
        dispatch(demoLogin(devicetoken, navigation));
    }

    const openPrivacyModal = () => {
        setPrivacyPolicyModal(true)
    }
    const closePrivacyPolicyModal = () => {
        setPrivacyPolicyModal(false)
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >
                {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={true} /> */}
                <StatusBar barStyle="light-content" backgroundColor="#245C75"  hidden={false} />
                <View style={containerInside}>
                {/* <View style={Gstyles.registrationContainerInside}> */}
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={[scrollViewContainer, { flexGrow: 1, }]}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={Gstyles.topParentContainer}>
                            <View style={Gstyles.imageContainer}>
                                {/* <Image source={require('../../assets/images/login_img.png')} style={Gstyles.topImage} /> */}
                                <Image source={require('../../assets/images/top_image.png')} style={Gstyles.topImage} />
                            </View>
                        </View>


                        <View style={[Gstyles.bottomParentContainer]}>
                            <View style={{ justifyContent: 'space-between' }}>
                                <View style={Gstyles.topHeadingContainer}>
                                    <Text style={Gstyles.heading}>Sign in your account</Text>
                                    <Text style={Gstyles.details}>Welcome back! Login with your data that you entered during registration.</Text>
                                </View>

                                <View style={Gstyles.inputContainer}>
                                    <View>
                                        <TextInput
                                            ref={emailRef}
                                            style={Gstyles.input}
                                            onChangeText={(email) => {setEmail(email); emailWhiteSpaceRemoveHandle(email)}}
                                            value={email.toString()}
                                            placeholder="Email"
                                            placeholderTextColor="grey" 
                                            keyboardType="email-address"
                                            maxLength={100}
                                            autoCapitalize='none' //words: first letter of each word.
                                            returnKeyType="next"
                                            onSubmitEditing={() => {
                                                passwordRef.current.focus();
                                            }}
                                        />
                                    </View>

                                    <View style={Gstyles.passwordInputContainer}>
                                        <View style={Gstyles.passwordContainer}>
                                            <TextInput
                                                ref={passwordRef}
                                                style={Gstyles.input}
                                                onChangeText={(password) => {setPassword(password); passwordWhiteSpaceRemoveHandle(password)}}
                                                value={password.toString()}
                                                placeholder="Password"
                                                placeholderTextColor="grey"
                                                secureTextEntry={secureTextEntry}
                                                maxLength={100}
                                                // keyboardType="numeric"
                                                onSubmitEditing={() => onPressGetSinginHandler()}
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
                                </View>

                                <TouchableOpacity onPress={goToForgotPassword}>
                                    <Text style={Gstyles.bolddetails}>Forgot password?</Text>
                                </TouchableOpacity>
                                <View style={Gstyles.buttonContainer}>
                                    <TouchableOpacity style={[Gstyles.buttonLeftContainer, Gstyles.yellowButtonBackground]} onPress={onPressGetSinginHandler}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Sign me in</Text></ TouchableOpacity>
                                    <TouchableOpacity onPress={loginDemo} style={Gstyles.buttonRightContainer}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>CRESTEST {"\n"}guest login</Text></ TouchableOpacity>
                                </View>
                                <View style={Gstyles.signupText}>
                                    <Text style={Gstyles.signupNormalText}>Don't have an account?</Text>
                                    <TouchableOpacity onPress={goToRegistration}><Text style={Gstyles.signupLinkText}>Sign up</Text></TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => openPrivacyModal()} style={Gstyles.privacyPolicyContainer}>
                                    <Text style={Gstyles.privacyPolicytext}>Privacy policy</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                </View>

                <PrivacyPolicy
                    isVisable={privacyPolicyModal}
                    closeModal={() => closePrivacyPolicyModal()}
                />

            </KeyboardAvoidingView>

        </>
    );
};

export default Signin;

const styles = StyleSheet.create(
    {



    })