import React, { useState, useEffect } from 'react';

import {
    View,
    StatusBar,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,

} from 'react-native';
import { useDispatch, } from 'react-redux';

import Pdf from 'react-native-pdf';
import Config from "react-native-config"

import { container, } from '../../styles/Crestest.config';

import { getData } from "../../utils/Util";

import HeaderComponent from '../../components/HeaderComponent';
import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

const Instruction = (props) => {
    // const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
    const source = { uri: Config.PDFURL + 'assets/lmsguideline.pdf', cache: true };

    const dispatch = useDispatch();

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [isPdfLoading, setIsPdfLoading] = useState(true);

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

                <View style={styles.container}>
                    <Pdf
                        trustAllCerts={false}
                        source={source}
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
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        page={1}
                        style={styles.pdf} />
                    {isPdfLoading && (
                        Emitter.emit(Events.SHOW_PRELOADER)
                    )}
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
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },


});

export default Instruction;