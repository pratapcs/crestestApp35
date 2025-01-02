import React, { useState, useEffect } from 'react';
import { colors, } from '../../../../styles/Crestest.config';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
const rBold = 'Roboto-Bold';
const rRegular = "Roboto-Regular";


const ExamCard = (props) => {

    return (
        <TouchableOpacity onPress={props.goToNewPage}>
            <View style={[styles.boxParentContainer, { backgroundColor: `${props.id == 1 ? colors.scholasticColor : colors.competitiveColor}` }]}>
                <View>
                    {props.id == 1 ?
                        <Image source={require('../../../../assets/images/Intersect_green.png')} style={styles.rightSideImageStyle} />
                        :
                        <Image source={require('../../../../assets/images/Intersect_blue.png')} style={styles.rightSideImageStyle} />
                    }
                </View>
                <View style={styles.imageContainer}>
                    <Image src={`${props.id == 1 ? props.iconImage : props.iconImage}`} style={styles.imageStyle} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.cardHeading, (props.id == 1) ? styles.scholisticBorderColor : styles.CompetitiveBorderColor]}>{props.category}</Text>
                    <Text style={styles.cardDescription}>{props.online_subheading}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create(
    {
        boxParentContainer: {
            height: 141,
            borderRadius: 11,
            marginHorizontal: 15,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: '#AEB3B2',
            borderStyle: 'solid',
            // alignItems: 'center',
            // justifyContent: 'space-between',
            marginTop: 30,
            paddingHorizontal: 20,
            paddingVertical: 10,
            position: 'relative',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 10,
        },
        imageContainer: {
            width: 40,
            height: 40,
            backgroundColor: "#fff",
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 10,
        },
        imageStyle: {
            height: 23,
            width: 23,
            resizeMode: 'contain',
        },
        rightSideImageStyle: {
            position: 'absolute',
            right: -20,
            top: -4,
            /* borderWidth:1,
            borderColor:'#ff0000',
            borderStyle:'solid' */
        },
        cardHeading: {
            fontFamily: rBold,
            fontSize: 18,
            color: "#fff",
            // borderBottomWidth: 1,
        },
        scholisticBorderColor: {
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderBottomColor: '#A2BB57',
        },
        CompetitiveBorderColor: {
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderBottomColor: '#92DAF1',
        },
        cardDescription: {
            fontFamily: rRegular,
            fontSize: 12,
            color: "#fff"
        },
        textContainer: {
            position: 'absolute',
            bottom: 20,
            left: 20,
        }

    });

export default ExamCard;