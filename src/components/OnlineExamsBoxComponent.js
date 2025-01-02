import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
const rBold = 'Roboto-Bold';
const rRegular = "Roboto-Regular";

import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors, fonts } from '../styles/Crestest.config';

const OnlineExamsBoxComponent = (props) => {

    useEffect(() => {
        // console.log("props---", props)
    }, []);

    return (
        
        <TouchableOpacity  style={[styles.boxParentContainer, { backgroundColor: props.itemBackgroundColor }]} onPress={props.goToNewPage}>
            <View style={styles.iconContainer}>
                <View style={[styles.iconInsideContainer, { backgroundColor: props.iconBackground, }]}>
                    {props.isImage ?
                        <Image source={props.labelImage} style={styles.imageStyle} />
                        :
                        <Ionicons name={props.iconName} size={35} color={props.iconColor} onPress={props.rightIconHandeler} />
                    }
                </View>
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.textDetails, { color: props.textColor }]}>{props.labelName}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create(
    {
        boxParentContainer: {
            width: 160,
            height: 162,
            borderRadius: 17,
            elevation: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffset: {
                width: 0,
                height: 4
            },
            shadowRadius: 4,
            shadowOpacity: 1,
            margin: 10,
        },
        textContainer: {
            flex: .5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textDetails: {
            fontSize: 14,
            // color: colors.textBlue1
            textAlign: 'center',
            fontFamily: fonts.rLight
        },
        iconContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        iconInsideContainer: {
            width: 70,
            height: 70,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center'
        },
        imageStyle: {
            width: 50,
            height: 50,
        }


    });

export default OnlineExamsBoxComponent;