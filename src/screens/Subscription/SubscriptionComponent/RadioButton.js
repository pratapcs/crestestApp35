import React, { useState, useEffect } from 'react';
import Gstyles from '../../../styles/GlobalStyle';
import { colors, fonts, } from '../../../styles/Crestest.config';


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


const RadioButton = (props) => {
    const [labelNumber, setLabelNumber] = useState(0)

    useEffect(() => {
        setLabelNumber(props.label.split(' ')[1])
    }, []);

    return (
        <>
            <View style={styles.parentContainer}>
                <TouchableOpacity onPress={props.isSelect} style={styles.radioContainer}>
                    <View style={styles.radioContainerOuter}>
                        {labelNumber == props.id ?
                            <View style={styles.radionContainerInner}></View>
                            : null}
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.radioLabel}>{props.label}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </>
    );
};

const styles = StyleSheet.create(
    {
        parentContainer: {
            width: 65,
            alignSelf: 'flex-start',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            flexDirection: 'row',
        },
        radioContainer:
        {
            width: '100%',
            flexDirection: 'row',
        },
        radioContainerOuter:
        {
            width: 20,
            height: 20,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: '#245C75',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
        },
        radionContainerInner:
        {
            width: 12,
            height: 12,
            borderRadius: 50,
            backgroundColor: '#245C75'
        },
        textContainer:
        {
            justifyContent: 'center',
            alignItems: 'center',
        },
        radioLabel:
        {
            fontFamily: fonts.rRegular,
            fontSize: 14,
            color: '#245C75'
        },

    });

export default RadioButton;