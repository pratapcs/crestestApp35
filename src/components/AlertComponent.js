import React, { useState, useEffect } from 'react';
import Gstyles from '../styles/GlobalStyle';
import subjectIcon from '../assets/images/subjectIcon.png';
import { colors, fonts, } from '../styles/Crestest.config';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native';

const trasparent = 'rgba(0,0,0,0.5)';

const AlertComponent = (props) => {

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.isVisable}
            >

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: trasparent, }}>
                    <View style={{ backgroundColor: 'white', padding: 15, width: '90%', borderRadius: 10 }}>
                        {/* <TouchableOpacity onPress={() => setModalVisible(false)} style={{ borderBottomColor: '#e3e3e3', borderBottomWidth: 1, borderBottomStyle: 'solid', marginBottom: 5, paddingBottom: 10, }}>
                            <Ionicons name="close-circle-outline" size={25} color={'#777'} />
                        </TouchableOpacity> */}
                        <View style={{ borderBottomColor: '#e3e3e3', borderBottomWidth: 1, borderBottomStyle: 'solid', marginBottom: 5, paddingBottom: 10, }}>
                            <Text style={{ fontSize: 16, }}>{props.modalHeading}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomColor: '#e3e3e3', borderBottomWidth: 1, borderBottomStyle: 'solid', marginBottom: 10, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 14 }}>{props.modalDetails}</Text>
                        </View>
                        <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>

                            {props.isCloseRequire ?
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                                    <TouchableOpacity onPress={props.closeModal} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff0000', padding: 5, width: 80, borderRadius: 5, }}>
                                        <Text style={{ fontSize: 16, color: '#fff' }}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                                : null}

                            {props.isOkRequire ?
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#56c760', padding: 5, width: 80, borderRadius: 5, }}>
                                        <Text style={{ fontSize: 16, color: '#000' }}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                                : null}

                        </View>
                    </View>
                </View>
            </Modal>

        </>
    );
};

const styles = StyleSheet.create(
    {


    });

export default AlertComponent;