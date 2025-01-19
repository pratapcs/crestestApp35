import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getTermsConditionDetails } from '../../store/actions/AuthActions';

import { fonts, } from '../../styles/Crestest.config';

import RenderHtml from 'react-native-render-html';

const trasparent = 'rgba(0,0,0,0.5)';

const TermsCondition = (props) => {

    const dispatch = useDispatch();

    const termsCondition = useSelector(state => state.auth.termsCondition);

    useEffect(() => {
        dispatch(getTermsConditionDetails(props.history));
    }, []);

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.isVisable}
            >

                <View style={styles.baseContainer}>

                    <View style={styles.bodyContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>Terms and Conditions</Text>
                        </View>
                        <View style={styles.containContainer}>
                            <ScrollView
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={{ flexGrow: 1,paddingRight:10, }}
                                showsVerticalScrollIndicator={true}
                                persistentScrollbar={true}
                            >
                                <RenderHtml
                                    contentWidth={200}
                                    source={{ html: termsCondition }}
                                />
                            </ScrollView>
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity style={[styles.buttonContainer, styles.rejButtonColor]} onPress={props.closeModal}>
                                <Text>Reject</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.buttonContainer, styles.accButtonColor]} onPress={props.acceptModal}>
                                <Text>Accept</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

        </>
    );
};

const styles = StyleSheet.create(
    {
        baseContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: trasparent,
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
        containContainer: {
            height: 450,
            overflow: 'hidden',
        },
        bottomContainer: {
            height: 70,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection:'row'
        },
        buttonContainer: {
            paddingVertical:5,
            width:100,
            // backgroundColor: '#f75a5b',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:10,
        },
        rejButtonColor:{
            backgroundColor: '#f75a5b',
        },
        accButtonColor:{
             backgroundColor: '#f0a901'
        }

    });

export default TermsCondition;