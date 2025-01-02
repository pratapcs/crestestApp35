/**
 * Knacks App
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Image,
    Text
} from 'react-native';

import { colors } from '../styles/Knacks.config';

const LoaderScene = props => {
    const {
        loading,
        ...attributes
    } = props; return (
        <Modal
            visible={loading}
            transparent={true}
            animationType={'none'}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    {/* <Image source={require('../assets/images/preloader.gif')} style={styles.loadingImg}/> */}
                    <Image source={require('../assets/images/circle-loader.gif')} style={styles.loadingImg} />
                    <Image source={require('../assets/images/clv.png')} style={styles.companyLogo} />
                    <Text style={styles.loadingText}>{props.loadingMessage}</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create (
    {
        modalBackground:
        {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
            backgroundColor: '#00000090'
        },
        activityIndicatorWrapper:
        {
            backgroundColor: "#fff",
            height: 80, //75
            width: 80, //75
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            position: 'relative'
        },
        loadingImg:
        {
            // height: 32,
            // width: 32,
            height: 52,
            width: 52,
            transform: [{rotate: '75deg'}]
        },
        loadingText:
        {
            color: "#005274",
            fontSize: 10,
            textAlign: 'center'
        },
        companyLogo: {
            position: 'absolute',
            top: 15,
            height: 32,
            width: 32,
        }
    });

export default LoaderScene;