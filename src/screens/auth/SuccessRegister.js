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
    Animated, Easing,
} from 'react-native';

//styles
import { colors, container, scrollViewContainer, containerInside, fonts } from '../../styles/Crestest.config';


const { width, height } = Dimensions.get('window');

import Gstyles from '../../styles/GlobalStyle';

import { useNavigation } from '@react-navigation/native';

const SuccessRegister = (props) => {

    // const [email, setEmail] = useState('');
    const navigation = useNavigation();
    const goToLoginPage = () => {
        navigation.navigate('Signin')
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "none"}
            style={styles.screenContainer}
        >
            <View style={styles.parentContainer}>

                <View style={styles.textContainer}>
                    <Text style={styles.ThankHeading}>Thank you!</Text>
                    <Text style={styles.bodyText}>A hearty welcome to Crestest Learning Portal. We are aspiring to unleash all the hidden potential within you. Happy learning!!.
                        Your credentials have already been sent to your registered email. Please check inbox even spam in case if you don’t find in inbox.</Text>
                    <Text style={styles.bodyText}>In case of any confusion please feel free to reach us on +913335588563 or +916289581169.</Text>
                </View>
                <TouchableOpacity onPress={goToLoginPage}>
                    <Text style={styles.linkText}>Kindly login from here</Text>
                </TouchableOpacity>

            </View>
            
        </KeyboardAvoidingView>


    );
};

export default SuccessRegister;

const styles = StyleSheet.create(
    {
        screenContainer: {
            flex: 1,
            borderWidth: 1,
        },
        parentContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            zIndex: 200,
        },
        textContainer: {
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E7BB00',
            marginVertical: 20,
        },
        ThankHeading: {
            fontSize: 30,
            color: '#000000',
            marginBottom: 10,
        },
        bodyText: {
            fontSize: 16,
            color: '#000000',
            textAlign: 'center',
            marginBottom: 10,
        },
        linkText: {
            fontSize: 15,
            color: 'blue',
            marginBottom: 10,
            textDecorationLine: 'underline'
        },

    })

