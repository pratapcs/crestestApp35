import React, { useState, useEffect } from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Gstyles from '../../../styles/GlobalStyle';
import { colors, fonts, } from '../../../styles/Crestest.config';

import { Checkbox } from 'react-native-paper';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


const CheckboxOption = (props) => {
    const [checked, setChecked] = useState(false)

    const selectbox = () => {
        setSelect(select)
    }
    return (
        <>
            <View style={styles.parentContainer}>
                <Checkbox
                    // status={props.checked ? 'checked' : 'unchecked'}
                    // status={props.purchased ? 'checked' : props.checked ? 'checked' : checked ? 'checked' :'unchecked'}
                    status={props.disabled && props.checked ? 'checked' : props.checked ? 'checked' : checked ? 'checked' : 'unchecked'}
                    // onPress={() => { setChecked(!checked); }}
                    // onPress={() => { setChecked(!checked); }}
                    // onPress={() => props.onChange}
                    // color={"#2367ca"}
                    theme={{ colors: { primary: '#245C75' }}}
                    disabled={props.disabled}
                />
                <View style={styles.labelContainer}>
                    <Text style={props.disabled ? styles.disabledtext : styles.labelText}>{props.labelText}
                        <View>
                            {props.alreadyPurchased ?
                                <Text style={styles.alreadyPurchasedText}>(Already Purchased)</Text>
                                : null}
                        </View>
                    </Text>
                </View>
            </View>

        </>
    );
};

const styles = StyleSheet.create(
    {
        parentContainer: {
            flex: 1,
            alignSelf: 'flex-start',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            flexDirection: 'row',
            marginRight: 5,
        },
        labelContainer: {
            width: '90%',
            flexDirection: 'row'
        },
        labelText: {
            color: '#245C75',
            fontFamily: fonts.rRegular,
            fontSize: 14,
        },
        alreadyPurchasedText: {
            paddingLeft: 3,
            color: '#819482',
            fontFamily: fonts.rLight,
            fontSize: 8,
            textAlign: 'center'
        },
        disabledtext: {
            color: '#819482',
        }


    });

export default CheckboxOption;