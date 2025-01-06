import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';

//styles
import { colors, containerInside, fonts } from '../../../styles/Crestest.config';

import EntypoIcon from 'react-native-vector-icons/Entypo';


import Emitter from '../../../utils/Emitter';
import * as Events from '../../../configs/Events';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { useDispatch, useSelector } from 'react-redux';

import Gstyles from '../../../styles/GlobalStyle';

const ModuleMockChapterOption = (props) => {

    const [isShowResendOtp, setIsShowResendOtp] = useState(0);
    const [isSelected, setSelection] = useState(false);

    const [isModuleOrMock, setIsModuleOrMock] = useState([]);
    const [checked, setChecked] = useState([]);
    const [maxChapterSelect, setMaxChapterSelect] = useState(false)
    const [maxChapterSelectMock, setMaxChapterSelectMock] = useState(false)
    const [moduleMockChaterList, setModuleMockChaterList] = useState([]);
    const [exam_type, setExam_type] = useState(0)
    const [branchSortCode, setBranchSortCode] = useState('');

    useEffect(() => {
        Emitter.emit(Events.HIDE_PRELOADER);
        setIsModuleOrMock(props.params.isModuleOrMock)
        setMaxChapterSelect(props.params.maxChapterSelect)
        setMaxChapterSelectMock(props.params.maxChapterSelectMock)
        setExam_type(props.params.exam_type)
        // console.log("+++++111+++++=", props.params)
        // console.log("+++++111+++++=", props)
    }, []);

    useEffect(() => {
        Emitter.emit(Events.HIDE_PRELOADER);
    }, []);

    const closenOption = () => {
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    }

    const quitExamHandaler = () => {
        props.quitRbHandeler()
        closenOption();
    }

    const showQuestionHandaler = () => {
        // props.startExam()
        closenOption();
    }

    const checkChange = (value, event) => {
        if (checked.indexOf(value) !== -1) {
            setChecked(checked.filter((checkBox) => checkBox !== value));
        } else {
            setChecked([...checked, value]);
        }
    };

    const moduleMockExamSubmitHandaler = () => {

        const selectChapterId = [];
        var objSelectChapterId = null;
        var objChapterId = null;

        checked.forEach((elm, i) => {
            let objSelectChapterId = {};
            let objChapterId = {};
            objSelectChapterId = props.params.listData[elm]
            objChapterId = objSelectChapterId.chapter_id
            selectChapterId.push(objChapterId)
        })

        props.quitRbHandeler();
        
        props.navigation.navigation.navigate('nonAuthScenes', {
            screen: "OnlineExamsDetails",
            params: { isModuleOrMock: isModuleOrMock, exam_type: exam_type, branchSortCode: branchSortCode, chapter: 'CH0', set_no: props.params.selectModuleMockData, subject_id: props.params.subjectId, selectChapterId: selectChapterId, group_subject_id: props.params.groupSubjectId, examFrom: 2, exam_category_id: props.params.exam_category_id }
        })

        closenOption();
    }


    return (
        <>

            <View style={[containerInside, Gstyles.rbSheetStyle]}>

                {/* <TouchableOpacity style={Gstyles.modalRbCloseButtonContainer} onPress={closeVerificationOption}>
                    <EntypoIcon name="cross" size={25} color={colors.backgroundDeepGray} />
                </TouchableOpacity> */}

                <View style={Gstyles.bottomParentContainer}>

                    <View style={Gstyles.bottomRbSheetTopHeadingContainer}>
                        <Text style={[Gstyles.textCenter, Gstyles.font14, Gstyles.textBlue]}>Select Chapters for {props.params.isModuleOrMock == 1 ? "Module" : "Mock"} Test.  </Text>

                        {checked.length > 0 ?
                            <View>
                                <Text style={[Gstyles.textCenter, Gstyles.font14, Gstyles.textBlue,]}>{!!checked.length ? <> You have selected({checked.length}/{isModuleOrMock == 1 ? maxChapterSelect : maxChapterSelectMock})</> : null}</Text>
                            </View>
                            : null
                        }

                    </View>
                    <View>
                        {/* {(isModuleOrMock == 1 ? maxChapterSelect > moduleMockChaterList.length : maxChapterSelectMock > moduleMockChaterList.length) ? <><Text style={Gstyles.infoText}>Please complete minimum {isModuleOrMock == 1 ? maxChapterSelect : maxChapterSelectMock} Chapter for attend this exam</Text></> : null} */}

                        {(isModuleOrMock == 1 ? maxChapterSelect > moduleMockChaterList.length : maxChapterSelectMock > moduleMockChaterList.length) ? <><Text style={Gstyles.infoText}>Please select {isModuleOrMock == 1 ? maxChapterSelect : maxChapterSelectMock} Chapter for {props.params.isModuleOrMock == 1 ? "Module" : "Mock"} test</Text></> : null}
                    </View>

                    {/* <View style={[Gstyles.bottomRbSheetinstructionContainer]}> */}
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={[Gstyles.bottomRbSheetinstructionContainer, { paddingVertical:10}]}
                        showsVerticalScrollIndicator={false}
                    >


                        {props.params.listData.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <View style={[Gstyles.bottomRbSheetIndividualCheckBoxContainer]} key={index}>
                                        <BouncyCheckbox
                                            size={20}
                                            fillColor="#962424"
                                            unfillColor="#FFFFFF"
                                            text={item.sub_heading}
                                            iconStyle={{ width: 20, height: 20, borderRadius: 0, borderColor: "#C4C2C2" }}
                                            innerIconStyle={{ width: 20, height: 20, borderRadius: 0, borderWidth: 2, borderColor: "#C4C2C2" }}
                                            textStyle={{ fontFamily: fonts.rLight, color: "#000000" }}
                                            // onPress={() => [setSelection(!isSelected)]}
                                            onPress={() => checkChange(index)}
                                        />
                                    </View>
                                </React.Fragment>
                            )
                        })
                        }
                    </ScrollView>
                    {/* </View> */}

                </View>
                <View>
                    <View style={Gstyles.buttonContainer}>
                        <TouchableOpacity style={[Gstyles.buttonLeftContainer, Gstyles.dangerButtonBackground]} onPress={quitExamHandaler} ><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Close</Text></TouchableOpacity>

                        {checked.length == (isModuleOrMock == 1 ? maxChapterSelect : maxChapterSelectMock) ?
                            <TouchableOpacity style={[Gstyles.buttonRightContainer, Gstyles.successButtonBackground]} onPress={moduleMockExamSubmitHandaler}><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Submit</Text></ TouchableOpacity>
                            :
                            <View style={[Gstyles.buttonRightContainer, Gstyles.disableButtonBackground]} ><Text style={[Gstyles.buttonText, Gstyles.buttonWhiteText]}>Submit</Text></View>
                        }
                    </View>

                    <View style={[Gstyles.aic]}><Text style={[Gstyles.goodLuckColor]}>Good Luck Team Crestest</Text></View>
                </View>
            </View>
        </>
    );
};

export default ModuleMockChapterOption;

const styles = StyleSheet.create(
    {


    })