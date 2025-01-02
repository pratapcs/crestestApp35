import React, { useState, useEffect } from 'react';
import Gstyles from '../../../styles/GlobalStyle';
import subjectIcon from '../../../assets/images/subjectIcon.png';
import { colors, fonts, } from '../../../styles/Crestest.config';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';


const ELibrarySubjectWiseChapterListCard = (props) => {

    return (
        <TouchableOpacity onPress={props.goToConceptMapPage} style={styles.parentContainer}>
            <View style={[styles.leftContainer, { backgroundColor: props.subject_color_code }]}>
                <View style={styles.imageContainer}>
                    {props.elibrary_image != undefined && props.elibrary_image != null ?
                        <Image source={{ uri: props.elibrary_image }} style={styles.imageStyle} />
                        : <Text>No <br /> Image</Text>
                    }
                </View>
            </View>
            <View style={styles.middleContainer}>
                <Text style={styles.subjectName}>
                    {props.sub_heading}
                </Text>
                <Text style={styles.chapterNo}>
                    Chapter {props.chapterNo}
                </Text>
            </View>
            <View style={styles.rightContainer}>
                <View style={[styles.iconContainer, { backgroundColor: props.subject_color_code }]}>
                    <Ionicons name="eye-sharp" size={20} color={'#000000'} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create(
    {
        parentContainer: {
            flex: .9,
            height: 70,
            backgroundColor: '#fff',
            margin: 10,
            borderRadius: 8,
            margin: 10,
            elevation: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffset: {
                width: 0,
                height: 4
            },
            shadowRadius: 4,
            shadowOpacity: 1,
            flexDirection: 'row',
            overflow: 'hidden',
        },
        leftContainer: {
            flex: .3,
            justifyContent: 'center',
            alignItems: 'center'
        },
        middleContainer: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 10,
        },
        rightContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: .3,
        },
        imageContainer: {
            height: 60,
            width: 60,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center'
        },

        imageStyle: {
            flex: .7,
            width: '70%',
            height: '70%',
            resizeMode: 'contain',
            borderRadius: 10,
        },
        subjectName: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 12,
        },
        chapterNo: {
            fontFamily: fonts.rLight,
            color: "#000",
            fontSize: 10,
        },
        iconContainer: {
            width: 35,
            height: 35,
            // backgroundColor:"#ff0000",
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        }
    });

export default ELibrarySubjectWiseChapterListCard;