import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Gstyles from '../../../styles/GlobalStyle';
import { colors, fonts, } from '../../../styles/Crestest.config';

import AntDesignIcons from 'react-native-vector-icons/AntDesign';


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


const PurchaseCard = (props) => {

    const downloadPdfHandler = (tId) => {
        // console.log("downloadPdfHandler")
        props.downloadPdfHandler(tId);
    }

    return (
        <>
            <View style={[styles.purchaseParentContainer]}>
                <View style={styles.individualDetailsContainer}>
                    <Text style={styles.challanHeading}>Invoice ID</Text>
                    <Text style={styles.challanDetails}>{props.payment_trans_id}</Text>
                </View>
                <View style={styles.individualDetailsContainer}>
                    <Text style={styles.challanHeading}>Date/Time</Text>
                    <Text style={styles.challanDetails}>{moment(props.created_at).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={styles.individualDetailsContainer}>
                    <Text style={styles.challanHeading}>Amount</Text>
                    <Text style={styles.challanDetails}>{props.paid_amount}</Text>
                </View>

                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Successful</Text>
                    </View>

                <TouchableOpacity style={styles.individualDetailsContainer} onPress={() => downloadPdfHandler(props.payment_trans_id)}>
                    <AntDesignIcons name='download' size={25} color={'#000'} />
                    <Text style={styles.challanHeading}>Download</Text>
                </TouchableOpacity>

            </View>
        </>
    );
};

const styles = StyleSheet.create(
    {
        purchaseParentContainer: {
            width: 140,
            height: 240,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 18,
            backgroundColor: '#fff',
            marginHorizontal: 10,
            marginBottom:10,
            // marginBottom:20,
            // marginRight:5
        },
        individualDetailsContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            // height: 60,
            marginBottom:10,
            width: '100%',
        },
        challanHeading: {
            color: '#AEB3B2',
            fontFamily: fonts.rRegular,
            fontSize: 12,

        },
        challanDetails: {
            color: '#000',
            fontFamily: fonts.rRegular,
            fontSize: 14,
        },
        statusContainer: {
            width:'70%',
            padding:5,
            borderRadius:50,
            backgroundColor:'#C9EDCC',
            justifyContent:'center',
            alignItems:'center',
            marginBottom:10,
        },
        statusText: {
            color: '#56C760',
            fontFamily: fonts.rRegular,
            fontSize: 14,
        }

    });

export default PurchaseCard;