import React, { useEffect, useState, } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';

//styles
import { colors, containerInside } from '../../../../styles/Crestest.config';

import Emitter from '../../../../utils/Emitter';
import * as Events from '../../../../configs/Events';

import { useDispatch, useSelector } from 'react-redux';

import Gstyles from '../../../../styles/GlobalStyle';

const ExamStartInstructions = (props) => {

    const [isShowResendOtp, setIsShowResendOtp] = useState(0);

    const time_used = useSelector(state => state.auth.time_used);

    const onlyNumber = /^[0-9]+$/;

    const dispatch = useDispatch();

    useEffect(() => {
        Emitter.emit(Events.HIDE_PRELOADER);
        // console.log("@2222----route--", props.params)
        // console.log("@11111----route--", props)
    }, []);

    useEffect(() => {

    }, []);

    const closeVerificationOption = () => {
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    }

    const quitExamHandaler = () => {
        props.quitExam()
        closeVerificationOption();
    }

    const showQuestionHandaler = () => {
        props.startExam()
        closeVerificationOption();
    }


    return (
        <>

            <View style={[containerInside, Gstyles.rbSheetStyle]}>

                <View style={[Gstyles.bottomParentContainer]}>

                    <View style={[Gstyles.rbTopHeadingContainer]}>
                        <Text style={[Gstyles.textCenter, Gstyles.font18, Gstyles.textBlue]}>Basic instructions for online examinations:</Text>
                    </View>
                    <ScrollView
                        overScrollMode={'never'}
                        // style={{ zIndex: 10 }}
                        scrollEventThrottle={16}
                        keyboardShouldPersistTaps="handled"
                        // contentContainerStyle={styles.middleBoxContainer}
                        showsVerticalScrollIndicator={true}
                        persistentScrollbar={true}

                    >
                        <View style={[Gstyles.rbInstructionContainer]}>
                            <View style={[Gstyles.fdr, Gstyles.mb10]}>
                                <View style={[Gstyles.roundPointer]}></View>
                                <View><Text style={[Gstyles.instructionText]}>The examination does not require using any paper, pen, pencil and calculator.</Text></View>
                            </View>
                            <View style={[Gstyles.fdr, Gstyles.mb10]}>
                                <View style={[Gstyles.roundPointer]}></View>
                                <View><Text style={[Gstyles.instructionText]}>Every student will take the examination on a Laptop/Desktop/Smart Phone.</Text></View>
                            </View>
                            <View style={[Gstyles.fdr, Gstyles.mb10]}>
                                <View style={[Gstyles.roundPointer]}></View>
                                <View><Text style={[Gstyles.instructionText]}>The Subjects or topics covered in the exam will be as per the Syllabus.</Text></View>
                            </View>
                            <View style={[Gstyles.fdr, Gstyles.mb10]}>
                                <View style={[Gstyles.roundPointer]}></View>
                                <View><Text style={[Gstyles.instructionText]}>In the online exam interface, the timer indicating the remaining time will be displayed on the right side for the test taker's convenience.</Text></View>
                            </View>
                            <View style={[Gstyles.fdr, Gstyles.mb10]}>
                                <View style={[Gstyles.roundPointer]}></View>
                                <View><Text style={[Gstyles.instructionText]}>After three attempts, the exam will conclude.</Text></View>
                            </View>
                            <View style={[Gstyles.fdr, Gstyles.mb10]}>
                                <View style={[Gstyles.roundPointer]}></View>
                                <View><Text style={[Gstyles.instructionText]}>In this exam, marks will be distributed as follows: one mark for Short Answer (SWA) questions, two marks for Higher Order Thinking Skills (HOTS) questions, and two marks for Descriptive questions.</Text></View>
                            </View>
                            <View style={[Gstyles.fdr, Gstyles.mb10]}>
                                <View style={[Gstyles.roundPointer]}></View>
                                <View><Text style={[Gstyles.instructionText]}>Visited questions will be marked in bluish cyan color, not visited questions in sky blue, and attempted questions in a green color for easy tracking during the exam.</Text></View>
                            </View>
                            <View style={[Gstyles.fdr, Gstyles.mb10]}>
                                <View style={[Gstyles.roundPointer]}></View>
                                <View><Text style={[Gstyles.instructionText]}>Please be aware that once the exam time is over, it will be automatically submitted.</Text></View>
                            </View>
                            <View style={[Gstyles.fdr, Gstyles.mb10]}>
                                <View style={[Gstyles.roundPointer]}></View>
                                <View><Text style={[Gstyles.instructionText]}>The participants are reminded to review their answers before concluding the exam. Best wishes for their performance.</Text></View>
                            </View>
                            <View style={[Gstyles.fdr, Gstyles.mb10]}>
                                <View style={[Gstyles.roundPointer]}></View>
                                <View><Text style={[Gstyles.instructionText]}>Please note that a reminder bell will ring five minutes before the end of the exam for review.</Text></View>
                            </View>
                            <View style={[Gstyles.fdr, Gstyles.mb10]}>
                                <View style={[Gstyles.roundPointer]}></View>
                                <View><Text style={[Gstyles.instructionText]}>Once the exam is submitted, the assessment will be available immediately.</Text></View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View>
                    <View style={Gstyles.rbButtonContainer}>
                        <TouchableOpacity style={[Gstyles.buttonLeftContainer, Gstyles.dangerButtonBackground]} onPress={quitExamHandaler} ><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Quit exam</Text></TouchableOpacity>
                        <TouchableOpacity style={[Gstyles.buttonRightContainer, Gstyles.successButtonBackground]} onPress={showQuestionHandaler}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Start exam</Text></ TouchableOpacity>
                    </View>
                    <View style={[Gstyles.aic]}><Text style={[Gstyles.goodLuckColor]}>Good Luck Team Crestest</Text></View>
                </View>
            </View>
        </>
    );
};

export default ExamStartInstructions;

const styles = StyleSheet.create(
    {


    })