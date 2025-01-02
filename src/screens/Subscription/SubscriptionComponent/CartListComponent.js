import React, { useState, useEffect } from 'react';
import Gstyles from '../../../styles/GlobalStyle';
import { colors, fonts, } from '../../../styles/Crestest.config';

import Ionicons from 'react-native-vector-icons/Ionicons';


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


const CartListComponent = (props) => {

    useEffect(() => {
        // console.log("******----11---", props)
    }, []);

    return (
        <>
            <View style={[styles.listParentContainer]}>
                <View style={styles.leftContainer}>
                    <View style={[styles.categoryContainer, { backgroundColor: props.categoryId === 2 ? '#50a9c4' : props.categoryId === 3 ? '#2e999f' : '#56c760' }]}>
                        <Text style={[styles.categoryText]}>{props.category.charAt(0)}</Text>
                        <Text style={[styles.categorySubText]}>
                            {props.categoryId === 1 ?
                                <Text>{props.class == 0 ? props.type : "Class"} {props.class == 0 ? null : props.class}</Text>
                                : props.categoryId === 3 ?
                                    <Text>{/* {props.class == 0 ? props.type : "Classs"} {props.class == 0 ? null : props.class} */} {props.exam_type}</Text>
                                    :
                                    <Text>{props.type}</Text>
                            }
                        </Text>
                    </View>
                </View>
                {/* {console.log("$$$$------", props.module, props.mock)} */}
                <View style={styles.middleContainer}>
                    <Text style={{ color: props.categoryId === 2 ? '#50a9c4' : '#56c760' }}>{props.category} | {props.categoryId === 2 ? props.type + ' | ' : ''} {props.class == 0 ? null : 'Class'} {props.class == 0 ? null : props.class} </Text>
                    {props.subject != '' && props.subject != undefined ?
                        <Text style={styles.subjectName}>{props.subject}</Text>
                        : null}
                    <Text style={styles.subscriptionDetails}>{props.set.length == 0 && props.categoryId == 1 ? null : props.set.length != 0 && (props.set) > 0 && props.categoryId == 2 ? ' Set ' + props.set : props.set.length != 0 && parseInt(props.set) == 0 && props.categoryId == 2 ? null : ' Test [' + props.set + ']'}{props.set.length != 0 && props.module != 0 || props.set.length != 0 && props.mock != 0 ? ' + ' : props.set.length != 0 ? null : props.set.length == 0 && props.module == 0 || props.mock == 0 && props.onlyElibrary != 0 ? null : props.module != 0 ? null : ' + '}{props.module == 0 ? null : '3 Modules'}{props.mock == 0 ? null : props.module == 0 ? null : props.mock == 0 && props.module == 0 && props.set.length == 0 ? null : ' + '}{props.mock == 0 ? null : '2 Mocks'}{props.casestudy == 0 ? null : ' + Case studies'}{props.library == 1 && props.onlyElibrary == 0 && props.set.length != 0 ? " + e-Library" : null} {props.library == 1 && props.onlyElibrary == 0 && props.set.length == 0 ? "e-Library" : null}{props.library == 1 && props.onlyElibrary == 1 ? "e-Library" : null}</Text>
                    <Text style={[styles.subscriptionpPrice, { color: props.categoryId === 2 ? '#50a9c4' : '#56c760' }]}>Rs.{props.price}/-</Text>
                </View>
                <TouchableOpacity onPress={() => props.deleteHandler()} style={styles.rightContainer}>
                    <Ionicons name='trash-sharp' size={20} color={'#ff0000'} />
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create(
    {
        listParentContainer: {
            width: '100%',
            height: 120,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            // borderRadius: 8,
            // backgroundColor: '#fffeee',
            // marginVertical: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#DDDDDD'
        },
        leftContainer: {
            flex: .4,
            height: '100%',
            // backgroundColor: '#e3e',
            justifyContent: 'center',
            alignItems: 'center'
        },
        middleContainer: {
            flex: 1,
            // backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%',
            paddingLeft: 10,
        },
        rightContainer: {
            flex: .2,
            // backgroundColor: '#ff0',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
        categoryContainer: {
            width: 70,
            height: 70,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: colors.scholasticColor,
        },
        categoryText: {
            color: '#fff',
            fontFamily: fonts.rRegular,
            fontSize: 28,
        },
        categorySubText: {
            color: '#fff',
            fontFamily: fonts.rLight,
            fontSize: 14,
        },
        categoryHeader:
        {
            color: '#50A9C4',
            fontFamily: fonts.rMedium,
            fontSize: 14,
        },
        subjectName: {
            color: '#78858F',
            fontFamily: fonts.rRegular,
            fontSize: 14,
        },
        subscriptionDetails: {
            color: '#000',
            fontFamily: fonts.rLight,
            fontSize: 12,
        },
        subscriptionpPrice: {
            // color: '#50A9C4',
            fontFamily: fonts.rRegular,
            fontSize: 16,
        },



        /* cartText: {
            // color: '#000',
            fontFamily: fonts.rRegular,
            fontSize: 14,
        } */

    });

export default CartListComponent;