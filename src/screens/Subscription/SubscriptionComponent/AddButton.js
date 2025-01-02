import React, { useState, useEffect } from 'react';
import Gstyles from '../../../styles/GlobalStyle';
import { colors, fonts, } from '../../../styles/Crestest.config';


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


const AddButton = (props) => {

    return (
        <>
            <TouchableOpacity disabled={props.addToCartDisable} onPress={props.addToCart} style={[styles.addParentContainer, { backgroundColor: props.buttonBackground }]}>
                <Text style={[styles.cartText, {color: props.addButtonTextColor}]}>Add to cart</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create(
    {
        addParentContainer: {
            width: 90,
            height: 30,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
        },
        cartText: {
            // color: '#000',
            fontFamily: fonts.rRegular,
            fontSize: 12,
        }

    });

export default AddButton;