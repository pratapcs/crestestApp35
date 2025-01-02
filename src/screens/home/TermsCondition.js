import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    StyleSheet
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { DrawerActions} from '@react-navigation/native';

import HeaderComponent from '../../components/HeaderComponent';

import { useDispatch, useSelector } from 'react-redux';
import { getTermsConditionDetails } from '../../store/actions/AuthActions';
import { fonts, } from '../../styles/Crestest.config';


const TermsCondition = (props) => {

    const dispatch = useDispatch();
    const termsCondition = useSelector(state => state.auth.termsCondition);

    useEffect(() => {
        dispatch(getTermsConditionDetails(props.history));
    }, []);

    const leftIconHandeler = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
            <HeaderComponent
                headerName='Terms and Conditions'
                leftIcon='menu-outline'
                leftIconHandeler={leftIconHandeler}
            />

            <View style={styles.parentContainer}>

                <View style={styles.bodyContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingText}>Terms and Conditions</Text>
                    </View>
                    <View style={styles.containContainer}>
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={true}
                            persistentScrollbar={true}
                        >
                            <RenderHtml
                                contentWidth={200}
                                source={{ html: termsCondition }}
                            />
                        </ScrollView>
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
        containContainer: {
            height: 550,
            overflow: 'hidden',
        },
        bottomContainer: {
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonContainer: {
            paddingVertical: 5,
            width: 100,
            backgroundColor: '#ff0000',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
        }

    });

export default TermsCondition;