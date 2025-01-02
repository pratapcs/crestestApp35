import React, { useState, useEffect } from 'react';
import Gstyles from '../styles/GlobalStyle';
import subjectIcon from '../assets/images/subjectIcon.png';
import { colors, fonts, } from '../styles/Crestest.config';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native';

const trasparent = 'rgba(0,0,0,0.5)';

const AlertCartSubscription = (props) => {

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.isVisable}
            >

                <View style={styles.modalParentContainer}>
                    <View style={styles.modalWhiteArea}>
                        <View style={styles.modalTopContainer}>
                            <Text style={styles.modalHeading}>{props.modalHeading}</Text>
                        </View>
                        <View style={styles.modalmiddleContainer}>
                            <Text style={styles.modaldetails}>{props.cartDetails}</Text>
                        </View>
                        <View style={styles.modalBottomontainer}>
                            <TouchableOpacity onPress={props.cancelHandeler} style={[styles.button, styles.rejectBackground]}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={props.submitHandeler} style={[styles.button, styles.successBackground]}>
                                <Text>Proceed</Text>
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
        modalParentContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: trasparent,
        },
        modalWhiteArea: {
            backgroundColor: 'white',
            padding: 15, width: '85%',
            borderRadius: 10,
            height: 200,
            justifyContent: 'space-between',
        },
        modalTopContainer: {
            flex: .4,
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#e3e3e3'
        },
        modalmiddleContainer: {
            marginTop:10,
            flex: 1.4,
            borderBottomWidth: 1,
            borderBottomColor: '#e3e3e3',
            marginBottom:15,
        },
        modalBottomontainer: {
            flex: .5,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        button: {
            width: 90,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,

        },
        rejectBackground: {
            backgroundColor: '#f85a5b',
        },
        successBackground: {
            backgroundColor: '#3da083',
        },
        modalHeading: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 16,
        },
        modaldetails: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 12,
        }
    });

export default AlertCartSubscription;