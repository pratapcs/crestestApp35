import React, { useState, useEffect, useRef } from 'react';

import {
    View,
    Text,
    Image,
    StatusBar,
    ScrollView,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { decryptAES } from "../../utils/Util";

import Pdf from 'react-native-pdf';
import Config from "react-native-config"
import { Buffer } from 'buffer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MathJax from 'react-native-mathjax'

import { colors, container, fonts } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';
import { getData } from "../../utils/Util";

import clv_mascot_male from '../../assets/images/clv_mascot_male.png'

import { decode as base64_decode, encode as base64_encode } from 'base-64';

import HeaderComponent from '../../components/HeaderComponent';
import { getAskQuestionData, getSearTextFailureAction, getSearTextSuccessAction, getClickQuestionNoAction } from '../../store/actions/StudentAction';
import { eliraryCategoryAction, postStoreElibraryTimeSpendDetails, } from '../../store/actions/LibraryAction';
import { logout } from '../../store/actions/AuthActions';


const trasparent = 'rgba(0,0,0,0.5)';

let interval;
let _visitTime = 0;


const PdfViewer = (props) => {
    // const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
    const source = { uri: Config.PDFURL + 'assets/guide.pdf', cache: true };
    // const source = { uri: Config.PDFURL + 'elibrary/1681908726652IC10PHCH1CM.1.2.3.4.pdf', cache: true };

    const dispatch = useDispatch();

    const ElibraryScholasticCategory = useSelector((state) => state.elibrary.ElibraryScholasticCategory);
    const ElibraryCategory = useSelector((state) => state.elibrary.ElibraryCategory);
    const searchText = useSelector(state => state.student.searchText);
    const searchTextCallOrNot = useSelector(state => state.student.searchTextCallOrNot);
    const is_subscribe_e_library = useSelector(state => state.auth.is_subscribe_e_library);

    const awsCredentialsAccessKeyId = useSelector((state) => state.elibrary.awsCredentialsAccessKeyId);
    const awsCredentialsSecretaccessKey = useSelector((state) => state.elibrary.awsCredentialsSecretaccessKey);


    // const [sourcePdfUrl, setSourcePdfUrl] = useState({ uri: Config.PDFURL + 'assets/guide.pdf', cache: true })
    const [pdfFileName, setPdfFileName] = useState('')
    const [activeAccordion, setActiveAccordion] = useState('');

    const [isRendering, setIsRendering] = useState(0);

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [userid, setUserid] = useState('')

    const [isAskmeVisable, setIsAskmeVisable] = useState(false)

    const [question, setQuestion] = useState('')
    const [base64Pdf, setBase64Pdf] = useState('');
    const [isPdfLoading, setIsPdfLoading] = useState(true);

    const [headingArrowSize, setHeadingArrowSize] = useState(15)
    const [headingArrowColor, setHeadingArrowColor] = useState("#fff");

    const [listLoader, setlistLoader] = useState(false);

    const questionRef = useRef();

    useEffect(() => {
        interval = setInterval(() => {
            _visitTime++
        }, 1000);

        return () => {
            clearInterval(interval);
            dispatch(eliraryCategoryAction([]));


            if (ElibraryCategory[1] != "Demo") {
                if (ElibraryScholasticCategory.length <= 0 && elibraryTitle == "") {
                    dispatch(postStoreElibraryTimeSpendDetails(ElibraryScholasticCategory[3], _visitTime, elibraryItem.short_code, props));
                    _visitTime = 0
                } else {
                    dispatch(postStoreElibraryTimeSpendDetails(ElibraryScholasticCategory[3], _visitTime, ElibraryScholasticCategory[0].short_code, props));
                    _visitTime = 0
                }
            } else {
                dispatch(postStoreElibraryTimeSpendDetails(0, _visitTime, "demo", props));
                _visitTime = 0
            }
        }

    }, [])


    useEffect(() => {
        async function getUserDetails() {
            let result = await getData("crestestUserDetails");
            result = JSON.parse(result);
            let fname = result['fname'];
            let lname = result['lname'];
            let userId = result['id'];
            setFname(fname);
            setLname(lname);
            setUserid(userId)
        };
        getUserDetails();
        getPdfContentFromAWSS3BucketPrivately(props.route.params.elibraryPdfPath);
    }, []);

    const AWS = require('aws-sdk');
    AWS.config.update({
        region: Config.APP_S3_BUCKET_REGION,
        accessKeyId: decryptAES(awsCredentialsAccessKeyId),
        secretAccessKey: decryptAES(awsCredentialsSecretaccessKey),
    });

    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    const getPdfContentFromAWSS3BucketPrivately = (url) => {

        const S3_BUCKET_NAME = Config.APP_S3_BUCKET_NAME;


        let parts = url.split("/");
        // href = parts[parts.length - 1];
        const pdfFileName = parts[parts.length - 1];

        let pdfFileWithoutPageNumber = pdfFileName.split("#");
        let finalPdfFileWithoutPageNumber = pdfFileWithoutPageNumber[0];

        let fullPathPdf = `elibrary/${finalPdfFileWithoutPageNumber}`

        s3.getObject({
            Bucket: S3_BUCKET_NAME,
            // Key: "elibrary/1674811975750NTPHCH1CM.pdf",
            Key: fullPathPdf,
            ResponseContentType: 'Uint8Array',
        }, (err, data) => {
            if (err) {
                console.log("@@Error-123 : " + err);
            } else {
                // console.log ( "@@data.Body : " + data.Body );
                // setSourcePdfUrl(data.Body);
                setBase64Pdf(new Buffer.from(data.Body).toString('base64'));

            }
        });
    }

    const mmlOptions = {
        /* --------------- */
        styles: {
            '#formula': {
                // 'background-color': '#efefef',
                color: '#000000',
                //   padding: 8,
                minHeight: 40,
                flex: 1,
                fontSize: 8,
            },
        },
        showMathMenu: false,
        showProcessingMessages: false,
        SVG: {
            useGlobalCache: false,
        },

        /*  ------------------- */
        messageStyle: 'none',
        extensions: ['mml2jax.js', 'MathMenu.js', 'MathZoom.js', 'AssistiveMML.js', 'a11y/accessibility-menu.js', 'tex2jax.js',],
        jax: ['input/MathML', 'input/TeX', 'output/CommonHTML', 'output/SVG'],
        tex2jax: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
        },
        TeX: {
            extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],
        },
    };

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const showModal = () => {
        setIsAskmeVisable(true);
        setActiveAccordion('')
        // dispatch(getSearTextSuccessAction([]));
        dispatch(getSearTextFailureAction([]))
    }

    const closeHandeler = () => {
        setIsAskmeVisable(!isAskmeVisable)
        setQuestion('');
        dispatch(getSearTextFailureAction([]))
    }

    const askmeValidateData = async () => {
        const entereQuestion = question.trim();

        //check all validations
        return new Promise(function (resolve, reject) {
            setQuestion(entereQuestion)

            if (entereQuestion == '') {
                questionRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Kindly input your question" });
                resolve({ success: 0, message: 'failure' });
            } else {
                resolve({ success: 1, message: 'success' });
            }
        });
    }

    const submitHandeler = () => {
        setlistLoader(true);
        askmeValidateData()
            .then((response) => {
                if (response.success == 1) {
                    dispatch(getSearTextSuccessAction([]));
                    setActiveAccordion('')
                    dispatch(getAskQuestionData(question, ElibraryCategory[1] === "Demo" ? '' : props.route.params.item.subject_id, disableListLoader, props))
                }
            })
            .catch((error) => {
                // dispatch(elibraryLoading(false));
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: error.response.data });
            });
    }

    const disableListLoader = (val) => {
        setlistLoader(val);
    }

    const selectAccordianIndex = (d, i) => {
        // console.log("selectAccordianIndex = (d, i)---", d, i)
        setActiveAccordion('yes')
        setQuestion('')

        dispatch(getSearTextSuccessAction([d]));
        dispatch(getClickQuestionNoAction(i + 1));
    }

    const searchDetailsCard = (d, i) => {
        return (

            <TouchableOpacity onPress={() => selectAccordianIndex(d, i)} style={styles.searchCardContainer} key={i}>
                <>
                    <View style={styles.searchLeft}>
                        <Text>{i + 1}</Text>
                    </View>
                    <View style={styles.searchMiddle}>
                        <Text style={styles.Question}>Question</Text>

                        <MathJax
                            mathJaxOptions={mmlOptions}
                            html={d.question}
                        />
                    </View>
                </>
                {/* <TouchableOpacity onPress={() => selectAccordianIndex(d, i)} style={styles.searchRight}>
                    <Text>+</Text>
                </TouchableOpacity> */}
            </TouchableOpacity>
        )
    }

    const searchSelectDetailsCard = (d, i) => {
        return (
            <View style={styles.searchSelectCardContainer} key={i}>
                <View style={styles.individualAnswerContainer}>
                    <Text style={styles.Question}>Question: </Text>
                    <MathJax
                        mathJaxOptions={mmlOptions}
                        html={d[0].question}
                    />
                </View>
                <View style={styles.individualAnswerContainer}>
                    <Text style={styles.Question}>Answer: </Text>
                    <MathJax
                        mathJaxOptions={mmlOptions}
                        html={d[0].right_ans}
                    />
                    <Text>{ }</Text>
                </View>
                <View style={styles.individualAnswerContainer}>
                    <Text style={styles.Question}>Reason: </Text>
                    <MathJax
                        mathJaxOptions={mmlOptions}
                        html={d[0].reason}
                    />
                </View>
            </View>
        )
    }

    const subscribHandeler = () => {
        // console.log("subscribHandeler----", props)
        props.navigation.navigate('drawerScenes', {
            screen: 'Subscription',
        });
        closeHandeler()
    }

    const openDetailsPdf = (uri) => {
        const detailsUri = uri.split('/')
        const finalUriWithBase64Link = detailsUri[detailsUri.length - 1];

        let decodePdfUrl = base64_decode(finalUriWithBase64Link);

        props.navigation.navigate('nonAuthScenes', {
            screen: 'PdfViewerForDetails',
            params: { elibraryPdfPath: decodePdfUrl, item: props.route.params.item, elitraryType: ElibraryCategory[1] }
        });

    }

    const registrationHandeler = () => {
        console.log("registrationHandeler")
        setIsAskmeVisable(false)
        dispatch(logout(props));
        /* props.navigation.navigate('authScenes', {
            screen: "Registration",
            params: { examDemo: 0 },
        }) */
        props.navigation.navigate('nonAuthScenes', {
            screen: "DemoRegistration",
            params: { pageFrom: 0 }
        })
    }


    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                <HeaderComponent
                    headerName='e-Library Pdf '
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />

                {ElibraryCategory[1] == "Demo" ?
                    ElibraryCategory.length > 0 ?
                        <View style={styles.detailsContainer}>
                            <Text style={styles.detailsText}>{ElibraryCategory[0]} <><Ionicons name="chevron-forward" size={headingArrowSize} color={headingArrowColor} /></> {ElibraryCategory[1]} </Text>
                        </View>
                        : null
                    :
                    ElibraryScholasticCategory.length > 0 && ElibraryScholasticCategory[0] != '' ?
                        <View style={styles.detailsContainer}>

                            <Text style={styles.detailsText}>{ElibraryScholasticCategory[1]} <><Ionicons name="chevron-forward" size={headingArrowSize} color={headingArrowColor} /></> {ElibraryScholasticCategory[2]} <><Ionicons name="chevron-forward" size={headingArrowSize} color={headingArrowColor} /></> {ElibraryScholasticCategory[0].branch_name == ElibraryScholasticCategory[2] ? null : <>{ElibraryScholasticCategory[0].branch_name} <><Ionicons name="chevron-forward" size={headingArrowSize} color={headingArrowColor} /></></>} {ElibraryScholasticCategory[0].sub_heading}</Text>
                        </View>
                        : ElibraryCategory.length <= 0 && ElibraryCategory[1] == "Demo" ?
                            <View style={styles.detailsContainer}>

                                <Text style={styles.detailsText}>{eCategory} <><Ionicons name="chevron-forward" size={headingArrowSize} color={headingArrowColor} /></> {elibraryTitle} </Text>
                            </View>

                            : ElibraryScholasticCategory.length <= 0 && ElibraryCategory[1] == "" ?
                                <View style={styles.detailsContainer}>

                                    <Text style={styles.detailsText}>{eCategory} <><Ionicons name="chevron-forward" size={headingArrowSize} color={headingArrowColor} /></> {elibrarySubjectName} <><Ionicons name="chevron-forward" size={headingArrowSize} color={headingArrowColor} /></> {elibraryItem.branch_name == elibrarySubjectName ? null : <>{elibraryItem.branch_name} <><Ionicons name="chevron-forward" size={headingArrowSize} color={headingArrowColor} /></></>} {elibraryItem.sub_heading}</Text>
                                </View> :
                                ElibraryScholasticCategory.length > 0 && ElibraryScholasticCategory[0] == '' ?
                                    <View style={styles.detailsContainer}>

                                        <Text style={styles.detailsText}>{ElibraryScholasticCategory[1]} <><Ionicons name="chevron-forward" size={headingArrowSize} color={headingArrowColor} /></> {`Demo`} </Text>
                                    </View>
                                    :
                                    null
                }

                <View style={styles.container}>
                    {base64Pdf === '' ? <View style={{ flex: 1 }} ></View> : <Pdf
                        trustAllCerts={false}
                        // source={source}
                        // source={{ uri: Config.PDFURL + pdfFileName, cache: true }}
                        source={{
                            uri: 'data:application/pdf;base64,' + base64Pdf,
                            cache: true,
                        }}
                        renderActivityIndicator={() => <View />}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                            setIsPdfLoading(false);
                            Emitter.emit(Events.HIDE_PRELOADER)
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={uri => {
                            console.log(`Link pressed: ${uri}`);
                            userid == 0 ? showModal() : openDetailsPdf(uri)
                            // Linking.openURL(uri)
                        }}
                        page={1}
                        style={styles.pdf} />}
                </View>
                {userid != 0 ?
                    <TouchableOpacity onPress={showModal} style={Gstyles.askmeContainer}>
                        <Image source={clv_mascot_male} style={Gstyles.askmeImage} />
                        <View style={Gstyles.askmeTextContainer}>
                            <Text style={Gstyles.askmeText}>Ask Me!</Text>
                        </View>
                    </TouchableOpacity>
                    : null}

                {/* Modal-------------- */}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isAskmeVisable}
                >

                    <View style={styles.modalParentContainer}>
                        <View style={[styles.modalWhiteArea, { height: searchText == '' ? 230 : 400 }]}>
                            <View style={styles.modalTopContainer}>
                                {/* <Text style={styles.modalHeading}>Ask Question</Text> */}
                                <Text style={styles.modalHeading}>{is_subscribe_e_library != null && is_subscribe_e_library != undefined && is_subscribe_e_library != 0 ? "Enter keywords to clear doubt" : `Hello  ${fname}`}</Text>
                            </View>
                            {is_subscribe_e_library != null && is_subscribe_e_library != undefined && is_subscribe_e_library != 0 ?
                                <View style={styles.modalmiddleContainer}>
                                    <View style={styles.inputContainer}>
                                        <View style={[Gstyles.fdr, styles.labelMargin]}>
                                            <Text style={styles.inputLabel}>Type keywords</Text>
                                            <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                        </View>
                                        <TextInput
                                            ref={questionRef}
                                            style={Gstyles.input}
                                            onChangeText={(question) => setQuestion(question)}
                                            value={question.toString()}
                                            placeholder="Your keywords"
                                            // keyboardType="email-address"
                                            // maxLength={100}
                                            autoCapitalize='none' //words: first letter of each word.
                                        />
                                    </View>

                                    {searchText != '' && activeAccordion == '' ?
                                        <FlatList
                                            data={searchText}
                                            contentContainerStyle={[Gstyles.competitiveSubCategoryParentContainer]}
                                            renderItem={({ item, index }) =>
                                            (
                                                searchDetailsCard(item, index)
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                        :
                                        <>
                                            {searchText == '' && searchTextCallOrNot != 0 ?
                                                <View style={styles.nodataContainer}>
                                                    {listLoader ? <ActivityIndicator /> :
                                                        <Text>No data found</Text>
                                                    }
                                                </View>
                                                : null
                                            }
                                        </>
                                    }

                                    {activeAccordion == 'yes' && searchText != '' ?
                                        <ScrollView
                                            keyboardShouldPersistTaps="handled"
                                            // contentContainerStyle={scrollViewContainer}
                                            showsVerticalScrollIndicator={false}
                                        >
                                            {/* {searchText.map((d, i) => ( */}
                                            {searchSelectDetailsCard(searchText)}
                                            {/* ))} */}

                                        </ScrollView>
                                        : null
                                    }
                                </View>
                                :
                                userid == 0 ?
                                    <View>
                                        <Text>To access the hyperlink for viewing the detailed content please register to get your credentials.</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text>To access “Ask Me” for framing question and getting the solution, please subscribe to get your own course materials.</Text>
                                    </View>
                            }

                            <View style={styles.modalBottomontainer}>
                                <TouchableOpacity onPress={closeHandeler} style={[styles.button, styles.rejectBackground]}>
                                    <Text>Close</Text>
                                </TouchableOpacity>
                                {is_subscribe_e_library != null && is_subscribe_e_library != undefined && is_subscribe_e_library != 0 ?
                                    <TouchableOpacity onPress={submitHandeler} style={[styles.button, styles.successBackground]}>
                                        <Text>Submit</Text>
                                    </TouchableOpacity>
                                    :
                                    userid == 0 ?
                                        <TouchableOpacity onPress={registrationHandeler} style={[styles.subButton,]}>
                                            <Text>Register Now</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={subscribHandeler} style={[styles.subButton,]}>
                                            <Text>Subscribe Now</Text>
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
                {isPdfLoading && (
                    <View style={styles.activityContainer}>
                        {Emitter.emit(Events.SHOW_PRELOADER)}
                    </View>
                )}
            </KeyboardAvoidingView>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    modalParentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: trasparent,
    },
    modalWhiteArea: {
        backgroundColor: 'white',
        padding: 15,
        width: '85%',
        borderRadius: 10,
        justifyContent: 'space-between',

    },
    modalTopContainer: {
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
    },
    modalmiddleContainer: {
        marginTop: 10,
        flex: 1.4,
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        marginBottom: 15,
    },
    modalBottomontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        width: 90,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    subButton: {
        width: 110,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#F0A901'
    },
    rejectBackground: {
        backgroundColor: '#f85a5b',
    },
    successBackground: {
        backgroundColor: '#3da083',
    },
    modalHeading: {
        fontFamily: fonts.rRegular,
        color: "#000",
        fontSize: 16,
    },
    modaldetails: {
        fontFamily: fonts.rRegular,
        color: "#000",
        fontSize: 12,
    },
    inputContainer: {
        width: '100%',
    },
    labelMargin: {
        marginLeft: 10,
        marginBottom: 5,
    },
    inputLabel: {
        fontFamily: fonts.rLight,
        fontSize: 12,
        color: colors.inputText,
    },
    searchCardContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: 60,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 8,
        marginVertical: 5,
        paddingVertical: 3,
    },
    searchLeft: {
        flex: .1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#ff0000'
    },
    searchMiddle: {
        flex: 1,
    },
    searchRight: {
        flex: .2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Question: {
        fontFamily: fonts.rBold,
        color: "#000",
        fontSize: 12,
    },
    searchSelectCardContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#BEBAB3',
        borderRadius: 12,
    },
    individualAnswerContainer: {
        width: '100%',
        marginBottom: 10,
    },
    nodataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    activityContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffffaf',
    },
    detailsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    detailsText: {
        fontFamily: fonts.rRegular,
        color: "#fff",
        fontSize: 14,
    }

});

export default PdfViewer;