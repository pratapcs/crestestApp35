import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
const rBold = 'Roboto-Bold';
const rRegular = "Roboto-Regular";

import { useDispatch, useSelector } from 'react-redux';
import { colors, fonts } from '../styles/Crestest.config';


const CourseComponent = (props) => {


    const competive_details_purchase = useSelector(state => state.auth.competive_details_purchase);
    const total_competitive_master = useSelector(state => state.auth.total_competitive_master);
    const total_competitive_completed = useSelector(state => state.auth.total_competitive_completed);
    const total_competitive_completed_master = useSelector(state => state.auth.total_competitive_completed_master);

    const scholatic_details_purchase = useSelector(state => state.auth.scholatic_details_purchase);
    const total_scholastic_master = useSelector(state => state.auth.total_scholastic_master);
    const total_scholastic_completed = useSelector(state => state.auth.total_scholastic_completed);
    const total_scholastic_completed_master = useSelector(state => state.auth.total_scholastic_completed_master);

    const s_total_purchased = (scholatic_details_purchase != '' && scholatic_details_purchase != undefined ? scholatic_details_purchase : 0) / (total_scholastic_master != '' && total_scholastic_master != undefined ? total_scholastic_master : 0) * 100
    const c_total_purchased = (competive_details_purchase != '' && competive_details_purchase != undefined ? competive_details_purchase : 0) / (total_competitive_master != '' && total_competitive_master != undefined ? total_competitive_master : 0) * 100
    const s_completed = (total_scholastic_completed != '' && total_scholastic_completed != undefined ? total_scholastic_completed : 0) / (total_scholastic_completed_master != '' && total_scholastic_completed_master != undefined ? total_scholastic_completed_master : 0) * 100
    const c_completed = (total_competitive_completed != '' && total_competitive_completed != undefined ? total_competitive_completed : 0) / (total_competitive_completed_master != '' && total_competitive_completed_master != undefined ? total_competitive_completed_master : 0) * 100


    useEffect(() => {
        // console.log("@@@@-----", competive_details_purchase, total_competitive_master, total_competitive_completed, total_competitive_completed_master)
        // console.log("@@@@---222--", scholatic_details_purchase, total_scholastic_master, total_scholastic_completed, total_scholastic_completed_master)
        // console.log("@@@@---222--", s_total_purchased)
        // console.log("@@@@---333--", c_total_purchased)
        // console.log("@@@@---444--", s_completed)
        // console.log("@@@@---555--", c_completed)

    }, []);

    return (
        <View style={[styles.boxParentContainer, { marginHorizontal: props.marginHorizontal, marginTop:props.marginTop, width:props.width, backgroundColor: `${props.CourseName == 'S' ? "#94ac4b" : "#58bad7"}` }]}>
            <View style={styles.topContainer}>
                <View style={styles.courseNameContainer}>
                    <Text style={[styles.courseNameDetails, { color: props.CourseName == 'S' ? "#94ac4b" : "#58bad7" }]}>{props.CourseName}</Text>
                </View>
                <View style={[styles.lineContainer, { borderColor: props.CourseName == 'S' ? '#A2BB57' : '#92DAF1' }]}>

                </View>
                <View style={styles.imageContainer}>
                    {props.CourseName == 'S' ?
                        <Image source={require('../assets/images/crestest-1683119506218ic.png')} style={styles.imageStyle} />
                        :
                        <Image source={require('../assets/images/crestest-1683119149939ve.png')} style={styles.imageStyle} />
                    }
                </View>
            </View>
            <View style={styles.totalPurchasedContainer}>
                <Text style={styles.headingDetails}>Total Purchase  |  <Text style={styles.valueText}>{props.CourseName == 'S' ? <>{scholatic_details_purchase != '' && scholatic_details_purchase != undefined ? scholatic_details_purchase : 0}%{/* /{total_scholastic_master != '' && total_scholastic_master != undefined ? total_scholastic_master : 0} */} </> : <>{competive_details_purchase != '' && competive_details_purchase != undefined ? competive_details_purchase : 0}%{/* /{total_competitive_completed_master != '' && total_competitive_completed_master != undefined ? total_competitive_completed_master : 0} */}</>}</Text></Text>
                <View style={styles.progressbarContainer}>
                    <View style={[styles.totalContainer]}></View>
                    {props.CourseName == 'S' ?
                        s_total_purchased > 0 ? <View style={[styles.purchasedContainer, { width: `${(scholatic_details_purchase != '' && scholatic_details_purchase != undefined ? scholatic_details_purchase : 0) / (total_scholastic_master != '' && total_scholastic_master != undefined ? total_scholastic_master : 0) * 100}%` }]}></View> : null 
                        :
                        c_total_purchased > 0 ? <View style={[styles.purchasedContainer, { width: `${(competive_details_purchase != '' && competive_details_purchase != undefined ? competive_details_purchase : 0) / (total_competitive_master != '' && total_competitive_master != undefined ? total_competitive_master : 0) * 100}%` }]}></View> : null
                    }
                </View>
            </View>
            <View style={styles.totalPurchasedContainer}>
                <Text style={styles.headingDetails}>Completed Course  | <Text style={styles.valueText}>{props.CourseName == 'S' ? <>{total_scholastic_completed != '' && total_scholastic_completed != undefined ? total_scholastic_completed : 0}%{/* /{total_scholastic_completed_master != '' && total_scholastic_completed_master != undefined ? total_scholastic_completed_master : 0} */} </> : <>{total_competitive_completed != '' && total_competitive_completed != undefined ? total_competitive_completed : 0}%{/* /{total_competitive_completed_master != '' && total_competitive_completed_master != undefined ? total_competitive_completed_master : 0} */}</>} </Text></Text>
                <View style={styles.progressbarContainer}>
                    <View style={[styles.totalContainer]}></View>
                    {props.CourseName == 'S' ?
                        s_completed > 0 ? <View style={[styles.purchasedContainer, { width: `${(total_scholastic_completed != '' && total_scholastic_completed != undefined ? total_scholastic_completed : 0) / (total_scholastic_completed_master != '' && total_scholastic_completed_master != undefined ? total_scholastic_completed_master : 0) * 100}%` }]}></View> : null
                        :
                        c_completed > 0 ? <View style={[styles.purchasedContainer, { width: `${(total_competitive_completed != '' && total_competitive_completed != undefined ? total_competitive_completed : 0) / (total_competitive_completed_master != '' && total_competitive_completed_master != undefined ? total_competitive_completed_master : 0) * 100}%` }]}></View> : null
                    }

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        boxParentContainer: {
            // width: Dimensions.get('window').width-30,
            // minHeight: 142,
            // maxHeight: 100,
            height: 170,
            borderRadius: 11,
            // backgroundColor: "#94ac4b",
            elevation: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffset: {
                width: 0,
                height: 4
            },
            shadowRadius: 4,
            shadowOpacity: 1,
            // marginHorizontal: 15,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: '#AEB3B2',
            borderStyle: 'solid',
            alignItems: 'center',
            justifyContent: 'space-between',
            // flexDirection: 'row',
            // marginTop: 30,
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        topContainer: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        courseNameContainer: {
            width: 25,
            height: 25,
            backgroundColor: "#fff",
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffset: {
                width: 0,
                height: 4
            },
        },
        courseNameDetails: {
            fontSize: 18,
            fontFamily: rBold,
        },
        imageContainer: {
            width: 65,
            height: 65,
            backgroundColor: "#fff",
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffset: {
                width: 0,
                height: 4
            },
        },
        lineContainer: {
            flex: 1,
            borderWidth: 1,
            borderStyle: 'solid',
        },
        imageStyle: {
            height: 46,
            width: 46,
            resizeMode: 'contain',
        },
        totalPurchasedContainer: {
            width: '100%',
            justifyContent: 'flex-start',
        },
        headingDetails: {
            fontSize: 14,
            fontFamily: rRegular,
            color: "#fff",
        },
        progressbarContainer: {
            width: '100%',
            height: 10,
            /* borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#ff0000', */
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'center',
        },
        totalContainer: {
            position: 'absolute',
            width: '100%',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#434851',
            borderRadius: 20,
            backgroundColor: "#434851"
        },
        purchasedContainer: {
            position: 'absolute',
            // width: '40%',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#c8c8c8',
            borderRadius: 20,
            alignSelf: 'flex-start',
            backgroundColor: "#c8c8c8"
        },
        valueText: {
            fontSize: 16,
            fontFamily: fonts.rBold,
            color: "#fff",
        },

    });

export default CourseComponent;