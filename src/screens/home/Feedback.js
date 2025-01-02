import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { DrawerActions } from '@react-navigation/native';

import HeaderComponent from '../../components/HeaderComponent';

import { useDispatch, useSelector } from 'react-redux';
import { submitFeedbackData } from '../../store/actions/DashboardAction';
import { fonts, } from '../../styles/Crestest.config';


const Feedback = (props) => {

    const dispatch = useDispatch();
    const [feedback, setFeedback] = useState('')

    useEffect(() => {
        // dispatch(submitFeedbackData(props.history));
    }, []);

    const leftIconHandeler = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    const submitHandeler = () => {
        dispatch(submitFeedbackData(feedback, props.history));
        setFeedback('')
        console.log("submitHandeler--------", feedback)
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
            <HeaderComponent
                headerName='Feedback'
                leftIcon='menu-outline'
                leftIconHandeler={leftIconHandeler}
            />

            <View style={styles.parentContainer}>
                
                <View style={styles.bodyContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingText}>Your Feedback</Text>
                    </View>
                    <View style={styles.textAreaContainer} >
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder="Your Feedback"
                            placeholderTextColor="grey"
                            numberOfLines={10}
                            multiline={true}
                            value={feedback}
                            textAlign={'left'}
                            textAlignVertical={'top'}
                            onChangeText={(text) => setFeedback(text)}
                        />
                    </View>

                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.submitButtonContainer} onPress={() => submitHandeler()}>
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create(
    {
        parentContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },


        bodyContainer: {
            backgroundColor: 'white',
            padding: 15,
            width: '90%',
            borderRadius: 10,
        },
        headingContainer: {
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: .5,
            borderColor: '#005274',
        },
        headingText: {
            color: '#005274',
            fontSize: 16,
            fontFamily: fonts.rBold,
        },
        textAreaContainer: {
            borderColor: '#E3E3E3',
            borderWidth: 1,
            padding: 5,
            marginTop:20,
            justifyContent: "flex-start",
            alignItems:'flex-start',
          },
          textArea: {
            height: 150,
            width:'100%',
            justifyContent: "flex-start",
            
          },
          submitContainer:{
            wdith:'100%',
            height:80,
            justifyContent:'center',
            alignItems:'center',
          },
          submitButtonContainer: {
            alignSelf:'center',
            padding:10,
            width:100,
            borderRadius:5,
            backgroundColor:'#245c75',
            justifyContent:'center',
            alignItems:'center',
          },
          submitText:{
            color:'#fff'
          }
        

    });

export default Feedback;