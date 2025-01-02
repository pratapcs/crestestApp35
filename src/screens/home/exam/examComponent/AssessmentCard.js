import React, { useState, useEffect } from 'react';
import { colors, fonts } from '../../../../styles/Crestest.config';
import Gstyles from '../../../../styles/GlobalStyle';
import MathJax from 'react-native-mathjax'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
const rBold = 'Roboto-Bold';
const rRegular = "Roboto-Regular";

const AssessmentCard = (props) => {

    const [sampleQuestion, setSampleQuestion] = useState('In the given figure, O is the centre of the circle whose diameter is AB. If ∠AOE = 150° and ∠DAO = 55° then find ∠CBE. <img src="https://admin.clvdev.in//question_images/q_image/1680259500535NTMCH24Q43F43.png" alt="crestest_img" style="width:90%;margin-top:10px;" ')

    const [intialHeiht, setIntialHeiht] = useState(40)
    const [delayedRender, setDelayedRender] = useState(false);

    useEffect(() => {
        setDelayedRender(false)
        if (props?.question !== "" && props?.options) {
            const timeout = setTimeout(() => {
                setDelayedRender(true);
            }, 500);

            // Cleanup timeout on unmount or dependency change
            return () => clearTimeout(timeout);
        }
    }, [props.question, props.options, props.questionNo]);


    const mmlOptions = {
        /* --------------- */
        styles: {
            '#formula': {
                // 'background-color': '#efefef',
                color: '#000000',
                // padding: 0,
                // minHeight: 40,
                // flex: 1,
                // top:20
            },
        },

        /*  ------------------- */
        messageStyle: 'none',
        extensions: ['mml2jax.js', 'MathMenu.js', 'MathZoom.js', 'AssistiveMML.js', 'a11y/accessibility-menu.js',],
        jax: ['input/MathML', 'output/CommonHTML', "output/HTML-CSS"],
        tex2jax: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
        },
        TeX: { extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'], },
    };

    return (
        <>
            {/* <View>
                <MathJax
                    mathJaxOptions={mmlOptions}
                    html={'<p>The face value of share is 15%</p>'}
                />
            </View> */}
            <View>
                {/* <View style={[styles.assesmentIndividualContainer, props.statusColor === 1 ? styles.correctAssessmentBorder : (props.statusColor === 0 && props.guest_post_ans !== "undefined") ? styles.inCorrectAssessmentBorder : (props.statusColor === 0 && props.guest_post_ans === "undefined") ? styles.notAttendedBorder : null]}> */}
                {/* <View style={[styles.questionNumber, props.statusColor === 1 ? styles.correctAssessmentBackgroundColor : (props.statusColor === 0 && props.guest_post_ans !== "undefined") ? styles.inCorrectAssessmentBackgroundColor : (props.statusColor === 0 && props.guest_post_ans === "undefined") ? styles.notAttendedBackgroundColor : null]}>
                    <Text style={[styles.questionNumberText]}>{props.questionNo}</Text>
                </View> */}
                {/* Gstyles.fdr, */}
                <View>
                    <View style={[Gstyles.mb5]}>
                        <View style={[styles.assessmentLeftWidth]}>
                            <Text style={[Gstyles.fw600, styles.headingBorder]}>
                                Question :
                            </Text>
                        </View>
                        <View style={[styles.assessmentRighttWidth]}>
                            <MathJax
                                mathJaxOptions={mmlOptions}
                                html={props.question}
                            // style={{borderWidth:1, minHeight:intialHeiht}}
                            // style={{padding:-3, margin:-3,}}
                            />
                            {/* {console.log("props.question------------", props.question)} */}
                        </View>
                    </View>
                    {/* <Text style={[styles.assessmentTextJustify]}>
                            {props.question}
                        </Text> */}
                    {/* Gstyles.fdr,  */}
                    <View style={[Gstyles.mb5]}>
                        <View style={[styles.assessmentLeftWidth,]}>
                            <Text style={styles.headingBorder}>
                                Option :
                            </Text>
                        </View>

                        <View style={[styles.assessmentOptionRighttWidth]}>
                            {/* <React.Fragment >
                                <View style={Gstyles.fdr}>
                                    <View style={Gstyles.mr5}>
                                        <Text style={[Gstyles.fw600]}>{`(B)`}</Text>
                                    </View>
                                    <View>
                                        <MathJax
                                            mathJaxOptions={mmlOptions}
                                            html={'<p>The face value of share is 15%</p>'}
                                        />
                                    </View>
                                </View>

                            </React.Fragment> */}

                            {/* {console.log("=======+++++", props.options)} {/* style={Gstyles.fdr} */}
                            {/* style={{ height:40, width: '100%', borderColor: 'green', borderWidth: 1, borderStyle: 'solid'}} */}

                            {
                                Object.keys(props.options).map(([key, value]) => {

                                    return (
                                        <React.Fragment key={props.question + key} >

                                            <View style={{ flexDirection: 'row', }}>
                                                <View style={{ top: 7 }}>
                                                    <Text style={[Gstyles.fw600, styles.optionTextColor]}>{`(` + key + `)  `}</Text>
                                                </View>
                                                <View style={{ width: '87%', }}>
                                                    {delayedRender ?
                                                        <MathJax
                                                            mathJaxOptions={mmlOptions}
                                                            // html={`<p>The face value of share is 15%</p>`}
                                                            html={props.question !== "" ? props.options[key.toString()] : null}

                                                        // style={{padding:-3, margin:-3, lineHeight:20}}
                                                        />
                                                        : <ActivityIndicator />}
                                                </View>
                                            </View>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </View>


                    </View>
                    {/* Gstyles.fdr,  */}
                    <View style={[Gstyles.mb5]}>
                        <View style={[styles.assessmentLeftWidth]}>
                            <Text style={[Gstyles.fw600, styles.headingBorder]}>
                                Answer :
                            </Text>
                        </View>
                        <View style={[styles.assessmentRighttWidth]}>
                            <View>
                                <Text style={[styles.assessmentTextJustify, Gstyles.fw600]}>
                                    Your answer: {props.studentAnswer}
                                </Text>
                            </View>
                            <View>
                                <Text style={[styles.assessmentTextJustify, Gstyles.fw600]}>
                                    Correct answer: <Text style={[styles.correctAnswer]}>{props.correctAnswer} </Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* Gstyles.fdr,  */}
                    <View style={[Gstyles.mb5]}>
                        <View style={[styles.assessmentLeftWidth]}>
                            <Text style={styles.headingBorder}>
                                Reason :
                            </Text>
                        </View>
                        <View style={[styles.assessmentRighttWidth]}>
                            {/* <Text style={[styles.assessmentTextJustify]}>
                            {props.reason}
                        </Text> */}
                            <MathJax
                                mathJaxOptions={mmlOptions}
                                html={props.reason}
                            // style={{padding:-3, margin:-3,}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create(
    {

        assesmentIndividualContainer: {
            padding: 10,
            margin: 7,
            borderWidth: 4,
            borderStyle: 'solid',
            borderRadius: 7,
            flexDirection: 'column',
            flex: 1,
        },
        questionNumber: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 35,
            height: 35,
            borderRadius: 50,
        },
        questionNumberText: {
            fontFamily: fonts.rMedium,
            fontSize: 14,
        },
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
        assessmentLeftWidth: {
            // width: 70,
        },
        assessmentRighttWidth: {
            // width: '70%',
            // borderWidth: 1,
            // backgroundColor:'#ff0000'
        },
        headingBorder: {
            borderTopWidth: 1,
            borderTopColor: '#C1BFBF',
            borderBottomWidth: 1,
            borderBottomColor: '#C1BFBF',
            marginTop: 3,
            marginBottom: 3,
            color: '#000'
        },
        assessmentOptionRighttWidth: {
            // width: '67%',
            // width: '95%',
            // borderWidth: 1,
            // backgroundColor:'#ff0000'
        },
        assessmentTextJustify: {
            textAlign: 'justify',
            color: '#000'
        },
        correctAnswer: {
            color: colors.correctAnswer
        },
        optionTextColor: {
            color: '#000'
        }
    });

export default AssessmentCard;