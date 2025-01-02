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

import { colors } from '../styles/Crestest.config';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';


const NoDataComponent = (props) => {


    return (
        <View style={styles.boxParentContainer}>
            <Text style={styles.noDataTextDetails}>No Data</Text>

        </View>
    );
};

const styles = StyleSheet.create(
    {
        boxParentContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        noDataTextDetails: {
            fontSize: 20,
            fontFamily: rRegular,
            color: '#245C75'
        },

    });

export default NoDataComponent;