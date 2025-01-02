import React, { useState, useEffect } from 'react';
import Gstyles from '../../../styles/GlobalStyle';
import subjectIcon from '../../../assets/images/subjectIcon.png';
import { colors, fonts, } from '../../../styles/Crestest.config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import AlertComponent from '../../../components/AlertComponent'
import moment from 'moment';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native';

const trasparent = 'rgba(0,0,0,0.5)'

const AssessmentListCard = (props) => {

    const board_name = useSelector(state => state.auth.board_name);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalHeading, setModalHeading] = useState('');
    const [modalDetails, setModalDetails] = useState('');


    const showModal = (h, d) => {
        setModalVisible(!modalVisible)
        // console.log("====", h, d)
        setModalHeading(h);
        if (moment(d).format('DD/MM/YYYY') != 'Invalid date') {
            setModalDetails(moment(d).format('DD/MM/YYYY hh:mm A z'));
        } else {
            setModalDetails(d);
        }

    }
    const modalShowOff = () => {
        setModalVisible(!modalVisible)
        setModalHeading('');
        setModalDetails('');
    }



    //subject_color_code

    return (
        <>
            <View style={[styles.parentContainer, props.assessmentCategory == 4 ? (props.categoryId == 1 ? { backgroundColor: colors.scholasticColor } : { backgroundColor: colors.competitiveColor }) : (props.categoryId == 1 ? { backgroundColor: props.subject_color_code } : { backgroundColor: colors.competitiveColor })]}>
                <View style={styles.leftContainer}>
                    <View style={styles.categoryContainer}>
                        <View style={styles.categoryInsideContainer}>
                            <Text style={[styles.categoryText, props.categoryId == 1 ? { color: colors.scholasticColor } : { color: colors.competitiveColor }]}>{props.categoryId == 1 ? 'S' : 'C'}</Text>
                        </View>
                    </View>
                    <View style={styles.boardcategoryContainer}>
                        <Text style={styles.boardText}>{props.assessmentCategory == 4 ? 'Demo' : board_name}</Text>
                    </View>
                </View>
                <View style={styles.middleContainer}>{/* categoryCompetitiveSubjectName */}
                    {/* <View> */}
                    <Text style={props.categoryId == 1 ? styles.subjectName : props.categoryId == 2 && props.assessmentCategory == 4 ? styles.subjectName : styles.categoryCompetitiveSubjectName}>{props.assessmentCategory == 4 ? props.headingmsg : (props.categoryId == 1 ? props.subject_name : props.exam_name)}</Text>
                    {/* </View> */}
                    <Text style={styles.chapterName}>{props.assessmentCategory == 4 ? props.subheading : (props.categoryId == 1 ? props.chapter_name : null)}</Text>
                    <Text style={styles.chapterNumber}>{props.exam_type}</Text>
                    <View style={styles.buttonContainer}>
                        {props.assessmentCategory != 4 ?
                            <TouchableOpacity onPress={() => props.assessmentCategory == 4 ? showModal('Exam date :', props.exam_date) : showModal('Appeared on :', props.appeared_on)} style={styles.buttonindividual}>
                                <Text style={styles.buttonText}>Appeared on</Text>
                            </TouchableOpacity>
                            : null}
                        <TouchableOpacity onPress={() => props.assessmentCategory == 4 ? showModal('Exam date :', props.exam_date) : showModal('Submitted on :', props.submitted_on)} style={styles.buttonindividual}>
                            <Text style={styles.buttonText}>{props.assessmentCategory == 4 ? `Exam date` : `Submitted on`}</Text>
                        </TouchableOpacity>
                        {props.assessmentCategory != 4 ?
                            <TouchableOpacity onPress={() => showModal('Exam status :', props.status == 1 ? 'Completed' : props.status == 0 ? 'Continue ' : 'Please check')} style={styles.buttonindividual}>
                                <Text style={styles.buttonText}>Exam status</Text>
                            </TouchableOpacity>
                            : null}
                    </View>
                </View>
            </View>
            {props.is_expired == 0 ?
                <TouchableOpacity onPress={props.showAssessmentDestails} style={styles.eyeContainer}>
                    <Ionicons name="eye-sharp" size={20} color={'#000000'} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => props.assessmentCategory == 4 ? showModal('Assessment available :', props.expired_text) : showModal('Assessment available :', props.assessment_available)} style={styles.eyeContainer}>
                    <Ionicons name="eye-off-sharp" size={20} color={'#e5e5e5'} />
                </TouchableOpacity>}

            <AlertComponent
                isVisable={modalVisible}
                modalHeading={modalHeading}
                modalDetails={modalDetails}
                closeModal={() => modalShowOff()}
                isCloseRequire={true}
                isOkRequire={false}
            />

        </>
    );
};

const styles = StyleSheet.create(
    {
        parentContainer: {
            width: '93%',
            height: 120,
            borderRadius: 8,
            elevation: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffset: {
                width: 0,
                height: 4
            },
            shadowRadius: 4,
            shadowOpacity: 1,
            margin: 10,
            // backgroundColor: '#F2ADAD',
            flexDirection: 'column',
            overflow: 'hidden',
            flexDirection: 'row',
            padding: 10
        },
        leftContainer: {
            flex: .2,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        middleContainer: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingLeft: 10,
        },
        eyeContainer: {
            position: 'absolute',
            top: 18,
            right: 30,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',

        },
        categoryContainer: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        categoryInsideContainer: {
            height: 30,
            width: 30,
            borderRadius: 50,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
        },

        boardcategoryContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        categoryText: {
            fontFamily: fonts.rBold,
            fontSize: 18,
        },
        boardText: {
            fontFamily: fonts.rLight,
            color: '#000',
            fontSize: 16,
        },
        subjectName: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 14,
            textTransform: 'capitalize'
        },
        categoryCompetitiveSubjectName: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 14,
            textTransform: 'uppercase'
        },
        chapterName: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 12,
        },
        chapterNumber: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 12,
        },
        buttonContainer: {
            flex: 1,
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            flexDirection: 'row',
            // borderColor:'#ff0000',
            // borderWidth:1,
            // borderStyle:'solid'
        },
        buttonindividual: {
            padding: 4,
            width: 75,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 10,
        },
        buttonText: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 10,
        }

    });

export default AssessmentListCard;