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
    TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pdf from 'react-native-pdf';
import Config from "react-native-config"

import MathJax from 'react-native-mathjax'

import { colors, container, fonts } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';
import { storeData, getData, clearAllData } from "../../utils/Util";

import HeaderComponent from '../../components/HeaderComponent';

const Instruction = (props) => {
    // const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
    const source = { uri: Config.PDFURL + 'assets/lmsguideline.pdf', cache: true };
    // const source = { uri: Config.PDFURL + 'elibrary/1681908726652IC10PHCH1CM.1.2.3.4.pdf', cache: true };
    // const source = { uri: props.route.params.elibraryPdfPath, cache: true };
    // const source = { uri: "https://crestestclv.s3.ap-south-1.amazonaws.com/elibrary/1681908726652IC10PHCH1CM.1.2.3.4.pdf", cache: true };

    const dispatch = useDispatch();

    const [sourcePdfUrl, setSourcePdfUrl] = useState({ uri: Config.PDFURL + 'assets/lmsguideline.pdf', cache: true })
    const [pdfFileName, setPdfFileName] = useState('')
    const [activeAccordion, setActiveAccordion] = useState('');

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')

    useEffect(() => {

        async function getUserDetails() {
            let result = await getData("crestestUserDetails");
            result = JSON.parse(result);
            let fname = result['fname'];
            let lname = result['lname'];
            setFname(fname);
            setLname(lname);
        };
        getUserDetails();
        
    }, []);

    

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }


    
    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                <HeaderComponent
                    headerName='Instruction'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />

                {/* <View style={{ flex: 1, backgroundColor: '#e7bc00', alignItems: 'center', justifyContent: 'center', }}>
                <Text>Career Guidance</Text>
            </View> */}
                <View style={styles.container}>
                    <Pdf
                        trustAllCerts={false}
                        // source={{ uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf'}}
                        source={source}
                        // source={{ uri: Config.PDFURL + pdfFileName, cache: true }}

                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        page={1}
                        style={styles.pdf} />
                </View>
                

                
            </KeyboardAvoidingView>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginTop: 25,
        /* borderWidth:1,
        borderStyle:'solid',
        borderColor:'#ff0000' */
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    /* modalParentContainer: {
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
        // height: 400,
        justifyContent: 'space-between',

    },
    modalTopContainer: {
        // flex: .4,
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
        // flex: .5,
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
        backgroundColor:'#F0A901'
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
        // height: 20,
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
        // padding:3,
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
        // borderWidth: 1,
        // borderColor: '#ff0000'
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
    } */

});

export default Instruction;