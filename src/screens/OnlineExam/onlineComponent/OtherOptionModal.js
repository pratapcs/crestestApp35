import React, { useState, useEffect } from 'react';
import Gstyles from '../../../styles/GlobalStyle';
import subjectIcon from '../../../assets/images/subjectIcon.png';
import { colors, fonts, } from '../../../styles/Crestest.config'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native';

const trasparent = 'rgba(0,0,0,0.5)';

const OtherOptionModal = (props) => {

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.isVisable}
            >

                <View style={styles.modalParentContainer}>
                    <View style={styles.modalWhiteArea}>
                        <TouchableOpacity style={styles.closeContainer} onPress={props.cancelHandeler}>
                            <Ionicons name="close" size={15} color={'#000'} />
                        </TouchableOpacity>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>Exam Option</Text>
                        </View>
                        {props.isDemo != "yes" ?
                            <View style={styles.attamContainer}>
                                <Text style={styles.attamText}>Attempts : {props.intermNumber} / 3</Text>
                            </View>
                            : null}
                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={styles.optionIndividualContainer} onPress={props.onDashboardHandeler}>
                                <View style={[Gstyles.OptionItemContainer, Gstyles.dashboardIconBackground]}>
                                    <MaterialIcons name="dashboard" size={18} color={colors.backgroundWhite} />
                                </View>
                                <View >
                                    <Text style={styles.OptionItemText}>Dashboard</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionIndividualContainer} onPress={props.onQuestionDetailsHandeler}>
                                <View style={[Gstyles.OptionItemContainer, Gstyles.dashboardQuestionNumberIconBackground]}>
                                    <FontAwesome5 name="sliders-h" size={18} color={colors.backgroundWhite} />
                                </View>
                                <View >
                                    <Text style={styles.OptionItemText}>Question No.</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionIndividualContainer} onPress={props.onInformationsHandeler}>
                                <View style={[Gstyles.OptionItemContainer, Gstyles.dashboardInfoIconBackground]}>
                                    <Ionicons name="information-circle-outline" size={18} color={colors.backgroundWhite} />
                                </View>
                                <View >
                                    <Text style={styles.OptionItemText}>Instruction</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionIndividualContainer} onPress={props.onUserDetailsHandeler}>
                                <View style={[Gstyles.OptionItemContainer, Gstyles.dashboardUserIconBackground]}>
                                    <FontAwesome5 name="user" size={18} color={colors.backgroundWhite} />
                                </View>
                                <View >
                                    <Text style={styles.OptionItemText}>User Details</Text>
                                </View>
                            </TouchableOpacity>
                        </View>



                    </View>
                </View>
            </Modal>

        </>
    );
};

const styles = StyleSheet.create(
    {
        modalParentContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: trasparent,
            position: 'relative',
        },

        modalWhiteArea: {
            backgroundColor: '#C9CDCF',
            padding: 5,
            width: 120,
            borderRadius: 5,
            height: "95%",
            // justifyContent: 'space-between',
            position: 'absolute',
            right: 15,
        },

        closeContainer: {
            width: 20,
            height: 20,
            borderRadius: 50,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end'
        },
        headingContainer: {
            width: '100%',
            // marginHorizontal:5,
            padding: 5,
            backgroundColor: '#245C75',
            marginVertical: 10,
        },

        headingText: {
            fontFamily: fonts.rLight,
            color: "#fff",
            fontSize: 12,
            textAlign: 'center'
        },

        attamContainer: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        attamText: {
            fontFamily: fonts.rBold,
            color: "#245C75",
            fontSize: 14,
            textAlign: 'center'
        },
        optionContainer: {
            flex: 1,
            // backgroundColor: '#ff0000'
            justifyContent: 'space-around'
        },
        optionIndividualContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        OptionItemText: {
            fontFamily: fonts.right,
            color: "#245C75",
            fontSize: 12,
            textAlign: 'center'
        }

    });

export default OtherOptionModal;