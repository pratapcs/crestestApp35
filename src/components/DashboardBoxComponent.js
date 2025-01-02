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
import { useSelector } from 'react-redux';
import MaterialAnimatedView from './MaterialAnimatedView';
import HomeSpeedoMeter from '../screens/home/HomeSpeedoMeter';


const DashboardBoxComponent = (props) => {

    const work_status_percentage = useSelector(state => state.auth.work_status_percentage);

    return (
        <>

            <MaterialAnimatedView key={props.indexValue} index={props.indexValue}>
                <TouchableOpacity style={styles.boxParentContainer} onPress={props.goToNewPage} disabled={props?.disabled}>


                    {/* {props.indexValue == 2 ?
                        <View>
                            <HomeSpeedoMeter />
                        </View>
                        : null} */}


                    <View style={styles.imageContainer}>
                        {/* <Image source={require('../assets/images/brain_new.png')} style={styles.imageStyle}  /> */}
                        {props.isImage && props.indexValue != 2 ?
                            <Image source={props.imageName} style={styles.imageStyle} />
                            : props.indexValue != 2 ?
                                <View style={styles.topTextContainer}>
                                    <Text style={styles.topTextHeading}>{work_status_percentage}%</Text>
                                    <Text style={styles.topTextSubHeading}>Completed</Text>
                                </View>
                                :
                                <>
                                    
                                    <HomeSpeedoMeter 
                                perfomance={props.percent}
                                />
                                </>
                        }
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.textDetails}>{props.labelName}</Text>
                    </View>
                    {props?.disabled && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#c9c9c9", borderRadius: 12, opacity: 0.5 }} />}
                </TouchableOpacity>
            </MaterialAnimatedView>
        </>
    );
};

const styles = StyleSheet.create(
    {
        boxParentContainer: {
            width: 160,
            height: 162,
            borderRadius: 17,
            backgroundColor: "#fff",
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
        imageContainer: {
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
            // borderStyle: 'solid',
            // borderColor: '#ff0000',
        },
        imageStyle: {
            height: 100,
            width: "95%",
            resizeMode: 'contain',
            // borderRadius: 40,
            /* borderWidth: .5,
            borderStyle: 'solid',
            borderColor: '#ff0000', */
        },
        textContainer: {
            flex: .5,
            justifyContent: 'center',
            alignItems: 'center',

        },
        textDetails: {
            fontSize: 14,
            color: colors.textBlue1,
            fontFamily: fonts.rLight
        },
        topTextContainer: {
            height: 100,
            width: "95%",
            /* borderWidth: .5,
            borderStyle: 'solid',
            borderColor: '#ff0000', */
            justifyContent: 'center',
            alignItems: 'center',
        },
        topTextHeading: {
            fontSize: 60,
            fontFamily: rBold,
            color: '#137999'
        },
        topTextSubHeading: {
            fontSize: 18,
            fontFamily: rBold,
            color: '#137999'
        }


    });

export default DashboardBoxComponent;