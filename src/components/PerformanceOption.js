import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

//styles
// import { colors, containerInside, rbSheetBorderRdious } from '../../styles/Crestest.config';
import { colors, containerInside, rbSheetBorderRdious } from '../styles/Crestest.config';

import EntypoIcon from 'react-native-vector-icons/Entypo';

import Emitter from '../utils/Emitter';
import * as Events from '../configs/Events';


import { useDispatch, useSelector } from 'react-redux';

import Gstyles from '../styles/GlobalStyle';

const PerformanceOption = (props) => {

    const time_used = useSelector(state => state.auth.time_used);

    useEffect(() => {
        Emitter.emit(Events.HIDE_PRELOADER);
    }, []);

    const closeVerificationOption = () => {
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);

    }

    return (
        <>
            <View style={[containerInside, Gstyles.rbSheetStyle, styles.parentContainer]}>

                <TouchableOpacity style={Gstyles.modalRbCloseButtonContainer} onPress={closeVerificationOption}>
                    <EntypoIcon name="cross" size={25} color={colors.backgroundDeepGray} />
                </TouchableOpacity>

                <View style={styles.bottomParentContainer}>
                    <TouchableOpacity onPress={props.performanceMoreDetails} style={styles.optionBottom}>
                        <Text>More details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.performanceViewDetails} style={styles.optionBottom}>
                        <Text>View details</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </>
    );
};

export default PerformanceOption;

const styles = StyleSheet.create(
    {
        parentContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

        },
        bottomParentContainer: {
            flex: 1,
            width: '80%',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            /* borderColor:'#ff0000',
            borderWidth:1,
            borderStyle:'solid' */
        },
        optionBottom: {
            width: 100,
            height: 40,
            backgroundColor: '#9A9A9A',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        }

    })