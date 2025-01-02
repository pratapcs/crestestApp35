import React, { useState, useEffect } from 'react';
import Gstyles from '../../../styles/GlobalStyle';
import subjectIcon from '../../../assets/images/subjectIcon.png';
import { colors, fonts, } from '../../../styles/Crestest.config';


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';


const ELibrarySubjectCard = (props) => {

    return (
            <TouchableOpacity onPress={props.goToSubjectWiseListPage} style={styles.parentContainer}>
                <View style={[styles.topContainer, { backgroundColor: props.subject_color_code }]}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: props.subject_elibrary_image }} style={styles.imageStyle} />
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.subjectName}>{props.subject_name}</Text>
                </View>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create(
    {
        parentContainer: {
            width: 100,
            height: 150,
            borderRadius: 8,
            elevation: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffset: {
                width: 0,
                height: 4
            },
            shadowRadius: 4,
            shadowOpacity: 1,
            margin: 10,
            backgroundColor: '#fff',
            flexDirection: 'column',
            overflow: 'hidden'
        },
        imageContainer: {
            height: 80,
            width: 80,
            borderRadius: 50,
            // backgroundColor: '#ff0',
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
        topContainer: {
            backgroundColor: '#F2ADAD',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        bottomContainer: {
            flex: .4,
            justifyContent: 'center',
            alignItems: 'center'
        },
        subjectName: {
            fontFamily: fonts.rLight,
            color: "#000",
            fontSize: 14,
            textAlign: 'center'
        }
    });

export default ELibrarySubjectCard;