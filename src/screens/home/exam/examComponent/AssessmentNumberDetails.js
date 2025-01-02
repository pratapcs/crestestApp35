import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';

//styles
import { colors, containerInside, scrollViewContainer } from '../../../../styles/Crestest.config';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import Emitter from '../../../../utils/Emitter';
import * as Events from '../../../../configs/Events';

import Gstyles from '../../../../styles/GlobalStyle';

const AssessmentNumberDetails = (props) => {

    const [isShowResendOtp, setIsShowResendOtp] = useState(0);

    const time_used = useSelector(state => state.auth.time_used);

    const onlyNumber = /^[0-9]+$/;

    const dispatch = useDispatch();

    useEffect(() => {
        Emitter.emit(Events.HIDE_PRELOADER);
        // console.log("@2222----route--", props.params.assessmentDetails[0].question_counter)
        // console.log("@234----route--", props)
        // console.log("@11111----route--", props) {"correct": 1, "incorrect": 0, "notAttempted": 19, "total": 20}
    }, []);

    useEffect(() => {

    }, []);

    const closeVerificationOption = () => {
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    }

    const pressQuestionNumber = (id) => {
        props.setCurrentAssessmentNumber(id)
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    }


    const showNumberBox = () => {
        let box = []
        for (let i = 0; i < parseInt(props.params.total); i++) {
            // return (
            box.push(
                <React.Fragment key={i}>
                    <TouchableOpacity onPress={() => pressQuestionNumber(i)}>
                        {/* <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.questionNumberBox, props.params.questionList[i].is_visited == 1 ? Gstyles.visitedBackground : props.params.questionList[i].is_answered == 1 ? Gstyles.answeredBackground : Gstyles.notVisitedBackground, props.params.currentQuestionNumber == i ? Gstyles.selectQuestionBox : null]}> */}
                        <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.questionNumberBox, props.params.currentAssessmentNumber == i ? styles.currentAssessmentSelect : null,  props.params.assessmentDetails[i].guest_post_ans_status === 1 ? styles.correctAssessmentBackgroundColor : (props.params.assessmentDetails[i].guest_post_ans_status === 0 && props.params.assessmentDetails[i].guest_post_ans !== "undefined") ? styles.inCorrectAssessmentBackgroundColor : (props.params.assessmentDetails[i].guest_post_ans_status === 0 && props.params.assessmentDetails[i].guest_post_ans === "undefined") ? styles.notAttendedBackgroundColor : null]}>
                            {/* <Text style={[Gstyles.textColorBlack, Gstyles.fontSize14]}>{i + 1}</Text> */}
                            <Text style={[Gstyles.textColorBlack, Gstyles.fontSize14]}>{props.params.assessmentDetails[i].question_counter}</Text>
                        </View>
                    </TouchableOpacity>
                </React.Fragment>
            )
            // )
        }
        return box;
    }

    return (
        <>

            <View style={[containerInside, Gstyles.rbSheetStyle]}>

                <TouchableOpacity style={Gstyles.modalRbCloseButtonContainer} onPress={closeVerificationOption}>
                    <EntypoIcon name="cross" size={25} color={colors.backgroundDeepGray} />
                </TouchableOpacity>

                <View style={Gstyles.bottomParentContainer}>

                    <View style={Gstyles.topHeadingContainer}>
                        <Text style={[Gstyles.textCenter, Gstyles.font18, Gstyles.textBlue, Gstyles.marginTopBottom15, { height: 20 }]}>Total Questions : {props.params.total} </Text>
                    </View>
                    <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.fdr, Gstyles.counterHeight]}>
                        <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.flex1, Gstyles.height100Percentage, styles.correctAssessmentBackgroundColor]}>
                            <Text style={[Gstyles.textColorBlack, Gstyles.fontSize12]}> Correct : </Text>
                            <Text style={[Gstyles.textColorBlack, Gstyles.fontSize14]}> {props.params.correct}</Text>
                            </View>
                        <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.flex1, Gstyles.height100Percentage, styles.inCorrectAssessmentBackgroundColor]}>
                            <Text style={[Gstyles.textColorBlack, Gstyles.fontSize12]}> Incorrect : </Text>
                            <Text style={[Gstyles.textColorBlack, Gstyles.fontSize14]}> {props.params.incorrect}</Text>
                            </View>
                        <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.flex1, Gstyles.height100Percentage, styles.notAttendedBackgroundColor]}>
                            <Text style={[Gstyles.textColorBlack, Gstyles.fontSize12]}> Not Attempted :</Text>
                            <Text style={[Gstyles.textColorBlack, Gstyles.fontSize14]}>{props.params.notAttempted} </Text>
                            </View>
                    </View>
                    <View style={[Gstyles.questionNumberContainer]}>
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={scrollViewContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={[Gstyles.fdr, Gstyles.fw]}>
                                {

                                    showNumberBox()
                                }


                            </View>

                        </ScrollView>
                    </View>
                </View>
            </View>
        </>
    );
};

export default AssessmentNumberDetails;

const styles = StyleSheet.create(
    {
        correctAssessmentBorder: {
            borderColor: colors.correctAssessmentBorder,
        },
        inCorrectAssessmentBorder: {
            borderColor: colors.inCorrectAssessmentBorder,
        },
        notAttendedBorder: {
            borderColor: colors.notAttendedBorder,
        },
        correctAssessmentBackgroundColor: {
            backgroundColor: colors.correctAssessmentBackgroundColor,
        },
        inCorrectAssessmentBackgroundColor: {
            backgroundColor: colors.inCorrectAssessmentBackgroundColor,
        },
        notAttendedBackgroundColor: {
            backgroundColor: colors.notAttendedBackgroundColor,
        },
        currentAssessmentSelect: {
            borderWidth:2,
            borderColor:'#ff0000',
        }

    })