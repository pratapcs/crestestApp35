import React, { useEffect, useState, useRef } from 'react';
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

import { useDispatch, useSelector } from 'react-redux';

import Gstyles from '../../../../styles/GlobalStyle';
import { useNavigation } from '@react-navigation/native';

const QuestionDetails = (props) => {
    // const navigation = useNavigation();

    const [isShowResendOtp, setIsShowResendOtp] = useState(0);

    const time_used = useSelector(state => state.auth.time_used);

    const onlyNumber = /^[0-9]+$/;

    const dispatch = useDispatch();

    useEffect(() => {
        Emitter.emit(Events.HIDE_PRELOADER);
        // console.log( "@2222----QuestionDetails--", props.params.questionList )
        // console.log("@234----route--", props)
        // console.log("@11111----route--", props)
    }, []);

    useEffect(() => {

    }, []);

    const closeVerificationOption = () => {
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    }

    const pressQuestionNumber = (id) => {
        props.callQuestionNumber(id)
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    }

    const showNumberBox = () => {
        let box = []
        for (let i = 0; i < props.params.questionList.length; i++) {
            // return (
            box.push(
                <React.Fragment key={i}>
                    <TouchableOpacity onPress={() => pressQuestionNumber(i)}>
                        <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.questionNumberBox, props.params.questionList[i].is_visited == 1 ? Gstyles.visitedBackground : props.params.questionList[i].is_answered == 1 ? Gstyles.answeredBackground : Gstyles.notVisitedBackground, props.params.currentQuestionNumber == i ? Gstyles.selectQuestionBox : null]}>
                            {/* <Text style={[Gstyles.textColorWhite, Gstyles.fontSize14]}>{i + 1}</Text> */}
                            <Text style={[Gstyles.textColorWhite, Gstyles.fontSize14]}>{props.params.questionList[i].question_counter}</Text>
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
                        <Text style={[Gstyles.textCenter, Gstyles.font18, Gstyles.textBlue, Gstyles.marginTopBottom15, {height:20}]}>Question Details</Text>
                    </View>
                    <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.fdr, Gstyles.counterHeight]}>
                        <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.flex1, Gstyles.height100Percentage, Gstyles.answeredBackground]}><Text style={[Gstyles.textColorWhite, Gstyles.fontSize14]}>{props.params.is_answered_count} Answered</Text></View>
                        <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.flex1, Gstyles.height100Percentage, Gstyles.visitedBackground]}><Text style={[Gstyles.textColorWhite, Gstyles.fontSize14]}>{props.params.is_visited_count} Visited</Text></View>
                        <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.flex1, Gstyles.height100Percentage, Gstyles.notVisitedBackground]}><Text style={[Gstyles.textColorWhite, Gstyles.fontSize14]}>{props.params.totalQuestionNumber - props.params.is_visited_count} Not Visited</Text></View>
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

                                {/* {props.params.questionNumber ?
                                    props.params.questionNumber.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.questionNumberBox]}>
                                                    <Text style={[Gstyles.textColorWhite, Gstyles.fontSize14]}>{index + 1}</Text>
                                                </View>
                                            </React.Fragment>
                                        )
                                    })
                                    : null
                                } */}
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </View>
        </>
    );
};

export default QuestionDetails;

const styles = StyleSheet.create(
    {


    })