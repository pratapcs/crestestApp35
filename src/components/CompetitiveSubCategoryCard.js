import React, { useState, useEffect } from 'react';
import { colors, fonts } from '../styles/Crestest.config';
import Gstyles from '../styles/GlobalStyle';
import ntse from '../assets/images/exam_type/ntse.png';
import nstse from '../assets/images/exam_type/nstse.png';
import geo_genious from '../assets/images/exam_type/geo_genious.png';
import nso from '../assets/images/exam_type/nso.png';
import imo from '../assets/images/exam_type/imo.png';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import moment from 'moment';

const CompetitiveSubCategoryCard = (props) => {

    const getCourseValidityDate = (date) => {
        let output = "NA";
        if (date?.length > 1) {
            let formattedStartDate = moment(date[0]).format("DD/MM/YYYY");
            let formattedEndDate = moment(date[1]).format("DD/MM/YYYY");
            output = `${formattedStartDate} - ${formattedEndDate}`;
        }
        return output;
    }


    return (
        props.subscribe == 1 ?
            <TouchableOpacity onPress={props.goToSelectPage} style={[styles.parentContainer, { height: props.academicYear !== '' && props?.academicYear !== undefined ? 100 : 70 }]}>
                
                <View style={[styles.leftContainer, styles.imageBox]}>
                    {props.image_path != '' && props.image_path != null ?
                        <Image source={{ uri: props.image_path }} style={styles.imageStyle} />
                        :
                        <View>
                            <Text style={{ textAlign: 'center' }}>No image</Text>
                        </View>
                    }
                </View>
                <View style={styles.middleContainer}>
                    <Text style={styles.categoryHeading}>{props.subHeading}</Text>
                    <Text style={styles.categorySubHeading}>{props.subDetails}</Text>
                    {props?.academicYear !== '' && props?.academicYear !== undefined ? // && props?.courseValidity !== ''
                        <View style={styles.yearInfoContainer}>
                            <Text style={styles.categoryYearInfo}>{`Academic Year : ${props?.academicYear}`}</Text>
                            <Text style={styles.categoryYearInfo}>{`Course Validity : ${getCourseValidityDate(props?.courseValidity)}`}</Text>
                        </View>
                        : null}

                </View>
                <View style={[styles.rightContainer]}>
                    {props.image_path != '' && props.image_path != null ?
                        <Image source={{ uri: props.image_path }} style={styles.rightImageStyle} tintColor={"#29A5B8"} />
                        : null
                    }
                </View>

            </TouchableOpacity>
            :
            <View style={styles.parentDisableContainer}>
                <View style={[styles.leftContainer, styles.disableImageBox]}>
                    {props.image_path != '' && props.image_path != null ?
                        <Image source={{ uri: props.image_path }} style={styles.imageStyle} tintColor={colors.disableImage} />
                        :
                        <View>
                            <Text style={{ textAlign: 'center', color: colors.disableImage }}>No image</Text>
                        </View>
                    }
                </View>
                <View style={styles.middleContainer}>
                    <Text style={styles.categoryHeading}>{props.subHeading}</Text>
                    <Text style={styles.categorySubHeading}>{props.subDetails}</Text>
                    {/* {props?.academicYear && props?.courseValidity ?
                        <>
                            <Text style={styles.categoryYearInfo}>{`Academic Year : ${props?.academic_year}`}</Text>
                            <Text style={styles.categoryYearInfo}>{`Course Validity : ${getCourseValidityDate(props?.course_validity)}`}</Text>
                        </>
                        : null} */}
                </View>
                <View style={[styles.rightContainer]}>
                    {props.image_path != '' && props.image_path != null ?
                        <Image source={{ uri: props.image_path }} style={styles.rightImageStyle} tintColor={colors.disableImage} />
                        : null}
                </View>
            </View>
    );
};

const styles = StyleSheet.create(
    {
        parentContainer: {
            width: "95%",
            // height: 70 ,
            borderRadius: 10,
            backgroundColor: colors.competitiveCategoryBackground,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 7,
            marginBottom: 10,
        },
        imageBox: {
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            borderRadius: 7,
            alignSelf: 'center',
            justifyContent: 'center'
        },
        imageStyle: {
            flex: .8,
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
        },
        rightImageStyle: {
            flex: .9,
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            opacity: 0.8,
        },
        leftContainer: {
            flex: .25,
            backgroundColor: "#ff0000",
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        middleContainer: {
            flex: 1,
            // backgroundColor: "#00ff00",
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 10,
        },
        rightContainer: {
            flex: .25,
            // backgroundColor: "#ff0000",
        },
        categoryHeading: {
            fontFamily: fonts.rMedium,
            color: colors.textWhite,
            fontSize: 16,
            textTransform: 'uppercase'
        },
        categorySubHeading: {
            fontFamily: fonts.rLight,
            color: colors.textWhite,
            fontSize: 12,
        },
        //disable
        parentDisableContainer: {
            width: "95%",
            height: 70,
            borderRadius: 10,
            backgroundColor: colors.disableBackground,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 7,
            marginBottom: 10,
        },
        disableImageBox: {
            width: "100%",
            height: "100%",
            backgroundColor: colors.disableWhiteBackground,
            borderRadius: 7,
            alignSelf: 'center',
            justifyContent: 'center'
        },
        categoryYearInfo: {
            fontFamily: fonts.rLight,
            color: colors.textWhite,
            fontSize: 9,
        },
        yearInfoContainer: {
            borderTopWidth: 1,
            borderTopColor: '#fff',
            marginTop: 5,
            paddingTop: 5,
        }

    });

export default CompetitiveSubCategoryCard;